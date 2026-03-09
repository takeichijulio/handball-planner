// ─────────────────────────────────────────────────────────────────────────────
//  PALETA DE CORES
//  Para mudar o tema visual do app, edite apenas este arquivo.
//  Todas as cores são usadas como referência em todo o projeto.
// ─────────────────────────────────────────────────────────────────────────────

export const C = {
  navy:        "#0D1B2A",
  blue:        "#1B4F8A",
  accent:      "#E8A020",
  lightBg:     "#F4F7FB",
  midGray:     "#D0D8E4",
  text:        "#1A1A2E",
  white:       "#FFFFFF",
  tipBg:       "#FFF8ED",
  focusOrange: "#B8600A",
  danger:      "#c0392b",
};

// ─────────────────────────────────────────────────────────────────────────────
//  ESTILOS REUTILIZÁVEIS (inline style objects)
// ─────────────────────────────────────────────────────────────────────────────

export const btnBase = {
  cursor: "pointer",
  border: "none",
  borderRadius: 5,
  padding: "6px 14px",
  fontWeight: 600,
  fontSize: 12,
  background: C.blue,
  color: C.white,
  transition: "opacity .15s",
};

export const btnSm = (bg = C.blue) => ({
  cursor: "pointer",
  border: "none",
  borderRadius: 4,
  width: 26,
  height: 26,
  fontSize: 13,
  fontWeight: 700,
  background: bg,
  color: C.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const inputBase = {
  width: "100%",
  background: C.lightBg,
  border: `1.5px solid ${C.midGray}`,
  borderRadius: 6,
  padding: "6px 10px",
  fontSize: 13,
  color: C.text,
  outline: "none",
};
