# Zustand + Backend Integration Guide

## Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install zustand immer
```

### 2. Setup Environment Variables

Create `.env.local`:
```
VITE_API_URL=http://localhost:3000/api
VITE_ENABLE_ZUSTAND_DEVTOOLS=true
```

### 3. Use Stores in Components

```typescript
import { useNotes, useNotesUI } from '@/stores'

export const NoteEditor = () => {
  const { notes, selectedNote, updateNote } = useNotes()
  const { isPreview, togglePreviewMode } = useNotesUI()

  return (
    <div>
      <button onClick={togglePreviewMode}>
        {isPreview ? 'Edit' : 'Preview'}
      </button>
      <textarea onChange={e => updateNote(selectedNote.id, { content: e.target.value })} />
    </div>
  )
}
```

---

## Architecture Overview

### Store Hierarchy

```
┌─────────────────────────────────────────┐
│         Frontend Components             │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│         Composed Hooks Layer            │
│  useNotes | useNotesUI | useFontPrefs   │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│        Individual Zustand Stores        │
│ notesStore | notesUiStore | fontStore   │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│         ApiClient + Services            │
│  notesApi | categoriesApi                │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│        Backend APIs (Node.js)           │
│   POST /api/notes | GET /api/categories │
└─────────────────────────────────────────┘
```

---

## Backend Integration Flow

### 1. Optimistic Updates with Rollback

When user updates a note:

```
User Types
   ↓
updateNote() called
   ↓
Local state updated immediately (optimistic)
   ↓
API call sent to backend
   ↓
┌─────────────────────┐
│   Success Response   │ → Sync status = 'synced'
└─────────────────────┘
       OR
┌─────────────────────┐
│   Error Response    │ → Rollback to old state
└─────────────────────┘        Sync status = 'error'
```

### 2. Store State Machine

```
idle → pending (API in progress) → synced (success) or error
                                  ↓
                           User can retry
```

### 3. Error Handling

All async actions automatically handle:
- Network errors
- 4xx/5xx responses
- Timeout errors
- Validation errors

Errors stored in `state.error` for UI display.

---

## API Specification (Backend Required)

### Required Endpoints

```
Notes:
POST   /api/notes              Create note
GET    /api/notes              List all notes (user-scoped)
GET    /api/notes/{id}         Get single note
PATCH  /api/notes/{id}         Update note
DELETE /api/notes/{id}         Delete note

Categories:
POST   /api/categories         Create category
GET    /api/categories         List categories
PATCH  /api/categories/{id}    Update category
DELETE /api/categories/{id}    Delete category
```

### Request/Response Format

**Create Note Request:**
```json
POST /api/notes
{
  "title": "Math Notes",
  "content": "# Calculus Basics",
  "category": "Mathematics"
}
```

**Response:**
```json
{
  "id": "n-123",
  "title": "Math Notes",
  "content": "# Calculus Basics",
  "category": "Mathematics",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z"
}
```

**Error Response:**
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Title is required",
  "details": { "field": "title" }
}
```

### Authentication

All endpoints require `Authorization` header:
```
Authorization: Bearer {jwt_token}
```

Backend must extract `userId` from JWT and scope queries to that user.

---

## Implementation Guide

### Phase 1: Setup (Current)

✅ Create Zustand stores
✅ Create composed hooks  
✅ Create API service
✅ Configure environment

**To Do:**
- [ ] Install Zustand: `npm install zustand`
- [ ] Import stores in Notes.tsx
- [ ] Replace useState with hooks

### Phase 2: Backend Integration

When backend is ready:

```typescript
// In notesStore.ts - Already implemented!

export const createNote = async (data) => {
  // 1. Optimistic update
  const tempNote = { id: 'temp-' + Date.now(), ...data }
  get().addNote(tempNote)
  
  try {
    // 2. API call
    const created = await apiClient.post('/notes', data)
    
    // 3. Confirm with server response
    get().deleteNote(tempNote.id)
    get().addNote(created)
    return created
  } catch (error) {
    // 4. Rollback on error
    get().deleteNote(tempNote.id)
    throw error
  }
}
```

### Phase 3: Persistence

Add localStorage/IndexedDB middleware:

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useNotesStore = create(
  persist(
    (set, get) => ({ /* store */ }),
    {
      name: 'notes-store',
      storage: localStorage, // or IndexedDB
    }
  )
)
```

---

## Usage Examples

### Example 1: Create Note with Error Handling

```typescript
import { useNotes, useNotesUI } from '@/stores'

export const NoteCreator = () => {
  const { createNote } = useNotes()
  const { setIsAutoSaving } = useNotesUI()
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async () => {
    try {
      setIsAutoSaving(true)
      const note = await createNote({
        title: 'New Note',
        content: '# Start typing',
        category: 'General'
      })
      console.log('Note created:', note)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsAutoSaving(false)
    }
  }

  return (
    <div>
      <button onClick={handleCreate}>Create</button>
      {error && <div className="error">{error}</div>}
    </div>
  )
}
```

### Example 2: Auto-Save Note

```typescript
import { useNotes } from '@/stores'
import { useEffect, useRef } from 'react'

