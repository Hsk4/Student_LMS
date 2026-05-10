/**
 * Shared Notes Component
 * Markdown editor and preview for both Student and Admin
 */

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FileText, Save, Eye, Edit, Plus, Trash2, Search, FolderPlus, Folder, X, Settings, Type, Palette, Upload } from 'lucide-react'
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

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type FontOption = {
  id: string
  label: string
  family: string
  source: 'system' | 'uploaded'
}

type NotesFontPreferences = {
  bodyFont: string
  codeFont: string
  quoteFont: string
  headingFonts: Record<HeadingTag, string>
  headingColors: Record<HeadingTag, string>
}

const SYSTEM_FONT_OPTIONS: FontOption[] = [
  { id: 'system-inter', label: 'Inter', family: 'Inter, system-ui, sans-serif', source: 'system' },
  { id: 'system-georgia', label: 'Georgia', family: 'Georgia, serif', source: 'system' },
  { id: 'system-poppins', label: 'Poppins', family: 'Poppins, system-ui, sans-serif', source: 'system' },
  { id: 'system-merriweather', label: 'Merriweather', family: 'Merriweather, serif', source: 'system' },
  { id: 'system-jetbrains', label: 'JetBrains Mono', family: '"JetBrains Mono", Consolas, monospace', source: 'system' },
  { id: 'system-fira', label: 'Fira Code', family: '"Fira Code", Consolas, monospace', source: 'system' },
]

const DEFAULT_FONT_PREFERENCES: NotesFontPreferences = {
  bodyFont: 'Inter, system-ui, sans-serif',
  codeFont: '"JetBrains Mono", Consolas, monospace',
  quoteFont: 'Georgia, serif',
  headingFonts: {
    h1: 'Poppins, system-ui, sans-serif',
    h2: 'Poppins, system-ui, sans-serif',
    h3: 'Poppins, system-ui, sans-serif',
    h4: 'Inter, system-ui, sans-serif',
    h5: 'Inter, system-ui, sans-serif',
    h6: 'Inter, system-ui, sans-serif',
  },
  headingColors: {
    h1: '#1e293b',
    h2: '#334155',
    h3: '#475569',
    h4: '#475569',
    h5: '#64748b',
    h6: '#64748b',
  },
}

