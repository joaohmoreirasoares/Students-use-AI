// Sistema de fallback para banco de dados
// Usa localStorage quando APIs não estão disponíveis

class DatabaseFallback {
  constructor() {
    this.isOnline = false;
    this.checkConnection();
  }

  async checkConnection() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(`${window.location.origin}/api/users`, { 
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      this.isOnline = response.ok;
    } catch (error) {
      console.log('APIs não disponíveis, usando localStorage');
      this.isOnline = false;
    }
  }

  // Usuários
  async getUsers() {
    if (this.isOnline) {
      try {
        const response = await fetch('/api/users');
        return await response.json();
      } catch (error) {
        console.error('Erro na API, usando fallback:', error);
      }
    }
    
    // Fallback para localStorage
    const users = JSON.parse(localStorage.getItem('enemai_users') || '[]');
    return users.filter(u => u.public !== false);
  }

  async saveUser(userData) {
    if (this.isOnline) {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        return await response.json();
      } catch (error) {
        console.error('Erro na API, usando fallback:', error);
      }
    }

    // Fallback para localStorage
    const users = JSON.parse(localStorage.getItem('enemai_users') || '[]');
    const existingIndex = users.findIndex(u => u.email === userData.email);
    
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...userData };
    } else {
      users.push(userData);
    }
    
    localStorage.setItem('enemai_users', JSON.stringify(users));
    return userData;
  }

  // Mensagens
  async getMessages(fromEmail, toEmail) {
    if (this.isOnline) {
      try {
        const response = await fetch(`/api/messages?from=${fromEmail}&to=${toEmail}`);
        return await response.json();
      } catch (error) {
        console.error('Erro na API, usando fallback:', error);
      }
    }

    // Fallback para localStorage
    const chatKey = 'enemai_chat_' + [fromEmail, toEmail].sort().join('_');
    return JSON.parse(localStorage.getItem(chatKey) || '[]');
  }

  async saveMessage(messageData) {
    if (this.isOnline) {
      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(messageData)
        });
        return await response.json();
      } catch (error) {
        console.error('Erro na API, usando fallback:', error);
      }
    }

    // Fallback para localStorage
    const chatKey = 'enemai_chat_' + [messageData.from, messageData.to].sort().join('_');
    const messages = JSON.parse(localStorage.getItem(chatKey) || '[]');
    
    const newMessage = {
      ...messageData,
      created_at: new Date().toISOString(),
      id: Date.now().toString()
    };
    
    messages.push(newMessage);
    localStorage.setItem(chatKey, JSON.stringify(messages));
    return newMessage;
  }

  // Status da conexão
  getStatus() {
    return {
      online: this.isOnline,
      storage: this.isOnline ? 'Database' : 'LocalStorage'
    };
  }
}

// Instância global
window.dbFallback = new DatabaseFallback();