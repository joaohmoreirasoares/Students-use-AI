// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// FAQ accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        answer.classList.toggle('hidden');
        icon.classList.toggle('transform');
        icon.classList.toggle('rotate-180');
    });
});

// Tab functionality for note editor
const tabs = document.querySelectorAll('[role="tab"]');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('border-b-2', 'border-purple-600', 'text-purple-600'));
        tabs.forEach(t => t.classList.add('text-gray-500'));
        
        // Add active class to clicked tab
        tab.classList.add('border-b-2', 'border-purple-600', 'text-purple-600');
        tab.classList.remove('text-gray-500');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
}); 