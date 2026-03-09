// ─────────────────────────────────────────────────────────────────────────────
//  GERADOR DE PDF
//  Toda a lógica de geração do PDF está aqui.
//  Para ajustar layout, cores ou fontes do PDF, edite apenas este arquivo.
//
//  Depende de jsPDF + jsPDF-AutoTable carregados via CDN no index.html
// ─────────────────────────────────────────────────────────────────────────────

const NAVY_RGB   = [13,  27,  42];
const BLUE_RGB   = [27,  79,  138];
const ACCENT_RGB = [232, 160, 32];
const LGRAY_RGB  = [244, 247, 251];
const MGRAY_RGB  = [208, 216, 228];
const TEXT_RGB   = [26,  26,  46];
const WHITE_RGB  = [255, 255, 255];
const TIP_RGB    = [255, 248, 237];

const W      = 210;
const MARGIN = 18;
const CW     = W - 2 * MARGIN;

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
  doc.text("🤾 PLANO DE TREINO", W / 2, y + 9.5, { align: "center" });
  y += 14;

  doc.setFillColor(...NAVY_RGB);
  doc.rect(MARGIN, y, CW, 8, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...ACCENT_RGB);
  doc.text(`${plan.equipe}  ·  ${plan.tema}`, W / 2, y + 5.5, { align: "center" });
  y += 8;

  const mw = CW / 3;
  doc.setFillColor(...BLUE_RGB);
  doc.roundedRect(MARGIN, y, CW, 10, 2, 2, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...WHITE_RGB);
  doc.text(`⏱ ${plan.duracao}`, MARGIN + mw * 0.5, y + 6.5, { align: "center" });
  doc.text(`📍 ${plan.espaco}`,  MARGIN + mw * 1.5, y + 6.5, { align: "center" });
  doc.text(`📅 ${plan.data}`,    MARGIN + mw * 2.5, y + 6.5, { align: "center" });
  y += 13;

  // ── Objetivos ──────────────────────────────────────────────────────────────
  doc.setFillColor(...LGRAY_RGB);
  doc.setDrawColor(...MGRAY_RGB);
  doc.roundedRect(MARGIN, y, CW, 7, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BLUE_RGB);
  doc.text("🎯  OBJETIVOS DO TREINO", MARGIN + 8, y + 5);
  y += 7;

  const objH = plan.objetivos.length * 6.5 + 4;
  doc.setFillColor(...WHITE_RGB);
  doc.setDrawColor(...MGRAY_RGB);
  doc.roundedRect(MARGIN, y, CW, objH, 0, 2, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...TEXT_RGB);
  plan.objetivos.forEach((obj, i) => {
    doc.text(`◆  ${obj}`, MARGIN + 8, y + 5 + i * 6.5);
  });
  y += objH + 5;

  // ── Blocos de exercício ────────────────────────────────────────────────────
  const HIGHLIGHT_PREFIXES = ["🎯", "⚡", "💡"];

  plan.blocos.forEach((bloco) => {
    const LINE_H = 6.8;
    const bodyH  = bloco.linhas.length * LINE_H + 6;
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
    doc.text(bloco.numero, MARGIN + 8.5, y + 7.5, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...NAVY_RGB);
    doc.text(`${bloco.emoji}  ${bloco.titulo}`, MARGIN + 16, y + 7.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...ACCENT_RGB);
    doc.text(`⏱ ${bloco.duracao}`, MARGIN + CW - 4, y + 7.5, { align: "right" });

    doc.setDrawColor(...BLUE_RGB);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, y + 12, MARGIN + CW, y + 12);
    y += 12;

    // Corpo do bloco
    doc.setFillColor(...WHITE_RGB);
    doc.setDrawColor(...MGRAY_RGB);
    doc.rect(MARGIN, y, CW, bodyH, "FD");

    bloco.linhas.forEach(([label, texto], i) => {
      const ly         = y + 5 + i * LINE_H;
      const isHighlight = HIGHLIGHT_PREFIXES.some(p => label.startsWith(p));

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(...BLUE_RGB);
      doc.text(label, MARGIN + 8, ly);

      doc.setFont("helvetica", isHighlight ? "bold" : "normal");
      doc.setFontSize(8);
      doc.setTextColor(...(isHighlight ? [184, 96, 10] : TEXT_RGB));

      const lines = doc.splitTextToSize(texto, CW - 46);
      doc.text(lines, MARGIN + 37, ly);
    });

    y += bodyH + 4;
  });

  // ── Tabela de Resumo ───────────────────────────────────────────────────────
  if (y + 60 > 282) { doc.addPage(); y = 14; }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...NAVY_RGB);
  doc.text("📋  RESUMO DO TREINO", MARGIN, y + 5);
  y += 9;

  doc.autoTable({
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    head: [["BLOCO", "CONTEÚDO", "DURAÇÃO"]],
    body: [
      ...plan.resumo,
      ["TOTAL", "", plan.totalDuracao],
    ],
    styles: {
      fontSize: 8,
      cellPadding: 3,
      textColor: TEXT_RGB,
    },
    headStyles: {
      fillColor: NAVY_RGB,
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 16 },
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
  if (y + 30 > 282) { doc.addPage(); y = 14; }

  doc.setFillColor(...TIP_RGB);
  doc.setDrawColor(...ACCENT_RGB);
  doc.setLineWidth(0.7);
  doc.roundedRect(MARGIN, y, CW, 28, 2, 2, "FD");
  doc.setLineWidth(2.5);
  doc.line(MARGIN + 0.3, y, MARGIN + 0.3, y + 28);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...ACCENT_RGB);
  doc.text("💡  DICA TÁTICA DO DIA", MARGIN + 8, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_RGB);
  const tipLines = doc.splitTextToSize(plan.dicaTatica, CW - 16);
  doc.text(tipLines, MARGIN + 8, y + 14);
  y += 32;

  // ── Rodapé ─────────────────────────────────────────────────────────────────
  doc.setDrawColor(...MGRAY_RGB);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, MARGIN + CW, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(160, 160, 160);
  doc.text(
    "Júlio Takeichi  ·  Planejamento de Treinos — Handebol Universitário · Rio de Janeiro",
    W / 2, y + 5, { align: "center" }
  );

  // ── Salvar ─────────────────────────────────────────────────────────────────
  const filename = (plan.nomeArquivo || "treino_handebol")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_\-]/g, "");
  doc.save(`${filename}.pdf`);
}
