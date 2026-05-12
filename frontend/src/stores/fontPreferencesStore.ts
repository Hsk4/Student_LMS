/**
 * Font Preferences Store
 * Manages font customization for notes (fonts, colors, defaults)
 * Integrates with FontFace API for runtime font loading
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { HeadingTag, FontOption, NotesFontPreferences } from '@/types/components'

interface FontPreferencesStoreState {
  uploadedFonts: FontOption[]
  preferences: NotesFontPreferences
  isLoadingFont: boolean
  fontError: string | null
  fontRegistry: Map<string, FontFace>
}

interface FontPreferencesStoreActions {
  // Font management
  addUploadedFont(font: FontOption): void
  removeUploadedFont(id: string): void
  getUploadedFont(id: string): FontOption | undefined
  getAllFonts(): FontOption[]

  // Font preferences
  setBodyFont(fontFamily: string): void
  setCodeFont(fontFamily: string): void
  setQuoteFont(fontFamily: string): void
  setHeadingFont(tag: HeadingTag, fontFamily: string): void
  setHeadingColor(tag: HeadingTag, color: string): void
  updatePreferences(prefs: Partial<NotesFontPreferences>): void

  // Font loading
  registerFontFace(id: string, fontFace: FontFace): void
  unregisterFontFace(id: string): void
  setLoadingFont(loading: boolean): void
  setFontError(error: string | null): void

  // Reset
  resetFontPreferences(defaults: NotesFontPreferences): void
  resetAllFonts(): void
}

export type FontPreferencesStore = FontPreferencesStoreState & FontPreferencesStoreActions

// Default font preferences (imported from components)
export const DEFAULT_FONT_PREFERENCES: NotesFontPreferences = {
  bodyFont: 'Inter, system-ui, sans-serif',
  codeFont: '"JetBrains Mono", Consolas, monospace',
  quoteFont: 'Georgia, serif',
  headingFonts: {
    h1: 'Poppins, system-ui, sans-serif',
    h2: 'Poppins, system-ui, sans-serif',
    h3: 'Poppins, system-ui, sans-serif',
    h4: 'Inter, system-ui, sans-serif',
    h5: 'Inter, system-ui, sans-serif',
    h6: 'Inter, system-ui, sans-serif',
  },
  headingColors: {
    h1: '#1e293b',
    h2: '#334155',
    h3: '#475569',
    h4: '#475569',
    h5: '#64748b',
    h6: '#64748b',
  },
}

export const useFontPreferencesStore = create<FontPreferencesStore>()(
  devtools(
    (set, get) => ({
      // State
      uploadedFonts: [],
      preferences: DEFAULT_FONT_PREFERENCES,
      isLoadingFont: false,
      fontError: null,
      fontRegistry: new Map(),

      // Font management
      addUploadedFont: (font) =>
        set(
          (state) => ({
            uploadedFonts: [...state.uploadedFonts, font],
          }),
          false,
          'addUploadedFont'
        ),

      removeUploadedFont: (id) =>
        set(
          (state) => {
            const fontToRemove = state.uploadedFonts.find((f) => f.id === id)
            if (!fontToRemove) return state

            // Unregister FontFace
            get().unregisterFontFace(id)

            // Replace in preferences with fallback
            const updated: NotesFontPreferences = { ...state.preferences }
            if (updated.bodyFont === fontToRemove.family) {
              updated.bodyFont = DEFAULT_FONT_PREFERENCES.bodyFont
            }
            if (updated.codeFont === fontToRemove.family) {
              updated.codeFont = DEFAULT_FONT_PREFERENCES.codeFont
            }
            if (updated.quoteFont === fontToRemove.family) {
              updated.quoteFont = DEFAULT_FONT_PREFERENCES.quoteFont
            }

            const heading_tags: HeadingTag[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
            heading_tags.forEach((tag) => {
              if (updated.headingFonts[tag] === fontToRemove.family) {
                updated.headingFonts[tag] = DEFAULT_FONT_PREFERENCES.headingFonts[tag]
              }
            })

            return {
              uploadedFonts: state.uploadedFonts.filter((f) => f.id !== id),
              preferences: updated,
            }
          },
          false,
          'removeUploadedFont'
        ),

      getUploadedFont: (id) => {
        const font = get().uploadedFonts.find((f) => f.id === id)
        return font
      },

      getAllFonts: () => {
        const state = get()
        return state.uploadedFonts
      },

      // Font preferences
      setBodyFont: (fontFamily) =>
        set(
          (state) => ({
            preferences: {
              ...state.preferences,
              bodyFont: fontFamily,
            },
          }),
          false,
          'setBodyFont'
        ),

      setCodeFont: (fontFamily) =>
        set(
          (state) => ({
            preferences: {
              ...state.preferences,
              codeFont: fontFamily,
            },
          }),
          false,
          'setCodeFont'
        ),

      setQuoteFont: (fontFamily) =>
        set(
          (state) => ({
            preferences: {
              ...state.preferences,
              quoteFont: fontFamily,
            },
          }),
          false,
          'setQuoteFont'
        ),

      setHeadingFont: (tag, fontFamily) =>
        set(
          (state) => ({
            preferences: {
              ...state.preferences,
              headingFonts: {
                ...state.preferences.headingFonts,
                [tag]: fontFamily,
              },
            },
          }),
          false,
          'setHeadingFont'
        ),

      setHeadingColor: (tag, color) =>
        set(
          (state) => ({
            preferences: {
              ...state.preferences,
              headingColors: {
                ...state.preferences.headingColors,
                [tag]: color,
              },
            },
          }),
          false,
          'setHeadingColor'
        ),

      updatePreferences: (prefs) =>
        set(
          (state) => ({
            preferences: {
              ...state.preferences,
              ...prefs,
            },
          }),
          false,
          'updatePreferences'
        ),

      // Font loading
      registerFontFace: (id, fontFace) =>
        set(
          (state) => {
            const registry = new Map(state.fontRegistry)
            registry.set(id, fontFace)
            return { fontRegistry: registry }
          },
          false,
          'registerFontFace'
        ),

      unregisterFontFace: (id) =>
        set(
          (state) => {
            const registry = new Map(state.fontRegistry)
            const fontFace = registry.get(id)
            if (fontFace && document.fonts.has(fontFace)) {
              document.fonts.delete(fontFace)
            }
            registry.delete(id)
            return { fontRegistry: registry }
          },
          false,
          'unregisterFontFace'
        ),

      setLoadingFont: (loading) =>
        set({ isLoadingFont: loading }, false, 'setLoadingFont'),

      setFontError: (error) =>
        set({ fontError: error }, false, 'setFontError'),

      // Reset
      resetFontPreferences: (defaults) =>
        set(
          { preferences: defaults },
          false,
          'resetFontPreferences'
        ),

      resetAllFonts: () =>
        set(
          (state) => {
            // Clear all registered FontFaces
            state.fontRegistry.forEach((fontFace) => {
              if (document.fonts.has(fontFace)) {
                document.fonts.delete(fontFace)
              }
            })

            return {
              uploadedFonts: [],
              preferences: DEFAULT_FONT_PREFERENCES,
              fontRegistry: new Map(),
              fontError: null,
            }
          },
          false,
          'resetAllFonts'
        ),
    }),
    { name: 'FontPreferencesStore' }
  )
)

// Selectors
export const useFontPreferencesSelector = {
  uploadedFonts: (state: FontPreferencesStore) => state.uploadedFonts,
  preferences: (state: FontPreferencesStore) => state.preferences,
  bodyFont: (state: FontPreferencesStore) => state.preferences.bodyFont,
  codeFont: (state: FontPreferencesStore) => state.preferences.codeFont,
  quoteFont: (state: FontPreferencesStore) => state.preferences.quoteFont,
  headingFonts: (state: FontPreferencesStore) => state.preferences.headingFonts,
  headingColors: (state: FontPreferencesStore) => state.preferences.headingColors,
  isLoadingFont: (state: FontPreferencesStore) => state.isLoadingFont,
  fontError: (state: FontPreferencesStore) => state.fontError,
}
