import "../styles/pokedex.css";

export default function PokedexShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="pk-root">
      <div className="pk-top">
        <div className="pk-lights">
          <span className="pk-light blue" />
          <span className="pk-light yellow" />
          <span className="pk-light green" />
        </div>
        <div className="pk-grill">
          {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
        </div>
      </div>

      <div className="pk-hinge" />

      <div className="pk-body">
        <div className="pk-screen">
          <div className="pk-glass" />
          <div className="pk-screen-inner">
            {children}
          </div>
        </div>

        <aside className="pk-controls">
          <button className="pk-btn primary">A</button>
          <button className="pk-btn ghost">B</button>
          <div className="pk-dpad">
            <span className="up" />
            <span className="right" />
            <span className="down" />
            <span className="left" />
          </div>
          <div className="pk-slots">
            <span /><span /><span />
          </div>
        </aside>
      </div>
    </div>
  );
}
