# Capítulo 8 - Decisões e rotas

Importe `../../workflows/capitulo-08-decisoes-e-rotas.json`. O fluxo usa dados simulados para testar três destinos sem chamar um provedor: revisão humana, prioridade alta e fila normal.

Altere os quatro campos em **Classificação simulada** e execute novamente. Casos incertos, marcados para revisão ou fora do contrato devem terminar em revisão. Depois de validar todos os caminhos, substitua a entrada simulada pelos quatro campos produzidos no Capítulo 7.

O laboratório não envia mensagens nem modifica serviços externos. Seu critério de conclusão é observar exatamente uma rota por item e um `motivo_rota` compreensível.
