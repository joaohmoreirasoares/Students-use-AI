import React from "react";
import "./Sidebar.css";

const Sidebar = () => (
  <aside className="sidebar" id="sidebar">
    <div className="sidebar-site-logo">
      <img
        src="/images/logo.png"
        alt="Logo EnemAI"
        className="sidebar-logo-img"
        style={{
          height: '80px',
          maxWidth: '90%',
          margin: '0 auto 0.2em auto',
          display: 'block',
          objectFit: 'contain',
          border: '2px solid red', // depuração visual
          background: '#fff'
        }}
        onError={e => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentNode.append(' [logo não carregou]'); }}
      />
      <span className="sidebar-logo-text">EnemAI</span>
    </div>
    <div className="sidebar-header"></div>
    <nav className="sidebar-content">
      <a href="main-dashboard.html" className="sidebar-btn active">
        <div className="circle-icon active"><i className="fas fa-tachometer-alt"></i></div>
        <span className="sidebar-label">Dashboard</span>
      </a>
      <a href="ai-chat.html" className="sidebar-btn">
        <div className="circle-icon"><i className="fas fa-robot"></i></div>
        <span className="sidebar-label">Chat IA</span>
      </a>
      <a href="settings.html" className="sidebar-btn">
        <div className="circle-icon"><i className="fas fa-cog"></i></div>
        <span className="sidebar-label">Configurações</span>
      </a>
      <a href="community.html" className="sidebar-btn">
        <div className="circle-icon"><i className="fas fa-users"></i></div>
        <span className="sidebar-label">Comunidade</span>
      </a>
      <a href="dashboard.html" className="sidebar-btn" id="sidebar-new-note-btn">
        <div className="circle-icon"><i className="fas fa-plus"></i></div>
        <span className="sidebar-label">Nova Nota</span>
      </a>
    </nav>
    <div className="sidebar-user">
      <div className="sidebar-avatar" id="sidebar-avatar">US</div>
      <span className="sidebar-username" id="sidebar-username">Usuário</span>
    </div>
  </aside>
);

export default Sidebar;
