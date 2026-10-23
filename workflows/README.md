# Workflows do n8n

Os arquivos não contêm credenciais, segredos nem dados pessoais. Importe, abra
cada nó e confira os campos antes de executar. Fonte de validação: n8n 2.44.6,
23/10/2026. Não publique todos os fluxos automaticamente.

As linhas que exigem contas externas representam estruturas a configurar, não
integrações reais testadas nesta edição. Antes delas, siga
`guias/integracoes-e-validacao.md`. O filtro do capítulo 11 também permite testar
texto vazio, somente espaços e o limite de 1.000 caracteres sem bot nem token.

| Arquivo (prefixo `capitulo-`) | O que demonstra | Configuração adicional |
|---|---|---|
| 05-primeiro-fluxo.json | resumo de compromisso | nenhuma |
| 06-agenda-para-lista.json | leitura do calendário | credencial Google e calendário secundário |
| 06-informacao-para-planilha.json | acrescentar registro | credencial Google, documento e aba |
| 07-triagem-simulada.json | quatro campos de referência | nenhuma; não interpreta novas mensagens |
| 07-triagem-openai.json | chamada de classificação | credencial, modelo e normalização conforme guia 7 |
| 08-decisoes-e-rotas.json | prioridade e revisão | alterar campos para testar cada rota |
| 09-primeiro-agente.json | agente com calculadora | credencial e seleção de modelo |
| 10-agente-planejador.json | agente com duas consultas | credencial, modelo, seleção dos subfluxos e entradas |
| 10-ferramenta-agenda-simulada.json | intervalo limitado a um dia | chamador com inicio/fim; publicar para chamada de produção |
| 10-ferramenta-registros-simulada.json | status restrito a novo | chamador com status; publicar para chamada de produção |
| 11-assistente-telegram.json | interface de conversa | token, IDs numéricos, modelo e endereço HTTPS público |
| 11-filtro-simulado.json | filtro de usuário e chat | nenhuma |
| 12-planejador-diario.json | conflitos e prioridades calculados | nenhuma; dados fictícios |
| 12-preparador-reuniao.json | selecionar fatos por evento | nenhuma; dados fictícios |
| 12-relatorio-semanal.json | filtrar período e somar | nenhuma; dados fictícios |
| 12-monitor-preco-rss.json | comparar preço e limite | comparação fictícia; fonte RSS não conectada |
| 13-aprovacao-simulada.json | autorizar ou bloquear envio | simulação; sem Gmail e sem persistência |
| 14-assistente-base.json | entrada válida ou revisão | nenhuma |
| 14-pendencias-semana.json | adaptação completa de pendências | nenhuma; planilha é evolução opcional |
| 15-recuperacao-simulada.json | recuperar trechos por palavras | nenhuma; não implementa busca semântica |
| 16-coordenacao-simulada.json | contratos e revisão de duas partes | nenhuma; não chama modelos |

Os capítulos 1 a 4 são de preparação; o capítulo 17 aplica procedimentos de
operação aos projetos anteriores. Nenhum deles exige um workflow adicional.

Consulte `laboratorio/README.md` para Docker e os guias de cada capítulo.
Uma importação bem-sucedida não comprova a integração externa. Confira a saída:
inclusive um agente em verde pode estar apenas relatando erro de ferramenta.
