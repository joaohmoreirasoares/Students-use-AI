# ENEM AI - Plataforma de Estudos Colaborativa

Uma plataforma completa para estudantes do ENEM que combina chat colaborativo, assistente de IA e gerenciamento de anotações.

## 🚀 Começando

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge)
- Conexão com a internet

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/students-use-ai.git
```

2. Navegue até o diretório do projeto:
```bash
cd students-use-ai
```

3. Abra o arquivo `homepage.html` no seu navegador

## 📚 Estrutura da Plataforma

### Páginas Principais

- **`homepage.html`** - Página inicial da plataforma
- **`public/comunienem.html`** - Chat colaborativo entre estudantes
- **`public/ai-chat.html`** - Assistente de IA para estudos
- **`public/dashboard.html`** - Gerenciamento de anotações
- **`public/community.html`** - Comunidade de estudantes

## 💬 Funcionalidades do Chat Colaborativo (ComuniEnem)

### Interface Principal

```
┌─────────────────────────────────────────────────────────────┐
│ Sidebar  │ Lista de Contatos │ Área de Conversa           │
│          │                   │                            │
│ [Logo]   │ [🔍 Pesquisar]    │ [👤 Nome do Contato]       │
│          │ [Contato 1]       │ Mensagem enviada           │
│ Dashboard│ [Contato 2]       │ Mensagem recebida          │
│ Chat IA  │ [Contato 3]       │                            │
│ Configs  │                   │ [😀📎✏️📝] Digite sua msg   │
│ Perfil   │                   │                            │
└─────────────────────────────────────────────────────────────┘
```

### Funcionalidades

#### 🔤 Emojis
- Clique no ícone 😀 para abrir o seletor de emojis
- Selecione qualquer emoji para inserir na mensagem

#### 📝 Envio de Anotações
- Clique no ícone 📝 para abrir o modal de anotações
- Se você não tem anotações: Clique em "Criar Nova Anotação" para ir ao dashboard
- Se você tem anotações: Clique em uma anotação existente para enviar ou em "Ver Todas" para acessar o dashboard

#### 💾 Salvando Anotações Recebidas
- Quando receber uma anotação de outro usuário, clique nela
- A anotação será automaticamente salva no seu dashboard
- O sistema evita salvar duplicatas

### Como Usar

1. **Iniciar uma conversa**
   - Clique em um contato na lista de contatos
   - Digite sua mensagem na caixa de texto
   - Pressione Enter ou clique no botão de enviar

2. **Enviar emojis**
   - Clique no ícone de smiley 😀
   - Selecione o emoji desejado
   - O emoji será inserido na caixa de texto

3. **Compartilhar anotações**
   - Clique no ícone de nota 📝
   - Escolha uma anotação existente ou crie uma nova

## 🤖 Assistente de IA (AI Chat)

### Como Funciona

O assistente de IA é projetado especificamente para ajudar estudantes do ENEM com:

#### 💡 Recursos Disponíveis

1. **Explicações de Conteúdo**
   - Matemática (álgebra, geometria, estatística)
   - Português (gramática, literatura, interpretação)
   - Ciências Humanas (história, geografia, filosofia)
   - Ciências da Natureza (física, química, biologia)
   - Redação (estrutura, argumentação, correção)

2. **Resolução de Exercícios**
   - Explica passo a passo a resolução de questões
   - Oferece dicas para evitar erros comuns
   - Sugere métodos alternativos de resolução

3. **Revisão de Conteúdo**
   - Cria resumos personalizados
   - Organiza tópicos por ordem de importância
   - Destaca pontos que costumam cair no ENEM

4. **Ajuda com Redação**
   - Estrutura dissertativa-argumentativa
   - Desenvolvimento de argumentos
   - Coesão e coerência textual
   - Proposta de intervenção

### Como Interagir

1. **Faça perguntas claras**
   ```
   Ex: "Explique como funciona a fotossíntese"
   Ex: "Quais são as principais figuras de linguagem em português?"
   ```

2. **Peça ajuda com exercícios**
   ```
   Ex: "Como resolvo esta questão de matemática?"
   (Cole o enunciado da questão)
   ```

3. **Solicite resumos**
   ```
   Ex: "Faça um resumo sobre a Revolução Francesa"
   Ex: "Resuma os principais temas de redação para o ENEM"
   ```

4. **Peça dicas de estudo**
   ```
   Ex: "Quais temas costumam cair em história no ENEM?"
   Ex: "Como devo me preparar para a prova de física?"
   ```

### Dicas para Melhor Experiência

- **Seja específico** nas perguntas para obter respostas mais precisas
- **Mencione o ENEM** quando quiser foco na prova específica
- **Peça exemplos práticos** quando estiver estudando um tema
- **Use linguagem natural** - a IA entende linguagem informal

## 📝 Gerenciamento de Anotações (Dashboard)

### Funcionalidades

- **Criação de anotações** com título, conteúdo e tags
- **Edição e organização** de anotações existentes
- **Busca por conteúdo** e tags
- **Exportação** de anotações
- **Sincronização** automática com o chat

### Como Usar

1. **Criar nova anotação**
   - Clique em "Nova Anotação"
   - Preencha título e conteúdo
   - Adicione tags relevantes
   - Clique em salvar

2. **Editar anotação**
   - Clique no ícone de editar ao lado da anotação
   - Faça as alterações necessárias
   - Salve as mudanças

3. **Buscar anotações**
   - Use a barra de pesquisa no topo
   - Procure por palavras-chave ou tags

## 👥 Comunidade

### Funcionalidades

- **Conexão com outros estudantes**
- **Grupos de estudo** por interesses
- **Compartilhamento de materiais**
- **Dicas e sugestões** de estudo

## 🔒 Segurança

### Medidas Implementadas

- **Sanitização de entradas** para prevenir XSS
- **Content Security Policy** restritiva
- **Validação de dados** no client-side
- **Proteção de dados sensíveis** no localStorage

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Estilização**: TailwindCSS, Font Awesome
- **Armazenamento**: localStorage do navegador
- **APIs Externas**: ui-avatars.com para avatares

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## 📧 Contato

Seu Nome - [@seu_twitter](https://twitter.com/seu_twitter) - seu.email@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/students-use-ai](https://github.com/seu-usuario/students-use-ai)