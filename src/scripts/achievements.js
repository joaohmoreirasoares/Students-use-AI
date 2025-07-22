// achievements.js
// Função unificada para incrementar ações e desbloquear conquistas em qualquer página

const SIMPLE_ACHIEVEMENTS = [
  { id: 'first_note', name: 'Primeira Nota', desc: 'Crie sua primeira nota.', icon: '📝', type: 'create_note', count: 1 },
  { id: 'ten_notes', name: 'Dez Notas', desc: 'Crie 10 notas.', icon: '📝', type: 'create_note', count: 10 },
  { id: 'first_edit', name: 'Primeira Edição', desc: 'Edite uma nota.', icon: '✏️', type: 'edit_note', count: 1 },
  { id: 'first_delete', name: 'Primeira Exclusão', desc: 'Exclua uma nota.', icon: '🗑️', type: 'delete_note', count: 1 },
  { id: 'first_tag', name: 'Primeira Tag', desc: 'Adicione uma tag.', icon: '🏷️', type: 'add_tag', count: 1 },
  { id: 'first_search', name: 'Primeira Busca', desc: 'Busque uma nota.', icon: '🔍', type: 'search_note', count: 1 },
  { id: 'first_export', name: 'Primeira Exportação', desc: 'Exporte uma nota.', icon: '⬇️', type: 'export_note', count: 1 },
  { id: 'first_import', name: 'Primeira Importação', desc: 'Importe uma nota.', icon: '⬆️', type: 'import_note', count: 1 },
  { id: 'first_ask_ai', name: 'Primeira Pergunta IA', desc: 'Envie uma pergunta para a IA.', icon: '🤖', type: 'ask_ai', count: 1 },
  { id: 'first_answer_ai', name: 'Primeira Resposta IA', desc: 'Receba uma resposta da IA.', icon: '💡', type: 'answer_ai', count: 1 },
];

function incrementAction(type) {
    const key = 'enemai_action_' + type;
    let val = parseInt(localStorage.getItem(key) || '0', 10) + 1;
    localStorage.setItem(key, val);
    // Atualiza conquistas no localStorage
    let ach = JSON.parse(localStorage.getItem('enemai_achievements') || '{}');
    if (!ach) ach = {};
    SIMPLE_ACHIEVEMENTS.filter(a => a.type === type).forEach(a => {
        if (val >= a.count && !ach[a.id]) {
            ach[a.id] = { unlocked: true, date: new Date().toISOString() };
            localStorage.setItem('enemai_achievements', JSON.stringify(ach));
            if (typeof showToast === 'function') {
                showToast('Conquista desbloqueada!', '#FFD700');
            }
            showAchievementNotification(a);
        }
    });
}

function showAchievementNotification(achievement) {
    if (!('Notification' in window)) return;

    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            new Notification('Conquista Desbloqueada!', {
                body: `Você desbloqueou: "${achievement.name}"!`, // Mensagem mais descritiva
                icon: '../public/images/logo.png' // Caminho para um ícone, se disponível
            });
        }
    });
}

// Torna a função global para uso inline
window.incrementAction = incrementAction;
window.SIMPLE_ACHIEVEMENTS = SIMPLE_ACHIEVEMENTS; 