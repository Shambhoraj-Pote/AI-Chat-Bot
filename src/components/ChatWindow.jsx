import React, { useState } from 'react';
import { sendMessageToGPT } from '../api/sendMessageToGPT';

function ChatWindow() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    try {
      const reply = await sendMessageToGPT(input);
      const botMsg = { sender: 'gpt', text: reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="h-96 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
            <div className="inline-block px-4 py-2 rounded bg-gray-200 text-black">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
