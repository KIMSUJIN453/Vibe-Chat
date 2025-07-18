document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    function appendMessage(text, sender) {
        const rowDiv = document.createElement('div');
        rowDiv.className = `message-row ${sender}-row`;
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        rowDiv.appendChild(msgDiv);
        chatBox.appendChild(rowDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function getTodayQuote() {
        appendMessage('오늘의 명언을 가져오는 중...', 'bot');
        try {
            const apiKey = 'YOUR_OPENAI_API_KEY'; // 여기에 본인 OpenAI API 키 입력
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        { role: 'user', content: '오늘의 명언 하나만 한국어로 알려줘.' }
                    ],
                    max_tokens: 60
                })
            });
            const data = await response.json();
            chatBox.lastChild.remove();
            if (data.choices && data.choices[0] && data.choices[0].message) {
                appendMessage('💡 오늘의 명언: ' + data.choices[0].message.content, 'bot');
            } else {
                appendMessage('명언을 가져올 수 없습니다.', 'bot');
            }
        } catch (err) {
            chatBox.lastChild.remove();
            appendMessage('명언을 가져오는 중 오류가 발생했습니다.', 'bot');
        }
    }

    async function botReply(userText) {
        appendMessage('답변 생성 중...', 'bot');
        try {
            const apiKey = 'YOUR_OPENAI_API_KEY'; // 여기에 본인 OpenAI API 키 입력
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        { role: 'user', content: userText }
                    ],
                    max_tokens: 100
                })
            });
            const data = await response.json();
            chatBox.lastChild.remove();
            if (data.choices && data.choices[0] && data.choices[0].message) {
                appendMessage(data.choices[0].message.content, 'bot');
            } else {
                appendMessage('챗봇 응답을 가져올 수 없습니다.', 'bot');
            }
        } catch (err) {
            chatBox.lastChild.remove();
            appendMessage('오류가 발생했습니다.', 'bot');
        }
    }

    async function sendMessage() {
        const text = userInput.value.trim();
        if (text) {
            appendMessage(text, 'user');
            userInput.value = '';
            await botReply(text);
        }
    }

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendMessage();
    });

    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 페이지 로드시 오늘의 명언 출력
    getTodayQuote();
});
