/**
 * Stores Index
 * Central export point for all Zustand stores and hooks
 */

export { useNotesStore, useNotesSelector, apiClient } from './notesStore'
export type { NotesStore } from './notesStore'

export { useNotesUiStore, useNotesUiSelector } from './notesUiStore'
export type { NotesUiStore } from './notesUiStore'

export {
  useFontPreferencesStore,
  useFontPreferencesSelector,
  DEFAULT_FONT_PREFERENCES,
} from './fontPreferencesStore'
export type { FontPreferencesStore } from './fontPreferencesStore'

// Composed hooks for feature-level APIs
export { useNotes, useNotesUI, useFontPreferences } from './hooks'
