import React from "react";
import reactLogo from "../assets/react.svg";
import useAppStore from "../store/useAppStore.js";

export default function Home() {
  const count = useAppStore(s => s.count);
  const inc = useAppStore(s => s.increment);
  const dec = useAppStore(s => s.decrement);
  const reset = useAppStore(s => s.resetCount);

  return (
    <div className="grid" style={{display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))"}}>
      <section className="card">
        <header className="row">
          <img src={reactLogo} alt="React logo" width="32" height="32" />
          <h2 style={{margin:0}}>Counter (global)</h2>
        </header>
        <p>Current: <strong>{count}</strong></p>
        <div className="row">
          <button onClick={dec}>-1</button>
          <button onClick={reset}>Reset</button>
          <button onClick={inc}>+1</button>
        </div>
        <p style={{color:"#9bb0df"}}>This counter is in global state (Zustand) and accessible to the Command Palette.</p>
      </section>

      <section className="card">
        <h2>Playground</h2>
        <p>Use the Command Palette <span className="kbd">⌘/Ctrl</span> + <span className="kbd">K</span> to jump around, toggle theme, and more.</p>
      </section>
    </div>
  );
}
