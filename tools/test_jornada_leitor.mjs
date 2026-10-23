import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => JSON.parse(fs.readFileSync(path.join(root, 'workflows', name), 'utf8'));
const entrada = (wf, name) => Object.fromEntries(wf.nodes.find(n => n.name === name).parameters.assignments.assignments.map(x => [x.name, x.value]));
const executar = (wf, name, json) => new Function('$input', wf.nodes.find(n => n.name === name).parameters.jsCode)({ first: () => ({ json }), all: () => [{ json }] })[0].json;
let casos = 0;
const wf = read('capitulo-14-pendencias-semana.json');
const base = entrada(wf, 'Preparar dados');
const testar = (nome, entrada, esperado) => { const r = executar(wf, 'Selecionar pendências', entrada); assert.equal(r.situacao, esperado, nome); casos++; return r; };
assert.deepEqual(testar('completo', base, 'OK').selecionados.map(x => x.id), ['P-02', 'P-01']);
const dados = JSON.parse(base.dados);
for (const [prazo, ids] of [['2026-09-28', ['P-02']], ['2026-09-27', ['P-02', 'P-01']], ['2026-09-20', ['P-02']]]) {
  const lista = structuredClone(dados); lista[0].prazo = prazo;
  assert.deepEqual(testar(prazo, {...base, dados:JSON.stringify(lista)}, 'OK').selecionados.map(x=>x.id), ids);
}
testar('vazio', {...base, dados:'[]'}, 'VAZIO');
for (const alteracao of [r=>delete r.prazo, r=>r.prazo='2026-02-30', r=>r.estado='fazendo', r=>r.titulo='', r=>r.id='']) {
  const lista = structuredClone(dados); alteracao(lista[0]); testar('inválido', {...base,dados:JSON.stringify(lista)}, 'REVISAO');
}
testar('duplicado', {...base,dados:JSON.stringify([...dados,dados[0]])}, 'REVISAO');
testar('JSON inválido', {...base,dados:'[texto]'}, 'REVISAO');
testar('data inválida', {...base,data_referencia:'amanhã'}, 'REVISAO');
testar('período inválido', {...base,dias:0}, 'REVISAO');
const rotulos = structuredClone(dados); rotulos[0].titulo='Separar atividade'; rotulos[1].titulo='Revisar apresentação';
assert.deepEqual(testar('adaptação', {...base,dados:JSON.stringify(rotulos)}, 'OK').selecionados.map(x=>x.id), ['P-02','P-01']);

const aprovacao = read('capitulo-13-aprovacao-simulada.json');
const pacote = entrada(aprovacao, 'Montar pacote de aprovação');
const validar = (mudanca, esperado) => { const r=executar(aprovacao, 'Verificar autorização', {...pacote,...mudanca}); assert.equal(r.resultado, esperado); casos++; return r; };
const primeiro=validar({},'PRONTO_PARA_SIMULAR');
validar({decisao:'rejeitado'},'BLOQUEADO_REJEITADO');
validar({decisao:''},'BLOQUEADO_SEM_APROVACAO');
validar({agora_teste:pacote.expira_em},'BLOQUEADO_EXPIRADO');
validar({expira_em:'amanhã'},'BLOQUEADO_EXPIRADO');
validar({corpo:'outro texto'},'BLOQUEADO_CONTEUDO');
validar({destino:'outro@example.invalid'},'BLOQUEADO_CONTEUDO');
validar({aprovador:'OUTRO'},'BLOQUEADO_IDENTIDADE');
validar({historico_chaves:primeiro.historico_proposto},'BLOQUEADO_DUPLICADO');
validar({destino:''},'BLOQUEADO_CAMPO');

for (const [tipo, dados, esperado] of [
  ['agenda',{inicio:'2026-09-21T00:00:00-03:00',fim:'2026-09-22T00:00:00-03:00'},true],
  ['agenda',{inicio:'2026-09-21T00:00:00-03:00',fim:'2026-10-22T00:00:00-03:00'},false],
  ['agenda',{inicio:'inválido',fim:'2026-09-22T00:00:00-03:00'},false],
  ['agenda',{inicio:'2026-09-22T00:00:00-03:00',fim:'2026-09-21T00:00:00-03:00'},false],
  ['registros',{status:'novo'},true],
  ['registros',{status:'todos'},false],
]) {
  const w=read(`capitulo-10-ferramenta-${tipo}-simulada.json`);
  const nome=tipo==='agenda'?'Devolver evento fictício':'Devolver registro fictício';
  const r=executar(w,nome,dados); assert.equal(!r.erro,esperado); casos++;
}

for (const [arquivo, conferir] of [
  ['capitulo-12-planejador-diario.json', r => { assert.equal(r.compromissos.length,3); assert.equal(r.conflitos.length,1); assert.deepEqual(r.prioridades.map(x=>x.id),['TAR-201','TAR-202']); assert.deepEqual(r.lacunas,['TAR-204']); }],
  ['capitulo-12-preparador-reuniao.json', r => assert.deepEqual(r.fatos.map(x=>x.fonte_id),['REG-301','REG-302'])],
  ['capitulo-12-relatorio-semanal.json', r => { assert.equal(r.total,18); assert.equal(r.registros,4); assert.deepEqual(r.tabela.map(x=>x.quantidade).sort((a,b)=>a-b),[7,11]); }],
]) {
  const projeto=read(arquivo), valores=entrada(projeto,'Carregar dados fictícios');
  conferir(executar(projeto,'Aplicar regras e conferir',valores)); casos++;
  const invalido={...valores};
  if(valores.projeto==='planejador') invalido.fonte_disponivel=false;
  else invalido.registros='não é JSON';
  assert.equal(executar(projeto,'Aplicar regras e conferir',invalido).status,'REVISAO'); casos++;
}

for (const arquivo of fs.readdirSync(path.join(root,'workflows')).filter(x=>x.endsWith('.json'))) {
  const w=read(arquivo); const nomes=new Set(w.nodes.map(n=>n.name));
  assert.equal(nomes.size,w.nodes.length,arquivo);
  for (const [origem,ligacoes] of Object.entries(w.connections || {})) {
    assert(nomes.has(origem),arquivo+': origem');
    for (const canais of Object.values(ligacoes)) for (const rota of canais) for (const link of rota) assert(nomes.has(link.node),arquivo+': destino');
  }
}
console.log(`${casos} casos da jornada aprovados; JSON e conexões dos workflows consistentes.`);
console.log('Teste local da lógica; não executa n8n, Google, Gmail ou chamadas de modelo.');
