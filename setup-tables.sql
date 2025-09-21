-- Criar tabelas no Supabase
-- Execute este SQL no Supabase SQL Editor

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
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
CREATE TABLE IF NOT EXISTS messages (
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
CREATE INDEX IF NOT EXISTS idx_messages_users ON messages(from_user, to_user);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Inserir alguns usuários de exemplo
INSERT INTO users (email, name, avatar, type, public) VALUES
('joao@exemplo.com', 'João Silva', 'https://ui-avatars.com/api/?name=João+Silva', 'estudante', true),
('maria@exemplo.com', 'Maria Santos', 'https://ui-avatars.com/api/?name=Maria+Santos', 'estudante', true),
('prof.carlos@exemplo.com', 'Prof. Carlos', 'https://ui-avatars.com/api/?name=Prof+Carlos', 'professor', true)
ON CONFLICT (email) DO NOTHING;

-- Inserir algumas mensagens de exemplo
INSERT INTO messages (from_user, to_user, text, type) VALUES
('joao@exemplo.com', 'maria@exemplo.com', 'Oi Maria! Como estão os estudos para o ENEM?', 'text'),
('maria@exemplo.com', 'joao@exemplo.com', 'Oi João! Estou focando em matemática. E você?', 'text'),
('prof.carlos@exemplo.com', 'joao@exemplo.com', 'Lembre-se de revisar as fórmulas de física!', 'text');