// ─────────────────────────────────────────────────────────────────────────────
//  BIBLIOTECA DE EXERCICIOS
//
//  Esta e a biblioteca base (estatica).
//  Exercicios adicionados pelo botao "+ Adicionar a Biblioteca" no editor
//  sao salvos no localStorage do navegador e mesclados automaticamente.
//
//  Para adicionar um exercicio manualmente aqui:
//  {
//    titulo: "Nome do Exercicio",
//    duracao: "X min",
//    linhas: [
//      ["Label:",   "Descricao"],
//      ["Foco:",    "Aparece em laranja destacado"],
//    ]
//  }
// ─────────────────────────────────────────────────────────────────────────────

export const STATIC_LIBRARY = {
  "Ativacao Neural": [
    {
      titulo: "Rondinha de Decisao",
      duracao: "5 min",
      linhas: [
        ["Exercicio:",   "Circulo com 6-8 jogadores, 2 no meio tentando interceptar passes."],
        ["Regra:",       "Quem errar o passe vai pro meio."],
        ["Foco:",        "Reacao, ativacao do SNC, leitura do espaco."],
      ],
    },
    {
      titulo: "Protocolo PAP - Sprints + CMJ",
      duracao: "5 min",
      linhas: [
        ["Aquecimento:", "60s de trote leve para aquecer o quadril."],
        ["3 series:",    "3 CMJ com foco em altura maxima (pausa 10s) -> sprint de 15m em aceleracao maxima -> pausa 20s e repete."],
        ["Finalizacao:", "2 sprints laterais de 5m para cada lado."],
        ["Foco:",        "Ativacao neuromuscular, potencia, prontidao para intensidade."],
      ],
    },
    {
      titulo: "Pega-pega com Bola",
      duracao: "5 min",
      linhas: [
        ["Exercicio:",   "Dois pegadores sem bola tentam tocar jogadores que conduzem bola."],
        ["Regra:",       "Quem for pego troca com o pegador. Espaco delimitado."],
        ["Foco:",        "Agilidade, conducao sob pressao, visao periferica."],
      ],
    },
  ],

  "Aquecimento": [
    {
      titulo: "Corredor de Transicao 3x0 -> 3x1",
      duracao: "10 min",
      linhas: [
        ["Organizacao:", "Quadra inteira, 3 raias. Grupos de 3 saindo em sequencia."],
        ["Fase 1:",      "3x0 em velocidade - passe e vai, finalizacao no gol oposto."],
        ["Fase 2:",      "3x1 - defensor sai junto tentando atrasar. Decidir rapido."],
        ["Foco:",        "Velocidade, ocupacao de raias, passe em transicao."],
      ],
    },
    {
      titulo: "Circuito Tecnico em Duplas",
      duracao: "10 min",
      linhas: [
        ["Organizacao:", "Duplas se movendo pelo espaco sem colisao entre grupos."],
        ["2 min:",       "Passe em movimento + deslocamento lateral."],
        ["2 min:",       "Passe + corte diagonal + finalizacao sem goleiro."],
        ["3 min:",       "1x0 - drible, mudanca de direcao e arremesso."],
        ["3 min:",       "2x0 em velocidade - passe e vai, dois toques maximos."],
        ["Foco:",        "Visao periferica, tecnica individual, ritmo crescente."],
      ],
    },
  ],

  "Exercicio Principal": [
    {
      titulo: "Onde esta o Espaco? (vs 5-1)",
      duracao: "12 min",
      linhas: [
        ["Exercicio:",    "Onde esta o espaco?"],
        ["Organizacao:",  "Ataque posicionado (3-2-1) vs defesa 5-1 estatica."],
        ["Regra:",        "Min. 5 passes e 1 passe para o pivo antes de arremessar."],
        ["Metodologia:",  "Parar 2-3x para analise coletiva."],
        ["Foco:",         "Leitura do avancado, uso do pivo, circulacao lateral."],
      ],
    },
    {
      titulo: "3x2 no Bolso + Apoio",
      duracao: "15 min",
      linhas: [
        ["Organizacao:",  "Meia quadra. 3 atacantes vs 2 defensores + avancado. 2 pontas de apoio fixas."],
        ["Regra:",        "Ponta recebe -> 3 segundos para cruzar ou devolver."],
        ["Progressao:",   "Apos 5 min, adicionar 1 defensor (vira 3x3 + avancado)."],
        ["Foco:",         "Timing do passe, decisao rapida sob pressao."],
      ],
    },
    {
      titulo: "Transicao Ofensiva 4x4 Espaco Reduzido",
      duracao: "15 min",
      linhas: [
        ["Organizacao:", "4x4 com goleiras nos dois lados, espaco reduzido."],
        ["Dinamica:",    "Ao recuperar a bola: 4 segundos para cruzar a linha do meio - senao vira posse adversaria."],
        ["Pontuacao:",   "Gol posicional = 1pt  |  Gol em transicao direta (max 3 passes) = 3pts  |  Gol de pivo = 2pts."],
        ["Foco:",        "Velocidade de saida, ocupacao de largura, decisao rapida."],
      ],
    },
    {
      titulo: "Construcao Posicionada 6x6 Meia Quadra",
      duracao: "15 min",
      linhas: [
        ["Organizacao:", "6x6 em meia quadra - 3 na linha de 9m + 2 pontas + 1 pivo vs bloco 6-0."],
        ["Regras:",      "Minimo 4 passes antes de arremessar | obrigatorio 1 toque no pivo por posse."],
        ["Progressao:",  "Defesa comeca passiva -> aos 8 min passa a ser ativa."],
        ["Metodologia:", "Parar 2x para analise coletiva: onde estava o espaco? quem estava livre?"],
        ["Foco:",        "Posicionamento das 6, timing para o pivo, leitura da defesa."],
      ],
    },
  ],

  "Situacao Reduzida": [
    {
      titulo: "4x4 com Transicao Real",
      duracao: "13 min",
      linhas: [
        ["Organizacao:", "Quadra inteira com goleiros nos dois lados. 4x4 em 4-0."],
        ["Dinamica:",    "Roubada/defesa do goleiro -> transicao imediata (5 seg para finalizar)."],
        ["Pontuacao:",   "Gol posicional = 1pt  |  Gol de pivo = 2pts  |  Gol em contra-ataque = 3pts"],
        ["Progressao:",  "Ultimos 4 min: adicionar avancado na defesa."],
        ["Foco:",        "Quem perde a bola corre de volta. Responsabilidade individual."],
      ],
    },
    {
      titulo: "3x3 + Coringas Espaco Reduzido",
      duracao: "13 min",
      linhas: [
        ["Organizacao:", "3x3 + 2 coringas que jogam sempre com quem tem a bola (5x3 permanente)."],
        ["Regra:",       "Coringas nao podem arremessar - apenas apoio e circulacao."],
        ["Rotacao:",     "A cada gol ou posse perdida, um par troca com os coringas."],
        ["Foco:",        "Explorar superioridade, criar linha de passe, nao segurar a bola."],
      ],
    },
  ],

  "Coletivo": [
    {
      titulo: "Jogo Condicionado 6x6 vs 5-1",
      duracao: "15 min",
      linhas: [
        ["Organizacao:",   "6x6 quadra inteira com goleiros. Defesa obrigatoriamente em 5-1."],
        ["Regras:",        "Min. 4 passes | 1 passe para pivo por posse | Circulacao ponta a ponta = arremesso livre."],
        ["Foco:",          "Integrar todos os principios do treino em situacao real."],
      ],
    },
    {
      titulo: "Jogo Condicionado 6x6 Meia Quadra",
      duracao: "12 min",
      linhas: [
        ["Organizacao:",   "6x6 meia quadra com goleiras. Regras do treino ativas."],
        ["Regras:",        "Obrigatorio 1 passe para o pivo por posse | ao recuperar -> saida em transicao obrigatoria."],
        ["Pontuacao:",     "Gol em transicao = 2pts  |  Gol posicional = 1pt."],
        ["Foco:",          "Autonomia crescente, integrar transicao e construcao num unico jogo."],
      ],
    },
  ],
};

