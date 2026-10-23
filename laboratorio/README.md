# Laboratório local de teste

Esta opção é para quem já dispõe de Docker Desktop configurado. O livro mantém
o n8n Cloud como caminho inicial para pessoas sem experiência técnica. Docker
executa o n8n em um ambiente separado, chamado contêiner. A instalação local exige
manutenção e não inclui os serviços pagos de Google, OpenAI ou Telegram.

Na pasta deste repositório, execute:

```powershell
docker compose -f laboratorio/compose.yaml up -d
```

Abra http://localhost:5678 e crie sua conta de administrador local. Não reutilize
senha de outro serviço. Importe os JSON da pasta `workflows` pelo editor e deixe-os
despublicados até configurar e testar. Os modelos, os identificadores de planilha
e as credenciais devem ser selecionados pelo leitor; nunca entram no repositório.

O acesso está restrito a esta máquina. Não abra portas no roteador. O volume
`dados` preserva a configuração e as credenciais cifradas quando o contêiner para.
Não use `down -v`: essa opção apaga o volume. Para interromper sem perder dados:

```powershell
docker compose -f laboratorio/compose.yaml stop
```

A imagem está fixada na versão efetivamente testada. Atualizar exige nova
validação; consulte a documentação oficial antes de trocar a versão. Faça cópia
de segurança do volume antes de uma atualização. Não exponha este laboratório
como servidor de produção. O Telegram Trigger exige endereço HTTPS público para
receber notificações e não funciona apenas com `localhost`.

## Testes executados pelo mantenedor

`node tools/test_n8n_docker.mjs` importa cópias temporárias e executa o motor real
do n8n em um contêiner separado. Não acessa serviços externos nem reutiliza as
credenciais do editor. Relatórios são gravados em `dist/n8n-tests`.

As simulações não comprovam autenticação, permissões, custos ou disponibilidade
de integrações externas. Esses testes exigem contas e credenciais de laboratório.

Depois da bateria principal, `node tools/test_n8n_adapters.mjs` testa os chamadores
de subfluxos e a passagem pelos agentes com respostas locais fixas. A publicação
dos dois subfluxos e a inicialização de seu índice ocorrem apenas no contêiner de
testes. Nenhum fluxo do editor do leitor é publicado por esse comando.

`node tools/import_n8n_lab.mjs` é uma ferramenta de manutenção para esta composição:
importa ou atualiza os arquivos do livro por nome, preservando seus identificadores
e sem publicar. Não execute sobre projetos personalizados com os mesmos nomes:
as alterações desses fluxos seriam substituídas. Exporte sua cópia antes.

Documentação oficial: https://docs.n8n.io/hosting/installation/docker/ e
https://docs.n8n.io/hosting/cli-commands/ . A imagem, a configuração de Docker e os
comandos foram efetivamente utilizados nesta validação; não são garantia de
compatibilidade com versões futuras.
