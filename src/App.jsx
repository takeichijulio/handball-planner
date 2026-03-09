import { useState, useEffect } from "react";
import { C, btnBase } from "./theme.js";
import { Toast } from "./components/UI.jsx";
import EditorTab   from "./components/EditorTab.jsx";
import HistoryTab  from "./components/HistoryTab.jsx";
import LibraryTab  from "./components/LibraryTab.jsx";
import ImportModal from "./components/ImportModal.jsx";
import { DEFAULT_PLAN }  from "./data/defaultPlan.js";
import { generatePDF }   from "./utils/generatePDF.js";

const STORAGE_KEY = "handball_history_v1";
const LIB_KEY     = "handball_user_library_v1";

export default function App() {
  const [tab,         setTab]         = useState("editor");
  const [plan,        setPlan]        = useState(() => JSON.parse(JSON.stringify(DEFAULT_PLAN)));
  const [history,     setHistory]     = useState([]);
  const [userLib,     setUserLib]     = useState({});
  const [toast,       setToast]       = useState(null);
  const [showImport,  setShowImport]  = useState(false);

  // Carrega historico e biblioteca do usuario
  useEffect(() => {
    try {
      const h = localStorage.getItem(STORAGE_KEY);
      if (h) setHistory(JSON.parse(h));
    } catch (_) {}
    try {
      const l = localStorage.getItem(LIB_KEY);
      if (l) setUserLib(JSON.parse(l));
    } catch (_) {}
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  // Salva treino no historico
  const handleSave = () => {
    const entry      = { ...plan, savedAt: new Date().toLocaleString("pt-BR") };
    const newHistory = [entry, ...history].slice(0, 50);
    setHistory(newHistory);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      showToast("Treino salvo com sucesso! 💾");
    } catch (_) {
      showToast("Erro ao salvar no historico.", "error");
    }
  };

  // Carrega treino do historico no editor
  const handleLoad = (p) => {
    setPlan(JSON.parse(JSON.stringify(p)));
    setTab("editor");
    showToast("Treino carregado no editor!");
  };

  // Importa treino via codigo JS colado
  const handleImport = (p) => {
    setPlan(JSON.parse(JSON.stringify(p)));
    setShowImport(false);
    setTab("editor");
    showToast("Treino importado e carregado!");
  };

  // Remove treino do historico
  const handleDelete = (i) => {
    const newH = history.filter((_, idx) => idx !== i);
    setHistory(newH);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newH)); } catch (_) {}
    showToast("Treino removido.");
  };

  // Gera PDF
  const handleExport = () => {
    try {
      generatePDF(plan);
      showToast("PDF gerado e baixado!");
    } catch (e) {
      showToast("Erro ao gerar PDF. Tente novamente.", "error");
    }
  };

  // Novo plano em branco
  const handleNew = () => {
    setPlan(JSON.parse(JSON.stringify(DEFAULT_PLAN)));
    showToast("Novo plano criado!");
  };

  // Adiciona exercicio do bloco na biblioteca do usuario (categoria correta)
  const handleAddToLibrary = (bloco, category) => {
    const entry = {
      titulo:  bloco.titulo,
      duracao: bloco.duracao,
      linhas:  bloco.linhas.map(l => [...l]),
    };
    const updated = { ...userLib };
    if (!updated[category]) updated[category] = [];
    // Evita duplicatas pelo titulo
    const exists = updated[category].some(e => e.titulo === entry.titulo);
    if (!exists) {
      updated[category] = [entry, ...updated[category]];
      setUserLib(updated);
      try { localStorage.setItem(LIB_KEY, JSON.stringify(updated)); } catch (_) {}
      showToast(`"${bloco.titulo}" adicionado a ${category}!`);
    } else {
      showToast(`Esse exercicio ja esta na biblioteca.`, "error");
    }
  };

  // Remove exercicio da biblioteca do usuario
  const handleDeleteFromLib = (category, idx) => {
    const updated = { ...userLib };
    updated[category] = updated[category].filter((_, i) => i !== idx);
    setUserLib(updated);
    try { localStorage.setItem(LIB_KEY, JSON.stringify(updated)); } catch (_) {}
    showToast("Exercicio removido da biblioteca.");
  };

  const tabStyle = (t) => ({
    padding: "10px 20px",
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

      {/* Top Bar */}
      <div style={{ background: C.navy, padding: "0 20px", display: "flex", alignItems: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.25)", flexWrap: "wrap", gap: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", marginRight: "auto" }}>
          <span style={{ fontSize: 24 }}>🤾</span>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 17, color: C.white, letterSpacing: 1 }}>
              HANDBALL PLANNER
            </div>
            <div style={{ fontSize: 10, color: C.accent, letterSpacing: .5 }}>
              Julio Takeichi · Handebol Universitario · Rio de Janeiro
            </div>
          </div>
        </div>

        {/* Botao importar */}
        <button
          onClick={() => setShowImport(true)}
          style={{ ...btnBase, background: C.accent, color: C.navy, fontSize: 12, padding: "7px 16px", marginRight: 16, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: .5 }}
        >
          IMPORTAR DO CLAUDE
        </button>

        <nav style={{ display: "flex" }}>
          {[
            { key: "editor",  label: "Editor"     },
            { key: "history", label: "Historico"  },
            { key: "library", label: "Biblioteca" },
          ].map(({ key, label }) => (
            <button key={key} style={tabStyle(key)} onClick={() => setTab(key)}>{label}</button>
          ))}
        </nav>
      </div>

      {/* Toast */}
      <Toast toast={toast} />

      {/* Import Modal */}
      {showImport && (
        <ImportModal onClose={() => setShowImport(false)} onLoad={handleImport} />
      )}

      {/* Conteudo */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "22px 16px" }}>
        {tab === "editor" && (
          <EditorTab
            plan={plan} setPlan={setPlan}
            onExport={handleExport}
            onSave={handleSave}
            onNew={handleNew}
            onImport={() => setShowImport(true)}
            onAddToLibrary={handleAddToLibrary}
          />
        )}
        {tab === "history" && (
          <HistoryTab
            history={history}
            onLoad={handleLoad}
            onDelete={handleDelete}
            onGeneratePDF={(p) => { generatePDF(p); showToast("PDF gerado!"); }}
          />
        )}
        {tab === "library" && (
          <LibraryTab
            userLib={userLib}
            onDeleteFromLib={handleDeleteFromLib}
          />
        )}
      </div>
    </div>
  );
}
