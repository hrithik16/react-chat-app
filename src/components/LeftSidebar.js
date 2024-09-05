import React, { useState } from 'react';

const LeftSidebar = ({ conversations, selectConversation, createConversation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter((convo) =>
    convo.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/3 p-4 bg-gray-200 h-screen">
      <input
        type="text"
        className="p-2 mb-4 w-full border rounded"
        placeholder="Search contacts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="space-y-4">
        {filteredConversations.map((convo) => (
          <li
            key={convo.id}
            className="cursor-pointer p-2 bg-white rounded shadow"
            onClick={() => selectConversation(convo)}
          >
            <p className="font-bold">{convo.contactName}</p>
            <p className="text-gray-500">{convo.lastMessage}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={createConversation}
        className="mt-4 w-full p-2 bg-blue-500 text-white rounded"
      >
        New Conversation
      </button>
    </div>
  );
};

export default LeftSidebar;
