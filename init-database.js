import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nnetwklqcubrfxtoygyc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZXR3a2xxY3VicmZ4dG95Z3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODU3OTIsImV4cCI6MjA3NDA2MTc5Mn0.Wkjblz_GsikPZnFo50DnN5llQEH3enVe2uh_ZlcW_5g'

const supabase = createClient(supabaseUrl, supabaseKey)

async function initDatabase() {
  console.log('🚀 Inicializando banco de dados...')
  
  // Verificar se usuários já existem
  const { data: existingUsers } = await supabase
    .from('users')
    .select('email')
    .limit(1)
  
  if (existingUsers && existingUsers.length > 0) {
    console.log('✅ Banco já possui usuários')
    return
  }
  
  // Criar usuários de exemplo
  const sampleUsers = [
    {
      name: 'Ana Silva',
      email: 'ana@exemplo.com',
      type: 'estudante',
      materias_gosta: ['Matemática', 'Física'],
      formacao: 'Engenharia',
      public: true
    },
    {
      name: 'Carlos Santos',
      email: 'carlos@exemplo.com', 
      type: 'estudante',
      materias_gosta: ['História', 'Geografia'],
      formacao: 'Direito',
      public: true
    },
    {
      name: 'Prof. Maria',
      email: 'maria@professor.com',
      type: 'professor',
      materias_gosta: ['Português', 'Literatura'],
      public: true
    }
  ]
  
  const { data, error } = await supabase
    .from('users')
    .insert(sampleUsers)
    .select()
  
  if (error) {
    console.error('❌ Erro ao criar usuários:', error.message)
  } else {
    console.log(`✅ Criados ${data.length} usuários de exemplo`)
  }
}

initDatabase().catch(console.error)