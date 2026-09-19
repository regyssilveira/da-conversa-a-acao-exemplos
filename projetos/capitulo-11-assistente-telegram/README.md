# Capítulo 11 - Assistente no Telegram

O diretório oferece dois caminhos:

- `capitulo-11-filtro-simulado.json`: testa autorização sem Telegram;
- `capitulo-11-assistente-telegram.json`: estrutura do canal real, sem credenciais nem identificadores.

## Primeiro, teste o filtro

Importe o fluxo simulado. Altere `usuario_recebido`, `chat_recebido`, `usuario_autorizado` e `chat_autorizado`. Somente a combinação em que ambos coincidem deve chegar a **Entrada autorizada**.

## Depois, configure o canal

1. Crie um bot de laboratório pelo BotFather oficial.
2. Armazene o token numa credencial Telegram do n8n.
3. Importe o fluxo real e selecione a credencial no gatilho e no envio.
4. Substitua os dois marcadores `CONFIGURE_NO_N8N` no nó de autorização pelos IDs obtidos no teste privado.
5. Configure o modelo e selecione os subworkflows consultivos do Capítulo 10.
6. Mantenha anexos, grupos e escrita externa fora do escopo.

Não publique token, User ID, Chat ID, mensagem real ou exportação contendo credenciais. Desative o workflow ao terminar o laboratório.
