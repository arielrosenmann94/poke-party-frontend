import type { Pokemon } from "../types";
import StatsList from "./StatsList";
import { TYPE_ES } from "../utils/typeNames";
import "./PokemonCard.css";

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
    <div className="pokemon-card">
      <img src={p.sprite} alt={p.name} />

      <div className="pokemon-card__content">
        <div className="pokemon-card__header">
          <span>{p.name}</span>
          <small>#{p.id}</small>
        </div>

        <div className="pokemon-card__types">
          Tipos: {p.types.map((t) => TYPE_ES[t] ?? t).join(", ")}
        </div>

        <StatsList stats={p.stats} />
      </div>

      {rightAction && (
        <div className="pokemon-card__action">
          <button className="btn btn-secondary" disabled={rightAction.disabled} onClick={rightAction.onClick}>
            {rightAction.label}
          </button>
        </div>
      )}
    </div>
  );
}
