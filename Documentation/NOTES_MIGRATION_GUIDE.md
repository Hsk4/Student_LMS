# Notes.tsx Migration Guide

## Before & After Comparison

### Before (Current - with useState)

```typescript
export const Notes: React.FC<NotesProps> = ({ role = 'student' }) => {
  // Data state
  const [notesList, setNotesList] = useState<NoteItem[]>([initialNote])
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES)
  const [selectedId, setSelectedId] = useState<string>(initialNote.id)
  const [isPreview, setIsPreview] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [fontOptions, setFontOptions] = useState<FontOption[]>(SYSTEM_FONT_OPTIONS)
  const [fontPreferences, setFontPreferences] = useState<NotesFontPreferences>(DEFAULT_FONT_PREFERENCES)
  const [showFontManager, setShowFontManager] = useState(false)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  
  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fontRegistryRef = useRef<Map<string, FontFace>>(new Map())
  
  // Complex event handlers with state updates
  const handleFontUpload = async (file: File) => {
    setIsAutoSaving(true)
    // ... complex logic
    setIsAutoSaving(false)
  }
  
  // Props drilling for modal
  return (
    <NoteEditor 
      notes={notesList}
      selectedNote={selectedId}
      onSelectNote={setSelectedId}
      onUpdateNote={...}
    />
  )
}
```

---

### After (With Zustand)

```typescript
import { useNotes, useNotesUI, useFontPreferences } from '@/stores'

export const Notes: React.FC<NotesProps> = ({ role = 'student' }) => {
  // ✅ Single source of truth for each domain
  const { notes, selectedNote, updateNote, deleteNote, createNote } = useNotes()
  const { isPreview, togglePreviewMode, searchQuery, setSearchQuery } = useNotesUI()
  const { preferences, setBodyFont, setHeadingColor, uploadedFonts } = useFontPreferences()
  
  // ✅ Refs still for selection/textarea management
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // ✅ Simple event handlers (state updated via hooks)
  const handleFontUpload = async (file: File) => {
    // Directly call store action
    await uploadFont(file)
  }
  
  // ✅ No prop drilling - stores passed directly to children
  return (
    <NoteEditor 
      noteRef={textareaRef}
    />
  )
}
```

---

## Migration Steps

### Step 1: Replace State Imports

```typescript
// ❌ Before
import { useState } from 'react'
const [notesList, setNotesList] = useState(...)
const [categories, setCategories] = useState(...)
const [selectedId, setSelectedId] = useState(...)

// ✅ After
import { useNotes, useNotesData, useNotesUI, useFontPreferences } from '@/stores'
const { notes, categories, selectedNoteId, isLoading } = useNotes()
const { isPreview, togglePreviewMode } = useNotesUI()
```

### Step 2: Replace State Setters with Store Actions

```typescript
// ❌ Before
const handleSelectNote = (id: string) => {
  setSelectedId(id)
}

const handleCreateNote = () => {
  setNotesList([...notesList, newNote])
}

// ✅ After
const { selectNote, createNote } = useNotes()

const handleSelectNote = (id: string) => {
  selectNote(id)
}

const handleCreateNote = async () => {
  await createNote({
    title: 'New Note',
    content: '',
    category: 'General'
  })
}
```

### Step 3: Replace Refs with Store Actions

```typescript
// ❌ Before
const fontRegistryRef = useRef<Map<string, FontFace>>(new Map())

const handleFontUpload = (file: File) => {
  const fontFace = new FontFace(...)
  fontRegistryRef.current.set(id, fontFace)
  document.fonts.add(fontFace)
}

// ✅ After
const { registerFontFace, uploadedFonts } = useFontPreferences()

const handleFontUpload = (file: File) => {
  const fontFace = new FontFace(...)
  registerFontFace(id, fontFace)
}
```

### Step 4: Update Derived State Selectors

```typescript
// ❌ Before
const selectedNote = notesList.find(n => n.id === selectedId)
const filteredNotes = notesList.filter(n => 
  n.content.includes(query) && 
  (selectedCategory === 'All' || n.category === selectedCategory)
)

// ✅ After
const { notes, selectedNote } = useNotes()
const { searchQuery, selectedCategory } = useNotesUI()

const filteredNotes = notes.filter(n =>
  n.content.includes(searchQuery) &&
  (selectedCategory === 'All' || n.category === selectedCategory)
)
```

### Step 5: Remove Prop Drilling

```typescript
// ❌ Before - Props drilling
<NoteEditor 
  notes={notesList}
  selectedId={selectedId}
  onSelectNote={setSelectedId}
  onUpdateNote={handleUpdateNote}
  fontPreferences={fontPreferences}
  onFontChange={handleFontChange}
  // ... many more props
/>

// ✅ After - Direct store access in children
<NoteEditor />

// Inside NoteEditor component
const { notes, selectedNote, updateNote } = useNotes()
const { preferences, setBodyFont } = useFontPreferences()
```

