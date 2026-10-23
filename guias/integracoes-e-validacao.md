# Integrações: o que foi testado e como conectar

Conferência documental: 23/10/2026. Não foram realizadas nesta revisão chamadas
reais ao Google, à OpenAI ou ao Telegram, nem envio pelo Gmail. Nenhuma credencial
é fornecida pelo livro. Siga o caminho simulado se não desejar autorizar serviços.
Isso permite estudar regras e conferir dados, mas não põe um agente com modelo
real em funcionamento. Não é necessário criar credenciais para ler a obra.

## Três tipos de evidência

| Identificação | Significado | O que não comprova |
|---|---|---|
| Execução local | fluxo rodou no n8n 2.44.6 com dados fictícios | acesso a outro serviço |
| Encadeamento simulado | nós reais conversaram com respostas locais fixas | interpretação de um modelo real |
| Roteiro documental | configuração conferida em documentação oficial | autenticação ou execução ponta a ponta |

As integrações externas deste guia pertencem à terceira categoria. Nos capítulos
7, 9 e 10, testes de encadeamento também foram realizados, mas o modelo foi
substituído por respostas fixas. Não confunda as duas evidências.

## Começar sem credenciais

1. Importe `workflows/capitulo-05-primeiro-fluxo.json` e execute o resumo.
2. Para classificação e rotas, use `capitulo-07-triagem-simulada.json` e
   `capitulo-08-decisoes-e-rotas.json`. A classificação é uma resposta pronta;
   alterar a mensagem não provoca uma interpretação nova.
3. Teste as duas ferramentas do capítulo 10 com um chamador manual, como explica
   `guias/capitulo-10-ferramentas.md`. Não execute o agente principal sem modelo.
4. Use `capitulo-11-filtro-simulado.json` para usuário, chat e limite de texto.
5. Execute os dados fictícios dos capítulos 12 a 16, respeitando cada guia.
   Aprovação não envia e-mail; recuperação não é busca semântica; coordenação não
   chama agentes autônomos. O monitor de preço não consulta uma fonte RSS real.

Os arquivos desta lista ficam em `workflows/`. Todos dependem de uma instância
n8n acessível, ainda que não dependam de credenciais de outros serviços.

## Regras antes de conectar um serviço

Uma credencial é uma autorização armazenada para acessar uma conta. Ela não
acompanha o JSON do livro. Cada leitor configura a sua na tela **Credentials**,
“credenciais”, ou no seletor de credencial do nó. Use conta de laboratório,
recursos fictícios, execução manual e permissões mínimas.

Não cole senha, token ou chave no campo da mensagem, na expressão, no nome do nó,
numa captura ou numa dúvida pública. Não envie segredos ao autor. Se não entender
uma permissão ou se a organização bloquear o acesso, pare e peça orientação ao
administrador. Não contorne avisos de segurança.

## Google Calendar e Sheets — capítulo 6

1. Prepare o calendário secundário **Laboratório do livro**, três eventos
   fictícios e a planilha com aba **Registros**, como no capítulo.
2. No n8n Cloud, abra a credencial Google no nó, use **Sign in with Google** se
   disponível, escolha a conta de laboratório e confira as permissões.
3. Na instalação local, siga `guias/capitulo-06-google-local.md`: projeto Google,
   serviços habilitados, tela de consentimento, cliente de aplicação Web e
   endereço de retorno copiado do n8n. Identificador e segredo do cliente ficam
   somente na credencial protegida. Esse percurso exige mais configuração.
4. Selecione explicitamente o calendário secundário. No Sheets, substitua o
   marcador de documento, escolha a aba e mapeie data, assunto, status e observacao.
5. Execute a leitura e compare cada evento com a agenda. Depois execute a escrita
   uma vez e confira a linha no Sheets. Repetir Append Row acrescenta outra linha.

Resultado esperado: eventos correspondentes ao intervalo e uma linha com os
quatro campos. Selecione um período vazio para distinguir zero itens de erro.
Autorização concluída, sozinha, não comprova essas operações. Se o recurso não
aparecer, confira a conta, o compartilhamento e a credencial; não amplie permissões
sem necessidade. Não foram observadas essas operações reais nesta edição.

Fonte: https://docs.n8n.io/integrations/builtin/credentials/google/oauth-single-service/

