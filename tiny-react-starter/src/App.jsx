import React, { useState } from "react";
import reactLogo from "./assets/react.svg";

export default function App() {
  const [count, setCount] = useState(0);
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchJoke() {
    try {
      setLoading(true);
      // No external requests here; just a local "mock" for offline demo.
      // Replace with a real API call if you like.
      await new Promise(r => setTimeout(r, 400));
      setJoke("Why do JavaScript developers wear glasses? Because they don't C#.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="hero">
        <img src={reactLogo} alt="React logo" width="64" height="64" />
        <h1>Tiny React Starter</h1>
        <p>Vite • React 18 • Zero fluff</p>
      </header>

      <main className="content">
        <section className="card">
          <h2>Counter</h2>
          <p>Current: <strong>{count}</strong></p>
          <div className="row">
            <button onClick={() => setCount(c => c - 1)}>-1</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <button onClick={() => setCount(c => c + 1)}>+1</button>
          </div>
        </section>

        <section className="card">
          <h2>Fake Fetch</h2>
          <p>This simulates calling an API. Swap it with a real one later.</p>
          <button onClick={fetchJoke} disabled={loading}>
            {loading ? "Loading..." : "Get a joke"}
          </button>
          {joke && <p className="joke">💡 {joke}</p>}
        </section>

        <section className="card">
          <h2>Next steps</h2>
          <ul>
            <li>Edit <code>src/App.jsx</code> and save to see HMR.</li>
            <li>Add libraries: UI kits, routers, state managers.</li>
            <li>Deploy on Vercel/Netlify/Render in minutes.</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">Vite</a>
        <span>•</span>
        <a href="https://react.dev" target="_blank" rel="noreferrer">React</a>
      </footer>
    </div>
  );
}
