# Setup do Banco de Dados - Comunidade ENEM AI

## 1. Criar conta no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Crie um novo projeto

## 2. Configurar Tabelas

Execute estes comandos SQL no Supabase SQL Editor:

```sql
-- Tabela de usuários
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  avatar VARCHAR,
  type VARCHAR DEFAULT 'estudante',
  materias_gosta TEXT[],
  formacao VARCHAR,
  public BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de mensagens
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user VARCHAR NOT NULL,
  to_user VARCHAR NOT NULL,
  text TEXT,
  type VARCHAR DEFAULT 'text',
  note_data JSONB,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_messages_users ON messages(from_user, to_user);
CREATE INDEX idx_messages_created ON messages(created_at);
CREATE INDEX idx_users_email ON users(email);
```

## 3. Configurar Variáveis de Ambiente

1. Copie `.env.example` para `.env.local`
2. Preencha com suas credenciais do Supabase:
   - URL do projeto
   - Chave anônima (anon key)

## 4. Instalar Dependências

```bash
npm install
```

## 5. Testar

```bash
npm run dev
```

A comunidade agora funcionará com banco de dados real!