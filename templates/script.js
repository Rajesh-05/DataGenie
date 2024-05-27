document.addEventListener('DOMContentLoaded', function() {
    var messageInput = document.getElementById('message-input');
    var sendButton = document.getElementById('send-button');
    var chatMessages = document.getElementById('chat-messages');
    var history = document.getElementById('history');

    sendButton.addEventListener('click', function() {
        var message = messageInput.value.trim();
        if (message !== '') {
            sendMessage(message);
            messageInput.value = '';
        }
    });

    function sendMessage(message) {
        fetch('/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'message=' + encodeURIComponent(message)
        })
        .then(response => response.json())
        .then(data => {
            appendMessage('You', message);
            appendMessage('Chatbot', data.response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function appendMessage(sender, message) {
        var messageElement = document.createElement('div');
        messageElement.textContent = sender + ': ' + message;
        chatMessages.appendChild(messageElement);
        history.appendChild(messageElement.cloneNode(true));
    }
});