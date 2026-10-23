// Atualiza apenas workflows do livro, por nome, sem duplicar nem tocar credenciais.
import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const container='da-conversa-a-acao-lab-n8n-1',dir=path.join(root,'dist/n8n-import');fs.mkdirSync(dir,{recursive:true});
function run(args){const r=spawnSync('docker',args,{encoding:'utf8',timeout:120000});if(r.status!==0)throw Error(r.stderr||r.stdout);return r.stdout;}
run(['exec',container,'n8n','export:workflow','--all','--output=/tmp/book-existing.json']);
run(['cp',container+':/tmp/book-existing.json',path.join(dir,'existing.json')]);
const old=JSON.parse(fs.readFileSync(path.join(dir,'existing.json'),'utf8'));
const bundle=fs.readdirSync(path.join(root,'workflows')).filter(f=>f.endsWith('.json')).map(f=>{
 const w=JSON.parse(fs.readFileSync(path.join(root,'workflows',f),'utf8'));const matches=old.filter(x=>x.name===w.name);if(matches.length>1)throw Error('Nome duplicado: '+w.name);if(matches[0])w.id=matches[0].id;return w;
});
fs.writeFileSync(path.join(dir,'import.json'),JSON.stringify(bundle));
run(['cp',path.join(dir,'import.json'),container+':/tmp/book-import.json']);
console.log(run(['exec',container,'n8n','import:workflow','--input=/tmp/book-import.json']));
console.log(`${bundle.length} fluxos do livro atualizados; nenhum publicado automaticamente.`);
