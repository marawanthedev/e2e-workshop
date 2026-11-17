import { create } from "zustand";
import type { Product } from "../types";

export type CartItem = { product: Product; quantity: number };

type CartState = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],

  add: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.product.id === product.id);
      if (!existing) return { items: [...state.items, { product, quantity: 1 }] };
      return {
        items: state.items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      };
    }),

  remove: (productId) => set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),

  setQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(1, quantity || 1) } : item,
      ),
    })),
}));
