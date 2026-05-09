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
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center gap-3">
          <FileText size={28} className="text-indigo-600" />
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">{role === 'admin' ? 'Admin Notes' : 'My Notes'}</h1>
            <p className="text-sm text-slate-500">Organize notes by subject and create study materials.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: categories and notes list */}
          <aside className="lg:col-span-1">
            {/* Categories Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-900">Subjects</h2>
                <button
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <FolderPlus size={16} className="text-slate-600" />
                </button>
              </div>

              {showAddCategory && (
                <div className="mb-3 flex gap-2">
                  <input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Subject name"
                    className="flex-1 rounded-lg bg-white border border-slate-200 px-2 py-2 text-xs focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                  />
                  <button
                    onClick={handleAddCategory}
                    className="px-2 py-2 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    selectedCategory === 'All'
                      ? 'bg-indigo-100 text-indigo-900 font-medium'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Folder size={14} />
                    All Notes
                  </span>
                  <span className="text-xs bg-slate-200 px-2 py-0.5 rounded">{notesList.length}</span>
                </button>

                {categories.map((cat) => {
                  const catCount = notesList.filter((n) => n.category === cat.name).length
                  const bgColor = `bg-${cat.color}-100`
                  const textColor = `text-${cat.color}-900`
                  const hoverColor = `hover:bg-${cat.color}-50`
                  return (
                    <div key={cat.id} className="flex items-center gap-2 group">
                      <button
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`flex-1 text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                          selectedCategory === cat.name
                            ? `${bgColor} ${textColor} font-medium`
                            : `${hoverColor} text-slate-700`
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Folder size={14} />
                          {cat.name}
                        </span>
                        <span className="text-xs bg-slate-200 px-2 py-0.5 rounded">{catCount}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                      >
                        <X size={14} className="text-red-600" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Search and Create */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search notes"
                  className="w-full rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm focus:outline-none"
                />
                <Search className="absolute right-3 top-2.5 text-slate-400" size={16} />
              </div>
              <Button onClick={handleCreate} className="px-3">
                <Plus size={16} />
              </Button>
            </div>

            {/* Notes list */}
            <div className="space-y-3">
              {filtered.length === 0 && <div className="text-sm text-slate-500">No notes in this subject</div>}
              {filtered.map((note) => (
                <article
                  key={note.id}
                  onClick={() => setSelectedId(note.id)}
                  className={`cursor-pointer rounded-lg p-3 bg-white border transition-shadow ${
                    note.id === selectedId ? 'ring-2 ring-indigo-100 shadow-sm' : 'hover:shadow'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-slate-900 truncate">{note.title}</h3>
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{note.category}</span>
                  </div>
                  <p className="text-xs text-slate-400">{new Date(note.updatedAt).toLocaleDateString()}</p>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2" dangerouslySetInnerHTML={{ __html: previewText(note.content) }} />
                </article>
              ))}
            </div>
          </aside>

          {/* Right: editor / preview */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 flex items-center gap-4 border-b border-slate-100">
                <div className="flex-1">
                  <input
                    value={selected?.title || ''}
                    onChange={(e) =>
                      setNotesList((s) => s.map((n) => (n.id === selected?.id ? { ...n, title: e.target.value } : n)))
                    }
                    className="w-full text-lg font-semibold bg-transparent focus:outline-none"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-xs text-slate-400">Last updated: {selected ? new Date(selected.updatedAt).toLocaleString() : '-'}</p>
                    {selected && (
                      <>
                        <span className="text-xs text-slate-300">•</span>
                        <select
                          value={selected?.category || 'Mathematics'}
                          onChange={(e) =>
                            setNotesList((s) => s.map((n) => (n.id === selected?.id ? { ...n, category: e.target.value } : n)))
                          }
                          className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none"
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPreview(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      !isPreview ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Edit size={14} /> Edit
                  </button>

                  <button
                    onClick={() => setIsPreview(true)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isPreview ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Eye size={14} /> Preview
                  </button>

                  <button onClick={handleSave} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm">
                    <Save size={14} /> Save
                  </button>

                  <button onClick={() => selected && handleExport(selected)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm">
                    ⬇️ Export
                  </button>

                  <button onClick={() => selected && handleDelete(selected.id)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>

              <div className="p-6">
                {!isPreview ? (
                  <textarea
                    value={selected?.content || ''}
                    onChange={(e) =>
                      setNotesList((s) => s.map((n) => (n.id === selected?.id ? { ...n, content: e.target.value } : n)))
                    }
                    placeholder="Write your note here using Markdown..."
                    className="w-full min-h-105 p-4 text-sm resize-none bg-transparent focus:outline-none border border-slate-100 rounded-lg"
                  />
                ) : (
                  <div className="prose max-w-none">
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
      if (line.startsWith('# ')) out.push(<h1 key={i} className="text-2xl font-bold mt-4 mb-2">{line.slice(2)}</h1>)
      else if (line.startsWith('## ')) out.push(<h2 key={i} className="text-xl font-semibold mt-4 mb-2">{line.slice(3)}</h2>)
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
