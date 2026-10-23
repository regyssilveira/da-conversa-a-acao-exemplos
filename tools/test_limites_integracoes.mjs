// Checagem estática: não cria credenciais nem chama serviços externos.
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');let checked=0;
for(const f of fs.readdirSync(path.join(root,'workflows')).filter(f=>f.endsWith('.json'))){
 const w=JSON.parse(read('workflows/'+f));for(const n of w.nodes){assert(!n.credentials||Object.keys(n.credentials).length===0,`${f}: referência de credencial inesperada`);}checked++;
}
for(const [file,nodeName,expression]of [
 ['capitulo-11-filtro-simulado.json','Identidade autorizada?',"typeof $json.texto === 'string' && $json.texto.trim().length > 0 && $json.texto.length <= 1000"],
 ['capitulo-11-assistente-telegram.json','Identidade e texto autorizados?',"typeof $json.message?.text === 'string' && $json.message.text.trim().length > 0 && $json.message.text.length <= 1000"]]){
 const w=JSON.parse(read('workflows/'+file));const n=w.nodes.find(n=>n.name===nodeName);assert.equal(n.parameters.conditions.combinator,'and');const c=n.parameters.conditions.conditions.find(c=>c.id==='limite-texto');assert.equal(c.leftValue,'={{ '+expression+' }}');assert.equal(c.operator.operation,'true');
}
for(const p of ['guias/integracoes-e-validacao.md','guias/capitulo-11-telegram.md','guias/capitulo-06-google-local.md','guias/capitulo-07-configuracao.md','guias/capitulo-10-ferramentas.md','guias/capitulo-13-aprovacao.md'])assert(read(p).trim().length>100,p);
const csv=read('guias/verificacao-integracoes.csv').trim().split(/\r?\n/);assert.equal(csv.length,13);for(const line of csv.slice(1)){const cells=line.split(',');assert.equal(cells.length,9);assert.equal(cells[4],'NAO_EXECUTADO');}
console.log(`${checked} workflows sem credenciais; limites de texto alinhados; seis guias presentes; 12 registros externos não executados.`);
console.log('Auditoria estática: não certifica integrações reais.');
