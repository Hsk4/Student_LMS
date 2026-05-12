# Zustand Quick Reference

## Installation

```bash
npm install zustand
```

Already added to package.json ✅

---

## Quick Start - Using Stores in Components

### 1. Import Hooks
```typescript
import { useNotes, useNotesUI, useFontPreferences } from '@/stores'
```

### 2. Use in Component
```typescript
export const MyComponent = () => {
  const { notes, selectedNote, updateNote } = useNotes()
  const { isPreview, togglePreviewMode } = useNotesUI()
  
  return (
    <div>
      <p>{selectedNote?.title}</p>
      <button onClick={togglePreviewMode}>
        {isPreview ? 'Edit' : 'Preview'}
      </button>
    </div>
  )
}
```

---

## Store Hooks Reference

### useNotes()
**Data Management**
```typescript
const {
  notes,           // NoteItem[]
  selectedNote,    // NoteItem | undefined
  selectedNoteId,  // string | null
  isLoading,       // boolean
  error,           // string | null
  syncStatus,      // 'idle' | 'pending' | 'synced' | 'error'
  
  // Actions
  selectNote,      // (id: string) => void
  createNote,      // (data) => Promise<NoteItem>
  updateNote,      // (id, data) => Promise<void>
  deleteNote,      // (id) => Promise<void>
} = useNotes()
```

### useNotesUI()
**UI State**
```typescript
const {
  isPreview,                    // boolean
  searchQuery,                  // string
  selectedCategory,             // string
  showAddCategoryModal,         // boolean
  showFontManager,              // boolean
  isAutoSaving,                 // boolean
  notesListOpen,                // boolean
  
  // Actions
  togglePreviewMode,            // () => void
  setSearchQuery,               // (query: string) => void
  setSelectedCategory,          // (category: string) => void
  setShowAddCategoryModal,      // (show: boolean) => void
  setShowFontManager,           // (show: boolean) => void
  setIsAutoSaving,              // (saving: boolean) => void
  setNotesListOpen,             // (open: boolean) => void
} = useNotesUI()
```

### useFontPreferences()
**Font Management**
```typescript
const {
  uploadedFonts,        // FontOption[]
  preferences,          // NotesFontPreferences
  isLoadingFont,        // boolean
  fontError,            // string | null
  
  // Actions
  addUploadedFont,      // (font: FontOption) => void
  removeUploadedFont,   // (id: string) => void
  setBodyFont,          // (family: string) => void
  setCodeFont,          // (family: string) => void
  setQuoteFont,         // (family: string) => void
  setHeadingFont,       // (tag, family) => void
  setHeadingColor,      // (tag, color) => void
  registerFontFace,     // (id, fontFace) => void
  unregisterFontFace,   // (id) => void
  resetAllFonts,        // () => void
} = useFontPreferences()
```

### useNotesData()
**Categories**
```typescript
const {
  categories,           // CategoryItem[]
  fetchCategories,      // () => Promise<void>
  createCategory,       // (data) => Promise<CategoryItem>
  addCategory,          // (category) => void
  updateCategory,       // (id, data) => void
  deleteCategory,       // (id) => void
  fetchNotes,           // () => Promise<void>
} = useNotesData()
```

---

## Common Patterns

### Create Note
```typescript
const { createNote } = useNotes()

const handleCreate = async () => {
  try {
    const note = await createNote({
      title: 'My Note',
      content: '# Hello',
      category: 'General'
    })
    console.log('Created:', note)
  } catch (error) {
    console.error('Failed:', error)
  }
}
```

### Update Note
```typescript
const { updateNote } = useNotes()

const handleUpdate = async (id: string, content: string) => {
  try {
    await updateNote(id, { content })
  } catch (error) {
    console.error('Failed:', error)
  }
}
```

### Delete Note
```typescript
const { deleteNote } = useNotes()

const handleDelete = async (id: string) => {
  try {
    await deleteNote(id)
  } catch (error) {
    console.error('Failed:', error)
  }
}
```

