// ─────────────────────────────────────────────────────────────────────────────
//  GERADOR DE PDF — modelo visual aprovado (treino_handebol_masculino_humanas)
//  - Sem emojis (Helvetica nao suporta — removidos via clean())
//  - Alturas calculadas dinamicamente por splitTextToSize (sem quebras)
//  - Layout identico ao PDF de referencia gerado em Python/ReportLab
// ─────────────────────────────────────────────────────────────────────────────

const NAVY    = [13,  27,  42];
const BLUE    = [27,  79,  138];
const ACCENT  = [232, 160, 32];
const LGRAY   = [244, 247, 251];
const MGRAY   = [208, 216, 228];
const DARK    = [26,  26,  46];
const WHITE   = [255, 255, 255];
const TIP_BG  = [255, 248, 237];
const FOCUS   = [184, 96,  10];
const GRAY_FT = [153, 153, 153];

const W      = 210;          // largura A4 em mm
const MARGIN = 18;           // margem lateral
const CW     = W - 2*MARGIN; // largura util

// ── Limpa emojis e chars fora do latin-1 ────────────────────────────────────
function clean(str = "") {
  return String(str)
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, "")
    .replace(/[\u{2600}-\u{27BF}]/gu,   "")
    .replace(/[\u{2B00}-\u{2BFF}]/gu,   "")
    .replace(/[\u{FE00}-\u{FEFF}]/gu,   "")
    .replace(/[^\x00-\xFF]/g,           "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// ── Label recebe destaque laranja? ───────────────────────────────────────────
function isFocus(label) {
  const c = clean(label).toLowerCase();
  return c.includes("foco:") || c.includes("atencao:");
}

// ── Desenha retangulo com cantos arredondados preenchido ─────────────────────
function roundRect(doc, x, y, w, h, r, fillColor, strokeColor) {
  doc.setFillColor(...fillColor);
  if (strokeColor) {
    doc.setDrawColor(...strokeColor);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, w, h, r, r, "FD");
  } else {
    doc.roundedRect(x, y, w, h, r, r, "F");
  }
}

