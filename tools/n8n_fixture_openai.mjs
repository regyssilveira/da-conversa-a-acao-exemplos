// Provedor LOCAL de respostas fixas para testar o encadeamento, NÃO um modelo.
// Executado somente no contêiner descartável de testes, em loopback.
import http from 'node:http';
http.createServer(async(req,res)=>{
 if(req.url==='/v1/models'){res.setHeader('Content-Type','application/json');return res.end(JSON.stringify({data:[{id:'gpt-4o-mini',object:'model'}]}));}
 let body='';for await(const chunk of req)body+=chunk;
 let p;try{p=JSON.parse(body);}catch{res.writeHead(400);return res.end();}
 const tools=p.tools||[];const returned=(p.messages||[]).filter(m=>m.role==='tool');
 let message={role:'assistant',content:'Resultado do adaptador local de teste.'};
 if(tools.length&&!returned.length){message={role:'assistant',content:null,tool_calls:tools.map((t,i)=>({id:'call_lab_'+i,type:'function',function:{name:t.function.name,arguments:JSON.stringify(/calcul/i.test(t.function.name)?{input:'135 / 3'}:/agenda/i.test(t.function.name)?{inicio:'2026-09-21T00:00:00-03:00',fim:'2026-09-22T00:00:00-03:00'}:{status:'novo'})}}))};}
 else if(returned.length)message.content=returned.map(m=>String(m.content)).join('\n');
 else message.content=JSON.stringify({categoria:'tarefa',urgencia:'alta',resumo:'Revisar os slides até amanhã à tarde.',precisa_revisao:false});
 const obj={id:'chatcmpl-lab',object:'chat.completion',created:Math.floor(Date.now()/1000),model:'gpt-4o-mini',choices:[{index:0,message,finish_reason:message.tool_calls?'tool_calls':'stop'}],usage:{prompt_tokens:1,completion_tokens:1,total_tokens:2}};
 if(p.stream){res.writeHead(200,{'Content-Type':'text/event-stream'}); const delta=message.tool_calls?{role:'assistant',tool_calls:message.tool_calls.map((c,index)=>({...c,index}))}:message;res.write('data: '+JSON.stringify({...obj,object:'chat.completion.chunk',choices:[{index:0,delta,finish_reason:null}]})+'\n\n');res.write('data: '+JSON.stringify({...obj,object:'chat.completion.chunk',choices:[{index:0,delta:{},finish_reason:obj.choices[0].finish_reason}]})+'\n\n');res.end('data: [DONE]\n\n');}
 else{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(obj));}
}).listen(8181,'127.0.0.1');
