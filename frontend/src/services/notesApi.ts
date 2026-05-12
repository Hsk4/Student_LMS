/**
 * API Service
 * High-level API service for common backend operations
 * Works with Zustand stores for state management
 */

import { apiClient } from '@/stores'
import type { NoteItem, CategoryItem } from '@/types/components'

export interface CreateNoteDTO {
  title: string
  content: string
  category: string
}

export interface UpdateNoteDTO extends Partial<CreateNoteDTO> {}

export interface CreateCategoryDTO {
  name: string
  color: string
}

export interface UpdateCategoryDTO extends Partial<CreateCategoryDTO> {}

class NotesApiService {
  /**
   * Notes endpoints
   */
  async getNotes(): Promise<NoteItem[]> {
    return apiClient.get<NoteItem[]>('/notes')
  }

  async getNote(id: string): Promise<NoteItem> {
    return apiClient.get<NoteItem>(`/notes/${id}`)
  }

  async createNote(data: CreateNoteDTO): Promise<NoteItem> {
    return apiClient.post<NoteItem>('/notes', data)
  }

  async updateNote(id: string, data: UpdateNoteDTO): Promise<NoteItem> {
    return apiClient.patch<NoteItem>(`/notes/${id}`, data)
  }

  async deleteNote(id: string): Promise<{ success: boolean }> {
    return apiClient.delete(`/notes/${id}`)
  }

  /**
   * Categories endpoints
   */
  async getCategories(): Promise<CategoryItem[]> {
    return apiClient.get<CategoryItem[]>('/categories')
  }

  async getCategory(id: string): Promise<CategoryItem> {
    return apiClient.get<CategoryItem>(`/categories/${id}`)
  }

  async createCategory(data: CreateCategoryDTO): Promise<CategoryItem> {
    return apiClient.post<CategoryItem>('/categories', data)
  }

  async updateCategory(id: string, data: UpdateCategoryDTO): Promise<CategoryItem> {
    return apiClient.patch<CategoryItem>(`/categories/${id}`, data)
  }

  async deleteCategory(id: string): Promise<{ success: boolean }> {
    return apiClient.delete(`/categories/${id}`)
  }

  /**
   * Search/Filter endpoint (future)
   */
  async searchNotes(query: string, categoryId?: string): Promise<NoteItem[]> {
    const params = new URLSearchParams()
    if (query) params.append('q', query)
    if (categoryId) params.append('category', categoryId)
    const queryString = params.toString()
    return apiClient.get<NoteItem[]>(`/notes/search?${queryString}`)
  }

  /**
   * Bulk operations (future)
   */
  async deleteNotes(ids: string[]): Promise<{ deleted: number }> {
    return apiClient.post('/notes/bulk-delete', { ids })
  }

  async moveNotes(ids: string[], categoryId: string): Promise<NoteItem[]> {
    return apiClient.post('/notes/bulk-move', { ids, categoryId })
  }
}

export const notesApi = new NotesApiService()
