// ─────────────────────────────────────────────────────────────────────────────
//  GERADOR DE PDF
//  Toda a lógica de geração do PDF está aqui.
//  Emojis são removidos do PDF (Helvetica não suporta) — substituídos por
//  elementos visuais e texto puro. Emojis ficam apenas na interface do app.
// ─────────────────────────────────────────────────────────────────────────────

const NAVY_RGB   = [13,  27,  42];
const BLUE_RGB   = [27,  79,  138];
const ACCENT_RGB = [232, 160, 32];
const LGRAY_RGB  = [244, 247, 251];
const MGRAY_RGB  = [208, 216, 228];
const TEXT_RGB   = [26,  26,  46];
const WHITE_RGB  = [255, 255, 255];
const TIP_RGB    = [255, 248, 237];
const FOCUS_RGB  = [184, 96,  10];

const W      = 210;
const MARGIN = 18;
const CW     = W - 2 * MARGIN;

// Remove todos os emojis e caracteres não-latin do texto
function clean(str = "") {
  return str
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, "")   // emojis suplementares
    .replace(/[\u{2600}-\u{27BF}]/gu, "")      // símbolos miscelâneos
    .replace(/[\u{2B00}-\u{2BFF}]/gu, "")      // setas e símbolos
    .replace(/[^\x00-\xFF]/g, "")              // qualquer outro não-latin
    .replace(/\s{2,}/g, " ")                   // espaços duplos
    .trim();
}

// Labels com esses prefixos (após limpar emojis) são destacados em laranja
const HIGHLIGHT_LABELS = ["Foco:", "foco:"];

function isHighlight(label) {
  const c = clean(label).trim();
  return HIGHLIGHT_LABELS.some(h => c.endsWith(h));
}

