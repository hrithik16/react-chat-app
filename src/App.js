import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeftSidebar from './components/LeftSidebar';
import RightChatView from './components/RightChatView';
import dummyData from './data/dummyData.json';
import NewConversationModal from './components/NewConversationModal';

const App = () => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversations);
  const currentConversation = useSelector((state) => state.currentConversation);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (conversations.length === 0) {
      dispatch({ type: 'SET_CONVERSATIONS', payload: dummyData.conversations });
    }
  }, [dispatch, conversations]);

  const selectConversation = (convo) => {
    dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: convo });
  };

  const sendMessage = (newMessage) => {
    const message = { text: newMessage, sender: 'me' };
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        conversationId: currentConversation.id,
        message,
      },
    });
  };

  const openNewConversation = () => {
    setIsModalOpen(true);
  };

  const createConversation = (contact) => {
    // Check if a conversation with the contact already exists
    const existingConversation = conversations.find(
      (convo) => convo.contactName === contact.name
    );
  
    if (existingConversation) {
      // Open the existing conversation
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: existingConversation });
    } else {
      // Create a new conversation if none exists
      const newConversation = {
        id: conversations.length + 1,
        contactName: contact.name,
        messages: [],
        lastMessage: ''
      };
  
      dispatch({
        type: 'SET_CONVERSATIONS',
        payload: [...conversations, newConversation]
      });
  
      // Select the new conversation automatically
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: newConversation });
    }
  
    // Close the modal after creating/opening a conversation
    setIsModalOpen(false);
  };
  

  return (
    <div className="flex h-screen">
      <LeftSidebar
        conversations={conversations}
        selectConversation={selectConversation}
        createConversation={openNewConversation}
      />
      <RightChatView
        currentConversation={currentConversation}
        sendMessage={sendMessage}
      />
      {isModalOpen && (
        <NewConversationModal
          contacts={dummyData.contacts}
          createConversation={createConversation}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