const HEADING_TAGS: HeadingTag[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export const Notes: React.FC<NotesProps> = ({ role = 'student' }) => {
  const [notesList, setNotesList] = useState<NoteItem[]>([initialNote])
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES)
  const [selectedId, setSelectedId] = useState<string>(initialNote.id)
  const [isPreview, setIsPreview] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showFontManager, setShowFontManager] = useState(false)
  const [fontOptions, setFontOptions] = useState<FontOption[]>(SYSTEM_FONT_OPTIONS)
  const [fontPreferences, setFontPreferences] = useState<NotesFontPreferences>(DEFAULT_FONT_PREFERENCES)
  const [fontPreviewText, setFontPreviewText] = useState('Sample AaBbCc 123 — Notes Preview')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const uploadedFaceRegistry = useRef<Map<string, FontFace>>(new Map())

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

  useEffect(() => {
    return () => {
      uploadedFaceRegistry.current.forEach((face) => {
        document.fonts.delete(face)
      })
      uploadedFaceRegistry.current.clear()
    }
  }, [])

  const updateSelectedContent = (nextContent: string) => {
    if (!selected) return
    setNotesList((list) => list.map((note) => (note.id === selected.id ? { ...note, content: nextContent } : note)))
  }

  const applySurround = (prefix: string, suffix = '', placeholder = 'text') => {
    if (!selected || !textareaRef.current) return
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const content = selected.content
    const pickedText = content.slice(start, end) || placeholder
    const newText = `${content.slice(0, start)}${prefix}${pickedText}${suffix}${content.slice(end)}`
    updateSelectedContent(newText)

    requestAnimationFrame(() => {
      textarea.focus()
      const cursor = start + prefix.length + pickedText.length + suffix.length
      textarea.setSelectionRange(cursor, cursor)
    })
  }

  const applyLinePrefix = (prefix: string) => {
    if (!selected || !textareaRef.current) return
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const content = selected.content
    const lineStart = content.lastIndexOf('\n', start - 1) + 1
    const lineEndIndex = content.indexOf('\n', end)
    const lineEnd = lineEndIndex === -1 ? content.length : lineEndIndex
    const block = content.slice(lineStart, lineEnd)
    const prefixed = block
      .split('\n')
      .map((line) => `${prefix}${line}`)
      .join('\n')
    const newText = `${content.slice(0, lineStart)}${prefixed}${content.slice(lineEnd)}`
    updateSelectedContent(newText)

    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(lineStart, lineStart + prefixed.length)
    })
  }

  const applyToolbarAction = (action: 'h1' | 'h2' | 'h3' | 'bold' | 'italic' | 'quote' | 'codeblock' | 'list' | 'inlinecode') => {
    if (action === 'h1') return applyLinePrefix('# ')
    if (action === 'h2') return applyLinePrefix('## ')
    if (action === 'h3') return applyLinePrefix('### ')
    if (action === 'list') return applyLinePrefix('- ')
    if (action === 'quote') return applyLinePrefix('> ')
    if (action === 'bold') return applySurround('**', '**', 'bold text')
    if (action === 'italic') return applySurround('*', '*', 'italic text')
    if (action === 'inlinecode') return applySurround('`', '`', 'code')
    return applySurround('```\n', '\n```', 'code block')
  }

  const handleFontUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    const validExtension = /\.(ttf|otf|woff|woff2)$/i.test(file.name)
    if (!validExtension) {
      alert('Please upload a valid font file (.ttf, .otf, .woff, .woff2).')
      return
    }

    try {
      const family = `notes-uploaded-${Date.now()}`
      const buffer = await file.arrayBuffer()
      const fontFace = new FontFace(family, buffer)
      await fontFace.load()
      document.fonts.add(fontFace)
      uploadedFaceRegistry.current.set(family, fontFace)

      const option: FontOption = {
        id: family,
        label: file.name.replace(/\.(ttf|otf|woff|woff2)$/i, ''),
        family: `"${family}", Inter, system-ui, sans-serif`,
        source: 'uploaded',
      }
      setFontOptions((list) => [option, ...list])
    } catch (error) {
      console.error(error)
      alert('Unable to load this font file. Please try another file.')
    }
  }

  const handleRenameFont = (fontId: string, nextLabel: string) => {
    if (!nextLabel.trim()) return
    setFontOptions((list) => list.map((option) => (option.id === fontId ? { ...option, label: nextLabel.trim() } : option)))
  }

  const handleDeleteFont = (fontId: string) => {
    const font = fontOptions.find((item) => item.id === fontId)
    if (!font || font.source !== 'uploaded') return

    const fallbackBody = DEFAULT_FONT_PREFERENCES.bodyFont
    const fallbackCode = DEFAULT_FONT_PREFERENCES.codeFont
    const fallbackQuote = DEFAULT_FONT_PREFERENCES.quoteFont

    setFontPreferences((prefs) => {
      const nextHeadingFonts = { ...prefs.headingFonts }
      HEADING_TAGS.forEach((tag) => {
        if (nextHeadingFonts[tag] === font.family) {
          nextHeadingFonts[tag] = DEFAULT_FONT_PREFERENCES.headingFonts[tag]
        }
      })

      return {
        ...prefs,
        bodyFont: prefs.bodyFont === font.family ? fallbackBody : prefs.bodyFont,
        codeFont: prefs.codeFont === font.family ? fallbackCode : prefs.codeFont,
        quoteFont: prefs.quoteFont === font.family ? fallbackQuote : prefs.quoteFont,
        headingFonts: nextHeadingFonts,
      }
    })

    const face = uploadedFaceRegistry.current.get(font.id)
    if (face) {
      document.fonts.delete(face)
      uploadedFaceRegistry.current.delete(font.id)
    }
    setFontOptions((list) => list.filter((item) => item.id !== font.id))
  }

  const resetFontDefaults = () => {
    setFontPreferences(DEFAULT_FONT_PREFERENCES)
  }

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
                <div className="notes-editor-title-wrap">
                  <input value={selected?.title || ''} onChange={(e) => setNotesList((s) => s.map((n) => (n.id === selected?.id ? { ...n, title: e.target.value } : n)))} className="" style={{ width: '100%', fontSize: 18, fontWeight: 700, background: 'transparent', border: 'none', outline: 'none' }} />
                  <div className="notes-editor-meta-row">
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

                <div className="notes-header-actions">
                  <button onClick={() => setIsPreview(false)} className={`theme-btn-sm`} style={{ backgroundColor: !isPreview ? '#4f46e5' : '#fff', color: !isPreview ? '#fff' : '#0f172a' }}>
                    <Edit size={14} /> Edit
                  </button>
                  <button onClick={() => setIsPreview(true)} className={`theme-btn-sm`} style={{ backgroundColor: isPreview ? '#4f46e5' : '#fff', color: isPreview ? '#fff' : '#0f172a' }}>
                    <Eye size={14} /> Preview
                  </button>
                  <button onClick={handleSave} className="theme-btn" style={{ backgroundColor: '#059669', color: '#fff' }}>
                    <Save size={14} /> Save
                  </button>
                  <button onClick={() => setShowFontManager((value) => !value)} className="theme-btn notes-font-manager-toggle" style={{ backgroundColor: showFontManager ? '#4f46e5' : '#f1f5f9', color: showFontManager ? '#fff' : '#0f172a' }}>
                    <Settings size={14} /> Font Manager
                  </button>
                  <button onClick={() => selected && handleExport(selected)} className="theme-btn" style={{ backgroundColor: '#f1f5f9', color: '#0f172a' }}>⬇️ Export</button>
                  <button onClick={() => selected && handleDelete(selected.id)} className="theme-btn" style={{ backgroundColor: '#fff1f2', color: '#dc2626' }}><Trash2 size={14} /> Delete</button>
                </div>
              </div>

              {!isPreview && (
                <div className="notes-toolbar" role="toolbar" aria-label="Markdown toolbar">
                  <button onClick={() => applyToolbarAction('h1')} className="theme-btn-sm notes-toolbar-btn">H1</button>
                  <button onClick={() => applyToolbarAction('h2')} className="theme-btn-sm notes-toolbar-btn">H2</button>
                  <button onClick={() => applyToolbarAction('h3')} className="theme-btn-sm notes-toolbar-btn">H3</button>
                  <button onClick={() => applyToolbarAction('bold')} className="theme-btn-sm notes-toolbar-btn">Bold</button>
                  <button onClick={() => applyToolbarAction('italic')} className="theme-btn-sm notes-toolbar-btn">Italic</button>
                  <button onClick={() => applyToolbarAction('list')} className="theme-btn-sm notes-toolbar-btn">List</button>
                  <button onClick={() => applyToolbarAction('quote')} className="theme-btn-sm notes-toolbar-btn">Quote</button>
                  <button onClick={() => applyToolbarAction('inlinecode')} className="theme-btn-sm notes-toolbar-btn">Inline Code</button>
                  <button onClick={() => applyToolbarAction('codeblock')} className="theme-btn-sm notes-toolbar-btn">Code Block</button>
                </div>
              )}

              {showFontManager && (
                <section className="notes-font-manager" aria-label="Font manager settings">
                  <div className="notes-font-manager-header">
                    <div>
                      <h3 className="theme-text-base notes-font-manager-title">Font Manager</h3>
                      <p className="theme-text-sm">Non-persistent setup for this session only.</p>
                    </div>
                    <div className="notes-font-manager-header-actions">
                      <label className="theme-btn notes-font-upload-btn" htmlFor="notes-font-upload-input">
                        <Upload size={14} /> Upload Font
                      </label>
                      <input id="notes-font-upload-input" type="file" accept=".ttf,.otf,.woff,.woff2" onChange={handleFontUpload} className="notes-font-upload-input" />
                      <button onClick={resetFontDefaults} className="theme-btn notes-font-reset-btn">Reset Defaults</button>
                    </div>
                  </div>

                  <div className="notes-font-manager-grid">
                    <div className="notes-font-card">
                      <h4 className="theme-text-sm notes-font-card-title"><Type size={14} /> Text Font Defaults</h4>
                      <div className="notes-font-field-grid">
                        <label className="notes-font-field">
                          <span className="theme-text-sm">Body</span>
                          <select className="theme-select" value={fontPreferences.bodyFont} onChange={(event) => setFontPreferences((prefs) => ({ ...prefs, bodyFont: event.target.value }))}>
                            {fontOptions.map((font) => (
                              <option key={font.id} value={font.family}>{font.label}</option>
                            ))}
                          </select>
                        </label>
                        <label className="notes-font-field">
                          <span className="theme-text-sm">Code Blocks</span>
                          <select className="theme-select" value={fontPreferences.codeFont} onChange={(event) => setFontPreferences((prefs) => ({ ...prefs, codeFont: event.target.value }))}>
                            {fontOptions.map((font) => (
                              <option key={font.id} value={font.family}>{font.label}</option>
                            ))}
                          </select>
                        </label>
                        <label className="notes-font-field">
                          <span className="theme-text-sm">Quotes</span>
                          <select className="theme-select" value={fontPreferences.quoteFont} onChange={(event) => setFontPreferences((prefs) => ({ ...prefs, quoteFont: event.target.value }))}>
                            {fontOptions.map((font) => (
                              <option key={font.id} value={font.family}>{font.label}</option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>

                    <div className="notes-font-card">
                      <h4 className="theme-text-sm notes-font-card-title"><Palette size={14} /> Heading Defaults (Font + Color)</h4>
                      <div className="notes-heading-grid">
                        {HEADING_TAGS.map((tag) => (
                          <div key={tag} className="notes-heading-row">
                            <span className="theme-text-sm notes-heading-label">{tag.toUpperCase()}</span>
                            <select className="theme-select" value={fontPreferences.headingFonts[tag]} onChange={(event) => setFontPreferences((prefs) => ({ ...prefs, headingFonts: { ...prefs.headingFonts, [tag]: event.target.value } }))}>
                              {fontOptions.map((font) => (
                                <option key={font.id} value={font.family}>{font.label}</option>
                              ))}
                            </select>
                            <input type="color" className="notes-heading-color" value={fontPreferences.headingColors[tag]} onChange={(event) => setFontPreferences((prefs) => ({ ...prefs, headingColors: { ...prefs.headingColors, [tag]: event.target.value } }))} aria-label={`${tag.toUpperCase()} color`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="notes-font-card">
                    <h4 className="theme-text-sm notes-font-card-title">Imported Fonts</h4>
                    <label className="notes-font-preview-input-label">
                      <span className="theme-text-sm">Preview text</span>
                      <input className="theme-input" value={fontPreviewText} onChange={(event) => setFontPreviewText(event.target.value)} />
                    </label>
                    <div className="notes-font-preview-list">
                      {fontOptions.map((font) => (
                        <div key={font.id} className="notes-font-preview-item">
                          <div className="notes-font-preview-main">
                            <input className="theme-input notes-font-name-input" value={font.label} onChange={(event) => handleRenameFont(font.id, event.target.value)} />
                            <p className="notes-font-preview-text" style={{ fontFamily: font.family }}>{fontPreviewText}</p>
                            <p className="theme-text-sm notes-font-preview-meta">{font.source === 'uploaded' ? 'Uploaded font' : 'System font'} • In use as: {getFontUsage(font.family, fontPreferences)}</p>
                          </div>
                          {font.source === 'uploaded' && (
                            <button onClick={() => handleDeleteFont(font.id)} className="theme-btn notes-font-delete-btn" aria-label={`Delete ${font.label}`}>
                              <Trash2 size={14} /> Delete
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              <div className="notes-editor-body">
                {!isPreview ? (
                  <textarea
                    ref={textareaRef}
                    value={selected?.content || ''}
                    onChange={(e) => setNotesList((s) => s.map((n) => (n.id === selected?.id ? { ...n, content: e.target.value } : n)))}
                    placeholder="Write your note here using Markdown..."
                    className="theme-textarea"
                    style={{ minHeight: 260, fontFamily: fontPreferences.bodyFont }}
                  />
                ) : (
                  <div className="theme-text-base notes-preview-wrap">
                    <MarkdownPreview content={selected?.content || ''} preferences={fontPreferences} />
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
const getFontUsage = (family: string, preferences: NotesFontPreferences) => {
  const usage: string[] = []
  if (preferences.bodyFont === family) usage.push('Body')
  if (preferences.codeFont === family) usage.push('Code')
  if (preferences.quoteFont === family) usage.push('Quote')

  HEADING_TAGS.forEach((tag) => {
    if (preferences.headingFonts[tag] === family) {
      usage.push(tag.toUpperCase())
    }
  })

  return usage.length ? usage.join(', ') : 'Not selected'
}

const MarkdownPreview: React.FC<{ content: string; preferences: NotesFontPreferences }> = ({ content, preferences }) => {
  const render = (text: string) => {
    const lines = text.split('\n')
    const out: React.ReactNode[] = []
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith('```')) {
        const codeLines: string[] = []
        let j = i + 1
        while (j < lines.length && !lines[j].startsWith('```')) {
          codeLines.push(lines[j])
          j++
        }
        out.push(
          <pre key={`code-${i}`} className="notes-preview-code" style={{ fontFamily: preferences.codeFont }}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        )
        i = j < lines.length ? j : lines.length
        continue
      }

      if (!line.trim()) {
        out.push(<p key={`br-${i}`} />)
        continue
      }

      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
      if (headingMatch) {
        const level = Math.min(headingMatch[1].length, 6)
        const textContent = headingMatch[2]
        const tag = `h${level}` as HeadingTag
        const className = level <= 2 ? 'theme-h2' : 'theme-h3'
        const HeadingTagElement = tag
        out.push(
          <HeadingTagElement
            key={`heading-${i}`}
            className={className}
            style={{
              marginTop: level === 1 ? 16 : 12,
              marginBottom: 8,
              fontFamily: preferences.headingFonts[tag],
              color: preferences.headingColors[tag],
            }}
          >
            {textContent}
          </HeadingTagElement>
        )
        continue
      }

      if (line.startsWith('> ')) {
        out.push(
          <blockquote key={`quote-${i}`} className="notes-preview-quote" style={{ fontFamily: preferences.quoteFont }}>
            <span dangerouslySetInnerHTML={{ __html: inlineFormat(line.slice(2)) }} />
          </blockquote>
        )
        continue
      }

      if (line.startsWith('- ')) {
        // collect a list
        const items = [line.slice(2)]
        let j = i + 1
        while (j < lines.length && lines[j].startsWith('- ')) {
          items.push(lines[j].slice(2))
          j++
        }
        out.push(
          <ul key={`ul-${i}`} className="notes-preview-list" style={{ fontFamily: preferences.bodyFont }}>
            {items.map((it, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: inlineFormat(it) }} />
            ))}
          </ul>
        )
        i = j - 1
      } else {
        out.push(<p key={i} className="notes-preview-paragraph" style={{ fontFamily: preferences.bodyFont }} dangerouslySetInnerHTML={{ __html: inlineFormat(line) }} />)
      }
    }
    return out
  }

  return <div className="notes-preview-root">{render(content)}</div>
}

const inlineFormat = (s: string) => {
  const escaped = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped
    .replace(/`(.*?)`/g, '<code class="notes-inline-code">$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
}

export default Notes;
