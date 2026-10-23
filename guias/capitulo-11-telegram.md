# Capítulo 11 — Telegram sem presumir uma integração pronta

**Estado:** roteiro documental. A recepção e o envio reais não foram executados
na validação desta edição. O arquivo é uma estrutura a configurar; o teste local
do filtro não substitui o teste com Telegram e modelo.

## Sem conta de provedor nem bot

Importe `workflows/capitulo-11-filtro-simulado.json`. Em **Criar entrada fictícia**,
conserve usuário 1001 e chat 2001 como valores fictícios. Execute: a entrada curta
segue para **Entrada autorizada**. Mude usuário ou chat e confirme o encerramento.
Teste `texto` vazio, somente espaços, 1.000 e 1.001 caracteres. O último deve ser
recusado. Esse arquivo não recebe nem envia mensagens, não chama modelo e não
descobre identidades reais.

## Configurar o caminho conectado, se desejar

1. Use conta e ambiente de laboratório autorizados. No Telegram, confirme o
   **@BotFather** oficial e use `/newbot`, comando de criação de bot. Siga as
   orientações de nome. Não acrescente o bot a grupos. Leia o tutorial oficial:
   https://core.telegram.org/bots/tutorial .
2. O token recebido é uma autorização secreta. Copie-o somente para **Access
   Token**, “token de acesso”, de uma credencial Telegram no n8n. Não use uma URL
   contendo o token no navegador nem publique capturas dele.
3. Importe `workflows/capitulo-11-assistente-telegram.json` e deixe-o despublicado.
   Selecione a credencial tanto em **Receber mensagem do Telegram** quanto em
   **Responder ao mesmo chat**. Escolha também credencial e modelo de conversa,
   segundo o capítulo 7. O arquivo conecta apenas a calculadora inicialmente;
   para consultar agenda e registros, adicione as ferramentas do capítulo 10.
4. Confirme a infraestrutura antes de escutar: no Cloud, a instância deve estar
   ativa. Na instalação própria, o administrador deve configurar HTTPS público
   e o endereço de webhook correto. A composição Docker do livro é restrita à
   máquina e não fornece essa exposição. Não desative verificações de segurança.
5. Teste somente o gatilho e mande `teste` ao bot. Se necessário, abra antes a
   conversa do bot e use Start, “iniciar”. Na saída do gatilho, abra `message`,
   depois `from.id` e `chat.id`. Use apenas a sua conversa privada de teste.
6. Em **Identidade e texto autorizados?**, substitua os dois marcadores
   `CONFIGURE_NO_N8N` pelos números observados, sem aspas: primeiro o usuário,
   depois o chat. A comparação é numérica e estrita. Marcadores não substituídos
   podem causar erro de configuração; não são uma autorização pronta.
7. No gatilho, restrinja a usuário e chat quando a versão oferecer essas opções,
   selecione apenas **Message** e deixe download desativado. O If mantém uma
   segunda verificação de identidade, texto não vazio e até 1.000 caracteres.
8. Execute a cópia completa em modo de teste. Para o primeiro teste com apenas a
   calculadora, mande a pergunta sobre 135 minutos em três sessões. Abra o rastro
   para conferir a ferramenta e a resposta ao mesmo chat. Só teste a agenda após
   adicionar e configurar as duas ferramentas correspondentes.
9. Confira anexo sem texto, mensagem longa e solicitação fora do escopo. Para
   testar identidade recusada, use o fluxo simulado; não envolva outra pessoa.
   Não publique o bot se alguma entrada indevida alcançar o agente.
10. Publique apenas para um teste acompanhado, depois desative. Use bot separado
    para outro fluxo: o teste e a publicação podem disputar o único webhook do
    bot. Se não receber eventos, confira a instância, o endereço HTTPS e se outro
    workflow registrou o mesmo bot. Não presuma que uma mensagem vazia prova
    ausência de dados ou ausência de falha.

Mantenha o Chat ID de resposta ligado ao gatilho, não a um destino fornecido ao
modelo. Para revogar acesso, desative o fluxo e invalide o token no BotFather.
Se houve exposição, um novo token exige reconectar a credencial.

Fontes oficiais, conferidas em 23/10/2026:

- https://docs.n8n.io/integrations/builtin/credentials/telegram/
- https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/
- https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/common-issues/

Resultados esperados são critérios para o teste do leitor, não relatos de
execuções externas já realizadas pelo livro.
