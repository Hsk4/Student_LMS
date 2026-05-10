/**
 * Shared Notes Component
 * Markdown editor and preview for both Student and Admin
 */

import React, { useMemo, useState } from 'react'
import { FileText, Save, Eye, Edit, Plus, Trash2, Search, FolderPlus, Folder, X } from 'lucide-react'
import Button from '@/components/common/Button'
import type { NotesProps } from '@/types/components'

type NoteItem = {
  id: string
  title: string
  content: string
  category: string
  updatedAt: string
}

type CategoryItem = {
  id: string
  name: string
  color: string
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'c-1', name: 'Mathematics', color: 'indigo' },
  { id: 'c-2', name: 'Physics', color: 'blue' },
  { id: 'c-3', name: 'Chemistry', color: 'green' },
  { id: 'c-4', name: 'Biology', color: 'emerald' },
  { id: 'c-5', name: 'History', color: 'amber' },
  { id: 'c-6', name: 'English', color: 'purple' },
]

const initialNote: NoteItem = {
  id: 'n-1',
  title: 'Getting started',
  content: '# Welcome\n\nStart your study notes here. Use **Markdown** for formatting.\n\n- Create headings\n- Add lists\n- Save and export',
  category: 'Mathematics',
  updatedAt: new Date().toISOString(),
}