### Step 6: Handle Async Operations

```typescript
// ❌ Before - No error handling
const handleDeleteNote = (id: string) => {
  setNotesList(notesList.filter(n => n.id !== id))
}

// ✅ After - With error handling
const { deleteNote } = useNotes()

const handleDeleteNote = async (id: string) => {
  try {
    await deleteNote(id)
  } catch (error) {
    toast.error('Failed to delete note')
  }
}
```

---

## Detailed Migration Steps

### 1. Update Imports

**File: src/components/Notes.tsx**

```typescript
// Remove
import { useState, useRef, useEffect } from 'react'

// Add
import { useRef, useEffect } from 'react'
import { useNotes, useNotesUI, useFontPreferences, useNotesData } from '@/stores'
```

### 2. Replace All useState Hooks

Find all `useState` calls:

```typescript
// BEFORE - Line ~100
const [notesList, setNotesList] = useState<NoteItem[]>([initialNote])
const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES)
const [selectedId, setSelectedId] = useState<string>(initialNote.id)
const [isPreview, setIsPreview] = useState(false)
const [query, setQuery] = useState('')
const [selectedCategory, setSelectedCategory] = useState<string>('All')
const [newCategoryName, setNewCategoryName] = useState('')
const [showAddCategory, setShowAddCategory] = useState(false)
const [fontOptions, setFontOptions] = useState<FontOption[]>(SYSTEM_FONT_OPTIONS)
const [fontPreferences, setFontPreferences] = useState<NotesFontPreferences>(DEFAULT_FONT_PREFERENCES)
const [showFontManager, setShowFontManager] = useState(false)
const [isAutoSaving, setIsAutoSaving] = useState(false)

// AFTER
const { notes: notesList, selectedNoteId: selectedId, createNote, updateNote: updateNoteAsync, deleteNote: deleteNoteAsync, categories } = useNotes()
const { isPreview, setPreviewMode, searchQuery: query, setSearchQuery, selectedCategory, setSelectedCategory, showAddCategoryModal: showAddCategory, setShowAddCategoryModal, showFontManager, setShowFontManager, isAutoSaving, setIsAutoSaving } = useNotesUI()
const { preferences: fontPreferences, uploadedFonts: fontOptions } = useFontPreferences()

// Derived state (keep simple calculations)
const selectedNote = notesList.find(n => n.id === selectedId)
const newCategoryName = '' // Not needed - handle in modal
```

### 3. Update Event Handlers

```typescript
// BEFORE
const handleUpdateNote = (id: string, data: Partial<NoteItem>) => {
  setNotesList(prev => prev.map(n => n.id === id ? {...n, ...data} : n))
}

// AFTER
const handleUpdateNote = async (id: string, data: Partial<NoteItem>) => {
  try {
    await updateNoteAsync(id, data)
  } catch (error) {
    console.error('Failed to update note:', error)
  }
}
```

### 4. Update Font Manager

```typescript
// BEFORE
const handleFontUpload = async (file: File) => {
  setIsAutoSaving(true)
  try {
    const fontFace = new FontFace(...)
    fontRegistryRef.current.set(id, fontFace)
    await document.fonts.add(fontFace)
    setFontOptions([...fontOptions, newFont])
  } finally {
    setIsAutoSaving(false)
  }
}

// AFTER
const { addUploadedFont, registerFontFace, setIsAutoSaving } = useFontPreferences()

const handleFontUpload = async (file: File) => {
  setIsAutoSaving(true)
  try {
    const fontFace = new FontFace(...)
    registerFontFace(id, fontFace)
    addUploadedFont(newFont)
  } finally {
    setIsAutoSaving(false)
  }
}
```

### 5. Clean Up Effects

```typescript
// BEFORE - Font cleanup
useEffect(() => {
  return () => {
    fontRegistryRef.current.forEach(fontFace => {
      if (document.fonts.has(fontFace)) {
        document.fonts.delete(fontFace)
      }
    })
  }
}, [])

// AFTER - Handled by store
// No cleanup needed - store handles FontFace lifecycle
```

---

## Component Changes

### NoteList Component

```typescript
// BEFORE
interface NoteListProps {
  notes: NoteItem[]
  selectedId: string
  onSelectNote: (id: string) => void
  onDeleteNote: (id: string) => void
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedId,
  onSelectNote,
  onDeleteNote,
}) => {
  // ...
}

// AFTER
const NoteList = () => {
  const { notes, selectedNoteId: selectedId, selectNote, deleteNote } = useNotes()
  
  // No props needed
}
```

