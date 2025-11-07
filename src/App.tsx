import { useEffect, useState } from "react";
import {
  ping,
  getRandomByType,
  addToParty,
  getParty,
  getBox,
  moveToBox,
  moveToParty,
  getPartySorted,
  optimizeParty,
} from "./api";
import { TYPE_ES } from "./utils/typeNames"; 
import type { Pokemon } from "./types";
import PokemonCard from "./components/PokemonCard";
import StatsList from "./components/StatsList";
import TypePicker from "./components/TypePicker";

export default function App() {
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("fire");
  const [poke, setPoke] = useState<Pokemon | null>(null);
  const [party, setParty] = useState<Pokemon[]>([]);
  const [box, setBox] = useState<Pokemon[]>([]);
  const [sortKey, setSortKey] = useState<
    "total" | "hp" | "attack" | "defense" | "special-attack" | "special-defense" | "speed"
  >("total");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  async function refresh() {
    const p = await getPartySorted(sortKey, sortOrder).catch(() => getParty());
    setParty(p);
    setBox(await getBox());
  }

  useEffect(() => {
    ping().then((d) => setMsg(d.message));
    refresh();
  }, []);

  useEffect(() => {
    (async () => {
      const p = await getPartySorted(sortKey, sortOrder).catch(() => getParty());
      setParty(p);
    })();
  }, [sortKey, sortOrder]);

  const handleGet = async (forcedType?: string) => {
    const t = forcedType ?? type;
    setType(t);
    const p = await getRandomByType(t);
    setPoke(p);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Poke Party</h1>
      <p>Backend dice: {msg}</p>

      <div style={{ marginTop: 24 }}>
        <p style={{ margin: "0 0 8px" }}>Selecciona un tipo:</p>
        <TypePicker
          value={type}
          onPick={(t) => {
            handleGet(t);
          }}
        />
      </div>

      {poke && (
        <div style={{ marginTop: 20, display: "flex", gap: 16, alignItems: "flex-start" }}>
          <img src={poke.sprite} alt={poke.name} width={96} height={96} />
          <div>
            <h2 style={{ margin: 0, textTransform: "capitalize" }}>{poke.name}</h2>
            <p style={{ margin: "4px 0" }}>
              Tipos: {poke.types.map(t => TYPE_ES[t] ?? t).join(", ")}
            </p>
            <small>ID: {poke.id}</small>
            <StatsList stats={poke.stats} />
            <div style={{ marginTop: 12 }}>
              <button
                onClick={async () => {
                  try {
                    const r = await addToParty(poke!);
                    await refresh();
                    const inParty =
                      Array.isArray(r.party) && r.party.some((x: any) => x.id === poke!.id);
                    alert(inParty ? "✅ Agregado a Party" : "📦 Party lleno: enviado a Box");
                  } catch (e: any) {
                    alert("❌ " + (e?.response?.data?.error || "Error agregando"));
                  }
                }}
              >
                ➕ Capturar Pokémon Random
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginTop: 32,
        }}
      >
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h2 style={{ marginRight: 8 }}>Party (máx 6)</h2>
            <label style={{ fontSize: 12 }}>
              Ordenar por{" "}
              <select value={sortKey} onChange={(e) => setSortKey(e.target.value as any)}>
                <option value="total">total</option>
                <option value="hp">hp</option>
                <option value="attack">attack</option>
                <option value="defense">defense</option>
                <option value="special-attack">special-attack</option>
                <option value="special-defense">special-defense</option>
                <option value="speed">speed</option>
              </select>
            </label>
            <label style={{ fontSize: 12 }}>
              Orden{" "}
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as any)}>
                <option value="desc">desc</option>
                <option value="asc">asc</option>
              </select>
            </label>
            <button
              style={{ marginLeft: "auto" }}
              onClick={async () => {
                await optimizeParty();
                await refresh();
                alert("🔝 Mejor equipo posible aplicado");
              }}
            >
              ⭐ Mejor equipo posible
            </button>
          </div>

          {party.length === 0 && <p>(vacío)</p>}
          {party.map((p) => (
            <PokemonCard
              key={p.id}
              pokemon={p}
              rightAction={{
                label: "⇨ Enviar a Box",
                onClick: async () => {
                  await moveToBox(p.id);
                  await refresh();
                },
              }}
            />
          ))}
        </section>

        <section>
          <h2>Box</h2>
          {box.length === 0 && <p>(vacío)</p>}
          {box.map((p) => (
            <PokemonCard
              key={p.id}
              pokemon={p}
              rightAction={{
                label: "⇦ Volver a Party",
                disabled: party.length >= 6,
                onClick: async () => {
                  try {
                    await moveToParty(p.id);
                    await refresh();
                  } catch (e: any) {
                    alert("❌ " + (e?.response?.data?.error || "Error"));
                  }
                },
              }}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
