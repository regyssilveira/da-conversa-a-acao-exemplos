# Capítulo 7 — Da mensagem aos quatro campos

Verificação documental: 23/10/2026. Este guia não comprova uma chamada paga na conta do leitor.

Não houve chamada real à OpenAI na validação desta edição. A execução com respostas
locais fixas comprovou o encadeamento, não a interpretação, a cobrança nem o acesso
ao modelo. Você pode concluir a simulação sem criar credencial. Para o caminho
conectado, siga os passos abaixo e registre o resultado efetivamente observado em
`guias/verificacao-integracoes.csv`; não marque como aprovado apenas por importar.

1. Importe `workflows/capitulo-07-triagem-simulada.json`. Execute e confira categoria, urgencia, resumo e precisa_revisao em **Exibir quatro campos**. Não exige conta externa.
2. Para chamada real, siga https://docs.n8n.io/integrations/builtin/credentials/openai/. Entre em https://platform.openai.com, confira cobrança e acesso, gere uma chave em https://platform.openai.com/api-keys e salve somente na credencial protegida do n8n.
3. Importe `workflows/capitulo-07-triagem-openai.json`. O arquivo usa a operação de conversa; versões novas podem chamá-la **Generate a Chat Completion**, e antigas, **Message a Model**. Selecione a credencial e um modelo de texto disponível. O modelo indicado no arquivo é referência, não garantia de disponibilidade ou preço.
4. Separe o contrato do livro em mensagem System e o campo `mensagem` em mensagem User. Ative saída JSON e saída simplificada. Documentação: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations/.
5. Execute uma mensagem. Expanda a saída e descubra onde estão os quatro campos. Se estão em `message.content`, arraste os campos desse objeto ao Edit Fields. Não copie esse caminho se a sua saída tiver outra estrutura.
6. Se `content` for texto, confira a opção JSON e repita. Como alternativa, crie num Edit Fields um campo Object chamado `classificacao` com a expressão `{{ $json.message.content.parseJson() }}`. `parseJson()` interpreta texto JSON; `message.content` é apenas o caminho do exemplo. A função pode devolver `undefined`, valor indefinido, quando o texto não é JSON válido: ela não garante um erro que interrompa o fluxo. Acrescente um If verificando que `classificacao` existe antes de usar `{{ $json.classificacao.categoria }}`; mande o caminho falso para revisão. Depois valide os quatro campos como no capítulo 8. Não execute texto como código. Referência: https://docs.n8n.io/build/work-with-data/transform-data/expression-reference/string.md#stringparsejson.
7. Para um fluxo que aceite um analisador conectado, o **Structured Output Parser** oferece **Generate from JSON Example**: cole o objeto de quatro campos do capítulo. Isso define nomes e tipos, não garante os valores das categorias. Valide a lista no capítulo 8. Referência: https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/.

O arquivo OpenAI não contém o nó final de normalização: acrescente-o como no livro. Preserve String para categoria, urgencia e resumo; Boolean para precisa_revisao. Teste as quatro mensagens do capítulo antes de conectar rotas. Formato correto não comprova interpretação correta.
