// Executar dentro da imagem n8n; lê somente descrições públicas dos nós instalados.
const fs=require('node:fs');
const base='/usr/local/lib/node_modules/n8n/node_modules/';
const problems=[]; let checked=0;
for(const file of fs.readdirSync('/book/workflows').filter(x=>x.endsWith('.json'))){
 const wf=JSON.parse(fs.readFileSync('/book/workflows/'+file));
 for(const node of wf.nodes){
  const pkg=node.type.startsWith('n8n-nodes-base.')?'n8n-nodes-base':'@n8n/n8n-nodes-langchain';
  const registry=require(base+pkg+'/dist/known/nodes.json');
  const name=node.type.split('.').at(-1), entry=registry[name];
  if(!entry){problems.push({file,node:node.name,error:'tipo ausente'});continue;}
  const instance=new (require(base+pkg+'/'+entry.sourcePath)[entry.className])();
  const versions=instance.nodeVersions?Object.keys(instance.nodeVersions).map(Number):[].concat(instance.description.version);
  if(!versions.includes(node.typeVersion))problems.push({file,node:node.name,error:'versão ausente',requested:node.typeVersion,versions});
  checked++;
 }
}
console.log(JSON.stringify({checked,problems},null,2));process.exitCode=problems.length?1:0;
