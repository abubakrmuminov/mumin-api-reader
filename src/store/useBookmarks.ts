import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Bookmark {
    hadithId: number;
    collection: string;
    bookNumber: number;
    hadithNumber: number;
    textPreview: string;
    timestamp: number;
}

interface BookmarksState {
    bookmarks: Bookmark[];
    addBookmark: (bookmark: Bookmark) => void;
    removeBookmark: (hadithId: number) => void;
    isBookmarked: (hadithId: number) => boolean;
    clearBookmarks: () => void;
}

export const useBookmarks = create<BookmarksState>()(
    persist(
        (set, get) => ({
            bookmarks: [],

            addBookmark: (bookmark) => set((state) => ({
                bookmarks: [bookmark, ...state.bookmarks],
            })),

            removeBookmark: (hadithId) => set((state) => ({
                bookmarks: state.bookmarks.filter((b) => b.hadithId !== hadithId),
            })),

            isBookmarked: (hadithId) => {
                return get().bookmarks.some((b) => b.hadithId === hadithId);
            },

            clearBookmarks: () => set({ bookmarks: [] }),
        }),
        {
            name: 'mumin_bookmarks',
        }
    )
);
