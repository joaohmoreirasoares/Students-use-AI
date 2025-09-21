# 🚀 Setup Rápido do Banco de Dados

## ❌ Problema Detectado
As tabelas não existem no Supabase ainda.

## ✅ Solução Rápida

### 1. Acesse o Supabase
- Vá para: https://supabase.com/dashboard
- Entre no seu projeto: `nnetwklqcubrfxtoygyc`

### 2. Execute o SQL
- Clique em "SQL Editor" no menu lateral
- Copie e cole o conteúdo do arquivo `setup-tables.sql`
- Clique em "Run" para executar

### 3. Teste Novamente
```bash
node check-database.js
```

## 📋 O que o SQL faz:
- ✅ Cria tabela `users` (usuários)
- ✅ Cria tabela `messages` (mensagens)  
- ✅ Adiciona índices para performance
- ✅ Insere 3 usuários de exemplo
- ✅ Insere mensagens de exemplo

## 🎯 Resultado Esperado:
```
👥 Usuários encontrados: 3
  • João Silva (joao@exemplo.com)
  • Maria Santos (maria@exemplo.com)  
  • Prof. Carlos (prof.carlos@exemplo.com)

💬 Mensagens encontradas: 3
  • joao@exemplo.com → maria@exemplo.com: Oi Maria! Como estão os estudos...
```

## 🔄 Alternativa (se não quiser configurar agora):
O sistema continua funcionando com localStorage automaticamente!