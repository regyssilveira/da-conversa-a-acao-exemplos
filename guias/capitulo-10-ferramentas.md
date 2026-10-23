# Capítulo 10 — Ligar e limitar subfluxos

Arquivos de entrada: `capitulo-10-ferramenta-agenda-simulada.json`, `capitulo-10-ferramenta-registros-simulada.json`, `capitulo-10-agente-planejador.json`, todos em `workflows/`.

Os dois subfluxos usam dados fictícios, validam intervalo ou status e não consultam Google. A agenda aceita até 24 horas e devolve `eventos`; os registros aceitam somente `novo` e devolvem `registros`. Um pedido inválido devolve `erro`. O agente exige um provedor de modelo. Teste primeiro com um chamador determinístico: Manual Trigger → Edit Fields → Execute Sub-workflow. Selecione o subfluxo salvo e forneça datas ou status. O gatilho do subfluxo define os nomes recebidos.

## Agenda: testar chamada e depois consulta

1. Salve o subfluxo e confira os campos texto `inicio` e `fim` no gatilho **When Executed by Another Workflow**.
2. No chamador, envie `2026-09-21T00:00:00-03:00` e `2026-09-22T00:00:00-03:00`. Confirme a observação fictícia.
3. Para Google, troque a saída constante pelo nó de leitura do capítulo 6, mapeando início e fim. O calendário fica fixo.
4. Antes da leitura, adicione If e configure uma condição booleana com a expressão abaixo, comparada com `true`:

```text
{{ Number.isFinite(Date.parse($json.inicio)) && Number.isFinite(Date.parse($json.fim)) && Date.parse($json.fim) > Date.parse($json.inicio) && Date.parse($json.fim) - Date.parse($json.inicio) <= 86400000 }}
```

`Date.parse` converte data em uma medida numérica de tempo; `Number.isFinite` rejeita conversão inválida; `&&` exige todas as condições; 86.400.000 é um dia em milissegundos. Use data com fuso como no exemplo. O caminho verdadeiro consulta; o falso produz `erro: ERRO_INTERVALO` num Edit Fields. Períodos maiores que um dia ou invertidos não podem chamar o serviço. Para dias civis sujeitos a mudança de fuso, defina outra regra antes de ampliar o laboratório.

## Registros

No gatilho, confira `status`. No chamador, forneça `novo`. Depois de testar a saída fictícia, substitua-a por Google Sheets — Get Row(s), aba Registros e filtro pela coluna `status`. Antes, um If permite somente `novo`; o caminho falso devolve `erro: ERRO_STATUS`. Reduza o resultado aos quatro campos do livro.

## Agente

Em cada Call n8n Workflow Tool, selecione o subfluxo pelo nome e atualize as entradas. Primeiro fixe os valores; só então permita valores definidos pelo modelo, conservando os filtros do subfluxo. Restrinja os fluxos autorizados a chamar a ferramenta nas configurações do subfluxo, conforme o ambiente permitir. Não amplie intervalo apenas para satisfazer um pedido do modelo.

Documentação verificada em 23/10/2026: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger/ e https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow/.
