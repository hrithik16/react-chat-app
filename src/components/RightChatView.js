import React, { useState } from 'react';

const RightChatView = ({ currentConversation, sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="w-2/3 p-4 flex flex-col justify-between">
      {currentConversation ? (
        <>
          <div className="flex-grow overflow-y-auto">
            {currentConversation.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex mb-2 ${
                  msg.sender === 'me' ? 'justify-end' : 'justify-start'
                }`}
              >
                <p
                  className={`p-2 max-w-xs rounded-lg ${
                    msg.sender === 'me'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              className="flex-grow p-2 border rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button
              className="ml-2 p-2 bg-blue-500 text-white rounded"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <p>Select a conversation to start chatting</p>
      )}
    </div>
  );
};

export default RightChatView;
