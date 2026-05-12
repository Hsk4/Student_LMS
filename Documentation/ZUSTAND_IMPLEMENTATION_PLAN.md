# Zustand State Management Implementation Plan

## Overview
This document outlines the comprehensive Zustand store architecture for the academics-portal frontend, with focus on Notes feature, backend integration, and scalability for future features.

---

## 1. Store Architecture

### 1.1 Store Organization
```
src/stores/
├── index.ts                    # Main export file
├── notes/
│   ├── notesStore.ts          # Notes CRUD data store
│   ├── notesUiStore.ts        # Notes UI state (preview, search, etc.)
│   └── fontPreferencesStore.ts # Font customization preferences
├── shared/
│   ├── loadingStore.ts        # Global loading states
│   ├── errorStore.ts          # Global error handling
│   └── authStore.ts           # Auth context (user, role)
└── hooks/
    ├── useNotes.ts            # Composed hooks for Notes
    ├── useNotesUI.ts          # Composed hooks for UI
    └── useAsync.ts            # Async data fetching helper
```

### 1.2 Store Principles
- **Separation of Concerns**: Data stores separate from UI/UI preference stores
- **Backend Integration**: Async actions with API calls, optimistic updates, error handling
- **Middleware**: Devtools for debugging, persist middleware for localStorage
- **Type Safety**: Full TypeScript support with Zustand
- **Composability**: Hooks compose multiple stores for feature-level APIs

---

## 2. Notes Store Architecture

### 2.1 notesStore.ts - Core Data Management
**Responsibilities**:
- Note CRUD operations (create, read, update, delete)
- Category management
- Backend sync
- Optimistic updates with rollback

**State**:
```typescript
{
  notes: NoteItem[]           // All notes
  categories: CategoryItem[]  // All categories
  selectedNoteId: string      // Currently selected note
  isLoading: boolean          // Fetch/save loading
  error: string | null        // Error messages
  syncStatus: 'idle' | 'pending' | 'synced' | 'error'
}
```

**Actions**:
- `fetchNotes()` - GET /api/notes
- `createNote(title, content, category)` - POST /api/notes
- `updateNote(id, data)` - PATCH /api/notes/{id}
- `deleteNote(id)` - DELETE /api/notes/{id}
- `createCategory(name, color)` - POST /api/categories
- `fetchCategories()` - GET /api/categories
- `selectNote(id)` - Local selection
- `optimisticUpdateNote(id, data)` - Local + async backend sync

**Backend Endpoints** (to implement):
```
GET    /api/notes                 # Fetch all notes for user
POST   /api/notes                 # Create new note
GET    /api/notes/{id}            # Fetch single note
PATCH  /api/notes/{id}            # Update note
DELETE /api/notes/{id}            # Delete note

GET    /api/categories            # Fetch categories
POST   /api/categories            # Create category
PATCH  /api/categories/{id}       # Update category
DELETE /api/categories/{id}       # Delete category
```

### 2.2 notesUiStore.ts - UI State Management
**Responsibilities**:
- UI mode (preview vs edit)
- Search/filter state
- Toolbar state
- Modal visibility

**State**:
```typescript
{
  isPreview: boolean              // Preview mode toggle
  searchQuery: string             // Search/filter text
  selectedCategory: string        // Category filter
  showAddCategoryModal: boolean   // Add category modal
  showFontManager: boolean        // Font manager panel
  isAutoSaving: boolean           // Auto-save indicator
}
```

**Actions**:
- `togglePreviewMode()`
- `setSearchQuery(query)`
- `setSelectedCategory(category)`
- `setShowAddCategoryModal(show)`
- `setShowFontManager(show)`
- `setAutoSaving(saving)`

### 2.3 fontPreferencesStore.ts - Font Management
**Responsibilities**:
- Font upload/registration
- Font preference CRUD
- Defaults management
- Backend sync for persistence (Phase 2)

**State**:
```typescript
{
  uploadedFonts: FontOption[]          // User uploaded fonts
  preferences: NotesFontPreferences    // Body, code, quote, heading fonts
  isLoadingFont: boolean               // Font upload loading
  fontError: string | null             // Font error message
}
```

**Actions**:
- `uploadFont(file, name)` - Local FontFace API + future backend
- `deleteFont(id)` - Remove uploaded font
- `setBodyFont(fontFamily)`
- `setCodeFont(fontFamily)`
- `setQuoteFont(fontFamily)`
- `setHeadingFont(headingTag, fontFamily)`
- `setHeadingColor(headingTag, color)`
- `resetFontPreferences()` - Restore defaults
- `persistFontPreferences()` - Save to backend (Phase 2)

---

## 3. Shared Stores

### 3.1 loadingStore.ts - Global Loading States
Centralized loading indicators for complex async operations.

