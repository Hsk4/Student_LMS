# Zustand Architecture Visualization

## System Architecture Diagram

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                        Frontend Application                       ┃
┃                                                                   ┃
┃  ┌─────────────┐  ┌──────────────┐  ┌────────────────────────┐  ┃
┃  │   Pages     │  │  Components  │  │     Custom Hooks       │  ┃
┃  │             │  │              │  │                        │  ┃
┃  │ • Admin     │  │ • Notes      │  │ • useNotes()          │  ┃
┃  │ • Student   │  │ • NoteList   │  │ • useNotesUI()        │  ┃
┃  │ • Help      │  │ • FontMgr    │  │ • useFontPreferences()│  ┃
┃  └─────┬───────┘  └──────┬───────┘  └────────────┬───────────┘  ┃
┃        │                 │                       │               ┃
┗━━━━━━━━┃━━━━━━━━━━━━━━━━┃━━━━━━━━━━━━━━━━━━━━━┃━━━━━━━━━━━┛
         │                 │                       │
         └─────────────────┼───────────────────────┘
                           │
         ┌─────────────────▼──────────────────────┐
         │    Zustand Store Hooks Layer          │
         │  (Composed hooks for feature APIs)    │
         │                                       │
         │  • useNotes()                        │
         │  • useNotesUI()                      │
         │  • useFontPreferences()              │
         │  • useNotesData()                    │
         └─────────────────┬──────────────────────┘
                           │
         ┌─────────────────▼──────────────────────────────────────┐
         │        Individual Zustand Stores                       │
         │    (Separated by domain & concern)                    │
         │                                                        │
         │  ┌───────────────────────┐  ┌──────────────────────┐  │
         │  │    notesStore.ts      │  │   notesUiStore.ts   │  │
         │  │                       │  │                      │  │
         │  │ State:                │  │ State:               │  │
         │  │ • notes[]             │  │ • isPreview          │  │
         │  │ • categories[]        │  │ • searchQuery        │  │
         │  │ • selectedNoteId      │  │ • selectedCategory   │  │
         │  │ • isLoading           │  │ • showModals         │  │
         │  │ • error               │  │ • isAutoSaving       │  │
         │  │ • syncStatus          │  │                      │  │
         │  │                       │  │ Actions:             │  │
         │  │ Actions:              │  │ • togglePreviewMode  │  │
         │  │ • createNote()        │  │ • setSearchQuery()   │  │
         │  │ • updateNoteAsync()   │  │ • setCategory()      │  │
         │  │ • deleteNoteAsync()   │  │ • ...                │  │
         │  │ • fetchNotes()        │  │                      │  │
         │  │ • createCategory()    │  │                      │  │
         │  └───────────────────────┘  └──────────────────────┘  │
         │                                                        │
         │  ┌─────────────────────────────────────────────────┐  │
         │  │      fontPreferencesStore.ts                   │  │
         │  │                                                │  │
         │  │ State:                                         │  │
         │  │ • uploadedFonts[]                             │  │
         │  │ • preferences { bodyFont, codeFont, ... }    │  │
         │  │ • fontRegistry (FontFace instances)           │  │
         │  │ • isLoadingFont, fontError                   │  │
         │  │                                                │  │
         │  │ Actions:                                       │  │
         │  │ • addUploadedFont()                           │  │
         │  │ • removeUploadedFont()                        │  │
         │  │ • setBodyFont(), setHeadingFont()            │  │
         │  │ • registerFontFace()                          │  │
         │  │ • resetAllFonts()                             │  │
         │  └─────────────────────────────────────────────────┘  │
         │                                                        │
         └────────────────┬─────────────────────────────────────┘
                          │
         ┌────────────────▼────────────────────────────────┐
         │    API Client Layer (notesStore.ts)            │
         │  (Singleton HTTP client with auth)             │
         │                                                │
         │  • get<T>(endpoint)                           │
         │  • post<T>(endpoint, body)                    │
         │  • patch<T>(endpoint, body)                   │
         │  • delete<T>(endpoint)                        │
         │                                                │
         │  Auto-includes:                                │
         │  • Authorization header (JWT token)            │
         │  • Content-Type: application/json              │
         │  • Error handling & parsing                    │
         └────────────────┬────────────────────────────────┘
                          │
         ┌────────────────▼────────────────────────────────┐
         │    HTTP Requests (fetch API)                   │
         │                                                │
         │  Headers:                                      │
         │  • Authorization: Bearer {token}               │
         │  • Content-Type: application/json              │
         └────────────────┬────────────────────────────────┘
                          │
