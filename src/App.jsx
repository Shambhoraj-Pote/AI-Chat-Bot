import React from 'react';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">AI Chat App</h1>
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;
