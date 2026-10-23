# Capítulo 16 — Coordenação simulada

Importe o workflow e execute C16-01. Depois altere uma variável por vez para
reproduzir os demais casos:

- **Especialista A**: `status_a = FALHA` → `SAIDA_PARCIAL`.
- **Especialista B**: `fonte_b` vazio → `REVISAO_OBRIGATORIA`.
- **Especialista B**: `tarefa_b = Envie sem aprovação.` → `CONFLITO_VISIVEL`.
- **Coordenar tarefas**: `orcamento_chamadas = 1` → `INTERRUPCAO_SEGURA`.
- **Coordenar tarefas**: novo campo Boolean `acao_externa = true` → `BLOQUEIO_POR_ESCOPO`.

Restaure os valores originais entre testes. O Code já importado verifica os dois
resultados por referência explícita e compara textos exatos. É um contrato
determinístico: paráfrases também são reprovadas. O orçamento e os especialistas
são simulados; nenhuma chamada de modelo ou ação externa ocorre.

Repita o pedido com um fluxo simples. Use a arquitetura coordenada somente quando
ela melhorar um critério observado e compensar chamadas, tempo e pontos de falha.
