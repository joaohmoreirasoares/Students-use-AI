// Sistema de comunidade com banco de dados real
class CommunitySystem {
  constructor() {
    this.currentUser = this.getCurrentUser()
    this.users = []
    this.messages = new Map()
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
      const response = await fetch('/api/users')
      this.users = await response.json()
      return this.users
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
      return []
    }
  }

  async saveUser(userData) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      return await response.json()
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
      return null
    }
  }

  async loadMessages(userEmail) {
    try {
      const response = await fetch(`/api/messages?from=${this.currentUser.email}&to=${userEmail}`)
      const messages = await response.json()
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

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      })

      const newMessage = await response.json()
      
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

// Inicializar sistema
const community = new CommunitySystem()

// Carregar usuários quando a página carregar
document.addEventListener('DOMContentLoaded', async () => {
  if (community.currentUser) {
    await community.loadUsers()
    community.renderUsersList('chat-list')
  }
})