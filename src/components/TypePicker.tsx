import { TYPE_ES } from "../utils/typeNames";
import "../styles/TypePicker.css";

export const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy",
] as const;

type Props = {
  value?: string;
  onPick: (type: (typeof POKEMON_TYPES)[number]) => void;
};

export default function TypePicker({ value, onPick }: Props) {
  return (
    <div className="type-picker">
      {POKEMON_TYPES.map((t) => {
        const selected = t === value;
        return (
          <button
            key={t}
            type="button"
            className={`type-chip${selected ? " type-chip--selected" : ""}`}
            onClick={() => onPick(t)}
            aria-pressed={selected}
            title={`Buscar Pokémon de tipo ${TYPE_ES[t] ?? t}`}
          >
            {TYPE_ES[t] ?? t}
          </button>
        );
      })}
    </div>
  );
}
