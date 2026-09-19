# Capítulo 6 — Aplicativos conversando

Esta pasta acompanha dois projetos:

1. leitura dos próximos eventos do Google Calendar;
2. inclusão de um registro fictício em uma planilha Google Sheets criada para testes.

## Antes de importar

- crie um calendário secundário de testes ou use eventos fictícios;
- crie uma planilha vazia chamada `Laboratório do livro`;
- renomeie a primeira aba para `Registros`;
- crie os cabeçalhos `data`, `assunto`, `status` e `observacao` na primeira linha;
- não use agenda profissional, contatos reais ou informações confidenciais.

O arquivo `dados-ficticios/capitulo-06-registros.csv` pode ser importado na planilha para conferir a estrutura.

## Credenciais

Os workflows não contêm credenciais. Depois da importação, abra cada nó Google e conecte sua própria conta. Em n8n Cloud, a documentação atual oferece OAuth gerenciado para Calendar e Sheets. Em instalação própria, siga o guia oficial de OAuth personalizado do n8n.

Leia a tela de consentimento antes de aceitar. Use uma conta de laboratório quando possível e remova o acesso ao terminar os testes.

## Configuração da agenda

No workflow `capitulo-06-agenda-para-lista.json`:

1. escolha sua credencial no nó **Ler próximos compromissos**;
2. selecione o calendário de testes;
3. confirme o intervalo entre o momento atual e uma semana depois;
4. execute manualmente;
5. confira `titulo`, `inicio` e `estado` na saída.

## Configuração da planilha

No workflow `capitulo-06-informacao-para-planilha.json`:

1. escolha sua credencial no nó **Adicionar linha na planilha**;
2. substitua o identificador de exemplo pela planilha `Laboratório do livro`;
3. selecione a aba `Registros`;
4. confirme o mapeamento dos quatro campos;
5. execute uma vez e verifique a nova linha.

Executar repetidamente acrescenta linhas repetidas. Isso é intencional para o primeiro teste. Remova as linhas de teste manualmente e mantenha o workflow não publicado.

## Atualidade

Estrutura preparada em setembro de 2026 com base na documentação oficial. A interface, os parâmetros internos do arquivo exportado e o fluxo de consentimento podem mudar. Se a importação indicar atualização de nó, aceite a atualização oferecida pelo n8n e refaça o mapeamento conforme o guia do capítulo.
