# Capítulo 7 - Triagem inteligente

Este projeto transforma uma mensagem fictícia em quatro campos previsíveis. Ele não envia mensagens nem altera aplicativos externos.

## Arquivos

- `../../dados-ficticios/capitulo-07-mensagens.csv`: casos de teste inventados;
- `prompt.txt`: instrução usada no laboratório;
- `contrato-saida.json`: esquema JSON esperado;
- `../../workflows/capitulo-07-triagem-simulada.json`: fluxo sem chamada de IA;
- `../../workflows/capitulo-07-triagem-openai.json`: base com o nó OpenAI, sem credencial.

## Caminho sem custo

1. Importe `capitulo-07-triagem-simulada.json` no n8n.
2. Execute o workflow manualmente.
3. Confira os quatro campos no nó final.
4. Troque a mensagem fictícia e ajuste a resposta simulada para praticar o mapeamento.

Esse caminho testa o encadeamento. Ele não testa a interpretação de um modelo.

## Caminho com IA

1. Importe `capitulo-07-triagem-openai.json`.
2. Abra o nó OpenAI e selecione uma credencial criada no gerenciador do n8n.
3. Confira na interface atual a operação de texto, o modelo e o formato JSON ou estruturado.
4. Compare a instrução do nó com `prompt.txt` e, quando disponível, use `contrato-saida.json` como esquema.
5. Execute apenas com as mensagens fictícias fornecidas.

O arquivo exportado não contém credencial nem chave de API. Como o n8n e os provedores evoluem, o nó pode pedir atualização de parâmetros ao importar. Use a documentação vigente do n8n e do provedor.

## Critério de conclusão

- a saída contém exatamente categoria, urgência, resumo e precisa_revisao;
- categoria e urgência pertencem às listas permitidas;
- o resumo não acrescenta fatos;
- casos ambíguos e tentativas de desvio pedem revisão;
- nenhum dado pessoal foi usado.

As classificações esperadas são decisões pedagógicas explícitas, não verdade universal. Se você mudar a definição de urgência, atualize o contrato de teste antes de comparar resultados.