export const NoteEditor = () => {
  const { selectedNote, updateNote } = useNotes()
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleContentChange = (content: string) => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Debounce save for 3 seconds
    timeoutRef.current = setTimeout(async () => {
      try {
        await updateNote(selectedNote.id, { content })
      } catch (err) {
        console.error('Save failed:', err)
      }
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <textarea
      value={selectedNote?.content || ''}
      onChange={e => handleContentChange(e.target.value)}
    />
  )
}
```

### Example 3: Search with Loading State

```typescript
import { useNotes, useNotesUI } from '@/stores'
import { useEffect } from 'react'

export const NoteSearch = () => {
  const { notes, isLoading } = useNotes()
  const { searchQuery, setSearchQuery, selectedCategory } = useNotesUI()

  const filtered = notes.filter(note => {
    const matchesQuery = note.content.includes(searchQuery) || 
                         note.title.includes(searchQuery)
    const matchesCategory = selectedCategory === 'All' || 
                            note.category === selectedCategory
    return matchesQuery && matchesCategory
  })

  return (
    <div>
      <input
        placeholder="Search notes..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      {isLoading && <p>Loading...</p>}
      <ul>
        {filtered.map(note => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Example 4: Font Preferences with Persistence (Phase 2)

```typescript
import { useFontPreferences } from '@/stores'

export const FontSettings = () => {
  const { preferences, setBodyFont, preferences } = useFontPreferences()

  const handleFontChange = async (fontFamily: string) => {
    setBodyFont(fontFamily)
    
    // Phase 2: Persist to backend
    // await saveFontPreferences(preferences)
  }

  return (
    <select value={preferences.bodyFont} onChange={e => handleFontChange(e.target.value)}>
      <option value="Inter">Inter</option>
      <option value="Georgia">Georgia</option>
    </select>
  )
}
```

---

## Debugging with Zustand DevTools

### Enable in Development

Stores are already configured with devtools:

```typescript
export const useNotesStore = create()(
  devtools(
    (set, get) => ({ /* store */ }),
    { name: 'NotesStore' }
  )
)
```

### Chrome DevTools

1. Install [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/)
2. Open DevTools → Redux tab
3. See store state, actions, and diffs
4. Time-travel debug by clicking on past actions
5. Export/import state for testing

### Firefox DevTools

1. Install [Redux DevTools Extension](https://addons.mozilla.org/firefox/addon/reduxdevtools/)
2. Same features as Chrome

---

## Performance Optimization

### Selector Memoization

Use selector hooks to prevent unnecessary re-renders:

```typescript
// ❌ Bad - always re-renders when store changes
const notes = useNotesStore(state => state.notes)

// ✅ Good - only re-renders if selected notes changed
const notes = useNotesStore(state => state.notes, (prev, next) => 
  prev.length === next.length && prev[0]?.id === next[0]?.id
)

// ✅ Best - use composed hook with memoized selectors
const { notes } = useNotes()
```

### Subscription Management

```typescript
useEffect(() => {
  // Subscribe to specific state changes
  const unsubscribe = useNotesStore.subscribe(
    state => state.notes,
    notes => console.log('Notes updated:', notes)
  )
  
  // Cleanup
  return () => unsubscribe()
}, [])
```

### Async Action Optimization

```typescript
// Debounce auto-save to prevent too many API calls
const debouncedSave = useMemo(
  () => debounce((id: string, content: string) => {
    updateNote(id, { content })
  }, 2000),
  []
)
```

---

## Testing

### Store Testing

```typescript
import { renderHook, act } from '@testing-library/react'
import { useNotesStore } from '@/stores'

describe('notesStore', () => {
  beforeEach(() => {
    useNotesStore.setState({ notes: [] })
  })

  it('creates note optimistically', async () => {
    const { result } = renderHook(() => useNotesStore())
    
    await act(async () => {
      await result.current.createNote({
        title: 'Test',
        content: 'Test content',
        category: 'General'
      })
    })
    
    expect(result.current.notes.length).toBe(1)
  })
})
```

### Integration Testing

```typescript
// Mock API responses
jest.mock('@/stores', () => ({
  apiClient: {
    post: jest.fn(() => Promise.resolve({ id: 'n-1', title: 'Test' }))
  }
}))

// Test with mocked API
it('syncs created note with backend', async () => {
  // Test implementation
})
```

---

## Troubleshooting

### Issue: Store not updating UI

**Solution:** Use composed hooks instead of accessing store directly:

```typescript
// ❌ Wrong - doesn't cause re-render
const store = useNotesStore.getState()
store.updateNote(id, data)

// ✅ Correct - causes re-render
const { updateNote } = useNotes()
await updateNote(id, data)
```

### Issue: Memory leak warnings

**Solution:** Unsubscribe from store subscriptions:

```typescript
useEffect(() => {
  const unsubscribe = useNotesStore.subscribe(
    state => state.notes,
    notes => console.log(notes)
  )
  return () => unsubscribe() // Clean up
}, [])
```

### Issue: Optimistic update fails

**Solution:** Check error handling in async actions:

```typescript
try {
  await updateNote(id, data)
} catch (error) {
  // Error already handled in store
  // Check state.error for error message
  console.error(store.error)
}
```

---

## Migration Checklist

- [ ] Install zustand: `npm install zustand`
- [ ] Create stores directory: `mkdir src/stores`
- [ ] Copy store files from this guide
- [ ] Update Notes.tsx to use hooks instead of useState
- [ ] Test with Zustand DevTools
- [ ] Setup backend endpoints
- [ ] Test API integration
- [ ] Add error handling UI
- [ ] Add auto-save feature
- [ ] Configure persistence (Phase 2)

---

## Next Steps

1. **Phase 1 (Current)**: Store setup ✅
2. **Phase 2**: Backend API integration
   - Implement endpoints in Node.js
   - Test with Zustand DevTools
   - Add error handling
3. **Phase 3**: Advanced features
   - Persistence with IndexedDB
   - Real-time sync with WebSocket
   - Offline mode with queue
   - Undo/redo stack
   - Collaborative editing

---

## Resources

- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension)
- [Zustand Best Practices](https://github.com/pmndrs/zustand/wiki/Guide-For-Immer-Users)