// Categorias disponiveis (ordem de exibicao)
export const CATEGORIES = Object.keys(STATIC_LIBRARY);

// Mapeamento de categoria sugerida por posicao do bloco
export const BLOCK_CATEGORY_MAP = [
  "Ativacao Neural",
  "Aquecimento",
  "Exercicio Principal",
  "Exercicio Principal",
  "Situacao Reduzida",
  "Coletivo",
];

// Chave do localStorage para exercicios adicionados pelo usuario
const USER_KEY = "handball_user_library_v1";

// Le a biblioteca do usuario salva no localStorage
export function getUserLibrary() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (_) { return {}; }
}

// Salva um exercicio na biblioteca do usuario
export function saveToUserLibrary(exercicio, categoria) {
  const lib = getUserLibrary();
  if (!lib[categoria]) lib[categoria] = [];
  // Evita duplicatas pelo titulo
  const exists = lib[categoria].some(e => e.titulo === exercicio.titulo);
  if (!exists) lib[categoria].push(exercicio);
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(lib));
    return true;
  } catch (_) { return false; }
}

// Remove um exercicio da biblioteca do usuario
export function removeFromUserLibrary(titulo, categoria) {
  const lib = getUserLibrary();
  if (lib[categoria]) {
    lib[categoria] = lib[categoria].filter(e => e.titulo !== titulo);
    if (lib[categoria].length === 0) delete lib[categoria];
  }
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(lib));
    return true;
  } catch (_) { return false; }
}

// Retorna biblioteca mesclada: estatica + usuario
export function getMergedLibrary() {
  const user = getUserLibrary();
  const merged = {};
  CATEGORIES.forEach(cat => {
    merged[cat] = [...(STATIC_LIBRARY[cat] || [])];
    if (user[cat]) merged[cat] = [...merged[cat], ...user[cat]];
  });
  // Categorias criadas pelo usuario que nao existem na estatica
  Object.keys(user).forEach(cat => {
    if (!merged[cat]) merged[cat] = [...user[cat]];
  });
  return merged;
}

// Retrocompatibilidade — exporta LIBRARY como merged para quem ja usa
export const LIBRARY = getMergedLibrary();
