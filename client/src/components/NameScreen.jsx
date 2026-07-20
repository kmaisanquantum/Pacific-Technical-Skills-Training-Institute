import React, { useState } from 'react';
import { INSTITUTE, SHORT } from '../data/modulesData';

export default function NameScreen({ onStart }) {
  const [n, setN] = useState("");
  return (
    <div className="name-screen">
      <div className="name-card">
        <div style={{ fontSize: 44, marginBottom: 12 }}>🔧</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, lineHeight: 1.25 }}>{INSTITUTE}</h1>
        <p style={{ fontSize: 13, color: "#7A7469", marginBottom: 4 }}>Motor Vehicle Mechanic Trade Course</p>
        <p style={{ fontSize: 12, color: "#B0A99E", marginBottom: 28 }}>{SHORT} — Papua New Guinea</p>
        <label className="fi-label">Enter your full name to begin</label>
        <input
          className="fi"
          placeholder="e.g. John Kila"
          value={n}
          onChange={e => setN(e.target.value)}
          onKeyDown={e => e.key === "Enter" && n.trim() && onStart(n.trim())}
        />
        <button
          className="btn btn-orange"
          style={{ width: "100%" }}
          disabled={!n.trim()}
          onClick={() => n.trim() && onStart(n.trim())}
        >
          Start Course →
        </button>
      </div>
    </div>
  );
}
