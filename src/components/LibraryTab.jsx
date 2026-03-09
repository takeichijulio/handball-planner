import { useState } from "react";
import { C, btnBase } from "../theme.js";
import { SectionTitle, Tag } from "./UI.jsx";
import { getMergedLibrary, STATIC_LIBRARY, removeFromUserLibrary, CATEGORIES } from "../data/library.js";

export default function LibraryTab() {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0]);
  const [expanded,  setExpanded]  = useState(null);
  const [library,   setLibrary]   = useState(() => getMergedLibrary());

  const HIGHLIGHT = ["Foco:", "foco:", "Atencao:"];
  const staticTitles = new Set((STATIC_LIBRARY[activeCat] || []).map(e => e.titulo));

  const handleRemove = (titulo, categoria) => {
    removeFromUserLibrary(titulo, categoria);
    setLibrary(getMergedLibrary());
    setExpanded(null);
  };

  const items = library[activeCat] || [];

  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: 16, border: `1px solid ${C.midGray}` }}>
      <SectionTitle icon="📚">Biblioteca de Exercícios</SectionTitle>

      {/* Abas de categoria */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {CATEGORIES.map(cat => (
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

      {/* Cards de exercicio */}
      {items.length === 0 && (
        <div style={{ textAlign: "center", color: "#aaa", padding: "40px 0", fontSize: 13 }}>
          Nenhum exercicio nesta categoria ainda.<br />
          Use o botao <strong>"+ Adicionar a Biblioteca"</strong> em qualquer bloco do editor.
        </div>
      )}

      {items.map((ex, i) => {
        const isUser = !staticTitles.has(ex.titulo);
        return (
          <div key={i} style={{ border: `1px solid ${C.midGray}`, borderRadius: 8, marginBottom: 10, overflow: "hidden" }}>

            {/* Header do exercicio */}
            <div
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{ background: C.lightBg, borderBottom: expanded === i ? `2px solid ${C.blue}` : "none", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>{ex.titulo}</span>
                <Tag color={C.accent}>{ex.duracao}</Tag>
                {isUser && (
                  <span style={{ fontSize: 10, fontWeight: 700, background: C.blue + "22", color: C.blue, border: `1px solid ${C.blue}44`, borderRadius: 4, padding: "1px 7px" }}>
                    Meu exercicio
                  </span>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }} onClick={e => e.stopPropagation()}>
                {isUser && (
                  <button
                    onClick={() => handleRemove(ex.titulo, activeCat)}
                    style={{ ...btnBase, background: "#fdecea", color: C.danger, border: `1px solid ${C.danger}44`, fontSize: 11, padding: "3px 10px" }}
                  >
                    Remover
                  </button>
                )}
                <span style={{ color: C.blue, fontSize: 13 }} onClick={() => setExpanded(expanded === i ? null : i)}>
                  {expanded === i ? "▲" : "▼"}
                </span>
              </div>
            </div>

            {/* Detalhe do exercicio */}
            {expanded === i && (
              <div style={{ padding: "10px 14px" }}>
                {ex.linhas.map(([label, texto], j) => {
                  const isHL = HIGHLIGHT.some(p => label.includes(p));
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
        );
      })}

      <div style={{ marginTop: 12, padding: "10px 14px", background: C.lightBg, borderRadius: 8, fontSize: 12, color: "#777" }}>
        💡 Para adicionar exercicios: abra um bloco no editor e clique em <strong>"+ Adicionar a Biblioteca"</strong>.
      </div>
    </div>
  );
}
