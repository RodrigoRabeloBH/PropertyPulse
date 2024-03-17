import { create } from 'zustand';

export const useUnreadMessagesCountStore = create((set) => ({
  unreadMessagesCount: 0,
  setUnreadMessagesCount: (count) => set({ unreadMessagesCount: count }),
  increaseCount: () => set((state) => ({ unreadMessagesCount: state.unreadMessagesCount + 1 })),
  decreaseCount: () => set((state) => ({ unreadMessagesCount: state.unreadMessagesCount - 1 })),
}));