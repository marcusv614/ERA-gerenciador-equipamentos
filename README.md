# Controle de Ativos ERA

Painel React para acompanhar equipamentos, obras, técnicos, depósito e movimentações de ativos da ERA Engenharia de Redes da Amazônia.

## Executar o projeto

```bash
npm install
npm run dev
```

Validações disponíveis:

```bash
npm run lint
npm run build
```

## Organização

- `src/components/painel`: composição do painel, navegação e telas principais.
- `src/components`: componentes visuais reutilizáveis e modais de formulário.
- `src/hooks`: estado e consultas derivadas do domínio.
- `src/services`: geração dos documentos para impressão/PDF.
- `src/utils`: datas e regras auxiliares sem dependência da interface.
- `src/data`: dados simulados e constantes do domínio.

O `PainelControleAtivos` coordena a interface. Regras de cadastro e movimentação ficam em `useControleAtivos`; filtros e buscas ficam em `useFiltrosPainel`. Essa separação mantém os componentes focados em apresentação e facilita a futura conexão com uma API.

## Observação

Atualmente os dados são mantidos apenas no estado do React. Cadastros e movimentações são perdidos ao recarregar a página até que uma API ou camada de persistência seja integrada.

## Integração futura com a API

As entidades atuais são `obras`, `equipamentos`, `funcionarios` e `movimentacoes`. O hook `useControleAtivos` concentra as operações temporárias em memória e é o ponto que deverá ser conectado aos serviços HTTP.

Endpoints esperados para o backend:

- `GET/POST /obras`
- `GET/POST /equipamentos`
- `POST /equipamentos/:id/movimentacoes`
- `GET/POST /funcionarios`

No banco de dados, obras e movimentações devem referenciar funcionários por identificador, não pelo nome. Os nomes ainda são usados nos mocks apenas para manter compatibilidade com a interface atual.