### Auto-Save
```typescript
const { selectedNote, updateNote } = useNotes()
const timeoutRef = useRef<NodeJS.Timeout>()

const handleChange = (content: string) => {
  if (timeoutRef.current) clearTimeout(timeoutRef.current)
  
  timeoutRef.current = setTimeout(async () => {
    await updateNote(selectedNote.id, { content })
  }, 2000)
}
```

### Filter Notes
```typescript
const { notes } = useNotes()
const { searchQuery, selectedCategory } = useNotesUI()

const filtered = notes.filter(note => {
  const matchesSearch = note.title.includes(searchQuery)
  const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory
  return matchesSearch && matchesCategory
})
```

### Change Font
```typescript
const { preferences, setBodyFont } = useFontPreferences()

const handleFontChange = (fontFamily: string) => {
  setBodyFont(fontFamily)
  // Automatically syncs to backend (Phase 2)
}
```

---

## Error Handling

All async operations have built-in error handling:

```typescript
const { notes, error, syncStatus } = useNotes()

if (error) {
  return <div className="error">{error}</div>
}

if (syncStatus === 'pending') {
  return <div>Saving...</div>
}

if (syncStatus === 'error') {
  return <div>Failed to sync. Check connection.</div>
}
```

---

## Environment Variables

Create `.env.local`:

```
# API Configuration
VITE_API_URL=http://localhost:3000/api

# Store Configuration
VITE_ENABLE_ZUSTAND_DEVTOOLS=true

# Feature Flags
VITE_ENABLE_OPTIMISTIC_UPDATES=true
VITE_ENABLE_AUTO_SAVE=true
```

---

## DevTools Debugging

### Chrome/Firefox DevTools
1. Open DevTools
2. Find "Redux" tab (or "Redux DevTools" extension)
3. View store state and actions

### Actions
- **Dispatch**: Manually call store actions
- **Time Travel**: Jump to previous state
- **Export/Import**: Save state snapshots
- **Diff**: See what changed

---

## Performance Tips

### Use Selectors
```typescript
// ❌ Slower - re-renders on any store change
const store = useNotes()

// ✅ Faster - only re-renders on notes change
const { notes } = useNotes()
```

### Memoize Callbacks
```typescript
const handleUpdate = useCallback(async (id: string, data) => {
  await updateNote(id, data)
}, [updateNote])
```

### Use useEffect for Side Effects
```typescript
useEffect(() => {
  // Subscribe to note changes
  const unsubscribe = useNotesStore.subscribe(
    state => state.notes,
    notes => console.log('Notes updated:', notes)
  )
  return () => unsubscribe()
}, [])
```

---

## Direct Store Access (Advanced)

When you need to access store outside React:

```typescript
import { useNotesStore } from '@/stores'

// Get current state
const state = useNotesStore.getState()
console.log(state.notes)

// Dispatch action
useNotesStore.getState().selectNote('n-1')

// Subscribe to changes
const unsubscribe = useNotesStore.subscribe(
  state => state.notes,
  notes => console.log('Updated:', notes)
)
```

---

## File Structure

```
src/stores/
├── index.ts                    # Main exports
├── hooks.ts                    # useNotes, useNotesUI, etc.
├── notesStore.ts               # Data store + API client
├── notesUiStore.ts             # UI store
└── fontPreferencesStore.ts     # Font store

src/services/
└── notesApi.ts                 # API service (optional)
```

---

## Backend Endpoints Required

```
POST   /api/notes              Create note
GET    /api/notes              List notes
GET    /api/notes/{id}         Get note
PATCH  /api/notes/{id}         Update note
DELETE /api/notes/{id}         Delete note

POST   /api/categories         Create category
GET    /api/categories         List categories
PATCH  /api/categories/{id}    Update category
DELETE /api/categories/{id}    Delete category
```

---

## Next Steps

1. ✅ Stores created
2. ⏳ Use in Notes.tsx
3. ⏳ Connect to backend
4. ⏳ Add persistence
5. ⏳ Advanced features

See detailed guides:
- `ZUSTAND_SUMMARY.md` - Overview
- `ZUSTAND_BACKEND_INTEGRATION.md` - Backend integration
- `NOTES_MIGRATION_GUIDE.md` - Refactoring Notes.tsx
