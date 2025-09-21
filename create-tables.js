import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nnetwklqcubrfxtoygyc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZXR3a2xxY3VicmZ4dG95Z3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODU3OTIsImV4cCI6MjA3NDA2MTc5Mn0.Wkjblz_GsikPZnFo50DnN5llQEH3enVe2uh_ZlcW_5g'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTables() {
  console.log('🔧 Criando tabelas no Supabase...')
  
  // SQL para criar tabelas
  const createUsersTable = `
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
  `
  
  const createMessagesTable = `
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
  `
  
  const createIndexes = `
    CREATE INDEX IF NOT EXISTS idx_messages_users ON messages(from_user, to_user);
    CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `
  
  try {
    // Executar SQLs
    const { error: usersError } = await supabase.rpc('exec_sql', { sql: createUsersTable })
    if (usersError) {
      console.log('⚠️ Tabela users:', usersError.message)
    } else {
      console.log('✅ Tabela users criada')
    }
    
    const { error: messagesError } = await supabase.rpc('exec_sql', { sql: createMessagesTable })
    if (messagesError) {
      console.log('⚠️ Tabela messages:', messagesError.message)
    } else {
      console.log('✅ Tabela messages criada')
    }
    
    const { error: indexError } = await supabase.rpc('exec_sql', { sql: createIndexes })
    if (indexError) {
      console.log('⚠️ Índices:', indexError.message)
    } else {
      console.log('✅ Índices criados')
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message)
    console.log('\n📝 Execute manualmente no Supabase SQL Editor:')
    console.log(createUsersTable)
    console.log(createMessagesTable)
    console.log(createIndexes)
  }
}

createTables().catch(console.error)