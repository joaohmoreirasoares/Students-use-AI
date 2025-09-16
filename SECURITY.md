# Segurança do Painel Administrativo

Este documento descreve as medidas de segurança implementadas no painel administrativo do ENEM AI, seguindo as diretrizes fornecidas.

## 1. Proteção contra Força Bruta (Brute Force)

- **Bloqueio após N tentativas erradas**: O sistema bloqueia a conta do administrador por 15 minutos após 5 tentativas de login malsucedidas consecutivas.
- **Mensagens de erro genéricas**: O sistema não revela se o erro foi no nome de usuário ou na senha, apenas mostra "Credenciais inválidas".
- **(Futuro) CAPTCHA**: Pode ser implementado após 2-3 falhas para adicionar uma camada extra de proteção.
- **(Futuro) 2FA**: A autenticação de dois fatores (por email, SMS ou Google Authenticator) pode ser adicionada como camada adicional.
- **(Futuro) Rate Limiting**: Limitação de requisições por IP pode ser implementada no servidor para prevenir ataques automatizados.

## 2. Proteção contra Injeção de SQL (SQL Injection)

- **Uso de Prepared Statements**: O servidor MCP utiliza prepared statements ao interagir com o banco de dados, evitando a concatenação direta de strings SQL.
- **Validação e Sanitização de Entradas**: Todas as entradas do usuário são validadas e sanitizadas antes de serem processadas.
- **(Futuro) Uso de ORM**: A implementação de um ORM (Object-Relational Mapping) pode fornecer uma camada adicional de proteção.

## 3. Proteção contra Cross-Site Scripting (XSS)

- **Escape de Saída (Output Escaping)**: Os dados exibidos nas páginas do painel admin são escapados para prevenir a execução de scripts maliciosos.
- **Content Security Policy (CSP)**: Cabeçalhos CSP adequados são configurados para restringir a origem de scripts e outros recursos.
- **(Futuro) Sanitização de Entradas**: Implementar bibliotecas de sanitização no backend para limpar dados antes de salvá-los.

## 4. Proteção contra Cross-Site Request Forgery (CSRF)

- **(Futuro) Tokens CSRF**: Implementação de tokens CSRF em formulários e requisições POST para garantir que as requisições sejam legítimas.
- **(Futuro) Verificação de Origin/Referer**: Verificação dos cabeçalhos `Origin` ou `Referer` para validar a origem das requisições.
- **(Futuro) Cookies SameSite**: Configuração de cookies com a flag `SameSite=Strict`.

## 5. Proteção de Acesso Direto a URLs

- **Autenticação Obrigatória**: Todas as rotas do painel admin exigem autenticação.
- **(Futuro) Autorização Baseada em Perfil (RBAC)**: Implementação de controle de acesso baseado em perfis para verificar se o administrador tem permissão para executar uma ação específica.
- **(Futuro) IDs não sequenciais**: Uso de UUIDs ou tokens curtos em vez de IDs sequenciais nas URLs.

## 6. Proteção de Upload de Arquivos

- **(Futuro) Validação de Extensão e Tipo MIME**: Verificação rigorosa da extensão e tipo MIME dos arquivos enviados.
- **(Futuro) Renomeação de Arquivos**: Renomear arquivos ao salvá-los para evitar sobrescrita.
- **(Futuro) Armazenamento Fora da Pasta Pública**: Armazenar uploads fora da pasta acessível publicamente.
- **(Futuro) Scan de Vírus**: Implementar scan de vírus em arquivos enviados.

## 7. Proteção contra Roubo de Sessão (Session Hijacking)

- **Tokens JWT**: Uso de tokens JWT (JSON Web Tokens) para gerenciamento de sessão, que são mais seguros que cookies tradicionais.
- **(Futuro) Cookies Seguros**: Quando se usar cookies, configurá-los com `HttpOnly`, `Secure` e `SameSite=Strict`.
- **(Futuro) Regeneração de ID de Sessão**: Regenerar o ID da sessão após o login.
- **(Futuro) Expiração de Sessão**: Implementar expiração de sessão por inatividade.

## 8. Proteção contra Vulnerabilidades em Dependências

- **Atualização Regular**: As dependências são atualizadas regularmente.
- **Auditoria de Dependências**: Uso de ferramentas como `npm audit` para identificar vulnerabilidades em dependências.
- **Remoção de Pacotes Não Utilizados**: Remover pacotes que não são mais utilizados.

## 9. Proteção de Informações Sensíveis

- **Variáveis de Ambiente**: As configurações sensíveis (como chaves secretas) são armazenadas em variáveis de ambiente e não no código.
- **.gitignore**: Arquivos de configuração sensíveis e `.env` estão no `.gitignore` para evitar exposição em repositórios.
- **(Futuro) Vaults**: Uso de vaults (como Hashicorp Vault) em ambientes de produção para gerenciar segredos.

## 10. Proteção contra Engenharia Social / Phishing

- **Treinamento**: Equipe administrativa deve ser treinada para reconhecer tentativas de phishing.
- **2FA Obrigatória**: A autenticação de dois fatores é uma proteção importante mesmo se as credenciais forem comprometidas.
- **(Futuro) Monitoramento de IPs Suspeitos**: Monitorar acessos de IPs incomuns ou de outros países.

## Considerações Finais

Esta é uma implementação inicial com foco nas medidas mais críticas. As funcionalidades marcadas como "(Futuro)" representam melhorias adicionais que podem ser implementadas para aumentar ainda mais a segurança do painel administrativo.