import type { Stat } from "../types";
import "./StatsList.css";

export default function StatsList({ stats }: { stats: Stat[] }) {
  return (
    <div className="stats-list">
      {stats.map((s) => (
        <div key={s.name} className="stat-item">
          <div className="stat-item__header">
            <span>{s.name.replace("-", " ")}</span>
            <strong>{s.base}</strong>
          </div>
          <div className="stat-item__bar">
            <div
              className="stat-item__bar-fill"
              style={{ width: `${Math.min(100, (s.base / 180) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
