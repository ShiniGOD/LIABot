body {
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(to bottom, #87CEEB, #E0FFFF);
    animation: skyAnimation 20s infinite linear;
    overflow: hidden;
    font-family: 'Segoe UI', sans-serif;
}

@keyframes skyAnimation {
    0%, 100% { background-color: #87CEEB; }
    50% { background-color: #FFA07A; }
}

/* Floating Leaves */
.leaf {
    position: absolute;
    width: 30px;
    height: 30px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23228B22"><path d="M12 3c-3.3 0-6 2.7-6 6 0 1.5.7 2.9 1.7 3.8-1 2.4-3.4 4.2-6.2 4.2H2v2h1.5c3.6 0 6.8-2.3 8-5.6.5 1.2 1.1 2.3 1.8 3.3-1.1 1-1.8 2.5-1.8 4.1 0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.6-.7-3.1-1.8-4.1.7-1 1.3-2.1 1.8-3.3 1.2 3.3 4.4 5.6 8 5.6H22v-2h-1.5c-2.8 0-5.2-1.8-6.2-4.2 1-.9 1.7-2.3 1.7-3.8 0-3.3-2.7-6-6-6z"/></svg>');
    animation: float 8s infinite linear;
    opacity: 0.7;
}

@keyframes float {
    0% { transform: translateY(100vh) rotate(0deg); }
    100% { transform: translateY(-100vh) rotate(360deg); }
}

.chat-container {
    width: 800px; /* Wider chat box */
    max-width: 90%;
    height: 80vh;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    overflow: hidden;
}

.chat-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.1) 50%);
    animation: shine 4s infinite linear;
}

@keyframes shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.chat-header {
    background: linear-gradient(to right, #228B22, #32CD32);
    color: white;
    padding: 20px;
    font-size: 1.2em;
    position: relative;
}

.chat-header::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 20px;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg"><path d="M0 0 Q 25 10 50 0 T 100 0" fill="%23ffffff" opacity="0.1"/></svg>');
}

.chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" opacity="0.05" xmlns="http://www.w3.org/2000/svg"><path d="M50 0 Q60 20 50 40 T30 60 Q40 70 50 80 T70 90" stroke="%23228B22" fill="none"/></svg>');
}

.message {
    padding: 15px 20px;
    border-radius: 20px;
    max-width: 80%;
    word-wrap: break-word;
    font-size: 1em;
    line-height: 1.4;
    position: relative;
    transition: transform 0.3s ease;
}

.message:hover {
    transform: translateY(-2px);
}

.user-message {
    background: linear-gradient(to right, #228B22, #32CD32);
    color: white;
    margin-left: auto;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.bot-message {
    background: linear-gradient(to right, #f8fff8, #ffffff);
    margin-right: auto;
    border: 1px solid rgba(34, 139, 34, 0.1);
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.chat-input {
    padding: 20px;
    border-top: 1px solid rgba(34, 139, 34, 0.1);
    display: flex;
    gap: 15px;
    background: rgba(248, 255, 248, 0.9);
}

input {
    flex: 1;
    padding: 12px;
    border: 1px solid rgba(34, 139, 34, 0.3);
    border-radius: 25px;
    font-size: 1em;
    background: rgba(255, 255, 255, 0.9);
    min-width: 200px;
}

button {
    padding: 12px 25px;
    background: linear-gradient(to right, #228B22, #32CD32);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1em;
    transition: transform 0.2s ease;
}

button:hover {
    transform: scale(1.05);
}

.loading-dots {
    display: inline-block;
}

.loading-dots::after {
    content: '.';
    animation: dots 1.4s infinite steps(3, end);
}

@keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
}

@media (max-width: 768px) {
    .chat-container {
        width: 90%;
        height: 90vh;
        right: 5%;
        bottom: 5%;
        backdrop-filter: blur(5px);
    }
    
    .chat-messages {
        padding: 15px;
    }
    
    .message {
        max-width: 90%;
        padding: 12px 18px;
    }
}
