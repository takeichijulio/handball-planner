// ─────────────────────────────────────────────────────────────────────────────
//  BIBLIOTECA DE EXERCÍCIOS
//
//  Para adicionar um exercício:
//    1. Escolha a categoria correta (ou crie uma nova)
//    2. Adicione um objeto seguindo o formato abaixo
//    3. Salve — aparecerá automaticamente no editor e na aba Biblioteca
//
//  Formato de cada exercício:
//  {
//    titulo: "Nome do Exercício",
//    duracao: "X min",
//    linhas: [
//      ["Label:",   "Descrição da linha"],
//      ["🎯 Foco:", "Aparece em laranja destacado"],
//    ]
//  }
//
//  Labels com 🎯, ⚡ ou 💡 no início aparecem em laranja no PDF.
// ─────────────────────────────────────────────────────────────────────────────

export const LIBRARY = {
  "Ativação Neural": [
    {
      titulo: "Rondinha de Decisão",
      duracao: "5 min",
      linhas: [
        ["Exercício:",   "Círculo com 6–8 jogadores, 2 no meio tentando interceptar passes."],
        ["Regra:",       "Quem errar o passe vai pro meio."],
        ["🎯 Foco:",     "Reação, ativação do SNC, leitura do espaço."],
      ],
    },
    {
      titulo: "Pega-pega com Bola",
      duracao: "5 min",
      linhas: [
        ["Exercício:",   "Dois pegadores sem bola tentam tocar jogadores que conduzem bola."],
        ["Regra:",       "Quem for pego troca com o pegador. Espaço delimitado."],
        ["🎯 Foco:",     "Agilidade, condução sob pressão, visão periférica."],
      ],
    },
    {
      titulo: "Passes em Dupla + Deslocamento",
      duracao: "5 min",
      linhas: [
        ["Exercício:",   "Duplas se movendo pela quadra trocando passes sem deixar cair."],
        ["Variação:",    "Trocar de parceiro a cada 60 segundos."],
        ["🎯 Foco:",     "Aquecimento articular, timing de passe, comunicação."],
      ],
    },
  ],

  "Aquecimento": [
    {
      titulo: "Corredor de Transição 3x0→3x1",
      duracao: "10 min",
      linhas: [
        ["Organização:", "Quadra inteira, 3 raias. Grupos de 3 saindo em sequência."],
        ["Fase 1:",      "3x0 em velocidade — passe e vai, finalização no gol oposto."],
        ["Fase 2:",      "3x1 — defensor sai junto tentando atrasar. Decidir rápido."],
        ["🎯 Foco:",     "Velocidade, ocupação de raias, passe em transição."],
      ],
    },
    {
      titulo: "Circuito Técnico Progressivo",
      duracao: "10 min",
      linhas: [
        ["Organização:", "Duas colunas nas laterais cruzando a quadra."],
        ["Sequência:",   "Passe em movimento → corte diagonal → arremesso em suspensão → 1x0 com drible."],
        ["🎯 Foco:",     "Técnica individual, ritmo crescente, sem fila parada."],
      ],
    },
    {
      titulo: "Aquecimento com Bola em Trios",
      duracao: "8 min",
      linhas: [
        ["Organização:", "Trios espalhados pela quadra. Passe em triângulo com deslocamento."],
        ["Progressão:",  "Adicionar corte para receber após o passe."],
        ["🎯 Foco:",     "Coordenação, visão de jogo, aquecimento progressivo."],
      ],
    },
  ],

  "Exercício Principal": [
    {
      titulo: "Onde está o Espaço? (vs 5-1)",
      duracao: "12 min",
      linhas: [
        ["Exercício:",    '"Onde está o espaço?"'],
        ["Organização:",  "Ataque posicionado (3-2-1) vs defesa 5-1 estática."],
        ["Regra:",        "Mín. 5 passes e 1 passe para o pivô antes de arremessar."],
        ["Metodologia:",  "Parar 2–3x para análise coletiva."],
        ["🎯 Foco:",      "Leitura do avançado, uso do pivô, circulação lateral."],
      ],
    },
    {
      titulo: "3x2 no Bolso + Apoio",
      duracao: "15 min",
      linhas: [
        ["Organização:",  "Meia quadra. 3 atacantes vs 2 defensores + avançado. 2 pontas de apoio fixas."],
        ["Regra:",        "Ponta recebe → 3 segundos para cruzar ou devolver."],
        ["Progressão:",   "Após 5 min, adicionar 1 defensor (vira 3x3 + avançado)."],
        ["🎯 Foco:",      "Timing do passe, decisão rápida sob pressão."],
      ],
    },
    {
      titulo: "Defesa 6-0 — Princípios Básicos",
      duracao: "12 min",
      linhas: [
        ["Organização:",  "6 defensores vs 6 atacantes. Defesa em bloco fechado."],
        ["Regra:",        "Defesa não pode sair do bloco. Atacantes buscam penetrações e pivô."],
        ["🎯 Foco:",      "Comunicação defensiva, cobertura, posicionamento."],
      ],
    },
    {
      titulo: "1x1 Ofensivo nas Posições",
      duracao: "12 min",
      linhas: [
        ["Organização:",  "Duplas em cada posição (central, lateral, ponta). Rotacionam a cada rodada."],
        ["Regra:",        "Atacante tem 5 seg para resolver o 1x1 ou devolver a bola."],
        ["🎯 Foco:",      "Engano, mudança de direção, finalização sob marcação."],
      ],
    },
    {
      titulo: "Circulação com Pivô Fixo",
      duracao: "12 min",
      linhas: [
        ["Organização:",  "5 atacantes em circulação + 1 pivô fixo. Sem defesa."],
        ["Regra:",        "A bola deve passar pelo pivô pelo menos 1x por posse. Arremesso após toque no pivô."],
        ["Progressão:",   "Adicionar 1 defensor marcando o pivô."],
        ["🎯 Foco:",      "Timing de passe para o pivô, timing de saída, bloqueio."],
      ],
    },
  ],

  "Situação Reduzida": [
    {
      titulo: "4x4 com Transição Real",
      duracao: "13 min",
      linhas: [
        ["Organização:",  "Quadra inteira, goleiros nos dois lados."],
        ["Dinâmica:",     "Roubada de bola/defesa do goleiro → contra-ataque imediato (5 seg)."],
        ["Pontuação:",    "Ataque posicional = 1pt | Pivô = 2pts | Contra-ataque = 3pts ⚡"],
        ["Progressão:",   "Últimos 4 min: adicionar avançado na defesa."],
        ["🎯 Foco:",      "Responsabilidade individual, transição rápida."],
      ],
    },
    {
      titulo: "3x3 Livre com Goleiro",
      duracao: "10 min",
      linhas: [
        ["Organização:",  "Meia quadra, 3x3 + goleiro."],
        ["Regra:",        "Gol só vale após passe para área de pivô."],
        ["🎯 Foco:",      "Tomada de decisão, criatividade, exploração do espaço."],
      ],
    },
    {
      titulo: "2x2 + 1 Coringa",
      duracao: "10 min",
      linhas: [
        ["Organização:",  "Meia quadra. 2 atacantes vs 2 defensores + 1 coringa sempre com a posse."],
        ["Regra:",        "Coringa joga sempre com o time que tem a bola (superioridade numérica permanente)."],
        ["🎯 Foco:",      "Exploração da superioridade, decisão rápida, criação de espaço."],
      ],
    },
  ],

  "Coletivo": [
    {
      titulo: "Jogo Condicionado 6x6 vs 5-1",
      duracao: "15 min",
      linhas: [
        ["Organização:",   "6x6 quadra inteira com goleiros. Defesa em 5-1."],
        ["Regras:",        "Mín. 4 passes | 1 passe para pivô por posse | Circulação ponta a ponta = arremesso livre."],
        ["🎯 Foco:",       "Integrar todos os princípios do treino em situação real."],
      ],
    },
    {
      titulo: "Jogo Livre com Intervenção Pontual",
      duracao: "15 min",
      linhas: [
        ["Organização:",   "Jogo 6x6 livre, treinador intervém com tarefas pontuais."],
        ["Exemplo:",       '"Próximas 3 posses: pivô obrigatório antes do arremesso."'],
        ["🎯 Foco:",       "Autonomia tática, aplicação natural dos princípios."],
      ],
    },
    {
      titulo: "Jogo com Pontuação Especial",
      duracao: "15 min",
      linhas: [
        ["Organização:",   "6x6 com goleiros. Sistema de pontuação diferenciada."],
        ["Pontuação:",     "Gol de pivô = 2pts | Gol de ponta = 2pts | Gol após contra-ataque = 3pts | Demais = 1pt."],
        ["🎯 Foco:",       "Estimular circulação, uso de pontas e transição."],
      ],
    },
  ],
};

// Mapeamento de categoria padrão por posição do bloco
// Usado para sugerir a aba certa na biblioteca ao editar cada bloco
export const BLOCK_CATEGORY_MAP = [
  "Ativação Neural",    // bloco 1
  "Aquecimento",        // bloco 2
  "Exercício Principal",// bloco 3
  "Exercício Principal",// bloco 4
  "Situação Reduzida",  // bloco 5
  "Coletivo",           // bloco 6
];
