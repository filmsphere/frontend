import { create } from "zustand";

const useFlashMessageStore = create((set) => ({
  messages: [],

  addMessage: (message, type = "normal") => {
    set((state) => ({
      messages: [...state.messages, { id: Date.now(), message, type }],
    }));
  },

  removeMessage: (id) => {
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    }));
  },
}));

export default useFlashMessageStore;
