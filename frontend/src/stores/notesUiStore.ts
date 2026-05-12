/**
 * Notes UI Store
 * Manages UI state for notes component (preview mode, search, modals, etc.)
 * Separated from data store for better performance and organization
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface NotesUiStoreState {
  isPreview: boolean
  searchQuery: string
  selectedCategory: string
  showAddCategoryModal: boolean
  showFontManager: boolean
  isAutoSaving: boolean
  notesListOpen: boolean
}

interface NotesUiStoreActions {
  togglePreviewMode(): void
  setPreviewMode(preview: boolean): void
  setSearchQuery(query: string): void
  setSelectedCategory(category: string): void
  setShowAddCategoryModal(show: boolean): void
  setShowFontManager(show: boolean): void
  setIsAutoSaving(saving: boolean): void
  setNotesListOpen(open: boolean): void
  resetUI(): void
}

export type NotesUiStore = NotesUiStoreState & NotesUiStoreActions

export const useNotesUiStore = create<NotesUiStore>()(
  devtools(
    (set) => ({
      // State
      isPreview: false,
      searchQuery: '',
      selectedCategory: 'All',
      showAddCategoryModal: false,
      showFontManager: false,
      isAutoSaving: false,
      notesListOpen: true,

      // Actions
      togglePreviewMode: () =>
        set(
          (state) => ({ isPreview: !state.isPreview }),
          false,
          'togglePreviewMode'
        ),

      setPreviewMode: (preview) =>
        set({ isPreview: preview }, false, 'setPreviewMode'),

      setSearchQuery: (query) =>
        set({ searchQuery: query }, false, 'setSearchQuery'),

      setSelectedCategory: (category) =>
        set({ selectedCategory: category }, false, 'setSelectedCategory'),

      setShowAddCategoryModal: (show) =>
        set({ showAddCategoryModal: show }, false, 'setShowAddCategoryModal'),

      setShowFontManager: (show) =>
        set({ showFontManager: show }, false, 'setShowFontManager'),

      setIsAutoSaving: (saving) =>
        set({ isAutoSaving: saving }, false, 'setIsAutoSaving'),

      setNotesListOpen: (open) =>
        set({ notesListOpen: open }, false, 'setNotesListOpen'),

      resetUI: () =>
        set(
          {
            isPreview: false,
            searchQuery: '',
            selectedCategory: 'All',
            showAddCategoryModal: false,
            showFontManager: false,
            isAutoSaving: false,
            notesListOpen: true,
          },
          false,
          'resetUI'
        ),
    }),
    { name: 'NotesUiStore' }
  )
)

// Selectors
export const useNotesUiSelector = {
  isPreview: (state: NotesUiStore) => state.isPreview,
  searchQuery: (state: NotesUiStore) => state.searchQuery,
  selectedCategory: (state: NotesUiStore) => state.selectedCategory,
  showAddCategoryModal: (state: NotesUiStore) => state.showAddCategoryModal,
  showFontManager: (state: NotesUiStore) => state.showFontManager,
  isAutoSaving: (state: NotesUiStore) => state.isAutoSaving,
  notesListOpen: (state: NotesUiStore) => state.notesListOpen,
}
