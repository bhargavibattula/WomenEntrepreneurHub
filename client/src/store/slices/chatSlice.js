export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),

    addMessage: (message) => {
        const selectedChatMessages = get().selectedChatMessages;
        console.log(message);
        set({
            selectedChatMessages: [
                ...selectedChatMessages,
                {
                    ...message,
                }
            ]
        });
    },

    // Optional: Function to clear messages (when switching chats, for example)
    clearSelectedChatMessages: () => {
        set({
            selectedChatMessages: []
        });
    }
});
