document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWidget = document.querySelector('.chat-widget');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input input');
    const chatSend = document.querySelector('.chat-send');
    const chatMessages = document.querySelector('.chat-messages');

    // Generate a unique session ID
    const sessionId = Math.random().toString(36).substring(2);

    // Toggle chat widget
    chatToggle.addEventListener('click', () => {
        chatWidget.style.visibility = 'visible';
        chatWidget.style.opacity = '1';
        chatToggle.style.display = 'none';
    });

    // Close chat widget
    chatClose.addEventListener('click', () => {
        chatWidget.style.visibility = 'hidden';
        chatWidget.style.opacity = '0';
        chatToggle.style.display = 'flex';
    });

    // Send message
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';

            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('message', 'bot', 'typing');
            typingIndicator.textContent = '...';
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            try {
                // Send message to local server
                const response = await fetch('http://localhost:3000/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message,
                        sessionId
                    })
                });

                const data = await response.json();

                // Remove typing indicator
                typingIndicator.remove();

                // Add bot response
                if (data.response) {
                    addMessage(data.response, 'bot');
                } else {
                    throw new Error('Invalid response from API');
                }
            } catch (error) {
                console.error('Error:', error);
                typingIndicator.remove();
                addMessage('Sorry, I encountered an error. Please try again.', 'bot');
            }
        }
    }

    // Add message to chat
    function addMessage(text, type) {
        const message = document.createElement('div');
        message.classList.add('message', type);
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message on button click
    chatSend.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add initial bot message
    setTimeout(() => {
        addMessage("Hello! I'm your Campus Recreation Assistant. How can I help you today?", 'bot');
    }, 500);
});