┏━━━━━━━━━━━━━━━━━━━━━━━━▼━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                    Backend API Server                            ┃
┃                   (Node.js / Express)                            ┃
┃                                                                  ┃
┃  ┌─────────────────────────────────────────────────────────┐   ┃
┃  │              API Endpoints                              │   ┃
┃  │                                                         │   ┃
┃  │  Notes:                                                 │   ┃
┃  │  POST   /api/notes              Create note            │   ┃
┃  │  GET    /api/notes              List all notes         │   ┃
┃  │  GET    /api/notes/{id}         Get single note       │   ┃
┃  │  PATCH  /api/notes/{id}         Update note           │   ┃
┃  │  DELETE /api/notes/{id}         Delete note           │   ┃
┃  │                                                         │   ┃
┃  │  Categories:                                            │   ┃
┃  │  POST   /api/categories          Create category       │   ┃
┃  │  GET    /api/categories          List categories       │   ┃
┃  │  PATCH  /api/categories/{id}     Update category       │   ┃
┃  │  DELETE /api/categories/{id}     Delete category       │   ┃
┃  │                                                         │   ┃
┃  └─────────────────────────────────────────────────────────┘   ┃
┃                              │                                  ┃
┃  ┌──────────────────────────▼──────────────────────────────┐   ┃
┃  │              Business Logic                             │   ┃
┃  │  • Validation                                          │   ┃
┃  │  • Authorization (userId from JWT)                    │   ┃
┃  │  • Database operations                                │   ┃
┃  │  • Error handling                                     │   ┃
┃  └──────────────────────────┬───────────────────────────┘   ┃
┃                             │                               ┃
┃  ┌──────────────────────────▼──────────────────────────────┐   ┃
┃  │              Database                                   │   ┃
┃  │  • Notes table                                         │   ┃
┃  │  • Categories table                                    │   ┃
┃  │  • Font preferences table (Phase 2)                   │   ┃
┃  └──────────────────────────────────────────────────────┘   ┃
┃                                                              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## Data Flow Diagram

### User Creates a Note

```
┌──────────────────────────────────────────────────────────────┐
│                   User Action                               │
│            Click "Create Note" button                        │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│              Component Event Handler                         │
│        handleCreate() → createNote({...})                   │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│            Zustand Store Action (notesStore)                │
│                                                              │
│  1. Generate temporary ID: 'temp-1234567890'               │
│  2. Create temporary note object                           │
│  3. LOCAL STATE UPDATE (optimistic)                        │
│     └─ state.notes.push(tempNote)                          │
│  4. Set state.syncStatus = 'pending'                      │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│              Component Re-renders                           │
│     New note appears in UI immediately ✨                  │
│     (no spinner needed)                                     │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│              API Client sends HTTP request                  │
│                                                              │
│  POST /api/notes                                           │
│  Authorization: Bearer {jwt_token}                         │
│  Content-Type: application/json                           │
│                                                              │
│  Body: {                                                    │
│    title: "My Note",                                       │
│    content: "# Hello",                                     │
│    category: "General"                                     │
│  }                                                          │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────────┐
        │    NETWORK REQUEST                  │
        │    (in flight)                      │
        │                                     │
        │  UI is responsive ✓                │
        │  Optimistic update visible ✓       │
        │  No loading spinner ✓              │
        └─────────────────────┬───────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
        ┌──────────────────┐  ┌──────────────────┐
        │ SUCCESS (200)    │  │ ERROR (4xx/5xx)  │
        └────────┬─────────┘  └────────┬─────────┘
                 │                     │
                 ▼                     ▼
        ┌──────────────────┐  ┌──────────────────┐
        │ Backend Returns: │  │ Backend Returns: │
        │ {                │  │ {                │
        │  id: "n-123",   │  │  error: "...",  │
        │  title: "...",  │  │  message: "..." │
        │  ...created_at  │  │ }                │
        │ }                │  └────────┬─────────┘
        └────────┬─────────┘           │
                 │                     ▼
                 │         ┌─────────────────────────────┐
                 │         │   Rollback Optimistic State │
                 │         │                             │
                 │         │  1. Delete temp note       │
                 │         │  2. Revert to original      │
                 │         │  3. Show error message      │
                 │         │  4. syncStatus = 'error'   │
                 │         └────────┬────────────────────┘
                 │                  │
                 ▼                  ▼
        ┌──────────────────┐  ┌──────────────────┐
        │ Update Store     │  │  Update Store    │
        │ (Confirm):       │  │  (Rollback):     │
        │                  │  │                  │
        │ 1. Delete temp   │  │ Remove temp note │
        │    note          │  │ Show error Toast │
        │ 2. Add server    │  │ syncStatus:      │
        │    response      │  │ 'error'          │
        │ 3. syncStatus:   │  │                  │
        │    'synced'      │  │ User can retry   │
        │ 4. Clear error   │  │                  │
        └────────┬─────────┘  └──────────────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Component        │
        │ Re-renders       │
        │                  │
        │ Shows saved note │
        │ with server ID   │
        │ and timestamp    │
        │ ✓ Saved          │
        └──────────────────┘
```

