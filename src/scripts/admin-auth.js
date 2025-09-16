// src/scripts/admin-auth.js

// --- Autenticação Segura com JWT e Bcrypt ---

// Em um sistema real, estas seriam variáveis de ambiente no backend
const JWT_SECRET = 'sua_chave_secreta_muito_forte_aqui'; // NUNCA exponha isso no código frontend!
const JWT_EXPIRES_IN = '1h';

// 1. Bloqueio por Tentativas e Rate Limiting (Simples)
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 15;

// Em um sistema real, isso estaria no backend e em um banco de dados
let loginAttempts = {}; // { username: { attempts: number, lockoutTime: Date } }

function isAccountLocked(username) {
    const attemptData = loginAttempts[username];
    if (attemptData && attemptData.lockoutTime) {
        const now = new Date();
        if (now < attemptData.lockoutTime) {
            return true;
        } else {
            // Tempo de bloqueio expirado, limpar dados
            delete loginAttempts[username];
            return false;
        }
    }
    return false;
}

function recordFailedAttempt(username) {
    if (!loginAttempts[username]) {
        loginAttempts[username] = { attempts: 0 };
    }

    loginAttempts[username].attempts += 1;

    if (loginAttempts[username].attempts >= MAX_LOGIN_ATTEMPTS) {
        const unlockTime = new Date();
        unlockTime.setMinutes(unlockTime.getMinutes() + LOCKOUT_DURATION_MINUTES);
        loginAttempts[username].lockoutTime = unlockTime;
        return { success: false, message: "Número máximo de tentativas excedido. Conta bloqueada temporariamente." };
    }

    return { success: false, message: `Credenciais inválidas. Tentativa ${loginAttempts[username].attempts} de ${MAX_LOGIN_ATTEMPTS}.` };
}

function clearLoginAttempts(username) {
    delete loginAttempts[username];
}

// 2. Simulação de Verificação de Credenciais (com Bcrypt)
// Em um sistema real, isso estaria no backend e consultaria um banco de dados.
async function verifyCredentials(username, password) {
    // Simular busca por usuário admin
    // Em produção, isso viria de um banco de dados seguro
    const admins = [
        {
            id: 'admin1',
            username: 'admin',
            // Senha hashada (ex: 'admin123') - NUNCA armazene senhas em texto simples!
            passwordHash: '$2a$10$8K1p/a0dhrxiowP.dnkgNORTWgdEDHn5L2/xjpEWuC.QQv4rKO9jO', // bcrypt.hashSync('admin123', 10)
            role: 'superadmin',
            name: 'Administrador Padrão'
        }
    ];

    const admin = admins.find(a => a.username === username);

    if (!admin) {
        return { success: false, message: "Credenciais inválidas." };
    }

    // Verificação de senha com Bcrypt
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (isMatch) {
        return { success: true, user: { id: admin.id, username: admin.username, role: admin.role, name: admin.name } };
    } else {
        return { success: false, message: "Credenciais inválidas." };
    }
}

// 3. Criação de Token JWT (simulando backend)
function generateAuthToken(user) {
    const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
        iat: Math.floor(Date.now() / 1000)
    };

    // Em um sistema real, o token seria gerado no backend
    // const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    // return token;

    // Para simulação no frontend, vamos criar um token "falso" que expira em 1 hora
    const fakeToken = btoa(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 3600 }));
    return fakeToken;
}

function verifyAuthToken(token) {
    try {
        // Em um sistema real:
        // const decoded = jwt.verify(token, JWT_SECRET);
        // return { valid: true, user: decoded };

        // Para simulação no frontend:
        const payload = JSON.parse(atob(token));
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp > now) {
            return { valid: true, user: payload };
        } else {
            return { valid: false, message: 'Token expirado.' };
        }
    } catch (err) {
        return { valid: false, message: 'Token inválido.' };
    }
}

// --- Funções de Autenticação Principal (simulando chamadas API) ---

async function adminLogin(username, password) {
    // 1. Verificar se a conta está bloqueada
    if (isAccountLocked(username)) {
        return { success: false, message: "Conta temporariamente bloqueada. Tente novamente mais tarde." };
    }

    // 2. Verificar credenciais
    const verificationResult = await verifyCredentials(username, password);

    if (verificationResult.success) {
        // 3. Login bem-sucedido
        // a. Limpar tentativas falhas
        clearLoginAttempts(username);

        // b. Gerar token de autenticação
        const token = generateAuthToken(verificationResult.user);

        // c. Armazenar token (em um sistema real, isso seria HttpOnly, Secure, SameSite)
        localStorage.setItem('admin_auth_token', token);

        // d. Retornar sucesso
        return { success: true, message: "Login realizado com sucesso.", token };
    } else {
        // 4. Login falhou
        // a. Registrar tentativa falha
        const lockoutResult = recordFailedAttempt(username);

        // b. Retornar mensagem de erro genérica
        return lockoutResult;
    }
}

function adminLogout() {
    localStorage.removeItem('admin_auth_token');
    window.location.href = 'login.html';
}

function requireAdminAuth() {
    const token = localStorage.getItem('admin_auth_token');
    if (!token) {
        // Não autenticado, redirecionar para login
        window.location.href = 'login.html';
        return false;
    }

    const verificationResult = verifyAuthToken(token);
    if (!verificationResult.valid) {
        // Token inválido/expirado, redirecionar para login
        localStorage.removeItem('admin_auth_token');
        window.location.href = 'login.html';
        return false;
    }

    // Verificar permissões, se necessário
    return verificationResult.user;
}

// Tornar funções globais para uso nas páginas
window.adminLogin = adminLogin;
window.adminLogout = adminLogout;
window.requireAdminAuth = requireAdminAuth;