```typescript
{
  globalLoading: boolean
  loadingByKey: Record<string, boolean>  // e.g., 'notes', 'fonts', 'categories'
}

Actions:
- startLoading(key)
- stopLoading(key)
- isLoading(key) // selector
```

### 3.2 errorStore.ts - Global Error Handling
Unified error display and dismissal.

```typescript
{
  errors: Array<{id: string, message: string, type: 'error' | 'warning'}>
}

Actions:
- addError(message, type)
- removeError(id)
- clearErrors()
```

### 3.3 authStore.ts - Authentication Context
Provides user context for backend requests.

```typescript
{
  user: {id, email, name, role} | null
  token: string | null
  role: 'admin' | 'student' | null
}

Actions:
- setUser(user)
- setToken(token)
- logout()
```

---

## 4. Backend Integration Strategy

### 4.1 API Client Layer
Create `src/services/apiClient.ts`:

```typescript
// Singleton API client with auth headers
class ApiClient {
  private baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
  
  async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const token = useAuthStore.getState().token
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: { ...headers, ...options.headers }
    })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    
    return response.json()
  }
}

export const apiClient = new ApiClient()
```

### 4.2 Async Action Pattern
All backend calls follow this pattern:

```typescript
// Example: Create Note
export const createNote = async (data: CreateNoteDTO) => {
  const store = useNotesStore.getState()
  
  // Optimistic update
  const tempNote = { id: 'temp-' + Date.now(), ...data }
  store.addNoteOptimistic(tempNote)
  
  try {
    // Backend sync
    const created = await apiClient.request('/notes', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    
    // Confirm with server data
    store.confirmOptimisticUpdate(tempNote.id, created)
  } catch (error) {
    // Rollback on error
    store.removeNoteOptimistic(tempNote.id)
    store.setError(error.message)
  }
}
```

### 4.3 Response Handling
All API responses follow standard format:

```typescript
// Success response
{
  success: true,
  data: { /* entity */ },
  message: "Note created successfully"
}

// Error response
{
  success: false,
  error: "VALIDATION_ERROR",
  message: "Title is required",
  details: { field: "title" }
}
```

### 4.4 Middleware for Auto-Sync
Use Zustand middleware for automatic persistence:

```typescript
const persistMiddleware = (config) => (set, get, api) => {
  // Load from localStorage on init
  const stored = localStorage.getItem('notes-state')
  if (stored) {
    set(JSON.parse(stored))
  }
  
  // Auto-sync to server on state change
  const baseSet = set
  set = (state) => {
    baseSet(state)
    // Debounced API sync
    debouncedSync(get())
  }
  
  return config(set, get, api)
}
```

---

## 5. Implementation Phases

### Phase 1: Core Store Setup (Current)
- ✅ Create notesStore.ts with CRUD actions
- ✅ Create notesUiStore.ts with UI actions
- ✅ Create fontPreferencesStore.ts with font actions
- ✅ Create apiClient.ts for HTTP requests
- ✅ Refactor Notes.tsx to use stores
- ✅ Add Zustand + devtools to package.json

### Phase 2: Backend Integration + Persistence
- [ ] Implement backend endpoints (Node.js/Express)
- [ ] Add persistence middleware (localStorage + IndexedDB)
- [ ] Implement optimistic updates with rollback
- [ ] Add error handling and retry logic
- [ ] Sync font preferences to backend

### Phase 3: Advanced Features
- [ ] Add conflict resolution for concurrent edits
- [ ] Implement real-time sync via WebSocket
- [ ] Add offline mode with queue
- [ ] Implement undo/redo stack
- [ ] Add collaborative editing support

---

## 6. Migration Strategy (Notes.tsx)

### Before (useState):
```typescript
const [notesList, setNotesList] = useState<NoteItem[]>([])
const [selectedId, setSelectedId] = useState<string>('')
const [isPreview, setIsPreview] = useState(false)
```

### After (Zustand):
```typescript
const notes = useNotesStore(state => state.notes)
const selectedId = useNotesStore(state => state.selectedNoteId)
const isPreview = useNotesUiStore(state => state.isPreview)

// Or using composed hook
const { notes, selectedId } = useNotes()
const { isPreview } = useNotesUI()
```

### Benefits:
- ✅ Centralized state management
- ✅ Easier debugging with Zustand devtools
- ✅ Backend sync without prop drilling
- ✅ Shared state across routes/pages
- ✅ Simplified testing

---

## 7. Type Definitions

All types in `src/types/`:
```typescript
// stores.ts - New file
export interface NoteItem { /* ... */ }
export interface CategoryItem { /* ... */ }
export interface NotesFontPreferences { /* ... */ }
export interface NotesStore { /* ... */ }

// DTOs for backend
export interface CreateNoteDTO { /* ... */ }
export interface UpdateNoteDTO { /* ... */ }
export interface CreateCategoryDTO { /* ... */ }
```

---

## 8. Environment Configuration

