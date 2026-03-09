// ─────────────────────────────────────────────────────────────────────────────
//  IMPORT MODAL
//  Cole aqui o objeto JS gerado pelo Claude no chat e clique em Carregar.
//  Aceita tanto JSON puro quanto o formato const PLAN = { ... }
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { C, btnBase } from "../theme.js";

const PLACEHOLDER = `// Cole aqui o objeto JS gerado pelo Claude, por exemplo:

const PLAN = {
  nomeArquivo: "treino_masculino",
  equipe: "Masculino Intermediário",
  tema: "Ataque Posicional vs Defesa 5-1",
  duracao: "75 minutos",
  espaco: "Quadra Inteira",
  data: "10/03/2026",
  objetivos: [ ... ],
  blocos: [ ... ],
  resumo: [ ... ],
  totalDuracao: "75 min",
  dicaTatica: "...",
};`;

// Extrai o objeto JS do texto colado — aceita const PLAN = {...} ou JSON puro
function parsePlan(raw) {
  const cleaned = raw.trim();

  // Tenta JSON puro primeiro
  try {
    return JSON.parse(cleaned);
  } catch (_) {}

  // Tenta extrair o objeto de "const PLAN = { ... }" ou "const PLAN = { ... };"
  try {
    // Remove const PLAN = / let PLAN = / var PLAN = no início
    const withoutDecl = cleaned
      .replace(/^(export\s+)?(const|let|var)\s+\w+\s*=\s*/, "")
      .replace(/;?\s*$/, "");

    // Usa Function para avaliar o objeto JS (seguro — apenas dados)
    // eslint-disable-next-line no-new-func
    const result = new Function(`return (${withoutDecl})`)();
    if (result && typeof result === "object") return result;
  } catch (_) {}

  return null;
}

function validate(plan) {
  const required = ["equipe", "tema", "duracao", "espaco", "data", "objetivos", "blocos", "resumo", "totalDuracao", "dicaTatica"];
  const missing  = required.filter(k => !(k in plan));
  if (missing.length > 0) return `Campos obrigatórios ausentes: ${missing.join(", ")}`;
  if (!Array.isArray(plan.blocos) || plan.blocos.length === 0) return "O plano precisa ter ao menos 1 bloco.";
  if (!Array.isArray(plan.objetivos)) return "Objetivos devem ser uma lista.";
  return null;
}

export default function ImportModal({ onClose, onLoad }) {
  const [raw,   setRaw]   = useState("");
  const [error, setError] = useState(null);

  const handleLoad = () => {
    setError(null);
    if (!raw.trim()) { setError("Cole o código do treino antes de carregar."); return; }

    const plan = parsePlan(raw);
    if (!plan) { setError("Não foi possível interpretar o código. Verifique se copiou corretamente do chat."); return; }

    const validationError = validate(plan);
    if (validationError) { setError(validationError); return; }

    onLoad(plan);
  };

  // Overlay click fecha o modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(13,27,42,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
    >
      <div style={{
        background: C.white, borderRadius: 12, width: "100%", maxWidth: 660,
        boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
        overflow: "hidden",
      }}>

        {/* Header */}
        <div style={{ background: C.navy, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: C.white, letterSpacing: 1 }}>
              📋 IMPORTAR TREINO DO CLAUDE
            </div>
            <div style={{ fontSize: 11, color: C.accent, marginTop: 2 }}>
              Cole o objeto JS gerado no chat e clique em Carregar
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>
            ✕
          </button>
        </div>

        {/* Instructions */}
        <div style={{ background: C.lightBg, borderBottom: `1px solid ${C.midGray}`, padding: "10px 20px", fontSize: 12, color: "#555" }}>
          <strong style={{ color: C.blue }}>Como usar:</strong> no chat com o Claude, após planejar o treino, peça{" "}
          <em>"me mande o treino no formato JS"</em> → copie o código → cole abaixo → clique em Carregar.
        </div>

        {/* Textarea */}
        <div style={{ padding: "16px 20px" }}>
          <textarea
            value={raw}
            onChange={e => { setRaw(e.target.value); setError(null); }}
            placeholder={PLACEHOLDER}
            rows={14}
            style={{
              width: "100%", boxSizing: "border-box",
              background: "#1e1e2e", color: "#cdd6f4",
              border: `1.5px solid ${error ? "#c0392b" : C.midGray}`,
              borderRadius: 8, padding: "12px 14px",
              fontFamily: "'Courier New', monospace", fontSize: 12, lineHeight: 1.6,
              outline: "none", resize: "vertical",
            }}
          />

          {/* Error */}
          {error && (
            <div style={{ marginTop: 8, padding: "8px 12px", background: "#fdecea", border: "1px solid #f5c6cb", borderRadius: 6, fontSize: 12, color: "#c0392b" }}>
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ padding: "0 20px 18px", display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ ...btnBase, background: C.lightBg, color: C.navy, border: `1.5px solid ${C.midGray}` }}>
            Cancelar
          </button>
          <button onClick={handleLoad} style={{ ...btnBase, background: C.accent, color: C.navy, padding: "8px 22px", fontSize: 13 }}>
            ✅ Carregar no Editor
          </button>
        </div>
      </div>
    </div>
  );
}
