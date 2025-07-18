document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function botReply(userText) {
        // 간단한 챗봇 응답 로직
        let reply = '안녕하세요! 무엇을 도와드릴까요?';
        if (userText.includes('안녕')) reply = '안녕하세요! 반가워요.';
        else if (userText.includes('이름')) reply = '저는 Vibe 챗봇입니다.';
        else if (userText.includes('날씨')) reply = '오늘의 날씨는 맑음입니다.';
        appendMessage(reply, 'bot');
    }

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = userInput.value.trim();
        if (text) {
            appendMessage(text, 'user');
            botReply(text);
            userInput.value = '';
        }
    });
});