Add to `.env.local`:
```
VITE_API_URL=http://localhost:3000/api
VITE_ENABLE_ZUSTAND_DEVTOOLS=true
VITE_AUTO_SYNC_INTERVAL=5000
```

---

## 9. Usage Examples

### Example 1: Create Note with Backend Sync
```typescript
import { useNotesActions } from '@/stores'

export const NoteCreator = () => {
  const createNote = useNotesActions(state => state.createNote)
  
  const handleCreate = async () => {
    await createNote({
      title: 'My Note',
      content: 'Content here',
      category: 'Mathematics'
    })
  }
  
  return <button onClick={handleCreate}>Create</button>
}
```

### Example 2: Auto-Sync on Change
```typescript
import { useNotesStore } from '@/stores'

export const NoteEditor = ({ noteId }) => {
  const note = useNotesStore(state => 
    state.notes.find(n => n.id === noteId)
  )
  const updateNote = useNotesStore(state => state.updateNote)
  
  // onChange auto-syncs to backend
  const handleChange = async (content) => {
    await updateNote(noteId, { content })
  }
  
  return <textarea onChange={handleChange} value={note?.content} />
}
```

### Example 3: Font Preferences Sync
```typescript
import { useFontPreferences } from '@/stores'

export const FontSelector = () => {
  const { preferences, setBodyFont } = useFontPreferences()
  
  const handleFontChange = (fontFamily) => {
    setBodyFont(fontFamily)
    // Automatically persists to backend (Phase 2)
  }
  
  return <select onChange={e => handleFontChange(e.target.value)}>
    {/* options */}
  </select>
}
```

---

## 10. Testing Strategy

### Store Tests:
```typescript
// __tests__/notesStore.test.ts
describe('notesStore', () => {
  it('creates note optimistically', () => {
    const store = useNotesStore.getState()
    store.addNoteOptimistic(testNote)
    expect(store.notes.length).toBe(1)
  })
})
```

### Integration Tests:
```typescript
// Tests with mocked API responses
// Validate optimistic update → backend sync → confirmation flow
```

---

## 11. Performance Optimization

### Selector Optimization:
```typescript
// ❌ Bad - causes unnecessary re-renders
const notes = useNotesStore(state => state.notes)

// ✅ Good - memoized selector
const notes = useNotesStore(
  state => state.notes,
  (prev, next) => prev.length === next.length
)
```

### Subscription Management:
```typescript
// Unsubscribe on unmount to prevent memory leaks
useEffect(() => {
  const unsubscribe = useNotesStore.subscribe(
    state => state.notes,
    notes => console.log('Notes updated', notes)
  )
  return () => unsubscribe()
}, [])
```

---

## 12. Migration Checklist

- [ ] Install Zustand + devtools
- [ ] Create store directory structure
- [ ] Implement notesStore.ts
- [ ] Implement notesUiStore.ts
- [ ] Implement fontPreferencesStore.ts
- [ ] Create apiClient.ts
- [ ] Create composed hooks (useNotes, useNotesUI, useFontPreferences)
- [ ] Refactor Notes.tsx to use stores
- [ ] Remove useState calls from Notes.tsx
- [ ] Update Help.tsx to demonstrate store usage
- [ ] Add error handling and loading states
- [ ] Test with Zustand devtools
- [ ] Update documentation

---

## 13. Backend API Spec (To Be Implemented)

### Endpoints Required:
```
Notes:
POST   /api/notes                  Create note
GET    /api/notes                  List all notes
GET    /api/notes/:id              Get single note
PATCH  /api/notes/:id              Update note
DELETE /api/notes/:id              Delete note

Categories:
POST   /api/categories             Create category
GET    /api/categories             List categories
PATCH  /api/categories/:id         Update category
DELETE /api/categories/:id         Delete category

Font Preferences (Phase 2):
GET    /api/preferences/fonts      Get user's font preferences
POST   /api/preferences/fonts      Save font preferences
POST   /api/fonts/upload           Upload custom font
DELETE /api/fonts/:id              Delete uploaded font
```

### Auth:
- All endpoints require `Authorization: Bearer {token}` header
- Backend uses userId from JWT to scope queries

---

## 14. Zustand Devtools Integration

Enable in development:
```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useNotesStore = create<NotesStore>()(
  devtools(
    (set, get) => ({ /* store */ }),
    { name: 'NotesStore' }
  )
)
```

In Chrome/Firefox DevTools:
1. Open DevTools
2. Find Zustand tab
3. View state, actions, diffs, time-travel
4. Dispatch actions manually for testing

---

## Next Steps

1. **Install Zustand**: `npm install zustand zustand/middleware immer`
2. **Create store files** according to directory structure
3. **Implement Phase 1** stores with mock data
4. **Refactor Notes.tsx** to use stores
5. **Test with Zustand DevTools**
6. **Begin Phase 2**: Backend API integration