export const Notes: React.FC<NotesProps> = ({ role = 'student' }) => {
  const [notesList, setNotesList] = useState<NoteItem[]>([initialNote])
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES)
  const [selectedId, setSelectedId] = useState<string>(initialNote.id)
  const [isPreview, setIsPreview] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [showAddCategory, setShowAddCategory] = useState(false)

  const selected = useMemo(() => notesList.find((n) => n.id === selectedId) || notesList[0], [notesList, selectedId])

  const handleCreate = () => {
    const id = `n-${Date.now()}`
    const note: NoteItem = {
      id,
      title: 'Untitled note',
      content: '',
      category: selectedCategory === 'All' ? 'Mathematics' : selectedCategory,
      updatedAt: new Date().toISOString(),
    }
    setNotesList((s) => [note, ...s])
    setSelectedId(id)
    setIsPreview(false)
  }

  const handleDelete = (id: string) => {
    if (!confirm('Delete this note?')) return
    setNotesList((s) => s.filter((n) => n.id !== id))
    if (selectedId === id && notesList.length > 1) setSelectedId(notesList[0].id)
  }

  const handleSave = () => {
    if (!selected) return
    setNotesList((s) => s.map((n) => (n.id === selected.id ? { ...n, updatedAt: new Date().toISOString() } : n)))
    alert('Note saved')
  }

  const handleExport = (note: NoteItem) => {
    const el = document.createElement('a')
    const file = new Blob([note.content || `# ${note.title}`], { type: 'text/markdown' })
    el.href = URL.createObjectURL(file)
    el.download = `${note.title.replace(/\s+/g, '_') || 'note'}.md`
    document.body.appendChild(el)
    el.click()
    document.body.removeChild(el)
  }

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return
    const colors = ['indigo', 'blue', 'green', 'emerald', 'amber', 'purple', 'pink', 'red', 'cyan', 'lime']
    const newCat: CategoryItem = {
      id: `c-${Date.now()}`,
      name: newCategoryName,
      color: colors[categories.length % colors.length],
    }
    setCategories((s) => [...s, newCat])
    setNewCategoryName('')
    setShowAddCategory(false)
    setSelectedCategory(newCat.name)
  }

  const handleDeleteCategory = (id: string) => {
    if (!confirm('Delete this category and move its notes to Mathematics?')) return
    setCategories((s) => s.filter((c) => c.id !== id))
    const catName = categories.find((c) => c.id === id)?.name
    if (catName) {
      setNotesList((s) => s.map((n) => (n.category === catName ? { ...n, category: 'Mathematics' } : n)))
    }
    if (selectedCategory === catName) setSelectedCategory('All')
  }

  const filtered = notesList
    .filter((n) => (selectedCategory === 'All' ? true : n.category === selectedCategory))
    .filter((n) => n.title.toLowerCase().includes(query.toLowerCase()) || n.content.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="notes-page">
      <div className="notes-container">
        <div className="notes-header">
          <FileText size={28} style={{ color: '#4f46e5' }} />
          <div>
            <h1 className="theme-h3">{role === 'admin' ? 'Admin Notes' : 'My Notes'}</h1>
            <p className="theme-text-sm">Organize notes by subject and create study materials.</p>
          </div>
        </div>

        <div className="notes-grid">
          {/* Left: categories and notes list */}
          <aside className="notes-aside">
            {/* Categories Section */}
            <div className="notes-categories">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <h2 className="theme-text-sm" style={{ fontWeight: 700 }}>Subjects</h2>
                <button onClick={() => setShowAddCategory(!showAddCategory)} className="theme-btn-sm" style={{ padding: 6 }}>
                  <FolderPlus size={16} style={{ color: '#475569' }} />
                </button>
              </div>

              {showAddCategory && (
                <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
                  <input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Subject name"
                    className="theme-input"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                  />
                  <button onClick={handleAddCategory} className="theme-btn" style={{ padding: '8px 12px', backgroundColor: '#4f46e5', color: 'white' }}>
                    Add
                  </button>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button onClick={() => setSelectedCategory('All')} className={`notes-category-btn ${selectedCategory === 'All' ? 'selected' : ''}`}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Folder size={14} />
                    All Notes
                  </span>
                  <span className="theme-badge">{notesList.length}</span>
                </button>

                {categories.map((cat) => {
                  const catCount = notesList.filter((n) => n.category === cat.name).length
                  return (
                    <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button onClick={() => setSelectedCategory(cat.name)} className={`notes-category-btn ${selectedCategory === cat.name ? 'selected' : ''}`}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Folder size={14} />
                          {cat.name}
                        </span>
                        <span className="theme-badge">{catCount}</span>
                      </button>
                      <button onClick={() => handleDeleteCategory(cat.id)} className="theme-btn-sm" style={{ padding: 6, opacity: 0.8 }}>
                        <X size={14} style={{ color: '#dc2626' }} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Search and Create */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notes" className="theme-input" />
                <Search size={16} style={{ position: 'absolute', right: 12, top: 10, color: '#94a3b8' }} />
              </div>
              <Button onClick={handleCreate} className="theme-btn-sm">
                <Plus size={16} />
              </Button>
            </div>

            {/* Notes list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filtered.length === 0 && <div className="theme-text-sm">No notes in this subject</div>}
              {filtered.map((note) => (
                <article key={note.id} onClick={() => setSelectedId(note.id)} className={`notes-note-article ${note.id === selectedId ? 'selected' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <h3 className="theme-text-sm" style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{note.title}</h3>
                    <span className="theme-badge" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>{note.category}</span>
                  </div>
                  <p className="theme-text-sm" style={{ color: '#94a3b8' }}>{new Date(note.updatedAt).toLocaleDateString()}</p>
                  <p style={{ marginTop: 8, fontSize: 13, color: '#475569' }} dangerouslySetInnerHTML={{ __html: previewText(note.content) }} />
                </article>
              ))}
            </div>
          </aside>

          {/* Right: editor / preview */}
          <div>
            <div className="notes-editor">
              <div className="notes-editor-header">
                <div style={{ flex: 1 }}>
                  <input value={selected?.title || ''} onChange={(e) => setNotesList((s) => s.map((n) => (n.id === selected?.id ? { ...n, title: e.target.value } : n)))} className="" style={{ width: '100%', fontSize: 18, fontWeight: 700, background: 'transparent', border: 'none', outline: 'none' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <p className="theme-text-sm">Last updated: {selected ? new Date(selected.updatedAt).toLocaleString() : '-'}</p>
                    {selected && (
                      <>
                        <span className="theme-text-sm">•</span>
                        <select value={selected?.category || 'Mathematics'} onChange={(e) => setNotesList((s) => s.map((n) => (n.id === selected?.id ? { ...n, category: e.target.value } : n)))} className="theme-select">
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setIsPreview(false)} className={`theme-btn-sm`} style={{ backgroundColor: !isPreview ? '#4f46e5' : '#fff', color: !isPreview ? '#fff' : '#0f172a' }}>
                    <Edit size={14} /> Edit
                  </button>
                  <button onClick={() => setIsPreview(true)} className={`theme-btn-sm`} style={{ backgroundColor: isPreview ? '#4f46e5' : '#fff', color: isPreview ? '#fff' : '#0f172a' }}>
                    <Eye size={14} /> Preview
                  </button>
                  <button onClick={handleSave} className="theme-btn" style={{ backgroundColor: '#059669', color: '#fff' }}>
                    <Save size={14} /> Save
                  </button>
                  <button onClick={() => selected && handleExport(selected)} className="theme-btn" style={{ backgroundColor: '#f1f5f9', color: '#0f172a' }}>⬇️ Export</button>
                  <button onClick={() => selected && handleDelete(selected.id)} className="theme-btn" style={{ backgroundColor: '#fff1f2', color: '#dc2626' }}><Trash2 size={14} /> Delete</button>
                </div>
              </div>

              <div className="notes-editor-body">
                {!isPreview ? (
                  <textarea value={selected?.content || ''} onChange={(e) => setNotesList((s) => s.map((n) => (n.id === selected?.id ? { ...n, content: e.target.value } : n)))} placeholder="Write your note here using Markdown..." className="theme-textarea" style={{ minHeight: 260 }} />
                ) : (
                  <div className="theme-text-base">
                    <MarkdownPreview content={selected?.content || ''} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const previewText = (str: string) => {
  const escaped = str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped.split('\n').slice(0, 3).join('<br/>')
}

/**
 * Markdown preview (small, safe)
 */
const MarkdownPreview: React.FC<{ content: string }> = ({ content }) => {
  const render = (text: string) => {
    const lines = text.split('\n')
    const out: React.ReactNode[] = []
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (!line.trim()) {
        out.push(<p key={`br-${i}`} />)
        continue
      }
        if (line.startsWith('# ')) out.push(<h1 key={i} className="theme-h2" style={{ marginTop: 16, marginBottom: 8 }}>{line.slice(2)}</h1>)
        else if (line.startsWith('## ')) out.push(<h2 key={i} className="theme-h3" style={{ marginTop: 14, marginBottom: 8 }}>{line.slice(3)}</h2>)
      else if (line.startsWith('- ')) {
        // collect a list
        const items = [line.slice(2)]
        let j = i + 1
        while (j < lines.length && lines[j].startsWith('- ')) {
          items.push(lines[j].slice(2))
          j++
        }
        out.push(
          <ul key={`ul-${i}`} className="ml-6 mb-3 list-disc">
            {items.map((it, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: inlineFormat(it) }} />
            ))}
          </ul>
        )
        i = j - 1
      } else {
        out.push(<p key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(line) }} />)
      }
    }
    return out
  }

  return <div>{render(content)}</div>
}

const inlineFormat = (s: string) => s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')

export default Notes;
