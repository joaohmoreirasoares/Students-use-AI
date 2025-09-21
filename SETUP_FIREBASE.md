# Como Configurar o Firebase

## 1. Criar Projeto Firebase
1. Acesse https://console.firebase.google.com/
2. Clique em "Criar projeto"
3. Nomeie seu projeto (ex: "enem-ai-community")
4. Desabilite Google Analytics (opcional)
5. Clique em "Criar projeto"

## 2. Configurar Firestore Database
1. No painel do Firebase, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Iniciar no modo de teste" (permite leitura/escrita por 30 dias)
4. Escolha uma localização (ex: southamerica-east1)

## 3. Obter Configuração
1. Clique no ícone de engrenagem → "Configurações do projeto"
2. Role até "Seus aplicativos" → clique no ícone "</>"
3. Registre o app (nome: "ENEM AI Community")
4. Copie o objeto `firebaseConfig`

## 4. Configurar no Projeto
1. Abra o arquivo `firebase-config.js`
2. Substitua o `firebaseConfig` pelo seu
3. Salve o arquivo

## 5. Regras de Segurança (Opcional)
No Firestore → Rules, substitua por:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{document} {
      allow read, write: if true;
    }
    match /messages/{document} {
      allow read, write: if true;
    }
  }
}
```

## 6. Testar
1. Abra `community.html` no navegador
2. Verifique o console (F12) para erros
3. Os usuários agora serão salvos no Firebase!

**Importante:** Para produção, configure autenticação e regras de segurança adequadas.