// ─────────────────────────────────────────────────────────────────────────────
export function generatePDF(plan) {
  if (!window.jspdf) {
    alert("Aguarde — o gerador de PDF ainda esta carregando. Tente novamente.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // Constantes de layout (espelham o Python)
  const LABEL_W  = 36;           // col de label dentro do bloco
  const BODY_W   = CW - LABEL_W - 16; // col de texto
  const LH       = 5.2;          // altura por linha de texto
  const PAD_V    = 4;            // padding vertical interno
  const BLOCK_GAP = 3;           // espaco entre blocos

  let y = 14;

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. CABECALHO
  // ═══════════════════════════════════════════════════════════════════════════

  // Faixa navy — "PLANO DE TREINO"
  roundRect(doc, MARGIN, y, CW, 13, 3, NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...WHITE);
  doc.text("PLANO DE TREINO", W/2, y+8.8, { align:"center" });
  y += 13;

  // Faixa navy — equipe + tema
  doc.setFillColor(...NAVY);
  doc.rect(MARGIN, y, CW, 8, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...ACCENT);
  doc.text(
    `${clean(plan.equipe)}  \xb7  ${clean(plan.tema)}`,
    W/2, y+5.5, { align:"center" }
  );
  y += 8;

  // Faixa azul — duracao / local / data
  roundRect(doc, MARGIN, y, CW, 9, 2, BLUE);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...WHITE);
  const mw = CW/3;
  doc.text(`Duracao: ${clean(plan.duracao)}`, MARGIN+mw*0.5, y+6, { align:"center" });
  doc.text(`Local: ${clean(plan.espaco)}`,    MARGIN+mw*1.5, y+6, { align:"center" });
  doc.text(`Data: ${clean(plan.data)}`,       MARGIN+mw*2.5, y+6, { align:"center" });
  y += 12;

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. OBJETIVOS
  // ═══════════════════════════════════════════════════════════════════════════

  // Header objetivos
  roundRect(doc, MARGIN, y, CW, 7, 2, LGRAY, MGRAY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BLUE);
  doc.text("OBJETIVOS DO TREINO", MARGIN+8, y+5);
  y += 7;

  // Pre-calcula linhas para altura exata
  doc.setFontSize(8.5);
  const objWrapped = plan.objetivos.map(o =>
    doc.splitTextToSize(`+  ${clean(o)}`, CW-16)
  );
  const objH = objWrapped.reduce((a,l) => a + l.length*LH, 0) + PAD_V*2 + 2;

  roundRect(doc, MARGIN, y, CW, objH, 0, WHITE, MGRAY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...DARK);

  let oy = y + PAD_V + LH;
  objWrapped.forEach(lines => {
    doc.text(lines, MARGIN+8, oy);
    oy += lines.length * LH + 1;
  });
  y += objH + 5;

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. BLOCOS
  // ═══════════════════════════════════════════════════════════════════════════
  plan.blocos.forEach((bloco) => {

    // Pre-processa cada linha do bloco
    doc.setFontSize(8.5);
    const linhas = bloco.linhas.map(([lbl, txt]) => {
      const wrapped = doc.splitTextToSize(clean(txt), BODY_W);
      return {
        label:   clean(lbl),
        wrapped,
        focus:   isFocus(lbl),
        rowH:    wrapped.length * LH + PAD_V,
      };
    });

    const bodyH  = linhas.reduce((a,l) => a + l.rowH, 0) + PAD_V;
    const totalH = 11 + bodyH + BLOCK_GAP;

    // Nova pagina se nao couber
    if (y + totalH > 283) { doc.addPage(); y = 14; }

    // ── Header do bloco ───────────────────────────────────────────────────
    roundRect(doc, MARGIN, y, CW, 11, 2, LGRAY, MGRAY);

    // Badge laranja com numero
    roundRect(doc, MARGIN+3, y+1.5, 8, 8, 1.5, ACCENT);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...WHITE);
    doc.text(clean(bloco.numero), MARGIN+7, y+7.2, { align:"center" });

    // Titulo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...NAVY);
    const titleW = CW - 52;
    const titleLines = doc.splitTextToSize(clean(bloco.titulo), titleW);
    doc.text(titleLines, MARGIN+14, y+7.2);

    // Duracao alinhada a direita
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...ACCENT);
    doc.text(clean(bloco.duracao), MARGIN+CW-3, y+7.2, { align:"right" });

    // Linha azul separadora
    doc.setDrawColor(...BLUE);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, y+11, MARGIN+CW, y+11);
    y += 11;

    // ── Corpo do bloco ────────────────────────────────────────────────────
    doc.setFillColor(...WHITE);
    doc.setDrawColor(...MGRAY);
    doc.setLineWidth(0.3);
    doc.rect(MARGIN, y, CW, bodyH, "FD");

    let ly = y + PAD_V + LH - 1;
    linhas.forEach(({ label, wrapped, focus, rowH }, i) => {

      // Label bold azul
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...BLUE);
      doc.text(label, MARGIN+7, ly);

      // Texto — laranja se foco, escuro caso contrario
      doc.setFont("helvetica", focus ? "bold" : "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...(focus ? FOCUS : DARK));
      doc.text(wrapped, MARGIN+LABEL_W, ly);

      ly += rowH;

      // Separador fino entre linhas (exceto ultima)
      if (i < linhas.length-1) {
        doc.setDrawColor(...MGRAY);
        doc.setLineWidth(0.15);
        doc.line(MARGIN+5, ly - PAD_V/2, MARGIN+CW-5, ly - PAD_V/2);
      }
    });

    y += bodyH + BLOCK_GAP;
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. RESUMO
  // ═══════════════════════════════════════════════════════════════════════════
  if (y + 55 > 283) { doc.addPage(); y = 14; }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...NAVY);
  doc.text("RESUMO DO TREINO", MARGIN, y+5);
  y += 9;

  const cleanResumo = plan.resumo.map(([b,d,t]) => [clean(b), clean(d), clean(t)]);

  doc.autoTable({
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    head: [["BLOCO", "CONTEUDO", "DURACAO"]],
    body: [...cleanResumo, ["TOTAL", "", clean(plan.totalDuracao)]],
    styles: {
      fontSize: 8, cellPadding: 3,
      textColor: DARK, font: "helvetica", overflow: "linebreak",
    },
    headStyles: {
      fillColor: NAVY, textColor: 255,
      fontStyle: "bold", halign: "center",
    },
    columnStyles: {
      0: { halign:"center", cellWidth:18 },
      2: { halign:"center", cellWidth:26 },
    },
    alternateRowStyles: { fillColor: LGRAY },
    didParseCell(d) {
      if (d.row.index === plan.resumo.length) {
        d.cell.styles.fillColor = BLUE;
        d.cell.styles.textColor = 255;
        d.cell.styles.fontStyle = "bold";
        d.cell.styles.halign    = "center";
      }
    },
  });

  y = doc.lastAutoTable.finalY + 5;

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. DICA TATICA
  // ═══════════════════════════════════════════════════════════════════════════
  doc.setFontSize(8.5);
  const tipText    = clean(plan.dicaTatica);
  const tipWrapped = doc.splitTextToSize(tipText, CW - 22);
  const tipH       = tipWrapped.length * LH + 20;

  if (y + tipH > 283) { doc.addPage(); y = 14; }

  // Fundo + borda laranja
  doc.setFillColor(...TIP_BG);
  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.5);
  doc.roundedRect(MARGIN, y, CW, tipH, 2, 2, "FD");

  // Barra esquerda laranja solida
  doc.setFillColor(...ACCENT);
  doc.rect(MARGIN, y, 2.5, tipH, "F");

  // Titulo
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...ACCENT);
  doc.text("DICA TATICA DO DIA", MARGIN+8, y+7);

  // Texto
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...DARK);
  doc.text(tipWrapped, MARGIN+8, y+14);

  y += tipH + 5;

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. RODAPE
  // ═══════════════════════════════════════════════════════════════════════════
  if (y + 8 > 290) { doc.addPage(); y = 280; }

  doc.setDrawColor(...MGRAY);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, MARGIN+CW, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...GRAY_FT);
  doc.text(
    "Julio Takeichi  \xb7  Planejamento de Treinos - Handebol Universitario - Rio de Janeiro",
    W/2, y+5, { align:"center" }
  );

  // ── Salvar ──────────────────────────────────────────────────────────────
  const filename = (plan.nomeArquivo || "treino_handebol")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_\-]/g, "");
  doc.save(`${filename}.pdf`);
}
