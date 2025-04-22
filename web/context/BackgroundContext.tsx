"use client";
import {create} from 'zustand';

interface BackgroundState {
  blur: boolean;
  setBlur: (value: boolean) => void;
}

export const useBackgroundStore = create<BackgroundState>((set) => ({
  blur: false,
  setBlur: (value) => set({ blur: value }),
}));