### NoteEditor Component

```typescript
// BEFORE
interface NoteEditorProps {
  selectedNote: NoteItem | undefined
  isPreview: boolean
  onTogglePreview: () => void
  onUpdateNote: (id: string, data: Partial<NoteItem>) => void
  fontPreferences: NotesFontPreferences
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  selectedNote,
  isPreview,
  onTogglePreview,
  onUpdateNote,
  fontPreferences,
}) => {
  // ...
}

// AFTER
const NoteEditor = () => {
  const { selectedNote, updateNote } = useNotes()
  const { isPreview, togglePreviewMode } = useNotesUI()
  const { preferences: fontPreferences } = useFontPreferences()
  
  // No props needed - direct store access
}
```

### FontManager Component

```typescript
// BEFORE
interface FontManagerProps {
  fonts: FontOption[]
  preferences: NotesFontPreferences
  onUploadFont: (file: File) => Promise<void>
  onDeleteFont: (id: string) => void
  onSetBodyFont: (font: string) => void
}

const FontManager: React.FC<FontManagerProps> = ({
  fonts,
  preferences,
  onUploadFont,
  onDeleteFont,
  onSetBodyFont,
}) => {
  // ...
}

// AFTER
const FontManager = () => {
  const { uploadedFonts: fonts, preferences, isLoadingFont } = useFontPreferences()
  const { addUploadedFont, removeUploadedFont, setBodyFont } = useFontPreferences()
  
  // Access store methods directly
}
```

---

## Benefits After Migration

### 1. **Reduced Complexity**
- Fewer useState hooks
- Cleaner component code
- Single source of truth

### 2. **Better State Management**
- Predictable state updates
- Centralized error handling
- Automatic DevTools logging

### 3. **Easier Testing**
- Test stores independently
- Mock API responses
- Test components without context

### 4. **Better Performance**
- Optimized selectors
- Prevent unnecessary re-renders
- Memoized derived state

### 5. **Backend Integration**
- Seamless API integration
- Optimistic updates
- Automatic sync status tracking

---

## Testing After Migration

### Store Tests

```typescript
import { renderHook, act } from '@testing-library/react'
import { useNotes } from '@/stores'

describe('useNotes', () => {
  it('updates note', async () => {
    const { result } = renderHook(() => useNotes())
    
    await act(async () => {
      await result.current.updateNote('n-1', { title: 'New Title' })
    })
    
    const updated = result.current.notes.find(n => n.id === 'n-1')
    expect(updated?.title).toBe('New Title')
  })
})
```

### Component Tests

```typescript
import { render, screen } from '@testing-library/react'
import { NoteEditor } from '@/components'

// Mock the stores
jest.mock('@/stores', () => ({
  useNotes: () => ({
    selectedNote: { id: 'n-1', title: 'Test', content: 'Test' },
    updateNote: jest.fn(),
  }),
  useNotesUI: () => ({
    isPreview: false,
    togglePreviewMode: jest.fn(),
  }),
}))

it('renders note editor', () => {
  render(<NoteEditor />)
  expect(screen.getByDisplayValue('Test')).toBeInTheDocument()
})
```

---

## Rollout Plan

1. **Week 1**: Refactor Notes.tsx
2. **Week 2**: Refactor child components (NoteList, NoteEditor, FontManager)
3. **Week 3**: Connect to backend API
4. **Week 4**: Testing and optimization
5. **Week 5**: Persistence layer (Phase 2)

---

## Troubleshooting Common Issues

### Issue: Component not re-rendering after store update

```typescript
// ❌ Wrong - doesn't subscribe to store
const store = useNotesStore.getState()
store.updateNote(id, data)

// ✅ Correct - subscribes to store
const { updateNote } = useNotes()
await updateNote(id, data)
```

### Issue: Props still being passed

```typescript
// ❌ Wrong - unnecessary props
<NoteEditor notes={notes} onUpdate={updateNote} />

// ✅ Correct - direct store access
<NoteEditor />

// Inside component
const { notes, updateNote } = useNotes()
```

### Issue: Circular dependencies

```typescript
// Use store selectors to get specific state
// Don't pass entire store to components
const selectedNote = useNotes(state => state.selectedNote)
```

---

## Verification Checklist

- [ ] All useState replaced with store hooks
- [ ] No prop drilling between components
- [ ] API calls go through store actions
- [ ] Error handling in place
- [ ] Tests updated
- [ ] No TypeScript errors
- [ ] Build passes
- [ ] Zustand DevTools working
- [ ] No memory leaks (check DevTools)
- [ ] Performance acceptable (check React DevTools)

