const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: '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'
});

// Store conversation history
const conversations = new Map();

app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId } = req.body;
        
        // Get or create conversation history
        let history = conversations.get(sessionId) || [];
        history.push({ role: 'user', content: message });

        // Call Anthropic API
        const response = await anthropic.messages.create({
            model: 'claude-3-opus-20240229',
            max_tokens: 1000,
            system: 'You are a helpful assistant for the Campus Recreation Center. You can help with information about facility hours, fitness programs, equipment, and general inquiries. Be friendly and concise in your responses.',
            messages: [{
                role: 'user',
                content: message
            }]
        });

        // Store the assistant's response in history
        const assistantMessage = response.content[0].text;
        history.push({ role: 'assistant', content: assistantMessage });
        conversations.set(sessionId, history);

        res.json({ response: assistantMessage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
