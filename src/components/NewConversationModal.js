import React from 'react';

const NewConversationModal = ({ contacts, createConversation, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Start a New Conversation</h2>
        <ul>
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => createConversation(contact)}
            >
              {contact.name}
            </li>
          ))}
        </ul>
        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NewConversationModal;
