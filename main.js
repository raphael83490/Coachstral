// Main logic for Ignite AI Athlete App

document.addEventListener('DOMContentLoaded', () => {
    // Tab switching logic
    const navLinks = document.querySelectorAll('.nav-links li');
    const views = document.querySelectorAll('.view');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active classes
            navLinks.forEach(l => l.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            // Add active to clicked link
            link.classList.add('active');

            // Find matching view
            const target = link.getAttribute('data-tab');
            const targetView = document.getElementById(`view-${target}`);
            if (targetView) {
                targetView.classList.add('active');
            }
        });
    });

    // Chat Interface interaction
    const chatInput = document.querySelector('.ai-chat-interface .chat-input-area input');
    const sendBtn = document.querySelector('.ai-chat-interface .chat-input-area .btn-send');
    const chatHistory = document.querySelector('.chat-history');

    const handleSendMessage = () => {
        const text = chatInput.value.trim();
        if (text) {
            // Append User message
            const userMsg = document.createElement('div');
            userMsg.className = 'message user-msg';
            userMsg.innerHTML = `<div class="msg-bubble">${escapeHTML(text)}</div>`;
            chatHistory.appendChild(userMsg);
            chatInput.value = '';

            // Scroll down
            chatHistory.scrollTop = chatHistory.scrollHeight;

            // Simulate AI response
            setTimeout(() => {
                const aiMsg = document.createElement('div');
                aiMsg.className = 'message ai-msg';
                aiMsg.innerHTML = `
                  <div class="avatar-small">AI</div>
                  <div class="msg-bubble">I am analyzing your feedback "${escapeHTML(text)}". Implementing modifications to your current protocol. Expected load reduction: 10%. Please confirm.</div>
                `;
                chatHistory.appendChild(aiMsg);
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }, 1000);
        }
    };

    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }

    // Helper to escape HTML to prevent XSS (basic)
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag])
        );
    }
});
