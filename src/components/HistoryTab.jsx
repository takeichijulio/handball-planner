import { C, btnBase, btnSm } from "../theme.js";
import { SectionTitle } from "./UI.jsx";

export default function HistoryTab({ history, onLoad, onDelete, onGeneratePDF }) {
  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: 16, border: `1px solid ${C.midGray}` }}>
      <SectionTitle icon="📂">Histórico de Treinos Salvos</SectionTitle>

      {history.length === 0 && (
        <div style={{ textAlign: "center", color: "#aaa", padding: "50px 0", fontSize: 14 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
          Nenhum treino salvo ainda.<br />
          Use o editor e clique em <strong>"Salvar Treino"</strong>.
        </div>
      )}

      {history.map((p, i) => (
        <div key={i} style={{
          border: `1px solid ${C.midGray}`, borderRadius: 8,
          padding: "12px 16px", marginBottom: 10,
          display: "flex", alignItems: "center", gap: 12,
          background: C.lightBg,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {p.equipe} — {p.tema}
            </div>
            <div style={{ fontSize: 11, color: "#777", marginTop: 3 }}>
              📅 {p.data} · ⏱ {p.duracao} · 📍 {p.espaco}
            </div>
            <div style={{ fontSize: 10, color: "#aaa", marginTop: 2 }}>
              Salvo em {p.savedAt}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button onClick={() => onLoad(p)} style={{ ...btnBase, fontSize: 12, padding: "6px 14px" }}>
              ✏️ Carregar
            </button>
            <button onClick={() => onGeneratePDF(p)} style={{ ...btnBase, background: C.accent, color: C.navy, fontSize: 12, padding: "6px 14px" }}>
              ⬇️ PDF
            </button>
            <button onClick={() => onDelete(i)} style={btnSm(C.danger)} title="Excluir">✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}
