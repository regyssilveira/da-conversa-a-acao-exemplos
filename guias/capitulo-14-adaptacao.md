# Capítulo 14 — Da reunião à rotina própria

Use `workflows/capitulo-14-pendencias-semana.json`. A configuração inicial não usa serviços, credenciais ou modelo. Data de referência: 2026-09-21; janela: sete dias, incluindo 21 a 27/09. Datas são civis, sem horário. A transformação usa uma referência de calendário uniforme para evitar depender do fuso da máquina.

1. Execute e confirme P-02 antes de P-01; P-03 está concluída.
2. Troque os títulos por preparações de aula ou de atendimento. Preserve id, prazo e estado. A regra não muda.
3. Troque o prazo de P-01 para 28/09: ele sai. Troque para 27/09: ele entra.
4. Use `[]` em dados: VAZIO. Apague prazo, use dia inexistente, repita id ou invente estado: REVISAO, sem lista parcial apresentada como completa.

## Troca de fonte

Crie uma aba Pendencias com id, titulo, prazo, estado, em formato texto. Consulte por Google Sheets Get Row(s), como no capítulo 6. O resultado esperado é um item por linha. Adicione Edit Fields depois da consulta, mantendo todos os campos, e acrescente `data_referencia` (texto: 2026-09-21) e `dias` (número: 7). Ative e conecte **Reunir linhas da planilha**, que está desativado e desconectado na importação, a **Selecionar pendências**. Desconecte a entrada fixa. O auxiliar reúne as linhas no contrato que a transformação já aceita; não é necessário editar seu código.

Se a planilha vazia não emitir item, ative Always Output Data na consulta e trate explicitamente o objeto vazio antes de reunir as linhas: devolva dados `[]` com o mesmo período. Não confunda consulta sem dados com falha da credencial. Para trabalho diário, depois dos testes, a referência pode receber uma expressão de data atual do n8n; confira a prévia e o fuso antes de usar. Preserve uma cópia com o período fixo para regressão.

## Como a lógica foi construída

A transformação lê o texto JSON, verifica período e campos, rejeita identificador repetido, mantém somente abertas no período, ordena por prazo/id e monta o resumo. Nenhum dado vira código executável. O capítulo usa a lógica pronta para permitir adaptação por configuração; o código é aberto para inspeção e estudo, sem promessa de que o leitor já sabe programá-lo.

Antes de conectar IA, obtenha o mesmo resultado com os dados fixos e com a planilha. A geração de duas frases é uma opção posterior, não parte da seleção. Compare novamente cada id e prazo com a lista calculada.
