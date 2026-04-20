import { create } from "zustand";
import { authSlice } from "./slices/authSlice.js";
import { createChatSlice } from "./slices/chatSlice.js";
export const useStore = create((set , get) => ({
    ...authSlice(set),
    ...createChatSlice(set , get)
}))