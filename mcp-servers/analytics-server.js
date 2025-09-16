// mcp-servers/analytics-server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:8000', // Permitir requisições do frontend
  credentials: true
}));
app.use(express.json()); // Para parsear JSON no body

// --- Simulação de Banco de Dados ---
let fakeDatabase = {
  dailyMetrics: [
    { date: '2023-06-01', visits: 1200, uniqueUsers: 800, notesCreated: 150, chatMessages: 450, aiQuestions: 80 },
    { date: '2023-06-02', visits: 1900, uniqueUsers: 1200, notesCreated: 210, chatMessages: 620, aiQuestions: 110 },
    { date: '2023-06-03', visits: 1300, uniqueUsers: 900, notesCreated: 180, chatMessages: 510, aiQuestions: 95 },
    { date: '2023-06-04', visits: 1700, uniqueUsers: 1100, notesCreated: 200, chatMessages: 580, aiQuestions: 105 },
    { date: '2023-06-05', visits: 2100, uniqueUsers: 1400, notesCreated: 250, chatMessages: 720, aiQuestions: 130 },
    { date: '2023-06-06', visits: 1800, uniqueUsers: 1200, notesCreated: 220, chatMessages: 650, aiQuestions: 115 },
    { date: '2023-06-07', visits: 2300, uniqueUsers: 1600, notesCreated: 280, chatMessages: 810, aiQuestions: 150 },
  ],
  users: [
    { id: 1, name: 'João Silva', email: 'joao@example.com', status: 'active', type: 'user', registrationDate: '2023-01-15' },
    { id: 2, name: 'Maria Oliveira', email: 'maria@example.com', status: 'active', type: 'user', registrationDate: '2023-02-20' },
    { id: 3, name: 'Pedro Santos', email: 'pedro@example.com', status: 'inactive', type: 'user', registrationDate: '2023-03-10' },
    { id: 4, name: 'Ana Costa', email: 'ana@example.com', status: 'active', type: 'admin', registrationDate: '2023-04-05' },
  ],
  settings: {
    max_login_attempts: 5,
    lockout_duration: 15,
    session_timeout: 30,
  }
};

// --- Funções de Lógica de Negócio (Simuladas) ---

function getDashboardStats() {
  const last7Days = fakeDatabase.dailyMetrics.slice(-7);
  
  const totalUsers = fakeDatabase.users.length;
  const activeUsers = fakeDatabase.users.filter(u => u.status === 'active').length;
  
  const totalVisits = last7Days.reduce((sum, day) => sum + day.visits, 0);
  const totalNotes = last7Days.reduce((sum, day) => sum + day.notesCreated, 0);
  const totalMessages = last7Days.reduce((sum, day) => sum + day.chatMessages, 0);
  
  // Calcular variações (simuladas)
  const usersChange = "+5.2%";
  const activeUsersChange = "+3.1%";
  const notesChange = "+12.4%";
  const messagesChange = "-2.3%";

  return {
    totalUsers,
    activeUsers,
    totalVisits,
    totalNotes,
    totalMessages,
    usersChange,
    activeUsersChange,
    notesChange,
    messagesChange
  };
}

function getUserList(filters = {}) {
  let filteredUsers = [...fakeDatabase.users];

  if (filters.name) {
    filteredUsers = filteredUsers.filter(u => u.name.toLowerCase().includes(filters.name.toLowerCase()));
  }
  if (filters.email) {
    filteredUsers = filteredUsers.filter(u => u.email.toLowerCase().includes(filters.email.toLowerCase()));
  }
  if (filters.status) {
    filteredUsers = filteredUsers.filter(u => u.status === filters.status);
  }
  if (filters.type) {
    filteredUsers = filteredUsers.filter(u => u.type === filters.type);
  }

  filteredUsers.sort((a, b) => b.id - a.id);

  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return {
    users: paginatedUsers,
    total: filteredUsers.length,
    page,
    totalPages: Math.ceil(filteredUsers.length / limit)
  };
}

// --- Rotas da API ---

// 1. Dashboard Stats
app.get('/api/admin/dashboard/stats', (req, res) => {
  const stats = getDashboardStats();
  res.json(stats);
});

// 2. Listagem de Usuários
app.get('/api/admin/users', (req, res) => {
  const filters = req.query;
  const usersData = getUserList(filters);
  res.json(usersData);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`[MCP Server] Servidor de Analytics do Admin rodando em http://localhost:${PORT}`);
});