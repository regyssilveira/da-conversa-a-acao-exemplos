# Da Conversa à Ação — exemplos práticos

Este repositório reúne os materiais atualizáveis do livro **Da Conversa à Ação**. Ele foi pensado para pessoas sem formação técnica que desejam construir automações e agentes de inteligência artificial com segurança, passo a passo.

## O que você encontrará

- roteiros dos projetos práticos;
- fluxos exportáveis do n8n;
- dados inteiramente fictícios para exercícios;
- diagramas e imagens de apoio;
- instruções de configuração e solução de problemas;
- alternativas de ferramentas quando houver opções acessíveis.

Os materiais serão publicados progressivamente durante a produção e a validação do livro. Use sempre a versão mais recente da pasta correspondente ao capítulo; o texto do livro não depende de uma tag ou de um commit específico.

## Trilha mais recente

**Antes de conectar contas:** leia [Integrações e validação](guias/integracoes-e-validacao.md).
O guia distingue execução local, encadeamento com respostas fixas e roteiros
documentais não testados com provedores reais. Você pode continuar pelos exemplos
sem credenciais externas; isso não equivale a executar um agente com modelo real.
Google, OpenAI real, Telegram e as evoluções Gmail permanecem sem validação
ponta a ponta nesta edição. O guia preserva as instruções de configuração para
quem optar por conectar e uma ficha de conferência sem dados pessoais.

A revisão de 23/10/2026 acrescenta guias operacionais dos capítulos 7, 10, 12, 13 e 14. Os três projetos do capítulo 12 calculam suas saídas a partir das listas fictícias; o capítulo 13 verifica condições de autorização sem enviar mensagens; o capítulo 14 demonstra uma adaptação completa de pendências. Rode `node tools/test_jornada_leitor.mjs` para conferir a lógica local e as conexões dos arquivos. Isso não substitui importação no n8n nem testes com serviços externos.

O Capítulo 15 acrescenta consulta documental segura. Comece pelo workflow simulado,
use os documentos e casos fictícios e só depois siga o guia opcional de busca
semântica. A versão simulada não exige credenciais nem serviço pago.

## Laboratório Docker e execução real

Consulte [laboratorio/README.md](laboratorio/README.md) para subir uma instância
local restrita à própria máquina. A imagem de referência testada é n8n 2.44.6.
`node tools/test_n8n_docker.mjs` executa cenários completos no motor real;
`node tools/test_n8n_adapters.mjs` verifica chamadas de subfluxos e agentes com
um provedor local de respostas fixas. Este último **não testa inteligência do
modelo nem a API da OpenAI**. Os relatórios locais ficam em `dist/`.

Os capítulos 15 e 16 agora verificam suas regras, em vez de apresentar saídas
aprovadas constantes. A recuperação documental continua sendo uma demonstração
limitada por palavras; a coordenação compara duas afirmações exatas.

As integrações Google, OpenAI e Telegram exigem credenciais próprias. A importação
dos arquivos e o bloqueio por falta de credencial não equivalem a testes de
autenticação ou de operações externas. O Telegram Trigger também exige um
endereço HTTPS público, ausente no laboratório restrito a `localhost`.

## Estrutura

- `projetos/`: guias completos, organizados pela sequência didática do livro;
- `workflows/`: arquivos exportados do n8n, sem credenciais;
- `dados-ficticios/`: planilhas e outros dados seguros para testes;
- `diagramas/`: fontes editáveis e versões renderizadas dos recursos visuais;
- `guias/`: instalação, contas, custos, segurança e solução de problemas.

## Segurança e privacidade

Nunca publique chaves de API, senhas, tokens, credenciais ou dados pessoais. Todos os exemplos deste repositório devem usar nomes, mensagens, endereços e registros fictícios. Consulte [SECURITY.md](SECURITY.md) antes de compartilhar um fluxo.

## Atualização tecnológica

Interfaces, preços, limites e nomes de modelos podem mudar depois da publicação do livro. As instruções deste repositório serão atualizadas quando isso for necessário. Consulte a documentação oficial indicada em cada projeto antes de usar um sistema em produção.

## Como contribuir

Correções e melhorias são bem-vindas. Leia [CONTRIBUTING.md](CONTRIBUTING.md) antes de abrir uma issue ou pull request.

## Licença

O conteúdo está disponível sob a [Licença Apache 2.0](LICENSE), salvo indicação expressa em arquivo específico.
