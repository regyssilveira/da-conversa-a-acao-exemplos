# Capítulo 13 — Aprovação demonstrável

Importe `workflows/capitulo-13-aprovacao-simulada.json`. O arquivo não chama modelo, não envia e-mail, não espera uma pessoa e não grava histórico entre execuções. Ele comprova as condições da autorização com valores fictícios editáveis.

## Sequência de teste

Abra **Montar pacote de aprovação**, altere uma condição e execute a partir do gatilho. Depois de cada caso, restaure o valor inicial.

| Mudança | Resultado do verificador |
|---|---|
| nenhuma | PRONTO_PARA_SIMULAR; saída final ENVIO_SIMULADO |
| decisao = rejeitado | BLOQUEADO_REJEITADO |
| decisao vazia | BLOQUEADO_SEM_APROVACAO |
| agora_teste = expira_em | BLOQUEADO_EXPIRADO |
| corpo diferente de corpo_aprovado | BLOQUEADO_CONTEUDO |
| aprovador diferente do permitido | BLOQUEADO_IDENTIDADE |
| historico_chaves = PED-1301-v1 | BLOQUEADO_DUPLICADO |
| destino vazio | BLOQUEADO_CAMPO |

Os campos com sufixo `_aprovado` representam o conteúdo mostrado à pessoa. Eles devem ser copiados antes da espera e preservados até a revalidação. O resultado `historico_proposto` mostra como ficaria o histórico após a simulação; copie a chave para `historico_chaves` para simular o segundo recebimento. Nada nesse teste garante persistência ou exclusão mútua entre execuções reais.

## Registro persistente, ainda manual

Use a aba Acoes do livro: chave, estado, resultado_id. Consulte a chave com Get Row(s), interrompa se existir, registre RESERVADO antes de enviar, depois ENVIADO e o identificador da resposta. Configure Always Output Data, “sempre produzir dados”, se precisar avaliar uma consulta sem linhas. Abra a saída para distinguir um objeto vazio de uma linha encontrada. Teste a consulta e as duas rotas antes de conectar o envio. Essa planilha aceita somente um operador e uma execução por vez; não é uma trava transacional.

## Canal real

Gmail Message → Send and Wait for Approval envia o pacote ao seu endereço de teste. Escolha Approve and Disapprove. Mantenha o envio final desconectado, rejeite, inspecione a saída, depois aprove e inspecione novamente. Mapeie a decisão observada para os três estados do livro; o nome exato do campo depende da versão. Conserve no registro do pedido o pacote aprovado e a data-limite. No verificador, substitua `agora_teste` por `{{ $now.toISO() }}`, a data e hora da execução. Nunca trate um relógio fixo de teste como relógio de produção.

Se sua versão não oferecer expiração configurável na operação, não deixe uma espera ilimitada: use Wait com limite de tempo e siga https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait/. Uma rota de formulário/webhook precisa de controle de acesso; não disponibilize um link público como prova de identidade. Para começar sem essa configuração, execute apenas a aprovação Gmail sob controle da sua conta, deixe o envio final manual e revalide a data antes de enviá-lo. O recebimento de um clique não comprova, isoladamente, a identidade do aprovador.

Só conecte Gmail Message → Send depois de provar recusa, conteúdo alterado, duplicidade e expiração. Use seu endereço como destino fixo, texto simples, sem anexos. Se houver timeout, confirme no provedor antes de tentar novamente. Timeout significa esgotamento do tempo de espera; a mensagem pode ter sido aceita mesmo sem resposta ao fluxo.

Documentação de Gmail verificada em 23/10/2026: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/.
