import { create } from 'zustand'

const useChatStore = create((set) => ({
    conversations: [],
    currentConversation: null,
    messages: [],
    isTyping: false,
    wsConnected: false,

    setConversations: (conversations) => set({ conversations }),

    setCurrentConversation: (conversation) =>
        set({ currentConversation: conversation }),

    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),

    setMessages: (messages) => set({ messages }),

    setTyping: (isTyping) => set({ isTyping }),

    setWsConnected: (wsConnected) => set({ wsConnected }),

    clearMessages: () => set({ messages: [] }),
}))

export default useChatStore
