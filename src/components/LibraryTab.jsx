import { useState } from "react";
import { C, btnBase } from "../theme.js";
import { SectionTitle, Tag } from "./UI.jsx";
import { LIBRARY } from "../data/library.js";

export default function LibraryTab() {
  const [activeCat, setActiveCat] = useState(Object.keys(LIBRARY)[0]);
  const [expanded, setExpanded]   = useState(null);

  const HIGHLIGHT = ["🎯", "⚡", "💡"];

  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: 16, border: `1px solid ${C.midGray}` }}>
      <SectionTitle icon="📚">Biblioteca de Exercícios</SectionTitle>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {Object.keys(LIBRARY).map(cat => (
          <button key={cat} onClick={() => { setActiveCat(cat); setExpanded(null); }}
            style={{
              ...btnBase,
              background: activeCat === cat ? C.blue : C.lightBg,
              color:      activeCat === cat ? C.white : C.navy,
              border:     `1.5px solid ${activeCat === cat ? C.blue : C.midGray}`,
              fontSize: 12,
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Exercise cards */}
      {(LIBRARY[activeCat] || []).map((ex, i) => (
        <div key={i} style={{ border: `1px solid ${C.midGray}`, borderRadius: 8, marginBottom: 12, overflow: "hidden" }}>

          {/* Exercise header */}
          <div
            onClick={() => setExpanded(expanded === i ? null : i)}
            style={{
              background: C.lightBg, borderBottom: expanded === i ? `2px solid ${C.blue}` : "none",
              padding: "10px 14px", display: "flex", justifyContent: "space-between",
              alignItems: "center", cursor: "pointer",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>{ex.titulo}</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Tag color={C.accent}>{ex.duracao}</Tag>
              <span style={{ color: C.blue, fontSize: 13 }}>{expanded === i ? "▲" : "▼"}</span>
            </div>
          </div>

          {/* Exercise detail */}
          {expanded === i && (
            <div style={{ padding: "10px 14px" }}>
              {ex.linhas.map(([label, texto], j) => {
                const isHL = HIGHLIGHT.some(p => label.startsWith(p));
                return (
                  <div key={j} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 12, color: C.blue }}>{label}</span>
                    <span style={{ fontSize: 12, color: isHL ? C.focusOrange : C.text, fontWeight: isHL ? 600 : 400 }}>
                      {texto}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <div style={{ marginTop: 12, padding: "10px 14px", background: C.lightBg, borderRadius: 8, fontSize: 12, color: "#777" }}>
        💡 Para adicionar exercícios à biblioteca, edite o arquivo <code>src/data/library.js</code>.
      </div>
    </div>
  );
}
