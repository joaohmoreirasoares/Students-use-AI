#!/usr/bin/env python3
"""
Servidor HTTP simples para rodar o site ENEM AI localmente
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configurações do servidor
PORT = 8000
DIRECTORY = "."

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Adicionar headers CORS para permitir requisições
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Mudar para o diretório do projeto
    os.chdir(Path(__file__).parent)
    
    # Criar o servidor
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"🚀 Servidor iniciado!")
        print(f"📁 Diretório: {os.getcwd()}")
        print(f"🌐 URL: http://localhost:{PORT}")
        print(f"📄 Homepage: http://localhost:{PORT}/homepage.html")
        print(f"🔐 Login: http://localhost:{PORT}/public/login.html")
        print(f"📊 Dashboard: http://localhost:{PORT}/public/dashboard.html")
        print("\n" + "="*50)
        print("Pressione Ctrl+C para parar o servidor")
        print("="*50 + "\n")
        
        # Abrir o navegador automaticamente
        try:
            webbrowser.open(f"http://localhost:{PORT}/homepage.html")
        except:
            pass
        
        # Manter o servidor rodando
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Servidor parado!")
            httpd.shutdown()

if __name__ == "__main__":
    main() 