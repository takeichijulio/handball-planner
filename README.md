# Handball Planner

Aplicação web para planejar treinos de handebol, organizar exercícios e gerar PDFs. O projeto foi desenvolvido com apoio de ferramentas de IA.

**Demonstração:** [handball-planner-chi.vercel.app](https://handball-planner-chi.vercel.app)

## Funcionalidades

- Editor de planos de treino por blocos e duração.
- Biblioteca de exercícios.
- Histórico salvo no navegador via `localStorage`.
- Geração e download de PDF.

## Tecnologias

- React
- Vite
- JavaScript

## Executar localmente

```bash
npm install
npm run dev
```

Abra o endereço local indicado pelo Vite (normalmente `http://localhost:5173`).

## Estrutura

```text
src/
  data/
  utils/
  components/
  App.jsx
  main.jsx
```

## Dados

O plano inicial é um exemplo editável. Os planos salvos ficam no `localStorage` do navegador e não são enviados a um servidor por este aplicativo.
