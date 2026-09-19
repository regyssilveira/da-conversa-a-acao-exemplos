# Capítulo 5 — Meu primeiro fluxo

Este projeto cria um resumo a partir de dados fictícios. Ele não usa credenciais, não acessa aplicativos externos e não envia mensagens.

## Pré-requisitos

- acesso a uma instância atual do n8n, hospedada ou instalada;
- nenhum conhecimento de programação;
- nenhuma chave de API.

## Importação

1. Baixe `workflows/capitulo-05-primeiro-fluxo.json`.
2. No n8n, importe o arquivo como workflow.
3. Abra o workflow e selecione **Execute Workflow**.
4. Abra o nó **Montar resumo** e confira a saída.

Resultado esperado:

```text
Em 2026-09-21, lembre-se de: Revisar o planejamento da semana. Prioridade: normal.
```

## O que observar

- o Manual Trigger inicia somente quando você solicita;
- o primeiro Edit Fields cria três campos fictícios;
- o segundo Edit Fields usa esses campos para montar a saída;
- nenhum dado sai da instância do n8n.

## Testes

Altere apenas um valor no nó **Criar dados fictícios**, execute novamente e confirme que o resumo mudou. Em seguida, deixe `compromisso` vazio para observar por que entradas incompletas precisam de validação.

## Segurança

Não substitua os dados fictícios por informações pessoais durante o aprendizado. Este fluxo não contém credenciais. Antes de compartilhar qualquer exportação futura, abra o arquivo e confirme que segredos ou dados reais não foram incluídos.

## Atualidade

Validado editorialmente em setembro de 2026. Nomes e posições de controles da interface podem mudar; consulte a documentação oficial do n8n indicada no livro.
