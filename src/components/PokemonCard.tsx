// src/components/PokemonCard.tsx
import type { Pokemon } from "../types";
import StatsList from "./StatsList";
import { TYPE_ES } from "../utils/typeNames";

type Action = { label: string; onClick: () => void; disabled?: boolean };

export default function PokemonCard({
  pokemon,
  rightAction,
}: {
  pokemon: Pokemon;
  rightAction?: Action;
}) {
  const p = pokemon;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "72px 1fr auto",
        gap: 12,
        padding: 12,
        marginBottom: 12,
        border: "1px solid #eee",
        borderRadius: 8,
      }}
    >
      <img src={p.sprite} width={56} height={56} />

      <div>
        <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
          <span style={{ textTransform: "capitalize", fontWeight: 600 }}>
            {p.name}
          </span>
          <small>#{p.id}</small>
        </div>

        <div style={{ fontSize: 12, marginTop: 4 }}>
          Tipos: {p.types.map((t) => TYPE_ES[t] ?? t).join(", ")}
        </div>

        <StatsList stats={p.stats} />
      </div>

      {rightAction && (
        <div>
          <button disabled={rightAction.disabled} onClick={rightAction.onClick}>
            {rightAction.label}
          </button>
        </div>
      )}
    </div>
  );
}
