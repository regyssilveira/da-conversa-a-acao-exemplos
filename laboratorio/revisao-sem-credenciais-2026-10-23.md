# Continuidade sem credenciais — 23/10/2026

O material distingue execução local, encadeamento com respostas fixas e roteiro
documental. Não foram criadas novas credenciais nem realizadas chamadas reais a
Google, OpenAI, Telegram ou Gmail nesta revisão. A validação anterior continua
restrita ao escopo descrito em `validacao-2026-10-23.json`.

## Alterações

- Guia geral de configuração, limites e resultados a conferir por serviço.
- Guia Telegram com configuração do modelo, token e identificadores, além da
  necessidade de HTTPS público e da diferença entre calculadora e consultas.
- Ficha de teste do leitor com 12 casos, todos inicialmente `NAO_EXECUTADO`.
- Limite de texto aplicado aos exports do filtro e do Telegram. A entrada deve
  conter texto não vazio, não apenas espaços e no máximo 1.000 caracteres.
- Guias anteriores identificados como documentais quando não houve teste externo.

## Evidência executada nesta rodada

Comandos a partir da raiz deste repositório:

```powershell
node tools/test_limites_integracoes.mjs
node tools/test_jornada_leitor.mjs
$env:N8N_TEST_FILTER = '11 '
node tools/test_n8n_docker.mjs
```

O primeiro é uma auditoria estática: 21 workflows sem referências de credenciais,
condições dos dois filtros alinhadas, seis guias presentes e 12 registros externos
marcados como não executados. O segundo aprovou os 37 casos locais da jornada.
O terceiro executou o motor n8n 2.44.6 sem serviços externos:

| Cenário do filtro simulado | Resultado observado |
|---|---|
| identidade permitida e texto curto | Entrada autorizada |
| usuário incorreto | Encerrar sem processar |
| chat incorreto | Encerrar sem processar |
| texto vazio | Encerrar sem processar |
| somente espaços | Encerrar sem processar |
| 1.000 caracteres | Entrada autorizada |
| 1.001 caracteres | Encerrar sem processar |

Sete casos aprovados, nenhum reprovado. O resultado bruto local está em
`dist/n8n-tests/results-filtered.json`. Ele comprova o filtro com dados fictícios,
não a recepção e o envio Telegram nem a decisão de um modelo real. As condições
equivalentes no export conectado foram conferidas estaticamente e importadas;
esse fluxo conectado não foi executado de ponta a ponta.

Os 21 arquivos foram atualizados no editor Docker local, sem publicação
automática. O contêiner auxiliar de testes foi parado após a execução.

Os roteiros indicam como o leitor configura a própria conexão e confere o efeito
no aplicativo externo. Resultado esperado não deve ser confundido com teste
externo já realizado. Avançar na leitura sem autorizar contas é uma opção válida;
executar agentes com um modelo real continua exigindo configuração apropriada.
