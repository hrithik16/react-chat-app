// src/store.js
import { createStore } from 'redux';

const initialState = {
  conversations: [],
  currentConversation: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.payload
      };
    case 'SET_CURRENT_CONVERSATION':
      return {
        ...state,
        currentConversation: action.payload
      };
    case 'ADD_MESSAGE':
      const updatedConversations = state.conversations.map((convo) =>
        convo.id === action.payload.conversationId
          ? { ...convo, messages: [...convo.messages, action.payload.message], lastMessage: action.payload.message.text }
          : convo
      );
      return {
        ...state,
        conversations: updatedConversations,
        currentConversation: {
          ...state.currentConversation,
          messages: [...state.currentConversation.messages, action.payload.message],
          lastMessage: action.payload.message.text
        }
      };
    default:
      return state;
  }
};

// Load from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('chatState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

// Save to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('chatState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

// Create store with persistent state
const store = createStore(reducer, loadState());

// Subscribe to store changes to save state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
