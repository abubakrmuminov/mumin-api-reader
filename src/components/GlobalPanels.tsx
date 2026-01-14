'use client';

import React from 'react';
import { ReadingSettingsPanel } from './ReadingSettingsPanel';
import { LanguageSelector } from './LanguageSelector';
import { useUIStore } from '@/store/useUIStore';

export const GlobalPanels: React.FC = () => {
    const {
        isSettingsOpen, closeAll,
        isLanguageOpen,
        setSettingsOpen, setLanguageOpen
    } = useUIStore();

    return (
        <>
            <ReadingSettingsPanel
                isOpen={isSettingsOpen}
                onClose={closeAll}
            />
            <LanguageSelector
                isOpen={isLanguageOpen}
                onClose={closeAll}
            />
        </>
    );
};