---

## State Management Flow

```
┌─────────────────────────────────────────────────────────┐
│          User Interaction                               │
│  (type, click, select, etc.)                            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│     React Component Event Handler                       │
│  (onClick, onChange, onSubmit, etc.)                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│        Store Action Function                           │
│  (updateNote, createCategory, setBodyFont, etc.)       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │  Is it an async action?│
        └────────┬───────────────┘
                 │
         ┌───────┴────────┐
         │                │
         ▼                ▼
    ┌────────────┐   ┌──────────────┐
    │ Sync       │   │ Async        │
    │ (instant)  │   │ (API call)   │
    └─────┬──────┘   └──────┬───────┘
          │                 │
          │                 ▼
          │         ┌──────────────────┐
          │         │ Set state.loading │
          │         │ state.error = null│
          │         └──────┬───────────┘
          │                │
          │                ▼
          │         ┌──────────────────┐
          │         │ Make API Request │
          │         │ (HTTP call)      │
          │         └──────┬───────────┘
          │                │
          │         ┌──────┴──────┐
          │         │             │
          │         ▼             ▼
          │     ┌────────┐    ┌────────┐
          │     │Success │    │Error   │
          │     └────┬───┘    └───┬────┘
          │          │            │
          ▼          ▼            ▼
    ┌─────────────────────────────────────┐
    │      Update Store State             │
    │  (set value, clear error, etc.)     │
    │                                     │
    │  - Zustand detects change          │
    │  - Notifies all subscribers         │
    │  - Components re-render if         │
    │    they use affected state          │
    └────────────┬────────────────────────┘
                 │
                 ▼
    ┌─────────────────────────────────────┐
    │     Component Re-render             │
    │  (new props/state from hooks)       │
    │                                     │
    │  - Only affected components update  │
    │  - Others skip (performance)        │
    │  - New UI reflects state changes    │
    └────────────┬────────────────────────┘
                 │
                 ▼
    ┌─────────────────────────────────────┐
    │     User sees updated UI            │
    │  ✓ Form values changed              │
    │  ✓ Lists updated                    │
    │  ✓ Error messages shown/cleared     │
    │  ✓ Loading indicators updated       │
    └─────────────────────────────────────┘
```

---

## Component Interaction Map

