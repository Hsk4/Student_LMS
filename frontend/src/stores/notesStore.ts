/**
 * Notes Store
 * Core data management for notes CRUD and backend sync
 * Handles optimistic updates, error handling, and sync status
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { NoteItem, CategoryItem } from '@/types/components'

// API Client singleton
class ApiClient {
  private baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
  private token: string | null = null

  setToken(token: string | null) {
    this.token = token
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `API Error: ${response.statusText}`)
    }

    return response.json()
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  async patch<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()

// Types
interface NotesStoreState {
  notes: NoteItem[]
  categories: CategoryItem[]
  selectedNoteId: string | null
  isLoading: boolean
  error: string | null
  syncStatus: 'idle' | 'pending' | 'synced' | 'error'
  lastSync: number | null
}

interface NotesStoreActions {
  // Note actions
  setNotes(notes: NoteItem[]): void
  addNote(note: NoteItem): void
  updateNote(id: string, data: Partial<NoteItem>): void
  deleteNote(id: string): void
  selectNote(id: string): void
  clearNotes(): void

  // Category actions
  setCategories(categories: CategoryItem[]): void
  addCategory(category: CategoryItem): void
  updateCategory(id: string, data: Partial<CategoryItem>): void
  deleteCategory(id: string): void

  // State management
  setLoading(loading: boolean): void
  setError(error: string | null): void
  setSyncStatus(status: NotesStoreState['syncStatus']): void

  // Backend actions
  fetchNotes(): Promise<void>
  fetchCategories(): Promise<void>
  createNote(data: Omit<NoteItem, 'id' | 'updatedAt'>): Promise<NoteItem>
  updateNoteAsync(id: string, data: Partial<NoteItem>): Promise<void>
  deleteNoteAsync(id: string): Promise<void>
  createCategory(data: Omit<CategoryItem, 'id'>): Promise<CategoryItem>
}

export type NotesStore = NotesStoreState & NotesStoreActions

// Store
export const useNotesStore = create<NotesStore>()(
  devtools(
    (set, get) => ({
      // State
      notes: [],
      categories: [],
      selectedNoteId: null,
      isLoading: false,
      error: null,
      syncStatus: 'idle',
      lastSync: null,

      // Note actions
      setNotes: (notes) => set({ notes }, false, 'setNotes'),

      addNote: (note) =>
        set(
          (state) => ({
            notes: [...state.notes, note],
          }),
          false,
          'addNote'
        ),

      updateNote: (id, data) =>
        set(
          (state) => ({
            notes: state.notes.map((note) =>
              note.id === id
                ? {
                    ...note,
                    ...data,
                    updatedAt: new Date().toISOString(),
                  }
                : note
            ),
          }),
          false,
          'updateNote'
        ),

      deleteNote: (id) =>
        set(
          (state) => ({
            notes: state.notes.filter((note) => note.id !== id),
            selectedNoteId: state.selectedNoteId === id ? null : state.selectedNoteId,
          }),
          false,
          'deleteNote'
        ),

      selectNote: (id) => set({ selectedNoteId: id }, false, 'selectNote'),

      clearNotes: () =>
        set(
          {
            notes: [],
            selectedNoteId: null,
          },
          false,
          'clearNotes'
        ),

      // Category actions
      setCategories: (categories) => set({ categories }, false, 'setCategories'),

      addCategory: (category) =>
        set(
          (state) => ({
            categories: [...state.categories, category],
          }),
          false,
          'addCategory'
        ),

      updateCategory: (id, data) =>
        set(
          (state) => ({
            categories: state.categories.map((cat) =>
              cat.id === id ? { ...cat, ...data } : cat
            ),
          }),
          false,
          'updateCategory'
        ),

      deleteCategory: (id) =>
        set(
          (state) => ({
            categories: state.categories.filter((cat) => cat.id !== id),
          }),
          false,
          'deleteCategory'
        ),

      // State management
      setLoading: (loading) => set({ isLoading: loading }, false, 'setLoading'),

      setError: (error) => set({ error }, false, 'setError'),

      setSyncStatus: (syncStatus) =>
        set({ syncStatus, lastSync: Date.now() }, false, 'setSyncStatus'),

      // Backend actions
      fetchNotes: async () => {
        set({ isLoading: true, syncStatus: 'pending' }, false, 'fetchNotes:start')
        try {
          const response = await apiClient.get<NoteItem[]>('/notes')
          set(
            { notes: response, isLoading: false, syncStatus: 'synced', error: null },
            false,
            'fetchNotes:success'
          )
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to fetch notes'
          set(
            {
              isLoading: false,
              syncStatus: 'error',
              error: message,
            },
            false,
            'fetchNotes:error'
          )
        }
      },

      fetchCategories: async () => {
        try {
          const response = await apiClient.get<CategoryItem[]>('/categories')
          set({ categories: response }, false, 'fetchCategories:success')
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to fetch categories'
          set({ error: message }, false, 'fetchCategories:error')
        }
      },

      createNote: async (data) => {
        const tempId = `temp-${Date.now()}`
        const tempNote: NoteItem = {
          id: tempId,
          ...data,
          updatedAt: new Date().toISOString(),
        }

        // Optimistic update
        get().addNote(tempNote)
        set({ syncStatus: 'pending' }, false, 'createNote:optimistic')

        try {
          const created = await apiClient.post<NoteItem>('/notes', data)
          // Replace temp note with server response
          get().deleteNote(tempId)
          get().addNote(created)
          set({ syncStatus: 'synced', error: null }, false, 'createNote:confirmed')
          return created
        } catch (error) {
          // Rollback
          get().deleteNote(tempId)
          const message = error instanceof Error ? error.message : 'Failed to create note'
          set(
            { syncStatus: 'error', error: message },
            false,
            'createNote:rollback'
          )
          throw error
        }
      },

      updateNoteAsync: async (id, data) => {
        const note = get().notes.find((n) => n.id === id)
        if (!note) return

        // Optimistic update
        const backup = note
        get().updateNote(id, data)
        set({ syncStatus: 'pending' }, false, 'updateNoteAsync:optimistic')

        try {
          await apiClient.patch(`/notes/${id}`, data)
          set({ syncStatus: 'synced', error: null }, false, 'updateNoteAsync:confirmed')
        } catch (error) {
          // Rollback
          get().updateNote(id, backup)
          const message = error instanceof Error ? error.message : 'Failed to update note'
          set(
            { syncStatus: 'error', error: message },
            false,
            'updateNoteAsync:rollback'
          )
          throw error
        }
      },

      deleteNoteAsync: async (id) => {
        const note = get().notes.find((n) => n.id === id)
        if (!note) return

        // Optimistic delete
        get().deleteNote(id)
        set({ syncStatus: 'pending' }, false, 'deleteNoteAsync:optimistic')

        try {
          await apiClient.delete(`/notes/${id}`)
          set({ syncStatus: 'synced', error: null }, false, 'deleteNoteAsync:confirmed')
        } catch (error) {
          // Rollback
          get().addNote(note)
          const message = error instanceof Error ? error.message : 'Failed to delete note'
          set(
            { syncStatus: 'error', error: message },
            false,
            'deleteNoteAsync:rollback'
          )
          throw error
        }
      },

      createCategory: async (data) => {
        const tempId = `temp-${Date.now()}`
        const tempCategory: CategoryItem = {
          id: tempId,
          ...data,
        }

        get().addCategory(tempCategory)
        set({ syncStatus: 'pending' }, false, 'createCategory:optimistic')

        try {
          const created = await apiClient.post<CategoryItem>('/categories', data)
          get().deleteCategory(tempId)
          get().addCategory(created)
          set({ syncStatus: 'synced', error: null }, false, 'createCategory:confirmed')
          return created
        } catch (error) {
          get().deleteCategory(tempId)
          const message = error instanceof Error ? error.message : 'Failed to create category'
          set(
            { syncStatus: 'error', error: message },
            false,
            'createCategory:rollback'
          )
          throw error
        }
      },
    }),
    { name: 'NotesStore' }
  )
)

// Selectors for optimized re-renders
export const useNotesSelector = {
  notes: (state: NotesStore) => state.notes,
  categories: (state: NotesStore) => state.categories,
  selectedNoteId: (state: NotesStore) => state.selectedNoteId,
  isLoading: (state: NotesStore) => state.isLoading,
  error: (state: NotesStore) => state.error,
  syncStatus: (state: NotesStore) => state.syncStatus,
  selectedNote: (state: NotesStore) =>
    state.selectedNoteId ? state.notes.find((n) => n.id === state.selectedNoteId) : null,
}
