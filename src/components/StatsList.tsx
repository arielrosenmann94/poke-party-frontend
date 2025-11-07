import type { Stat } from "../types";

export default function StatsList({ stats }: { stats: Stat[] }) {
  return (
    <div style={{ marginTop: 8, maxWidth: 360 }}>
      {stats.map((s) => (
        <div key={s.name} style={{ marginBottom: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <span style={{ textTransform: "capitalize" }}>{s.name.replace("-", " ")}</span>
            <strong>{s.base}</strong>
          </div>
          <div style={{ height: 8, background: "#eee", borderRadius: 4 }}>
            <div
              style={{
                height: 8,
                width: `${Math.min(100, (s.base / 180) * 100)}%`,
                background: "#3b82f6",
                borderRadius: 4,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
