# Capítulo 12 — Três resultados antes da redação

Os três workflows agora executam regras sobre listas fictícias completas, em vez de tratar uma tabela pronta ou um texto de entrada como prova de processamento. Nenhum exige credenciais. O nó Code contém a transformação aberta; o leitor altera dados e parâmetros no Edit Fields, sem editar código.

| Arquivo em workflows/ | Entrada editável | Conferência inicial |
|---|---|---|
| capitulo-12-planejador-diario.json | eventos, tarefas, data_alvo | 3 compromissos, prioridades TAR-201/TAR-202, 1 conflito e lacuna TAR-204 |
| capitulo-12-preparador-reuniao.json | evento, registros | REG-301/REG-302 entram; REG-303 fica fora |
| capitulo-12-relatorio-semanal.json | registros, inicio, fim | 4 registros; revisão 7, automação 11, total 18 |

Altere as listas JSON no nó Carregar dados fictícios. Conserve nomes, aspas e tipos. Execute Aplicar regras e conferir e leia o objeto de saída. Planos têm data_alvo fixa em 2026-09-21; não presumem data atual. Relatórios incluem início e excluem fim. Os horários da agenda de teste usam -03:00; para outra zona, normalize a fonte antes da adaptação.

Testes: no planejador, eventos `[]` deve preservar as tarefas e indicar zero compromissos; fonte_disponivel false deve produzir REVISAO; tarefa sem prazo deve ir a lacunas. No preparador, evento inexistente produz SEM_FONTES; observação vazia vai a lacunas; instrução inserida em observação permanece dado. No relatório, quantidade não numérica produz REVISAO; lista vazia produz VAZIO e total zero; data exatamente no fim fica fora.

## Acrescentar linguagem natural

Conecte o nó OpenAI depois das regras, pela operação e credencial do capítulo 7. A mensagem de usuário pode receber `{{ JSON.stringify($json) }}`: essa expressão transforma o objeto de saída em texto JSON para envio. O contrato do capítulo é a mensagem de sistema. No relatório, peça três seções sem recalcular nem atribuir causas. No preparador, todo fato precisa citar um id da saída. No planejador, nenhum evento pode desaparecer sem explicação.

A geração não pertence aos testes locais do repositório: depende da credencial, modelo, política e execução da conta do leitor. Se o modelo falhar, a tabela e os fatos calculados continuam visíveis no nó anterior. Não use AI Agent sem ferramenta para essas tarefas: redigir uma saída de percurso fixo não exige um agente.

## Trocar pela fonte real

Copie primeiro os CSVs do capítulo para planilhas de laboratório. Consulte somente as colunas correspondentes. Reúna as linhas no mesmo contrato JSON antes da transformação, como demonstrado no capítulo 14. Para o relatório, a alternativa visual é Google Sheets → Filter no período → Summarize por categoria. **Filter** significa filtrar; **Sort**, ordenar. Confira os mesmos quatro registros e total 18 antes de usar datas atuais.