## OpenAI — capítulos 7, 9 e 10

1. Leia o roteiro de https://developers.openai.com/api/docs/quickstart e acesse o
   painel https://platform.openai.com. Confira projeto, cobrança e acesso ao
   modelo. Não presuma franquia gratuita nem disponibilidade do modelo citado.
2. Se optar pelo caminho com chave, crie uma chave de laboratório em
   https://platform.openai.com/api-keys e copie-a apenas para **API Key** da
   credencial OpenAI no n8n. Selecione essa credencial nos nós que usarão o modelo.
3. Siga `guias/capitulo-07-configuracao.md`: mensagens de sistema e de usuário
   separadas, saída estruturada e Edit Fields de normalização. No arquivo, esse
   último nó deve ser acrescentado pelo leitor, como explica o livro.
4. Execute uma mensagem curta. Abra a saída, confirme os quatro campos, seus tipos
   e valores permitidos. Depois teste mensagem ambígua e conteúdo inválido, sem
   ligar nenhuma ação externa. Observe o consumo informado pelo fornecedor.
5. No capítulo 9, selecione modelo compatível com ferramentas e teste os quatro
   pedidos do capítulo. Para 135 dividido por 3, confira a chamada da calculadora
   e o retorno 45; acertar o texto sem chamar a ferramenta não comprova a chamada.
6. No capítulo 10, configure os dois subfluxos conforme seu guia, fixe inicialmente
   datas/status e use os dados de 21/09/2026. Confira o retorno das duas ferramentas,
   não apenas a conclusão verde do agente.

Resultado esperado: saída válida na triagem e decisões de ferramenta coerentes
com cada pedido. Sem chave válida, acesso ao modelo e condições de cobrança
atendidas, interrompa a parte conectada. Repetir uma falha de saldo não corrige a
conta. Os adaptadores locais de teste não comprovam essas condições nem a
qualidade das respostas da OpenAI. Os caminhos de interface podem mudar.

Fonte n8n: https://docs.n8n.io/integrations/builtin/credentials/openai/

## Telegram — capítulo 11

Use `guias/capitulo-11-telegram.md`, que detalha bot, token, identificação, modelo,
limite de texto e retorno ao mesmo chat. No Cloud, use a instância ativa; numa
instalação própria, o gatilho precisa de endereço HTTPS público configurado por
quem administra o ambiente. `localhost` sozinho não recebe o webhook do Telegram.
Não abra portas nem exponha sua máquina só para concluir o exercício.

Sem essa infraestrutura, fique no filtro simulado. Ele não comprova recebimento,
identidade fornecida pelo Telegram, entrega ou privacidade das mensagens reais.

## Aprovação Gmail e demais evoluções

O capítulo 13 e `guias/capitulo-13-aprovacao.md` separam simulação e canal real.
Para Gmail local, habilite também Gmail API no projeto Google e conclua a
credencial do serviço. Use somente seu endereço de laboratório. Primeiro
configure **Send and Wait for Approval**, “enviar e aguardar aprovação”, com o
envio final desconectado. Confira recusa, aprovação e expiração na saída efetiva.
Só considere conectar o envio depois de testar também conteúdo alterado e
duplicidade, mantendo a revisão humana. Não há export pronto de Gmail neste
repositório: a montagem e a persistência seguem os passos do capítulo e do guia.

Fonte: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/

Busca semântica, memória persistente, serviços vetoriais, fontes RSS reais e
outros provedores são evoluções descritas, não implementações testadas de ponta
a ponta nesta edição. Consulte os respectivos fornecedores; não trate seus
custos, permissões ou resultados como equivalentes aos exemplos fictícios.

## Como o leitor confirma uma integração

Faça uma cópia de `guias/verificacao-integracoes.csv` para sua conferência.
Registre versão do n8n, modelo quando aplicável, data, caso e resultado observado.
Não registre token, chave, endereço pessoal nem identificador de conta.

Marque **APROVADO** somente após comparar o efeito no aplicativo externo e a
saída do nó com o esperado, incluindo um caso de falha. Até lá, mantenha
**NAO_EXECUTADO** ou **FALHOU**. Uma tela de conexão bem-sucedida ou um agente
em verde não substitui essa comparação. O livro oferece um percurso de
configuração e aprendizado, não uma certificação do ambiente de cada leitor.
