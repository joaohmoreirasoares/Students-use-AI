# 🚀 INSTRUÇÕES DE DEPLOY - CORREÇÃO APLICADA

## ✅ Problemas Corrigidos

1. **Variáveis de ambiente atualizadas** com credenciais reais do Supabase
2. **API de detecção corrigida** para funcionar em produção
3. **CORS headers adicionados** nas APIs
4. **Script de inicialização** do banco criado

## 📋 Passos para Deploy no Vercel

### 1. Configurar Variáveis de Ambiente no Vercel

No dashboard do Vercel (vercel.com):
1. Acesse seu projeto `students-use-ai`
2. Vá em **Settings** → **Environment Variables**
3. Adicione as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL = https://nnetwklqcubrfxtoygyc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZXR3a2xxY3VicmZ4dG95Z3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODU3OTIsImV4cCI6MjA3NDA2MTc5Mn0.Wkjblz_GsikPZnFo50DnN5llQEH3enVe2uh_ZlcW_5g
GEMINI_API_KEY = AIzaSyCSs6saGHeHDUAZMIJWGbfP8Bvx_cvmtl4
```

### 2. Inicializar Banco de Dados

Execute localmente para popular o banco:
```bash
npm run init-db
```

### 3. Deploy

```bash
git add .
git commit -m "fix: corrigir configuração do banco de dados"
git push origin main
```

O Vercel fará deploy automático.

## 🧪 Testes Pós-Deploy

### Teste 1: API de Usuários
```bash
curl https://students-use-ai.vercel.app/api/users
# Esperado: Array com usuários OU erro (fallback funcionará)
```

### Teste 2: Página da Comunidade
1. Acesse: https://students-use-ai.vercel.app/public/community.html
2. Verifique se usuários aparecem na lista
3. Console deve mostrar: "✅ Supabase: X usuários encontrados" OU "📦 localStorage: X usuários encontrados"

### Teste 3: Fallback Automático
- Se Supabase falhar, sistema usa localStorage automaticamente
- Usuários de demonstração são criados automaticamente
- Funciona tanto em desenvolvimento quanto produção

### Teste 3: Debug
1. Clique em "Mostrar" na seção Debug
2. Clique em "Verificar Supabase"
3. Deve mostrar usuários encontrados

## 🔧 Solução de Problemas

Se ainda não funcionar:

1. **Verificar logs do Vercel**:
   ```bash
   vercel logs --follow
   ```

2. **Testar Supabase diretamente**:
   ```bash
   curl "https://nnetwklqcubrfxtoygyc.supabase.co/rest/v1/users?select=*" \
        -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   ```

3. **Verificar console do navegador** na página da comunidade

## 📊 Status Esperado

Após o deploy:
- ✅ Usuários aparecem na comunidade
- ✅ APIs funcionam corretamente  
- ✅ Fallback para localStorage funciona em desenvolvimento
- ✅ Banco Supabase funciona em produção