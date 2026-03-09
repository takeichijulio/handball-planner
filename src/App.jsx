import { useState, useEffect, useRef } from "react";
import { C, btnBase } from "./theme.js";
import { Toast } from "./components/UI.jsx";
import EditorTab  from "./components/EditorTab.jsx";
import HistoryTab from "./components/HistoryTab.jsx";
import LibraryTab from "./components/LibraryTab.jsx";
import { DEFAULT_PLAN } from "./data/defaultPlan.js";
import { generatePDF }  from "./utils/generatePDF.js";

const STORAGE_KEY = "handball_history_v1";

export default function App() {
  const [tab,     setTab]     = useState("editor");
  const [plan,    setPlan]    = useState(() => JSON.parse(JSON.stringify(DEFAULT_PLAN)));
  const [history, setHistory] = useState([]);
  const [toast,   setToast]   = useState(null);

  // ── Load history from localStorage ────────────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch (_) {}
  }, []);

  // ── Toast helper ───────────────────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  // ── Actions ────────────────────────────────────────────────────────────────
  const handleSave = () => {
    const entry      = { ...plan, savedAt: new Date().toLocaleString("pt-BR") };
    const newHistory = [entry, ...history].slice(0, 50);
    setHistory(newHistory);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      showToast("Treino salvo com sucesso! 💾");
    } catch (_) {
      showToast("Erro ao salvar no histórico.", "error");
    }
  };

  const handleLoad = (p) => {
    setPlan(JSON.parse(JSON.stringify(p)));
    setTab("editor");
    showToast("Treino carregado no editor! ✏️");
  };

  const handleDelete = (i) => {
    const newH = history.filter((_, idx) => idx !== i);
    setHistory(newH);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newH)); } catch (_) {}
    showToast("Treino removido.");
  };

  const handleExport = () => {
    try {
      generatePDF(plan);
      showToast("PDF gerado e baixado! ⬇️");
    } catch (e) {
      showToast("Erro ao gerar PDF. Tente novamente.", "error");
    }
  };

  const handleNew = () => {
    setPlan(JSON.parse(JSON.stringify(DEFAULT_PLAN)));
    showToast("Novo plano criado!");
  };

  // ── Tab style ──────────────────────────────────────────────────────────────
  const tabStyle = (t) => ({
    padding: "10px 22px",
    cursor: "pointer",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: 14, letterSpacing: .8,
    textTransform: "uppercase",
    background: "none", border: "none",
    borderBottom: tab === t ? `3px solid ${C.accent}` : "3px solid transparent",
    color: tab === t ? C.white : "rgba(255,255,255,0.5)",
    transition: "color .2s, border-color .2s",
  });

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: "#eef1f6", minHeight: "100vh" }}>

      {/* ── Top Bar ─────────────────────────────────────────────────────────── */}
      <div style={{ background: C.navy, padding: "0 24px", display: "flex", alignItems: "center", gap: 0, boxShadow: "0 2px 12px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", marginRight: "auto" }}>
          <span style={{ fontSize: 24 }}>🤾</span>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 17, color: C.white, letterSpacing: 1 }}>
              HANDBALL PLANNER
            </div>
            <div style={{ fontSize: 10, color: C.accent, letterSpacing: .5 }}>
              Júlio Takeichi · Handebol Universitário · Rio de Janeiro
            </div>
          </div>
        </div>
        <nav style={{ display: "flex" }}>
          {[
            { key: "editor",  label: "✏️ Editor"    },
            { key: "history", label: "📂 Histórico" },
            { key: "library", label: "📚 Biblioteca" },
          ].map(({ key, label }) => (
            <button key={key} style={tabStyle(key)} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Toast ───────────────────────────────────────────────────────────── */}
      <Toast toast={toast} />

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "22px 16px" }}>
        {tab === "editor" && (
          <EditorTab
            plan={plan} setPlan={setPlan}
            onExport={handleExport} onSave={handleSave} onNew={handleNew}
          />
        )}
        {tab === "history" && (
          <HistoryTab
            history={history}
            onLoad={handleLoad}
            onDelete={handleDelete}
            onGeneratePDF={(p) => { generatePDF(p); showToast("PDF gerado! ⬇️"); }}
          />
        )}
        {tab === "library" && <LibraryTab />}
      </div>
    </div>
  );
}
