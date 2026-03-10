// ─────────────────────────────────────────────────────────────────────────────
//  GERADOR DE PDF — modelo visual aprovado
//  Correcoes v3:
//  - Label e texto sempre na mesma linha base
//  - Altura do bloco calculada antes de desenhar (sem sobrescrita)
//  - Separadores desenhados APOS calcular todas as alturas
//  - Sem quebras de pagina no meio de um bloco
// ─────────────────────────────────────────────────────────────────────────────

const NAVY   = [13,  27,  42];
const BLUE   = [27,  79,  138];
const ACCENT = [232, 160, 32];
const LGRAY  = [244, 247, 251];
const MGRAY  = [208, 216, 228];
const DARK   = [26,  26,  46];
const WHITE  = [255, 255, 255];
const TIP_BG = [255, 248, 237];
const FOCUS  = [184, 96,  10];
const GRAY_FT= [153, 153, 153];

const W      = 210;
const MARGIN = 18;
const CW     = W - 2 * MARGIN;

// Limpa emojis e chars fora do latin-1
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

function isFocus(label) {
  const c = clean(label).toLowerCase();
  return c.includes("foco:") || c.includes("atencao:");
}

// ─────────────────────────────────────────────────────────────────────────────
export function generatePDF(plan) {
  if (!window.jspdf) {
    alert("Aguarde — o gerador de PDF ainda esta carregando.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // ── Constantes de layout ──────────────────────────────────────────────────
  const LABEL_W  = 36;          // largura da coluna de label
  const TEXT_X   = MARGIN + LABEL_W + 4;  // x onde começa o texto
  const TEXT_W   = CW - LABEL_W - 12;    // largura disponivel para o texto
  const LH       = 5.0;         // altura por linha de texto (line height)
  const ROW_PAD  = 3.5;         // padding vertical acima/abaixo de cada row
  const BODY_PAD = 4;           // padding interno topo/base do corpo do bloco

  let y = 14;

  // ═══════════════════════════════════════════════════════════════════════════
  // CABECALHO
  // ═══════════════════════════════════════════════════════════════════════════
  doc.setFillColor(...NAVY);
  doc.roundedRect(MARGIN, y, CW, 13, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...WHITE);
  doc.text("PLANO DE TREINO", W / 2, y + 8.8, { align: "center" });
  y += 13;

  doc.setFillColor(...NAVY);
  doc.rect(MARGIN, y, CW, 8, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...ACCENT);
  doc.text(
    `${clean(plan.equipe)}  \xb7  ${clean(plan.tema)}`,
    W / 2, y + 5.5, { align: "center" }
  );
  y += 8;

  const mw = CW / 3;
  doc.setFillColor(...BLUE);
  doc.roundedRect(MARGIN, y, CW, 9, 2, 2, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...WHITE);
  doc.text(`Duracao: ${clean(plan.duracao)}`, MARGIN + mw * 0.5, y + 6, { align: "center" });
  doc.text(`Local: ${clean(plan.espaco)}`,    MARGIN + mw * 1.5, y + 6, { align: "center" });
  doc.text(`Data: ${clean(plan.data)}`,       MARGIN + mw * 2.5, y + 6, { align: "center" });
  y += 12;

  // ═══════════════════════════════════════════════════════════════════════════
  // OBJETIVOS
  // ═══════════════════════════════════════════════════════════════════════════
  doc.setFillColor(...LGRAY);
  doc.setDrawColor(...MGRAY);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, y, CW, 7, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BLUE);
  doc.text("OBJETIVOS DO TREINO", MARGIN + 8, y + 5);
  y += 7;

  // Pre-calcula linhas de cada objetivo
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const objItems = plan.objetivos.map(o => doc.splitTextToSize(`+  ${clean(o)}`, CW - 16));
  const objBodyH = objItems.reduce((a, lines) => a + lines.length * LH + ROW_PAD, 0) + BODY_PAD;

  doc.setFillColor(...WHITE);
  doc.setDrawColor(...MGRAY);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, y, CW, objBodyH, 0, 2, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...DARK);
  let oy = y + BODY_PAD + LH;
  objItems.forEach(lines => {
    doc.text(lines, MARGIN + 8, oy);
    oy += lines.length * LH + ROW_PAD;
  });
  y += objBodyH + 5;

  // ═══════════════════════════════════════════════════════════════════════════
  // BLOCOS
  // ═══════════════════════════════════════════════════════════════════════════
  plan.blocos.forEach((bloco) => {

    // 1. Pre-processa TODAS as linhas e calcula alturas ANTES de desenhar
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);

    const rows = bloco.linhas.map(([lbl, txt]) => {
      const label   = clean(lbl);
      const texto   = clean(txt);
      const wrapped = doc.splitTextToSize(texto, TEXT_W);
      const focus   = isFocus(lbl);
      // altura da row = espaco para as linhas de texto + padding acima e abaixo
      const rowH    = wrapped.length * LH + ROW_PAD * 2;
      return { label, texto, wrapped, focus, rowH };
    });

    const bodyH  = rows.reduce((a, r) => a + r.rowH, 0) + BODY_PAD;
    const totalH = 11 + bodyH + 3;   // header + body + gap

    // 2. Nova pagina se necessario
    if (y + totalH > 283) { doc.addPage(); y = 14; }

    // 3. Header do bloco
    doc.setFillColor(...LGRAY);
    doc.setDrawColor(...MGRAY);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, y, CW, 11, 2, 2, "FD");

    // Badge laranja
    doc.setFillColor(...ACCENT);
    doc.roundedRect(MARGIN + 3, y + 1.5, 8, 8, 1.5, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...WHITE);
    doc.text(clean(bloco.numero), MARGIN + 7, y + 7.2, { align: "center" });

    // Titulo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...NAVY);
    doc.text(
      doc.splitTextToSize(clean(bloco.titulo), CW - 52),
      MARGIN + 14, y + 7.2
    );

    // Duracao
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...ACCENT);
    doc.text(clean(bloco.duracao), MARGIN + CW - 3, y + 7.2, { align: "right" });

    // Linha azul separadora
    doc.setDrawColor(...BLUE);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, y + 11, MARGIN + CW, y + 11);
    y += 11;

    // 4. Fundo do corpo do bloco (altura ja conhecida)
    doc.setFillColor(...WHITE);
    doc.setDrawColor(...MGRAY);
    doc.setLineWidth(0.3);
    doc.rect(MARGIN, y, CW, bodyH, "FD");

    // 5. Desenha cada row com label e texto ALINHADOS na mesma baseline
    let ry = y + BODY_PAD + LH;   // baseline da primeira row

    rows.forEach(({ label, wrapped, focus, rowH }, i) => {

      // Label — bold azul — sempre na baseline da primeira linha do texto
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...BLUE);
      doc.text(label, MARGIN + 7, ry);

      // Texto — alinhado na mesma baseline que o label
      doc.setFont("helvetica", focus ? "bold" : "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...(focus ? FOCUS : DARK));
      doc.text(wrapped, TEXT_X, ry);

      // Separador fino entre rows (exceto apos a ultima)
      if (i < rows.length - 1) {
        const sepY = ry + (wrapped.length - 1) * LH + ROW_PAD + 1;
        doc.setDrawColor(...MGRAY);
        doc.setLineWidth(0.15);
        doc.line(MARGIN + 5, sepY, MARGIN + CW - 5, sepY);
      }

      ry += rowH;
    });

    y += bodyH + 3;
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // RESUMO
  // ═══════════════════════════════════════════════════════════════════════════
  if (y + 55 > 283) { doc.addPage(); y = 14; }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...NAVY);
  doc.text("RESUMO DO TREINO", MARGIN, y + 5);
  y += 9;

  const cleanResumo = plan.resumo.map(([b, d, t]) => [clean(b), clean(d), clean(t)]);

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
      0: { halign: "center", cellWidth: 18 },
      2: { halign: "center", cellWidth: 26 },
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
  // DICA TATICA
  // ═══════════════════════════════════════════════════════════════════════════
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const tipText    = clean(plan.dicaTatica);
  const tipWrapped = doc.splitTextToSize(tipText, CW - 22);
  const tipH       = tipWrapped.length * LH + 22;

  if (y + tipH > 283) { doc.addPage(); y = 14; }

  doc.setFillColor(...TIP_BG);
  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.5);
  doc.roundedRect(MARGIN, y, CW, tipH, 2, 2, "FD");

  doc.setFillColor(...ACCENT);
  doc.rect(MARGIN, y, 2.5, tipH, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...ACCENT);
  doc.text("DICA TATICA DO DIA", MARGIN + 8, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...DARK);
  doc.text(tipWrapped, MARGIN + 8, y + 14);

  y += tipH + 5;

  // ═══════════════════════════════════════════════════════════════════════════
  // RODAPE
  // ═══════════════════════════════════════════════════════════════════════════
  if (y + 8 > 290) { doc.addPage(); y = 280; }

  doc.setDrawColor(...MGRAY);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, MARGIN + CW, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...GRAY_FT);
  doc.text(
    "Julio Takeichi  \xb7  Planejamento de Treinos - Handebol Universitario - Rio de Janeiro",
    W / 2, y + 5, { align: "center" }
  );

  // Salvar
  const filename = (plan.nomeArquivo || "treino_handebol")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_\-]/g, "");
  doc.save(`${filename}.pdf`);
}
