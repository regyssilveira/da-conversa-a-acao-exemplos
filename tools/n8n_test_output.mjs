// A CLI intercala logs com JSON. Extrai o objeto completo sem depender do sufixo.
export function parseExecution(text){
 const match=text.match(/\{\s*"data"\s*:/);if(!match)return;
 let depth=0,quoted=false,escaped=false;
 for(let i=match.index;i<text.length;i++){
  const c=text[i];if(quoted){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')quoted=false;}
  else if(c==='"')quoted=true;else if(c==='{')depth++;else if(c==='}'&&--depth===0)return JSON.parse(text.slice(match.index,i+1));
 }
}
