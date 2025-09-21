// Script para popular localStorage com usuários de demonstração
// Execute no console do navegador ou inclua na página

function populateDemoUsers() {
  const demoUsers = [
    {
      name: 'Ana Silva',
      email: 'ana@exemplo.com',
      avatar: 'https://ui-avatars.com/api/?name=Ana+Silva&background=7F00FF&color=fff',
      type: 'estudante',
      materiasGosta: ['Matemática', 'Física'],
      formacao: 'Engenharia',
      public: true,
      created_at: new Date().toISOString()
    },
    {
      name: 'Carlos Santos', 
      email: 'carlos@exemplo.com',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Santos&background=00C3FF&color=fff',
      type: 'estudante',
      materiasGosta: ['História', 'Geografia'],
      formacao: 'Direito',
      public: true,
      created_at: new Date().toISOString()
    },
    {
      name: 'Prof. Maria',
      email: 'maria@professor.com',
      avatar: 'https://ui-avatars.com/api/?name=Prof+Maria&background=FF61A6&color=fff',
      type: 'professor',
      materiasGosta: ['Português', 'Literatura'],
      public: true,
      created_at: new Date().toISOString()
    },
    {
      name: 'João Oliveira',
      email: 'joao@exemplo.com',
      avatar: 'https://ui-avatars.com/api/?name=João+Oliveira&background=10B981&color=fff',
      type: 'estudante',
      materiasGosta: ['Química', 'Biologia'],
      formacao: 'Medicina',
      public: true,
      created_at: new Date().toISOString()
    },
    {
      name: 'Prof. Roberto',
      email: 'roberto@professor.com',
      avatar: 'https://ui-avatars.com/api/?name=Prof+Roberto&background=F59E0B&color=fff',
      type: 'professor',
      materiasGosta: ['Matemática', 'Física'],
      public: true,
      created_at: new Date().toISOString()
    }
  ]
  
  // Salvar no localStorage
  localStorage.setItem('enemai_users', JSON.stringify(demoUsers))
  
  console.log(`✅ ${demoUsers.length} usuários de demonstração adicionados ao localStorage`)
  
  return demoUsers
}

// Auto-executar se não houver usuários
if (typeof window !== 'undefined') {
  const existingUsers = JSON.parse(localStorage.getItem('enemai_users') || '[]')
  if (existingUsers.length === 0) {
    populateDemoUsers()
  }
}

// Exportar para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { populateDemoUsers }
}