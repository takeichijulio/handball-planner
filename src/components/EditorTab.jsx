// ─────────────────────────────────────────────────────────────────────────────
//  EDITOR TAB
//  Aba principal do editor de treinos.
//  Organizada em seções: Meta, Objetivos, Blocos, Resumo, Dica.
// ─────────────────────────────────────────────────────────────────────────────

import { C, btnBase, btnSm, inputBase } from "../theme.js";
import { SectionTitle, Input, ActionBar } from "./UI.jsx";
import BlockCard from "./BlockCard.jsx";

export default function EditorTab({ plan, setPlan, onExport, onSave, onNew }) {

  // ── Helpers ────────────────────────────────────────────────────────────────
  const updateMeta    = (field, val) => setPlan(p => ({ ...p, [field]: val }));
  const updateObj     = (i, val)     => setPlan(p => { const o = [...p.objetivos]; o[i] = val; return { ...p, objetivos: o }; });
  const addObj        = ()           => setPlan(p => ({ ...p, objetivos: [...p.objetivos, ""] }));
  const removeObj     = (i)          => setPlan(p => ({ ...p, objetivos: p.objetivos.filter((_, j) => j !== i) }));
  const updateBloco   = (i, b)       => setPlan(p => { const bs = [...p.blocos]; bs[i] = b; return { ...p, blocos: bs }; });
  const addBloco      = ()           => setPlan(p => ({
    ...p,
    blocos: [...p.blocos, { numero: String(p.blocos.length + 1), emoji: "🔹", titulo: "NOVO BLOCO", duracao: "10 min", linhas: [["Organização:", ""], ["🎯 Foco:", ""]] }],
  }));
  const removeBloco   = (i)          => setPlan(p => ({ ...p, blocos: p.blocos.filter((_, j) => j !== i) }));
  const moveBlocoUp   = (i)          => { if (i === 0) return; setPlan(p => { const bs = [...p.blocos]; [bs[i - 1], bs[i]] = [bs[i], bs[i - 1]]; return { ...p, blocos: bs }; }); };
  const moveBlocoDown = (i)          => setPlan(p => { const bs = [...p.blocos]; if (i >= bs.length - 1) return p; [bs[i], bs[i + 1]] = [bs[i + 1], bs[i]]; return { ...p, blocos: bs }; });
  const updateResumo  = (i, col, val)=> setPlan(p => { const r = [...p.resumo]; r[i] = [...r[i]]; r[i][col] = val; return { ...p, resumo: r }; });
  const addResumo     = ()           => setPlan(p => ({ ...p, resumo: [...p.resumo, ["🔹", "", ""]] }));
  const removeResumo  = (i)          => setPlan(p => ({ ...p, resumo: p.resumo.filter((_, j) => j !== i) }));

  const card = (children) => ({
    background: C.white, borderRadius: 10, padding: 16, marginBottom: 12, border: `1px solid ${C.midGray}`,
  });

  return (
    <div>
      <ActionBar onExport={onExport} onSave={onSave} onNew={onNew} />

      {/* ── Meta ─────────────────────────────────────────────────────────── */}
      <div style={card()}>
        <SectionTitle icon="📋">Informações do Treino</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <Input label="Equipe"  value={plan.equipe}  onChange={v => updateMeta("equipe", v)} />
          <Input label="Duração" value={plan.duracao} onChange={v => updateMeta("duracao", v)} />
          <Input label="Data"    value={plan.data}    onChange={v => updateMeta("data", v)} />
          <Input label="Espaço"  value={plan.espaco}  onChange={v => updateMeta("espaco", v)} />
          <div style={{ gridColumn: "2 / 4" }}>
            <Input label="Tema tático" value={plan.tema} onChange={v => updateMeta("tema", v)} />
          </div>
        </div>
        <div style={{ marginTop: 4 }}>
          <Input label="Nome do arquivo PDF" value={plan.nomeArquivo} onChange={v => updateMeta("nomeArquivo", v)} placeholder="treino_handebol" />
        </div>
      </div>

      {/* ── Objetivos ────────────────────────────────────────────────────── */}
      <div style={card()}>
        <SectionTitle icon="🎯">Objetivos do Treino</SectionTitle>
        {plan.objetivos.map((obj, i) => (
          <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }}>
            <span style={{ color: C.blue, fontWeight: 700, fontSize: 15, flexShrink: 0 }}>◆</span>
            <input value={obj} onChange={e => updateObj(i, e.target.value)} style={{ ...inputBase, flex: 1, fontSize: 13 }} />
            <button onClick={() => removeObj(i)} style={btnSm(C.danger)}>✕</button>
          </div>
        ))}
        <button onClick={addObj} style={{ ...btnBase, background: C.lightBg, color: C.blue, border: `1px dashed ${C.blue}`, fontSize: 11, marginTop: 4 }}>
          + Adicionar objetivo
        </button>
      </div>

      {/* ── Blocos ───────────────────────────────────────────────────────── */}
      <div style={card()}>
        <SectionTitle icon="📦">Blocos de Exercício</SectionTitle>
        {plan.blocos.map((b, i) => (
          <BlockCard
            key={i} bloco={b} idx={i}
            onChange={updateBloco} onRemove={removeBloco}
            onMoveUp={moveBlocoUp} onMoveDown={moveBlocoDown}
            isFirst={i === 0} isLast={i === plan.blocos.length - 1}
          />
        ))}
        <button onClick={addBloco} style={{ ...btnBase, background: C.lightBg, color: C.blue, border: `1px dashed ${C.blue}`, width: "100%", marginTop: 4, padding: "9px" }}>
          + Adicionar bloco
        </button>
      </div>

      {/* ── Resumo ───────────────────────────────────────────────────────── */}
      <div style={card()}>
        <SectionTitle icon="📊">Tabela de Resumo</SectionTitle>

        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "55px 1fr 90px 28px", gap: 6, marginBottom: 4 }}>
          {["Ícone", "Descrição", "Duração", ""].map((h, i) => (
            <div key={i} style={{ fontSize: 10, fontWeight: 700, color: C.blue, textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>

        {plan.resumo.map(([e, d, t], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "55px 1fr 90px 28px", gap: 6, marginBottom: 5 }}>
            <input value={e} onChange={ev => updateResumo(i, 0, ev.target.value)} style={{ ...inputBase, textAlign: "center", fontSize: 13 }} />
            <input value={d} onChange={ev => updateResumo(i, 1, ev.target.value)} style={{ ...inputBase, fontSize: 13 }} />
            <input value={t} onChange={ev => updateResumo(i, 2, ev.target.value)} style={{ ...inputBase, textAlign: "center", fontSize: 13 }} />
            <button onClick={() => removeResumo(i)} style={{ ...btnSm(C.danger), alignSelf: "center" }}>✕</button>
          </div>
        ))}

        <div style={{ display: "flex", gap: 12, marginTop: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={addResumo} style={{ ...btnBase, background: C.lightBg, color: C.blue, border: `1px dashed ${C.blue}`, fontSize: 11 }}>
            + Linha
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.blue }}>TOTAL:</span>
            <input value={plan.totalDuracao} onChange={e => updateMeta("totalDuracao", e.target.value)}
              style={{ ...inputBase, width: 90, textAlign: "center", fontSize: 13 }} />
          </div>
        </div>
      </div>

      {/* ── Dica Tática ──────────────────────────────────────────────────── */}
      <div style={{ background: C.tipBg, borderRadius: 10, padding: 16, marginBottom: 20, border: `1.5px solid ${C.accent}`, borderLeft: `4px solid ${C.accent}` }}>
        <SectionTitle icon="💡">Dica Tática do Dia</SectionTitle>
        <textarea
          value={plan.dicaTatica}
          onChange={e => updateMeta("dicaTatica", e.target.value)}
          rows={3}
          style={{ ...inputBase, width: "100%", background: "#fff8ed", fontSize: 13 }}
        />
      </div>

      {/* ── Bottom actions ────────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingBottom: 32 }}>
        <button onClick={onExport} style={{ ...btnBase, background: C.accent, color: C.navy, fontSize: 13, padding: "10px 24px" }}>
          ⬇️ Gerar e Baixar PDF
        </button>
        <button onClick={onSave} style={{ ...btnBase, fontSize: 13, padding: "10px 24px" }}>
          💾 Salvar no Histórico
        </button>
      </div>
    </div>
  );
}
