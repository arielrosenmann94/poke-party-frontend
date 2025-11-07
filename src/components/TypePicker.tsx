import { TYPE_ES } from "../utils/typeNames";

export const POKEMON_TYPES = [
  "normal","fire","water","grass","electric","ice",
  "fighting","poison","ground","flying","psychic","bug",
  "rock","ghost","dark","dragon","steel","fairy"
] as const;

type Props = {
  value?: string;
  onPick: (type: typeof POKEMON_TYPES[number]) => void;
};

export default function TypePicker({ value, onPick }: Props) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {POKEMON_TYPES.map((t) => {
        const selected = t === value;
        return (
          <button
            key={t}
            onClick={() => onPick(t)}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: selected ? "2px solid #333" : "1px solid #ccc",
              background: selected ? "#ffe8cc" : "#fff",
              cursor: "pointer",
            }}
            title={`Buscar Pokémon de tipo ${TYPE_ES[t] ?? t}`}
          >
            {TYPE_ES[t] ?? t}
          </button>
        );
      })}
    </div>
  );
}
