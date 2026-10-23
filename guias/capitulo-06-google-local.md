# Capítulo 6 — Google numa instalação local

Este caminho é opcional e exige apoio técnico. O caminho principal do livro usa
OAuth gerenciado do n8n Cloud. A instalação local não inclui essa conexão pronta.

1. Crie um projeto de laboratório no Google Cloud Console, sem usar produção.
2. Habilite Google Calendar API para agenda; para planilhas, Google Sheets API e
   Google Drive API, necessária também para localizar arquivos.
3. Configure a tela de consentimento. Num projeto externo em teste, cadastre sua
   conta de laboratório na lista de usuários de teste.
4. No n8n, abra a criação de uma credencial Google Calendar OAuth2 ou Google
   Sheets OAuth2 e copie o **OAuth Redirect URL**, endereço de retorno exibido.
5. No Google, crie um cliente OAuth para aplicação Web. Cadastre exatamente esse
   endereço como retorno autorizado. Em ambiente local, pode ser
   `http://localhost:5678/rest/oauth2-credential/callback`; copie a tela em vez de
   presumir o valor. Não é necessário expor o n8n à internet para esse retorno.
6. Cole Client ID e Client Secret apenas na credencial protegida do n8n.
   Conclua **Sign in with Google**, revisando conta e permissões. Não publique os
   valores, capturas dessa tela ou arquivos de credenciais.
7. No fluxo de agenda, escolha explicitamente o calendário secundário do livro:
   o arquivo importado não conhece seu identificador. No fluxo de planilha,
   selecione seu documento e a aba Registros, atualize as colunas e mapeie-as.
8. Execute uma vez e compare com o aplicativo Google. Registre a conta, o recurso
   de teste e os resultados sem incluir segredos. Teste também intervalo vazio,
   acesso revogado e repetição da inclusão de linha, como explica o livro.

Não ignore avisos de segurança nem bloqueios corporativos. Revise configurações
ou procure o administrador. Em modo de teste, as autorizações podem expirar;
reconecte pela credencial quando necessário.

Fonte oficial, conferida em 23/10/2026:
https://docs.n8n.io/integrations/builtin/credentials/google/oauth-single-service/

Este roteiro foi conferido com a documentação. Sem credenciais de laboratório,
a autenticação e as operações Google não foram executadas nesta validação.
