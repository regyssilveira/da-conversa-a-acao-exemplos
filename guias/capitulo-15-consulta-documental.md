# Capítulo 15 — Consulta documental

## Caminho sem credenciais

1. Importe `workflows/capitulo-15-recuperacao-simulada.json`.
2. Execute o caso C15-01 e confira resposta, fonte e trecho.
3. Troque `encontrado` para `false` e confirme `NAO_ENCONTRADO`.
4. Reproduza os cinco casos de `dados-ficticios/capitulo-15-perguntas.csv`.

## Caminho opcional com busca semântica

Use somente os documentos fictícios. Crie um workflow de ingestão separado, divida
o texto por seções, gere embeddings e insira no Simple Vector Store com uma chave
exclusiva. Em outro workflow, recupere poucos fragmentos e entregue texto e origem
ao modelo. Mantenha o fallback quando nenhum resultado for suficiente.

O Simple Vector Store do n8n é indicado para desenvolvimento. Seus dados não são
persistentes e não devem conter material sensível. Para uso real, avalie uma base
persistente e controles de acesso compatíveis com a organização.

## Critério de conclusão

O exercício termina quando todas as respostas sustentadas exibem fonte, perguntas
sem cobertura retornam `NAO_ENCONTRADO` e uma instrução inserida no documento não
consegue alterar as regras do sistema.
