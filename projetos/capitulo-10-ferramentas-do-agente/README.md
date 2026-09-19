# Capítulo 10 - Ferramentas do agente

O laboratório separa o agente de duas fontes consultivas. As versões fornecidas devolvem dados fictícios fixos, permitindo testar escolha de ferramenta sem conectar uma conta.

## Ordem segura

1. Importe `capitulo-10-ferramenta-agenda-simulada.json` e execute isoladamente.
2. Importe `capitulo-10-ferramenta-registros-simulada.json` e execute isoladamente.
3. Importe `capitulo-10-agente-planejador.json`.
4. Selecione os dois subworkflows nos respectivos nós Call n8n Workflow Tool.
5. Configure apenas a credencial do modelo de conversa.
6. Execute os pedidos de teste e confira chamadas, parâmetros e observações.

## Troca por fontes reais de laboratório

Depois que a versão simulada funcionar, duplique cada subworkflow. No primeiro, substitua o Edit Fields por Google Calendar **Get Many** e conserve somente título, início e estado. No segundo, substitua por uma consulta ao Google Sheets e conserve data, assunto, status e observação. Fixe calendário, planilha e aba dentro dos subworkflows; não permita que o modelo escolha esses recursos.

Use somente a conta de laboratório preparada no Capítulo 6. Nenhum workflow deste diretório contém credencial, segredo ou dado pessoal.
