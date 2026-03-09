// ─────────────────────────────────────────────────────────────────────────────
//  UI PRIMITIVES
//  Componentes básicos reutilizáveis em todo o app.
//  Edite aqui para mudar inputs, botões e títulos globalmente.
// ─────────────────────────────────────────────────────────────────────────────

import { C, btnBase, btnSm, inputBase } from "../theme.js";

export { btnBase, btnSm, inputBase };

export function Tag({ color, children }) {
  return (
    <span style={{
      background: color + "22", color,
      border: `1px solid ${color}44`,
      borderRadius: 4, padding: "1px 8px",
      fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
}

export function SectionTitle({ icon, children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      margin: "0 0 12px", borderBottom: `2px solid ${C.midGray}`, paddingBottom: 7,
    }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 15, fontWeight: 700, letterSpacing: 1,
        color: C.navy, textTransform: "uppercase",
      }}>
        {children}
      </span>
    </div>
  );
}

export function Input({ label, value, onChange, placeholder, textarea, rows = 2 }) {
  const style = { ...inputBase };
  return (
    <div style={{ marginBottom: 8 }}>
      {label && (
        <div style={{
          fontSize: 11, fontWeight: 700, color: C.blue,
          marginBottom: 3, textTransform: "uppercase", letterSpacing: .5,
        }}>
          {label}
        </div>
      )}
      {textarea
        ? <textarea value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} rows={rows} style={{ ...style, width: "100%" }} />
        : <input value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} style={{ ...style, width: "100%" }} />
      }
    </div>
  );
}

export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div style={{
      position: "fixed", top: 16, right: 20, zIndex: 9999,
      background: toast.type === "error" ? "#c0392b" : C.blue,
      color: C.white, padding: "10px 20px", borderRadius: 8,
      fontWeight: 600, fontSize: 13,
      boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      animation: "fadeIn .2s ease",
    }}>
      {toast.msg}
    </div>
  );
}

export function ActionBar({ onExport, onSave, onNew }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
      <button onClick={onExport} style={{ ...btnBase, background: C.accent, color: C.navy, fontSize: 13, padding: "9px 20px" }}>
        ⬇️ Gerar PDF
      </button>
      <button onClick={onSave} style={{ ...btnBase, fontSize: 13, padding: "9px 20px" }}>
        💾 Salvar Treino
      </button>
      <button onClick={onNew} style={{ ...btnBase, background: C.white, color: C.navy, border: `1.5px solid ${C.midGray}`, fontSize: 13, padding: "9px 20px" }}>
        ＋ Novo Plano
      </button>
    </div>
  );
}
