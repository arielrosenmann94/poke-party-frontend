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
import "./styles/App.css";

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
    <div className="app-shell">
      <header className="app-header neon-card">
        <div>
          <p className="app-tagline">Organiza tu escuadrón futurista</p>
          <h1 className="app-title">Poké Party</h1>
        </div>
        <p className="status-pill">
          Backend dice: <span>{msg || "…"}</span>
        </p>
      </header>

      <section className="panel neon-card">
        <div className="panel-header">
          <h2>Captura por tipo</h2>
          <p>Selecciona un tipo para invocar un nuevo Pokémon con estilo futurista.</p>
        </div>
        <TypePicker
          value={type}
          onPick={(t) => {
            handleGet(t);
          }}
        />
      </section>

      {poke && (
        <section className="featured-pokemon neon-card">
          <div className="featured-pokemon__visual">
            <img src={poke.sprite} alt={poke.name} width={128} height={128} />
          </div>
          <div className="featured-pokemon__body">
            <div className="featured-pokemon__heading">
              <h2>{poke.name}</h2>
              <span className="featured-pokemon__id">#{poke.id}</span>
            </div>
            <p className="featured-pokemon__types">
              Tipos: {poke.types.map((t) => TYPE_ES[t] ?? t).join(", ")}
            </p>
            <StatsList stats={poke.stats} />
            <div className="featured-pokemon__actions">
              <button
                className="btn btn-primary"
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
        </section>
      )}

      <div className="collections-grid">
        <section className="collection-card neon-card">
          <div className="collection-card__header">
            <h2>Party (máx 6)</h2>
            <div className="collection-card__controls">
              <label>
                Ordenar por
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
              <label>
                Orden
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as any)}>
                  <option value="desc">desc</option>
                  <option value="asc">asc</option>
                </select>
              </label>
              <button
                className="btn btn-secondary"
                onClick={async () => {
                  await optimizeParty();
                  await refresh();
                  alert("🔝 Mejor equipo posible aplicado");
                }}
              >
                ⭐ Mejor equipo posible
              </button>
            </div>
          </div>
          <div className="collection-list">
            {party.length === 0 && <p className="empty-state">(vacío)</p>}
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
          </div>
        </section>

        <section className="collection-card neon-card">
          <div className="collection-card__header">
            <h2>Box</h2>
          </div>
          <div className="collection-list">
            {box.length === 0 && <p className="empty-state">(vacío)</p>}
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
          </div>
        </section>
      </div>
    </div>
  );
}
