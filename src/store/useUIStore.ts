import { create } from 'zustand';

interface UIState {
    isSettingsOpen: boolean;
    isLanguageOpen: boolean;

    setSettingsOpen: (open: boolean) => void;
    setLanguageOpen: (open: boolean) => void;
    toggleSettings: () => void;
    toggleLanguage: () => void;
    closeAll: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isSettingsOpen: false,
    isLanguageOpen: false,

    setSettingsOpen: (open) => set({ isSettingsOpen: open, isLanguageOpen: false }),
    setLanguageOpen: (open) => set({ isLanguageOpen: open, isSettingsOpen: false }),
    toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen, isLanguageOpen: false })),
    toggleLanguage: () => set((state) => ({ isLanguageOpen: !state.isLanguageOpen, isSettingsOpen: false })),
    closeAll: () => set({ isSettingsOpen: false, isLanguageOpen: false }),
}));
