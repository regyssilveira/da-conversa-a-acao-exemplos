# Capítulo 13 — Aprovação humana

O workflow simula a passagem de um rascunho por aprovação, rejeição ou expiração. Ele não possui credencial nem nó de envio externo.

## Teste seguro

1. Importe `workflows/capitulo-13-aprovacao-simulada.json`.
2. Execute com `decisao` igual a `aprovado`, `rejeitado` e `expirado`.
3. Confirme que apenas `aprovado` chega a **Simular envio único**.
4. Troque `conteudo_aprovado` para `false` e confirme o bloqueio.
5. Repita a mesma `chave_execucao` num registro de controle antes de conectar qualquer serviço real.

O endereço usa o domínio reservado `.invalid`. Para um teste real posterior, utilize somente um endereço controlado por você, configure expiração, identifique o aprovador e revalide o conteúdo depois da espera.
