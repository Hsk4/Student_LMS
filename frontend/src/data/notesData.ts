import type { NoteItem, CategoryItem } from '@/types/components'

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'c-1', name: 'Mathematics', color: 'indigo' },
  { id: 'c-2', name: 'Physics', color: 'blue' },
  { id: 'c-3', name: 'Chemistry', color: 'green' },
  { id: 'c-4', name: 'Biology', color: 'emerald' },
  { id: 'c-5', name: 'History', color: 'amber' },
  { id: 'c-6', name: 'English', color: 'purple' },
]

export const initialNote: NoteItem = {
  id: 'n-1',
  title: 'Getting started',
  content: '# Welcome\n\nStart your study notes here. Use **Markdown** for formatting.\n\n- Create headings\n- Add lists\n- Save and export',
  category: 'Mathematics',
  updatedAt: new Date().toISOString(),
}
