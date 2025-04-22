// store/useCartStore.ts
import { create } from 'zustand'

interface CartStore {
  items: any[]  // You can type this better if needed
  setItems: (newItems: any[]) => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  setItems: (newItems) => set({ items: newItems }),
}))