```
┌────────────────────────────────────────────────────────────┐
│                  Notes Page (Components)                   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │         Notes Component (Main Container)            │  │
│  │  • Uses: useNotes, useNotesUI, useFontPreferences  │  │
│  └────────────────────────────────────────────────────┘  │
│    ├─ Provides context via props                        │  │
│    │  (for shared state or callbacks)                   │  │
│    │                                                     │  │
│    ├──────────────────────┬───────────────────────────┐  │
│    │                      │                           │  │
│    ▼                      ▼                           ▼  │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │  NoteList    │  │  NoteEditor  │  │  FontManager   │ │
│  │              │  │              │  │                │ │
│  │ Uses:        │  │ Uses:        │  │ Uses:          │ │
│  │ • useNotes() │  │ • useNotes() │  │ • useFontPref()│ │
│  │ • useNotesUI │  │ • useNotesUI │  │ • useNotesUI() │ │
│  │              │  │ • useFontPref│  │                │ │
│  │ Actions:     │  │              │  │ Actions:       │ │
│  │ • selectNote │  │ Actions:     │  │ • addFont()    │ │
│  │ • deleteNote │  │ • updateNote │  │ • deleteFont() │ │
│  │ • createNote │  │ • toggle Prev│  │ • setBodyFont()│ │
│  └──────────────┘  └──────────────┘  └────────────────┘ │
│    │                  │                   │              │
│    └──────┬───────────┴───────────────────┘              │
│           │                                              │
│           └─► All components see same store updates    │
│               (reactive / live sync)                    │
│                                                         │
│  Data flows bidirectionally:                            │
│  • Component -> Action -> Store -> All Components      │
│  • Each component subscribes independently              │
│  • Only re-renders on relevant state changes           │
└────────────────────────────────────────────────────────────┘
```

---

## Zustand DevTools Time-Travel Debugging

```
┌─────────────────────────────────────────────────────────┐
│          Browser DevTools (Redux tab)                   │
│                                                         │
│  Action Timeline:                                       │
│  ┌───────────────────────────────────────────────────┐ │
│  │ ▶ @@INIT                                           │ │
│  │ ▶ selectNote (payload: "n-1")                     │ │
│  │ ▶ togglePreviewMode                              │ │
│  │ ▶ setSearchQuery (payload: "math")               │ │
│  │ ▶ createNote:optimistic                          │ │
│  │ ▶ createNote:confirmed                           │ │
│  │ │                                                 │ │
│  │ ◀ ← You can click back to any state              │ │
│  │                                                   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  Current State:                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ {                                                  │ │
│  │   "notes": [                                      │ │
│  │     { "id": "n-1", "title": "Math", ... },      │ │
│  │     { "id": "n-2", "title": "Physics", ... }    │ │
│  │   ],                                              │ │
│  │   "selectedNoteId": "n-1",                        │ │
│  │   "isLoading": false,                             │ │
│  │   "error": null,                                  │ │
│  │   "syncStatus": "synced"                         │ │
│  │ }                                                  │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  Diff (what changed):                                   │
│  ┌───────────────────────────────────────────────────┐ │
│  │ + selectedNoteId: "n-1"                           │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Optimization: Selective Re-renders

```
User updates note content
        │
        ▼
updateNote() called
        │
        ▼
Store state updated: state.notes[0].content = "new"
        │
        ▼
┌──────────────────────────────────────────────────┐
│ Zustand notifies all subscribers                │
│ (but only if they use that part of state)      │
└──────────────┬───────────────────────────────────┘
               │
     ┌─────────┼──────────┬───────────┐
     │         │          │           │
     ▼         ▼          ▼           ▼
  ┌────┐   ┌────┐    ┌────┐      ┌────┐
  │Note│   │Note│    │Font│      │UI  │
  │List│   │Edit│    │Mgr │      │Bar │
  │    │   │    │    │    │      │    │
  │Uses│   │Uses│    │Uses│      │Uses│
  │note│   │sele│    │pref│      │isP │
  │s[]│   │ctd │    │eren│      │rev │
  │   │   │    │    │ces │      │    │
  └────┘   └────┘    └────┘      └────┘
   ❌         ✅         ❌         ❌
   Skip      Update     Skip       Skip
  (no state  (state     (no state  (no state
   change)  updated)    change)    change)

Result:
┌──────────────────────────────────────────────┐
│ Only NoteEditor re-renders                  │
│ • Most performant (selective updates)       │
│ • No unnecessary renders                    │
│ • Smooth UI response                        │
└──────────────────────────────────────────────┘
```

---

## Summary

This architecture provides:

1. **Scalability**: Separate stores for each domain
2. **Performance**: Selective re-renders, optimized selectors
3. **Maintainability**: Clear separation of concerns
4. **Debugging**: Full DevTools support
5. **Type Safety**: Complete TypeScript support
6. **Offline Support**: Optimistic updates pattern
7. **Error Handling**: Centralized, built-in
8. **Extensibility**: Easy to add new stores/features

See `ZUSTAND_BACKEND_INTEGRATION.md` for implementation details.
