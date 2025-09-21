// Script para adicionar mais usuários de demonstração ao localStorage
// Execute no console do navegador para ter mais usuários na comunidade

function addMoreDemoUsers() {
  const existingUsers = JSON.parse(localStorage.getItem('enemai_users') || '[]')
  
  const newUsers = [
    {
      name: 'Ana Silva',
      email: 'ana@exemplo.com',
      avatar: 'https://ui-avatars.com/api/?name=Ana+Silva&background=7F00FF&color=fff',
      type: 'estudante',
      materiasGosta: ['Matemática', 'Física'],
      formacao: 'Engenharia',
      public: true
    },
    {
      name: 'Carlos Santos', 
      email: 'carlos@exemplo.com',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Santos&background=00C3FF&color=fff',
      type: 'estudante',
      materiasGosta: ['História', 'Geografia'],
      formacao: 'Direito',
      public: true
    },
    {
      name: 'Prof. Maria',
      email: 'maria@professor.com',
      avatar: 'https://ui-avatars.com/api/?name=Prof+Maria&background=FF61A6&color=fff',
      type: 'professor',
      materiasGosta: ['Português', 'Literatura'],
      public: true
    },
    {
      name: 'Beatriz Costa',
      email: 'beatriz@exemplo.com',
      avatar: 'https://ui-avatars.com/api/?name=Beatriz+Costa&background=10B981&color=fff',
      type: 'estudante',
      materiasGosta: ['Química', 'Biologia'],
      formacao: 'Medicina',
      public: true
    },
    {
      name: 'Prof. Roberto',
      email: 'roberto@professor.com',
      avatar: 'https://ui-avatars.com/api/?name=Prof+Roberto&background=F59E0B&color=fff',
      type: 'professor',
      materiasGosta: ['Matemática', 'Física'],
      public: true
    }
  ]
  
  // Adicionar apenas usuários que não existem
  const allEmails = existingUsers.map(u => u.email)
  const usersToAdd = newUsers.filter(u => !allEmails.includes(u.email))
  
  const updatedUsers = [...existingUsers, ...usersToAdd]
  localStorage.setItem('enemai_users', JSON.stringify(updatedUsers))
  
  console.log(`✅ Adicionados ${usersToAdd.length} novos usuários`)
  console.log(`📊 Total de usuários: ${updatedUsers.length}`)
  
  // Recarregar a página para mostrar os novos usuários
  if (typeof filterCommunity === 'function') {
    allUsers = updatedUsers
    filterCommunity()
  }
  
  return updatedUsers
}

// Auto-executar
addMoreDemoUsers()