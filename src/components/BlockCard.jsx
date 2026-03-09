// ─────────────────────────────────────────────────────────────────────────────
//  BLOCK CARD
//  Componente do card de cada bloco de exercício no editor.
//  Para mudar o visual de um bloco individual, edite este arquivo.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { C, btnBase, btnSm, inputBase } from "../theme.js";
import { Tag } from "./UI.jsx";
import { LIBRARY, BLOCK_CATEGORY_MAP } from "../data/library.js";

export default function BlockCard({ bloco, idx, onChange, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) {
  const [open, setOpen]       = useState(true);
  const [showLib, setShowLib] = useState(false);

  const category = BLOCK_CATEGORY_MAP[idx] || "Exercício Principal";
  const libItems = LIBRARY[category] || LIBRARY["Exercício Principal"];

  const update      = (field, val) => onChange(idx, { ...bloco, [field]: val });
  const updateLinha = (li, col, val) => {
    const linhas = bloco.linhas.map((l, i) =>
      i === li ? (col === 0 ? [val, l[1]] : [l[0], val]) : l
    );
    onChange(idx, { ...bloco, linhas });
  };
  const addLinha    = ()   => onChange(idx, { ...bloco, linhas: [...bloco.linhas, ["Label:", ""]] });
  const removeLinha = (li) => onChange(idx, { ...bloco, linhas: bloco.linhas.filter((_, i) => i !== li) });
  const loadFromLib = (ex) => {
    onChange(idx, {
      ...bloco,
      titulo: ex.titulo.toUpperCase(),
      duracao: ex.duracao,
      linhas: ex.linhas.map(l => [...l]),
    });
    setShowLib(false);
  };

  return (
    <div style={{ border: `1.5px solid ${C.midGray}`, borderRadius: 8, marginBottom: 10, overflow: "hidden", background: C.white }}>

      {/* ── Card Header ─────────────────────────────────────────────────────── */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ background: C.lightBg, borderBottom: `2px solid ${C.blue}`, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
      >
        <div style={{ background: C.accent, color: C.white, borderRadius: 5, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
          {bloco.numero}
        </div>
        <span style={{ fontSize: 16 }}>{bloco.emoji}</span>
        <span style={{ flex: 1, fontWeight: 700, fontSize: 13, color: C.navy, textTransform: "uppercase", letterSpacing: .3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {bloco.titulo}
        </span>
        <Tag color={C.accent}>{bloco.duracao}</Tag>

        {/* Controls — stop propagation so they don't toggle open/close */}
        <div style={{ display: "flex", gap: 4, marginLeft: 4 }} onClick={e => e.stopPropagation()}>
          {!isFirst && (
            <button onClick={() => onMoveUp(idx)} style={btnSm(C.blue)} title="Mover para cima">↑</button>
          )}
          {!isLast && (
            <button onClick={() => onMoveDown(idx)} style={btnSm(C.blue)} title="Mover para baixo">↓</button>
          )}
          <button onClick={() => onRemove(idx)} style={btnSm(C.danger)} title="Remover bloco">✕</button>
        </div>
        <span style={{ color: C.blue, fontSize: 14, marginLeft: 2 }}>{open ? "▲" : "▼"}</span>
      </div>

      {/* ── Card Body ───────────────────────────────────────────────────────── */}
      {open && (
        <div style={{ padding: "12px 14px" }}>

          {/* Library picker */}
          <div style={{ marginBottom: 12 }}>
            <button
              onClick={() => setShowLib(s => !s)}
              style={{ ...btnBase, background: C.blue + "11", color: C.blue, border: `1px solid ${C.blue}44`, fontSize: 11 }}
            >
              📚 {showLib ? "Fechar biblioteca" : `Carregar da biblioteca (${category})`}
            </button>

            {showLib && (
              <div style={{ marginTop: 8, border: `1px solid ${C.midGray}`, borderRadius: 6, overflow: "hidden" }}>
                {libItems.map((ex, i) => (
                  <div key={i} style={{
                    padding: "8px 12px", borderBottom: `1px solid ${C.midGray}`,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: i % 2 === 0 ? C.lightBg : C.white,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 12, color: C.navy }}>{ex.titulo}</span>
                      <Tag color={C.accent}>{ex.duracao}</Tag>
                    </div>
                    <button onClick={() => loadFromLib(ex)} style={{ ...btnBase, fontSize: 11, padding: "3px 12px" }}>
                      Usar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Block meta fields */}
          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 100px", gap: 8, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 3, textTransform: "uppercase" }}>Emoji</div>
              <input value={bloco.emoji} onChange={e => update("emoji", e.target.value)} style={{ ...inputBase, width: "100%", textAlign: "center" }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 3, textTransform: "uppercase" }}>Título</div>
              <input value={bloco.titulo} onChange={e => update("titulo", e.target.value)} style={{ ...inputBase, width: "100%" }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 3, textTransform: "uppercase" }}>Duração</div>
              <input value={bloco.duracao} onChange={e => update("duracao", e.target.value)} style={{ ...inputBase, width: "100%" }} />
            </div>
          </div>

          {/* Content lines */}
          <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, textTransform: "uppercase", letterSpacing: .5, marginBottom: 6 }}>
            Linhas de conteúdo
          </div>
          {bloco.linhas.map(([label, texto], li) => (
            <div key={li} style={{ display: "grid", gridTemplateColumns: "150px 1fr 28px", gap: 6, marginBottom: 6, alignItems: "start" }}>
              <input
                value={label}
                onChange={e => updateLinha(li, 0, e.target.value)}
                placeholder="Label:"
                style={{ ...inputBase, fontSize: 12, fontWeight: 600 }}
              />
              <textarea
                value={texto}
                onChange={e => updateLinha(li, 1, e.target.value)}
                rows={2}
                style={{ ...inputBase, fontSize: 12 }}
              />
              <button onClick={() => removeLinha(li)} style={{ ...btnSm(C.danger), marginTop: 4 }}>✕</button>
            </div>
          ))}
          <button
            onClick={addLinha}
            style={{ ...btnBase, background: C.lightBg, color: C.blue, border: `1px dashed ${C.blue}`, fontSize: 11, marginTop: 2 }}
          >
            + Adicionar linha
          </button>

        </div>
      )}
    </div>
  );
}
