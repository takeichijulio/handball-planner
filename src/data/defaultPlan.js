// ─────────────────────────────────────────────────────────────────────────────
//  PLANO PADRÃO
//  Este é o plano que aparece quando o editor é aberto pela primeira vez
//  ou quando o usuário clica em "Novo Plano".
//  Edite aqui para mudar o modelo base.
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_PLAN = {
  nomeArquivo: "treino_handebol",
  equipe:      "Masculino Intermediário",
  tema:        "Ataque Posicional vs Defesa 5-1",
  duracao:     "75 minutos",
  espaco:      "Quadra Inteira",
  data:        new Date().toLocaleDateString("pt-BR"),

  objetivos: [
    "Reconhecer e explorar os espaços gerados pela defesa 5-1",
    "Movimentar a bola com velocidade para desorganizar o avançado",
    "Construir circulação, penetração e finalização no ataque posicional",
    "Introduzir a lógica do 5-1: função do avançado + bloco de cinco",
    "Desenvolver transição defensiva→ofensiva após recuperação de bola",
  ],

  blocos: [
    {
      numero: "1", emoji: "⚡", titulo: "ATIVAÇÃO NEURAL", duracao: "5 min",
      linhas: [
        ["Exercício:",   "Rondinha de ativação com tomada de decisão"],
        ["Organização:", "Círculo com 6–8 jogadores, 2 no meio. Os de fora trocam passes rápidos; os do meio tentam interceptar. Quem errar o passe vai pro meio."],
        ["🎯 Foco:",     "Reação, ativação do SNC, leitura do espaço, olho no jogo."],
      ],
    },
    {
      numero: "2", emoji: "🏃", titulo: "AQUECIMENTO — CORREDOR DE TRANSIÇÃO", duracao: "10 min",
      linhas: [
        ["Organização:",    "Quadra inteira dividida em 2 corredores laterais + corredor central. Grupos de 3 saindo em sequência do fundo."],
        ["Fase 1 (3 min):", "3x0 em velocidade — passe e vai, ocupando as 3 raias. Finalização no gol oposto."],
        ["Fase 2 (4 min):", "3x0 com variação — jogador central conduz, laterais fazem corte diagonal cruzado."],
        ["Fase 3 (3 min):", "3x1 — um defensor sai junto tentando atrasar. Os 3 decidem rápido."],
        ["🎯 Foco:",        "Velocidade de deslocamento, passe em transição, ocupação de raias."],
      ],
    },
    {
      numero: "3", emoji: "🔍", titulo: "EXERCÍCIO 1 — RECONHECENDO O 5-1", duracao: "12 min",
      linhas: [
        ["Exercício:",   '"Onde está o espaço?"'],
        ["Organização:", "Ataque posicionado (3 na linha de 9m + 2 pontas + 1 pivô) vs defesa 5-1 estática."],
        ["Regra:",       "Só pode arremessar após 5 passes e pelo menos 1 passe para o pivô."],
        ["Metodologia:", "Parar o exercício 2–3x para análise coletiva."],
        ["🎯 Foco:",     "Leitura da posição do avançado, uso do pivô como referência."],
      ],
    },
    {
      numero: "4", emoji: "🔄", titulo: "EXERCÍCIO 2 — CIRCULAÇÃO + PENETRAÇÃO", duracao: "15 min",
      linhas: [
        ["Exercício:",   '"3x2 no bolso + apoio"'],
        ["Organização:", "Meia quadra ofensiva. 3 atacantes vs 2 defensores + avançado do 5-1. 2 pontas de apoio fixas."],
        ["Regra:",       "Ponta recebe → 3 segundos para cruzar ou devolver."],
        ["Progressão:",  "Após 5 min, adicionar mais 1 defensor (vira 3x3 + avançado)."],
        ["🎯 Foco:",     "Timing do passe, leitura do avançado, decisão rápida."],
      ],
    },
    {
      numero: "5", emoji: "⚔️", titulo: "SITUAÇÃO REDUZIDA — 4x4 COM TRANSIÇÃO REAL", duracao: "13 min",
      linhas: [
        ["Organização:", "Quadra inteira com goleiros. 4x4 em 4-0."],
        ["Dinâmica:",    "Roubada/defesa do goleiro → transição imediata (5 seg para finalizar)."],
        ["Pontuação:",   "Ataque posicional = 1pt | Pivô = 2pts | Contra-ataque = 3pts ⚡"],
        ["Progressão:",  "Últimos 4 min: adicionar avançado na defesa."],
        ["🎯 Foco:",     "Quem perde a bola corre de volta. Responsabilidade individual."],
      ],
    },
    {
      numero: "6", emoji: "🏆", titulo: "COLETIVO — JOGO CONDICIONADO 6x6", duracao: "15 min",
      linhas: [
        ["Organização:",   "6x6 quadra inteira com goleiros. Defesa obrigatoriamente em 5-1."],
        ["Regras ataque:", "Mín. 4 passes | 1 passe para pivô por posse | Circulação ponta a ponta = arremesso livre."],
        ["🎯 Foco:",       "Integrar todos os princípios do treino em situação real."],
      ],
    },
  ],

  resumo: [
    ["1️⃣", "Ativação Neural – Rondinha de decisão",          "5 min"],
    ["2️⃣", "Aquecimento – Corredor de transição",            "10 min"],
    ["3️⃣", "Exercício 1 – Reconhecendo o 5-1",               "12 min"],
    ["4️⃣", "Exercício 2 – Circulação + Penetração 3x2",      "15 min"],
    ["5️⃣", "Situação Reduzida – 4x4 com transição real",     "13 min"],
    ["6️⃣", "Coletivo – Jogo condicionado 6x6",               "15 min"],
    ["✅",  "Feedback coletivo + encerramento",               "5 min"],
  ],
  totalDuracao: "75 min",

  dicaTatica:
    "O maior erro contra o 5-1 é tentar arremessar de frente para o avançado. " +
    "Treine seus jogadores a atrair o avançado e desviar a bola — passe para o lado oposto " +
    "ao que ele se moveu. Esse timing de leitura é o que diferencia um ataque amadurecido.",
};
