# 🎯 COMANDO PARA CONSOLE - ADICIONAR USUÁRIOS

## Para adicionar mais usuários imediatamente:

**Cole este comando no console do navegador (F12):**

```javascript
// Adicionar usuários demo
const demoUsers = [
  {name: 'Ana Silva', email: 'ana@exemplo.com', type: 'estudante', materiasGosta: ['Matemática', 'Física'], formacao: 'Engenharia', public: true},
  {name: 'Carlos Santos', email: 'carlos@exemplo.com', type: 'estudante', materiasGosta: ['História', 'Geografia'], formacao: 'Direito', public: true},
  {name: 'Prof. Maria', email: 'maria@professor.com', type: 'professor', materiasGosta: ['Português', 'Literatura'], public: true},
  {name: 'Beatriz Costa', email: 'beatriz@exemplo.com', type: 'estudante', materiasGosta: ['Química', 'Biologia'], formacao: 'Medicina', public: true}
];

const existing = JSON.parse(localStorage.getItem('enemai_users') || '[]');
const emails = existing.map(u => u.email);
const newUsers = demoUsers.filter(u => !emails.includes(u.email));
const updated = [...existing, ...newUsers];
localStorage.setItem('enemai_users', JSON.stringify(updated));
console.log(`✅ Adicionados ${newUsers.length} usuários. Total: ${updated.length}`);

// Recarregar lista
if (typeof allUsers !== 'undefined') {
  allUsers = updated;
  filterCommunity();
}
```

## ✅ Resultado:
- Adiciona 4 usuários demo
- Total: 5 usuários na comunidade
- Atualiza a lista automaticamente