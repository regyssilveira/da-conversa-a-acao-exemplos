import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';import {fileURLToPath} from 'node:url';
import {parseExecution} from './n8n_test_output.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),dir=path.join(root,'dist/n8n-adapters');fs.mkdirSync(dir,{recursive:true});
const container='da-conversa-n8n-tests';
function run(...args){const r=spawnSync('docker',['exec',container,...args],{encoding:'utf8',timeout:120000,maxBuffer:8e6});if(r.error)throw r.error;return (r.stdout||'')+'\n'+(r.stderr||'');}
const read=f=>JSON.parse(fs.readFileSync(path.join(root,'workflows',f),'utf8'));
const agenda=read('capitulo-10-ferramenta-agenda-simulada.json');agenda.id='labadapteragenda';
const registros=read('capitulo-10-ferramenta-registros-simulada.json');registros.id='labadapterregistros';
const source=[agenda,registros],cases=[];
const input=(values)=>({assignments:{assignments:Object.entries(values).map(([name,value])=>({id:name,name,value,type:typeof value}))}});
function caller(id,values){return {name:'Chamador '+id,id:'call'+id,nodes:[{id:'t',name:'Executar',type:'n8n-nodes-base.manualTrigger',typeVersion:1,parameters:{},position:[0,0]},{id:'i',name:'Entrada',type:'n8n-nodes-base.set',typeVersion:3.4,parameters:input(values),position:[200,0]},{id:'c',name:'Chamar ferramenta',type:'n8n-nodes-base.executeWorkflow',typeVersion:1.3,parameters:{workflowId:{__rl:true,value:id,mode:'id'},workflowInputs:{mappingMode:'defineBelow',value:Object.fromEntries(Object.keys(values).map(k=>[k,`={{ $json.${k} }}`])),schema:Object.keys(values).map(id=>({id,displayName:id,type:'string',required:false,display:true})),matchingColumns:[],attemptToConvertTypes:false,convertFieldsToString:false},options:{}},position:[400,0]}],connections:{Executar:{main:[[{node:'Entrada',type:'main',index:0}]]},Entrada:{main:[[{node:'Chamar ferramenta',type:'main',index:0}]]}},settings:{executionOrder:'v1'},active:false};}
for(const [id,values]of [[agenda.id,{inicio:'2026-09-21T00:00:00-03:00',fim:'2026-09-22T00:00:00-03:00'}],[registros.id,{status:'novo'}]])cases.push({w:caller(id,values),check:r=>{const j=last(r);assert.equal(j.status,'OK');assert.equal((j.eventos||j.registros).length,1);}});
const creds={id:'lab-local-fixture',name:'SOMENTE ADAPTADOR LOCAL',type:'openAiApi',data:{apiKey:'LAB-NOT-A-REAL-KEY',url:'http://127.0.0.1:8181/v1'}};
fs.writeFileSync(path.join(dir,'credential.json'),JSON.stringify([creds]));run('n8n','import:credentials','--input=/book/dist/n8n-adapters/credential.json');
for(const [file,id]of [['capitulo-07-triagem-openai.json','labadapter07'],['capitulo-09-primeiro-agente.json','labadapter09'],['capitulo-10-agente-planejador.json','labadapter10']]){
 const w=read(file);w.id=id;delete w.versionId;
 for(const n of w.nodes){if(/\.(openAi|lmChatOpenAi)$/.test(n.type)){n.credentials={openAiApi:{id:creds.id,name:creds.name}};if(n.type.endsWith('lmChatOpenAi'))n.parameters.model={__rl:true,value:'gpt-4o-mini',mode:'id'};}
 if(n.type.endsWith('toolWorkflow')){const isAgenda=/agenda/i.test(n.name),values=isAgenda?{inicio:'2026-09-21T00:00:00-03:00',fim:'2026-09-22T00:00:00-03:00'}:{status:'novo'};n.parameters.workflowId={__rl:true,value:isAgenda?agenda.id:registros.id,mode:'id'};n.parameters.workflowInputs.value=values;n.parameters.workflowInputs.schema=Object.keys(values).map(id=>({id,displayName:id,type:'string',display:true,required:false}));}}
 cases.push({w,check:r=>{if(id==='labadapter07'){const j=last(r);assert.equal(j.message?.content?.categoria||j.categoria,'tarefa');}else{const j=last(r);assert.equal(typeof j.output,'string');if(id==='labadapter09')assert(j.output.includes('45'));else{assert(j.output.includes('Revisão semanal'));assert(j.output.includes('Preparar pauta'));}}}});
}
fs.writeFileSync(path.join(dir,'workflows.json'),JSON.stringify([...source,...cases.map(c=>c.w)]));console.log(run('n8n','import:workflow','--input=/book/dist/n8n-adapters/workflows.json'));
for(const w of source)console.log(run('n8n','publish:workflow','--id='+w.id));
// A CLI publica a versão; a inicialização do servidor reconcilia o índice de
// publicação nesta versão do n8n. O contêiner de testes não expõe portas ao host.
run('/bin/sh','-c','n8n start > /tmp/test-server.log 2>&1 &');
let ready=false;
for(let i=0;i<40;i++){const log=run('tail','-n','100','/tmp/test-server.log');if(log.includes('Editor is now accessible')){ready=true;break;}await new Promise(r=>setTimeout(r,500));}
assert(ready,'Inicialização do servidor de teste não concluída');
const restart=spawnSync('docker',['restart',container],{encoding:'utf8'});assert.equal(restart.status,0,restart.stderr);
const health=run('node','-e',"fetch('http://127.0.0.1:8181/v1/models').then(r=>{if(r.ok)console.log('READY')}).catch(()=>process.exit(1))");
if(!health.includes('READY')){const start=spawnSync('docker',['exec','-d',container,'node','/book/tools/n8n_fixture_openai.mjs'],{encoding:'utf8'});assert.equal(start.status,0,start.stderr);}
function last(r){return r.data.resultData.runData[r.data.resultData.lastNodeExecuted].at(-1).data.main.flat()[0].json;}
const results=[];for(const c of cases){const out=run('n8n','execute','--id='+c.w.id,'--rawOutput');let status='PASS',detail='',output;try{const r=parseExecution(out);assert(r,out.slice(-2000));assert.equal(r.status,'success',JSON.stringify(r.data.resultData.error));c.check(r);output=last(r);}catch(e){status='FAIL';detail=e.message;}
results.push({id:c.w.id,status,detail,output});console.log(status,c.w.id,detail);}
fs.writeFileSync(path.join(dir,'results.json'),JSON.stringify({scope:'Motor real; modelo substituído por respostas fixas locais. Não testa OpenAI.',results},null,2));process.exitCode=results.some(r=>r.status==='FAIL')?1:0;