export function generatePDF(plan) {
  if (!window.jspdf) {
    alert("Aguarde — o gerador de PDF ainda está carregando. Tente novamente em instantes.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  let y = 14;

  // ── Cabeçalho ──────────────────────────────────────────────────────────────
  doc.setFillColor(...NAVY_RGB);
  doc.roundedRect(MARGIN, y, CW, 14, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...WHITE_RGB);
  doc.text("PLANO DE TREINO", W / 2, y + 9.5, { align: "center" });
  y += 14;

  doc.setFillColor(...NAVY_RGB);
  doc.rect(MARGIN, y, CW, 8, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...ACCENT_RGB);
  doc.text(`${clean(plan.equipe)}  |  ${clean(plan.tema)}`, W / 2, y + 5.5, { align: "center" });
  y += 8;

  const mw = CW / 3;
  doc.setFillColor(...BLUE_RGB);
  doc.roundedRect(MARGIN, y, CW, 10, 2, 2, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...WHITE_RGB);
  doc.text(`Duracao: ${clean(plan.duracao)}`, MARGIN + mw * 0.5, y + 6.5, { align: "center" });
  doc.text(`Local: ${clean(plan.espaco)}`,    MARGIN + mw * 1.5, y + 6.5, { align: "center" });
  doc.text(`Data: ${clean(plan.data)}`,       MARGIN + mw * 2.5, y + 6.5, { align: "center" });
  y += 13;

  // ── Objetivos ──────────────────────────────────────────────────────────────
  doc.setFillColor(...LGRAY_RGB);
  doc.setDrawColor(...MGRAY_RGB);
  doc.roundedRect(MARGIN, y, CW, 7, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BLUE_RGB);
  doc.text("OBJETIVOS DO TREINO", MARGIN + 8, y + 5);
  y += 7;

  const objH = plan.objetivos.length * 6.5 + 4;
  doc.setFillColor(...WHITE_RGB);
  doc.setDrawColor(...MGRAY_RGB);
  doc.roundedRect(MARGIN, y, CW, objH, 0, 2, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...TEXT_RGB);
  plan.objetivos.forEach((obj, i) => {
    doc.text(`+  ${clean(obj)}`, MARGIN + 8, y + 5 + i * 6.5);
  });
  y += objH + 5;

  // ── Blocos de exercício ────────────────────────────────────────────────────
  plan.blocos.forEach((bloco) => {
    const LINE_H = 7;

    // Calcular altura real de cada linha (pode quebrar em múltiplas linhas)
    const cleanedLinhas = bloco.linhas.map(([label, texto]) => ({
      label: clean(label),
      texto: clean(texto),
      hl:    isHighlight(label),
    }));

    // Pré-calcular quantas linhas de texto cada item vai ocupar
    const linhaHeights = cleanedLinhas.map(({ texto }) => {
      const wrapped = doc.splitTextToSize(texto, CW - 50);
      return Math.max(1, wrapped.length) * LINE_H;
    });
    const bodyH  = linhaHeights.reduce((a, b) => a + b, 0) + 8;
    const totalH = 12 + bodyH;

    if (y + totalH > 282) { doc.addPage(); y = 14; }

    // Header do bloco
    doc.setFillColor(...LGRAY_RGB);
    doc.setDrawColor(...MGRAY_RGB);
    doc.roundedRect(MARGIN, y, CW, 12, 2, 2, "FD");

    // Badge número
    doc.setFillColor(...ACCENT_RGB);
    doc.roundedRect(MARGIN + 4, y + 2, 9, 8, 1.5, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...WHITE_RGB);
    doc.text(clean(bloco.numero), MARGIN + 8.5, y + 7.5, { align: "center" });

    // Título (sem emoji)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...NAVY_RGB);
    const titleText = doc.splitTextToSize(clean(bloco.titulo), CW - 50);
    doc.text(titleText, MARGIN + 17, y + 7.5);

    // Duração
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...ACCENT_RGB);
    doc.text(clean(bloco.duracao), MARGIN + CW - 4, y + 7.5, { align: "right" });

    doc.setDrawColor(...BLUE_RGB);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, y + 12, MARGIN + CW, y + 12);
    y += 12;

    // Corpo do bloco
    doc.setFillColor(...WHITE_RGB);
    doc.setDrawColor(...MGRAY_RGB);
    doc.rect(MARGIN, y, CW, bodyH, "FD");

    let lineY = y + 6;
    cleanedLinhas.forEach(({ label, texto, hl }, i) => {
      // Label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(...BLUE_RGB);
      doc.text(label, MARGIN + 8, lineY);

      // Texto com wrap
      doc.setFont("helvetica", hl ? "bold" : "normal");
      doc.setFontSize(8);
      doc.setTextColor(...(hl ? FOCUS_RGB : TEXT_RGB));
      const wrapped = doc.splitTextToSize(texto, CW - 50);
      doc.text(wrapped, MARGIN + 38, lineY);

      lineY += Math.max(1, wrapped.length) * LINE_H;

      // Separador leve entre linhas (exceto última)
      if (i < cleanedLinhas.length - 1) {
        doc.setDrawColor(...MGRAY_RGB);
        doc.setLineWidth(0.2);
        doc.line(MARGIN + 6, lineY - 1.5, MARGIN + CW - 6, lineY - 1.5);
      }
    });

    y += bodyH + 4;
  });

  // ── Tabela de Resumo ───────────────────────────────────────────────────────
  if (y + 60 > 282) { doc.addPage(); y = 14; }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...NAVY_RGB);
  doc.text("RESUMO DO TREINO", MARGIN, y + 5);
  y += 9;

  // Limpar emojis das linhas do resumo
  const cleanedResumo = plan.resumo.map(([bloco, desc, dur]) => [
    clean(bloco), clean(desc), clean(dur)
  ]);

  doc.autoTable({
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    head: [["BLOCO", "CONTEUDO", "DURACAO"]],
    body: [
      ...cleanedResumo,
      ["TOTAL", "", clean(plan.totalDuracao)],
    ],
    styles: {
      fontSize: 8,
      cellPadding: 3,
      textColor: TEXT_RGB,
      font: "helvetica",
    },
    headStyles: {
      fillColor: NAVY_RGB,
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 18 },
      2: { halign: "center", cellWidth: 26 },
    },
    alternateRowStyles: { fillColor: LGRAY_RGB },
    didParseCell(d) {
      if (d.row.index === plan.resumo.length) {
        d.cell.styles.fillColor  = BLUE_RGB;
        d.cell.styles.textColor  = 255;
        d.cell.styles.fontStyle  = "bold";
        d.cell.styles.halign     = "center";
      }
    },
  });

  y = doc.lastAutoTable.finalY + 6;

  // ── Dica Tática ────────────────────────────────────────────────────────────
  const tipText  = clean(plan.dicaTatica);
  const tipLines = doc.splitTextToSize(tipText, CW - 18);
  const tipH     = Math.max(26, tipLines.length * 5.5 + 16);

  if (y + tipH > 282) { doc.addPage(); y = 14; }

  doc.setFillColor(...TIP_RGB);
  doc.setDrawColor(...ACCENT_RGB);
  doc.setLineWidth(0.7);
  doc.roundedRect(MARGIN, y, CW, tipH, 2, 2, "FD");
  doc.setLineWidth(2.5);
  doc.setDrawColor(...ACCENT_RGB);
  doc.line(MARGIN + 0.3, y, MARGIN + 0.3, y + tipH);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...ACCENT_RGB);
  doc.text("DICA TATICA DO DIA", MARGIN + 8, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_RGB);
  doc.text(tipLines, MARGIN + 8, y + 14);
  y += tipH + 4;

  // ── Rodapé ─────────────────────────────────────────────────────────────────
  doc.setDrawColor(...MGRAY_RGB);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, MARGIN + CW, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(160, 160, 160);
  doc.text(
    "Julio Takeichi  |  Planejamento de Treinos - Handebol Universitario - Rio de Janeiro",
    W / 2, y + 5, { align: "center" }
  );

  // ── Salvar ─────────────────────────────────────────────────────────────────
  const filename = (plan.nomeArquivo || "treino_handebol")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_\-]/g, "");
  doc.save(`${filename}.pdf`);
}
