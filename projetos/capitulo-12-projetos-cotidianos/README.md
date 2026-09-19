# Capítulo 12 — Projetos cotidianos

Este laboratório reúne três workflows completos e uma variação. Todos usam dados fictícios, ficam desativados após a importação e não escrevem em serviços externos.

## Arquivos

- `workflows/capitulo-12-planejador-diario.json`: agenda e tarefas para um plano diário;
- `workflows/capitulo-12-preparador-reuniao.json`: evento e registros para um dossiê verificável;
- `workflows/capitulo-12-relatorio-semanal.json`: agregação antes da explicação em linguagem natural;
- `workflows/capitulo-12-monitor-preco-rss.json`: esqueleto para fonte autorizada;
- `dados-ficticios/capitulo-12-*.csv`: entradas sem pessoas ou organizações reais.

## Ordem de teste

1. Importe um workflow por vez.
2. Conecte sua credencial de modelo apenas no nó indicado.
3. Execute manualmente e confira cada saída.
4. Compare números e identificadores com os CSVs.
5. Simule fonte vazia, campo ausente e instrução maliciosa num campo de texto.
6. Só substitua os dados depois de registrar finalidade, acesso e forma de desligar.

As estruturas são didáticas. Operações e versões de nós podem mudar; consulte a documentação atual do n8n. Para o monitor, conecte somente API, RSS ou outra fonte que autorize automação.
