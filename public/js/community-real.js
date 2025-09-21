// Sistema de comunidade com banco de dados real + fallback
class CommunitySystem {
  constructor() {
    this.currentUser = this.getCurrentUser()
    this.users = []
    this.messages = new Map()
    this.db = window.dbFallback || new DatabaseFallback()
  }

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('enemai_user'))
    } catch {
      return null
    }
  }

  async loadUsers() {
    try {
      this.users = await this.db.getUsers()
      return this.users
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
      return []
    }
  }

  async saveUser(userData) {
    try {
      return await this.db.saveUser(userData)
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
      return null
    }
  }

  async loadMessages(userEmail) {
    try {
      const messages = await this.db.getMessages(this.currentUser.email, userEmail)
      this.messages.set(userEmail, messages)
      return messages
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error)
      return []
    }
  }

  async sendMessage(to, text, type = 'text', noteData = null) {
    try {
      const messageData = {
        from: this.currentUser.email,
        to,
        text,
        type,
        note_data: noteData,
        read: false
      }

      const newMessage = await this.db.saveMessage(messageData)
      
      // Atualizar cache local
      const messages = this.messages.get(to) || []
      messages.push(newMessage)
      this.messages.set(to, messages)
      
      return newMessage
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      return null
    }
  }

  renderUsersList(containerId) {
    const container = document.getElementById(containerId)
    if (!container) return

    container.innerHTML = ''

    this.users.forEach(user => {
      if (user.email === this.currentUser?.email) return

      const userCard = document.createElement('div')
      userCard.className = 'contact-item'
      userCard.innerHTML = `
        <img src="${user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}" 
             alt="Avatar" class="contact-avatar">
        <div class="contact-info">
          <h3>${user.name}</h3>
          <p>${user.email}</p>
        </div>
      `
      
      userCard.onclick = () => this.openChat(user)
      container.appendChild(userCard)
    })
  }

  async openChat(user) {
    const messages = await this.loadMessages(user.email)
    this.renderMessages(messages, user)
    this.setupMessageInput(user)
  }

  renderMessages(messages, user) {
    const container = document.getElementById('chat-messages')
    if (!container) return

    container.innerHTML = ''

    messages.forEach(msg => {
      const messageDiv = document.createElement('div')
      messageDiv.className = `message ${msg.from === this.currentUser.email ? 'message-sent' : 'message-received'}`
      
      if (msg.type === 'note' && msg.note_data) {
        messageDiv.innerHTML = `
          <div class="message-header">
            <i class="fas fa-sticky-note"></i> Anotação
          </div>
          <div class="note-content">${msg.note_data.content}</div>
          <div class="message-time">${new Date(msg.created_at).toLocaleTimeString()}</div>
        `
        messageDiv.classList.add('note-message')
      } else {
        messageDiv.innerHTML = `
          <div>${msg.text}</div>
          <div class="message-time">${new Date(msg.created_at).toLocaleTimeString()}</div>
        `
      }
      
      container.appendChild(messageDiv)
    })

    container.scrollTop = container.scrollHeight
  }

  setupMessageInput(user) {
    const input = document.getElementById('chat-input')
    const sendBtn = document.getElementById('send-message-btn')
    
    if (!input || !sendBtn) return

    const sendMessage = async () => {
      const text = input.value.trim()
      if (!text) return

      await this.sendMessage(user.email, text)
      input.value = ''
      this.openChat(user) // Recarregar mensagens
    }

    sendBtn.onclick = sendMessage
    input.onkeypress = (e) => {
      if (e.key === 'Enter') sendMessage()
    }
  }
}

// Aguardar o sistema de fallback estar pronto
let community

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCommunity)
} else {
  initCommunity()
}

function initCommunity() {
  // Aguardar um pouco para garantir que o fallback foi carregado
  setTimeout(() => {
    community = new CommunitySystem()
  }, 100)
}

// Carregar usuários quando a página carregar
document.addEventListener('DOMContentLoaded', async () => {
  if (community.currentUser) {
    await community.loadUsers()
    community.renderUsersList('chat-list')
    
    // Mostrar status do banco de dados
    const status = community.db.getStatus()
    console.log(`💾 Banco de dados: ${status.storage} (${status.online ? 'Online' : 'Offline'})`)
    
    // Adicionar indicador visual (opcional)
    const statusIndicator = document.createElement('div')
    statusIndicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: ${status.online ? '#10b981' : '#f59e0b'};
      color: white;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 12px;
      z-index: 9999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `
    statusIndicator.textContent = `💾 ${status.storage}`
    statusIndicator.title = status.online ? 'Usando banco de dados online' : 'Usando armazenamento local (desenvolvimento)'
    document.body.appendChild(statusIndicator)
    
    // Remover indicador após 5 segundos
    setTimeout(() => {
      if (statusIndicator.parentNode) {
        statusIndicator.remove()
      }
    }, 5000)
  }
})