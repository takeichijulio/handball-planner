# 🤾 Handball Planner
**Júlio Takeichi · Handebol Universitário · Rio de Janeiro**

App web para planejamento de treinos de handebol com geração de PDF no padrão visual definido.

---

## 📁 Estrutura do projeto

```
src/
├── data/
│   ├── library.js       ← ✏️ Adicione/edite exercícios da biblioteca aqui
│   └── defaultPlan.js   ← ✏️ Mude o plano padrão que abre no editor aqui
├── utils/
│   └── generatePDF.js   ← ✏️ Ajuste layout/cores do PDF gerado aqui
├── components/
│   ├── UI.jsx           ← Componentes visuais reutilizáveis (botões, inputs)
│   ├── BlockCard.jsx    ← Card de cada bloco de exercício
│   ├── EditorTab.jsx    ← Aba principal de edição
│   ├── HistoryTab.jsx   ← Aba de histórico de treinos salvos
│   └── LibraryTab.jsx   ← Aba da biblioteca de exercícios
├── theme.js             ← ✏️ Cores e estilos globais do app aqui
├── App.jsx              ← Orquestração principal (estado, navegação)
└── main.jsx             ← Entry point
```

> **Regra de ouro:** cada arquivo tem uma responsabilidade clara.
> Para qualquer ajuste, você sabe exatamente onde ir.

---

## 🚀 Rodando localmente

```bash
npm install
npm run dev
```
Acesse `http://localhost:5173`

---

## 🌐 Deploy no Vercel (gratuito, link público)

### Opção A — Via GitHub (recomendado)
1. Suba o projeto para um repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) → "Add New Project"
3. Conecte o repositório → clique em **Deploy**
4. Pronto — Vercel gera um link público (ex: `handball-planner.vercel.app`)

### Opção B — Via CLI
```bash
npm install -g vercel
vercel
```
Responda as perguntas e o link é gerado automaticamente.

---

## ✏️ Ajustes comuns

| O que mudar | Onde editar |
|---|---|
| Adicionar exercício na biblioteca | `src/data/library.js` |
| Mudar plano padrão do editor | `src/data/defaultPlan.js` |
| Mudar cores do app | `src/theme.js` |
| Mudar layout/cores do PDF | `src/utils/generatePDF.js` |
| Mudar rodapé do PDF | `src/utils/generatePDF.js` (última seção) |
| Mudar visual dos blocos | `src/components/BlockCard.jsx` |

---

## 💾 Dados salvos

O histórico de treinos é salvo no `localStorage` do navegador de cada usuário.
Isso significa que cada auxiliar tem seu próprio histórico no dispositivo que usar.
