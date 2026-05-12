/**
 * Composed Hooks
 * Feature-level hooks that combine multiple stores
 * Simplify component usage and reduce selector boilerplate
 */

import { useNotesStore, useNotesUiStore, useFontPreferencesStore } from '.'

/**
 * useNotes - Combines notes data store with UI state
 * Usage: const { notes, selectedId, isPreview } = useNotes()
 */
export const useNotes = () => {
  const notes = useNotesStore((state) => state.notes)
  const selectedNoteId = useNotesStore((state) => state.selectedNoteId)
  const isLoading = useNotesStore((state) => state.isLoading)
  const error = useNotesStore((state) => state.error)
  const syncStatus = useNotesStore((state) => state.syncStatus)

  const selectedNote = notes.find((n) => n.id === selectedNoteId)

  const selectNote = useNotesStore((state) => state.selectNote)
  const updateNote = useNotesStore((state) => state.updateNoteAsync)
  const deleteNote = useNotesStore((state) => state.deleteNoteAsync)
  const createNote = useNotesStore((state) => state.createNote)

  return {
    notes,
    selectedNote,
    selectedNoteId,
    isLoading,
    error,
    syncStatus,
    selectNote,
    updateNote,
    deleteNote,
    createNote,
  }
}

/**
 * useNotesUI - UI state for notes editor
 * Usage: const { isPreview, togglePreviewMode } = useNotesUI()
 */
export const useNotesUI = () => {
  const isPreview = useNotesUiStore((state) => state.isPreview)
  const searchQuery = useNotesUiStore((state) => state.searchQuery)
  const selectedCategory = useNotesUiStore((state) => state.selectedCategory)
  const showAddCategoryModal = useNotesUiStore((state) => state.showAddCategoryModal)
  const showFontManager = useNotesUiStore((state) => state.showFontManager)
  const isAutoSaving = useNotesUiStore((state) => state.isAutoSaving)
  const notesListOpen = useNotesUiStore((state) => state.notesListOpen)

  const togglePreviewMode = useNotesUiStore((state) => state.togglePreviewMode)
  const setPreviewMode = useNotesUiStore((state) => state.setPreviewMode)
  const setSearchQuery = useNotesUiStore((state) => state.setSearchQuery)
  const setSelectedCategory = useNotesUiStore((state) => state.setSelectedCategory)
  const setShowAddCategoryModal = useNotesUiStore((state) => state.setShowAddCategoryModal)
  const setShowFontManager = useNotesUiStore((state) => state.setShowFontManager)
  const setIsAutoSaving = useNotesUiStore((state) => state.setIsAutoSaving)
  const setNotesListOpen = useNotesUiStore((state) => state.setNotesListOpen)

  return {
    isPreview,
    searchQuery,
    selectedCategory,
    showAddCategoryModal,
    showFontManager,
    isAutoSaving,
    notesListOpen,
    togglePreviewMode,
    setPreviewMode,
    setSearchQuery,
    setSelectedCategory,
    setShowAddCategoryModal,
    setShowFontManager,
    setIsAutoSaving,
    setNotesListOpen,
  }
}

/**
 * useFontPreferences - Font customization and management
 * Usage: const { preferences, setBodyFont } = useFontPreferences()
 */
export const useFontPreferences = () => {
  const uploadedFonts = useFontPreferencesStore((state) => state.uploadedFonts)
  const preferences = useFontPreferencesStore((state) => state.preferences)
  const isLoadingFont = useFontPreferencesStore((state) => state.isLoadingFont)
  const fontError = useFontPreferencesStore((state) => state.fontError)

  const addUploadedFont = useFontPreferencesStore((state) => state.addUploadedFont)
  const removeUploadedFont = useFontPreferencesStore((state) => state.removeUploadedFont)
  const setBodyFont = useFontPreferencesStore((state) => state.setBodyFont)
  const setCodeFont = useFontPreferencesStore((state) => state.setCodeFont)
  const setQuoteFont = useFontPreferencesStore((state) => state.setQuoteFont)
  const setHeadingFont = useFontPreferencesStore((state) => state.setHeadingFont)
  const setHeadingColor = useFontPreferencesStore((state) => state.setHeadingColor)
  const registerFontFace = useFontPreferencesStore((state) => state.registerFontFace)
  const unregisterFontFace = useFontPreferencesStore((state) => state.unregisterFontFace)
  const resetAllFonts = useFontPreferencesStore((state) => state.resetAllFonts)

  return {
    uploadedFonts,
    preferences,
    isLoadingFont,
    fontError,
    addUploadedFont,
    removeUploadedFont,
    setBodyFont,
    setCodeFont,
    setQuoteFont,
    setHeadingFont,
    setHeadingColor,
    registerFontFace,
    unregisterFontFace,
    resetAllFonts,
  }
}

/**
 * useNotesData - Category management
 * Usage: const { categories, createCategory } = useNotesData()
 */
export const useNotesData = () => {
  const categories = useNotesStore((state) => state.categories)
  const createCategory = useNotesStore((state) => state.createCategory)
  const addCategory = useNotesStore((state) => state.addCategory)
  const updateCategory = useNotesStore((state) => state.updateCategory)
  const deleteCategory = useNotesStore((state) => state.deleteCategory)
  const fetchCategories = useNotesStore((state) => state.fetchCategories)
  const fetchNotes = useNotesStore((state) => state.fetchNotes)

  return {
    categories,
    createCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    fetchCategories,
    fetchNotes,
  }
}
