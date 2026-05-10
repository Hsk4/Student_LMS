import { useState, useEffect } from 'react'
import { BookOpen, Code, Eye, ChevronDown, ChevronUp, Copy, Check, FileText, Lightbulb, MessageSquare, ArrowRight, Plus, Trash2, X } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'
import Modal from '@/components/common/Modal'
import { HELP_ESSENTIALS, HELP_TEMPLATES } from '@/data/helpData'
import type { HelpTab } from '@/types/components'

interface UserTemplate {
  id: string
  name: string
  template: string
  createdAt: number
  isUserCreated: true
}

export default function StudentHelp() {
  const [activeTab, setActiveTab] = useState<HelpTab>('essentials')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [userTemplates, setUserTemplates] = useState<UserTemplate[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [templateContent, setTemplateContent] = useState('')

  // Load user templates from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('userTemplates')
    if (stored) {
      try {
        setUserTemplates(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to load user templates:', e)
      }
    }
  }, [])

  // Save user templates to localStorage
  const saveTemplates = (templates: UserTemplate[]) => {
    localStorage.setItem('userTemplates', JSON.stringify(templates))
    setUserTemplates(templates)
  }

  const createTemplate = () => {
    if (!templateName.trim() || !templateContent.trim()) {
      alert('Please fill in both template name and content')
      return
    }

    const newTemplate: UserTemplate = {
      id: 'user-' + Date.now(),
      name: templateName,
      template: templateContent,
      createdAt: Date.now(),
      isUserCreated: true,
    }

    saveTemplates([...userTemplates, newTemplate])
    setTemplateName('')
    setTemplateContent('')
    setShowCreateModal(false)
  }

  const deleteTemplate = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      saveTemplates(userTemplates.filter((t) => t.id !== id))
    }
  }

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div style={{ padding: '1rem' }}>
      {/* Header */}
      <div>
        <h1 className="theme-h2" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <BookOpen size={32} className="theme-admin-accent" />
          Help & Guidelines
        </h1>
        <p className="theme-text-sm" style={{ marginTop: 8 }}>Learn how to use notes effectively and master markdown formatting</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid #e2e8f0', marginTop: 12 }}>
        <button
          onClick={() => setActiveTab('essentials')}
          className="theme-btn-sm theme-btn"
          style={{ borderBottom: activeTab === 'essentials' ? '2px solid #4f46e5' : '2px solid transparent' }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={16} /> Essentials
          </span>
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className="theme-btn-sm theme-btn"
          style={{ borderBottom: activeTab === 'templates' ? '2px solid #4f46e5' : '2px solid transparent' }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <FileText size={16} /> Templates
          </span>
        </button>
        <button
          onClick={() => setActiveTab('markdown')}
          className="theme-btn-sm theme-btn"
          style={{ borderBottom: activeTab === 'markdown' ? '2px solid #4f46e5' : '2px solid transparent' }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Code size={16} /> Markdown Guide
          </span>
        </button>
      </div>

      {/* Essentials Tab */}
      {activeTab === 'essentials' && (
        <div style={{ marginTop: 12 }}>
          <SectionCard title="Getting Started with Notes" description="Essential tips for effective note-taking">
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {HELP_ESSENTIALS.map((item) => (
                  <div key={item.id} className="theme-card" style={{ padding: 12 }}>
                    <button
                      onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="theme-text-base">
                        {item.iconName === 'Lightbulb' && <Lightbulb size={16} className="theme-admin-accent" />}
                        {item.iconName === 'Check' && <Check size={16} style={{ color: '#10b981' }} />}
                        {item.iconName === 'BookOpen' && <BookOpen size={16} style={{ color: '#06b6d4' }} />}
                        {item.iconName === 'ArrowRight' && <ArrowRight size={16} style={{ color: '#f59e0b' }} />}
                        {item.iconName === 'Code' && <Code size={16} style={{ color: '#7c3aed' }} />}
                        {item.iconName === 'Eye' && <Eye size={16} style={{ color: '#64748b' }} />}
                        <span>{item.title}</span>
                      </h3>
                      {expandedItem === item.id ? (
                        <ChevronUp size={18} style={{ color: '#4f46e5' }} />
                      ) : (
                        <ChevronDown size={18} style={{ color: '#94a3b8' }} />
                      )}
                    </button>
                    {expandedItem === item.id && (
                      <p className="theme-text-sm" style={{ marginTop: 8, color: '#475569', lineHeight: 1.6 }}>{item.desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Help Us Improve" description="Share feedback to make the notes experience better for everyone">
            <div style={{ padding: 16 }}>
              <div className="theme-card" style={{ backgroundColor: '#eef2ff', borderColor: '#e9d5ff', padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div className="theme-card" style={{ borderRadius: 12, padding: 12, minWidth: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageSquare size={22} className="theme-admin-accent" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 className="theme-h4">Send us suggestions</h3>
                    <p className="theme-text-sm" style={{ marginTop: 8 }}>
                      Tell us what features would help you study better: more templates, better markdown tools, or new note organization options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div style={{ marginTop: 12 }}>
          <SectionCard title="Note Templates" description="Pre-made templates to jumpstart your notes">
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {HELP_TEMPLATES.map((template) => (
                  <div key={template.id} className="theme-card" style={{ overflow: 'hidden' }}>
                    <button
                      onClick={() => setExpandedItem(expandedItem === template.id ? null : template.id)}
                      style={{ width: '100%', padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', border: 'none', cursor: 'pointer', background: 'none' }}
                    >
                      <h3 className="theme-text-base">{template.name}</h3>
                      {expandedItem === template.id ? (
                        <ChevronUp size={18} style={{ color: '#4f46e5' }} />
                      ) : (
                        <ChevronDown size={18} style={{ color: '#94a3b8' }} />
                      )}
                    </button>
                    {expandedItem === template.id && (
                      <div style={{ padding: 12, backgroundColor: '#f8fafc' }}>
                        <pre style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: 12, borderRadius: 8, fontSize: 12, overflowX: 'auto', marginBottom: 12 }}>
                          {template.template}
                        </pre>
                        <button
                          onClick={() => copyToClipboard(template.template, template.id)}
                          className="theme-btn theme-admin-btn"
                        >
                          {copiedCode === template.id ? (
                            <>
                              <Check size={16} /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={16} /> Copy Template
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* User Created Templates Section */}
          {userTemplates.length > 0 && (
            <SectionCard title="Your Templates" description="Templates you've created">
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {userTemplates.map((template) => (
                    <div key={template.id} className="theme-card" style={{ overflow: 'hidden' }}>
                      <button
                        onClick={() => setExpandedItem(expandedItem === template.id ? null : template.id)}
                        style={{ width: '100%', padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fef3c7', border: 'none', cursor: 'pointer', background: 'none' }}
                      >
                        <h3 className="theme-text-base">{template.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {expandedItem === template.id ? (
                            <ChevronUp size={18} style={{ color: '#4f46e5' }} />
                          ) : (
                            <ChevronDown size={18} style={{ color: '#94a3b8' }} />
                          )}
                        </div>
                      </button>
                      {expandedItem === template.id && (
                        <div style={{ padding: 12, backgroundColor: '#fef3c7' }}>
                          <pre style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: 12, borderRadius: 8, fontSize: 12, overflowX: 'auto', marginBottom: 12 }}>
                            {template.template}
                          </pre>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              onClick={() => copyToClipboard(template.template, template.id)}
                              className="theme-btn theme-admin-btn"
                              style={{ flex: 1 }}
                            >
                              {copiedCode === template.id ? (
                                <>
                                  <Check size={16} /> Copied!
                                </>
                              ) : (
                                <>
                                  <Copy size={16} /> Copy Template
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => deleteTemplate(template.id)}
                              className="theme-btn"
                              style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '8px 12px' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>
          )}

          {/* Create New Template Button */}
          <div style={{ marginTop: 16 }}>
            <button
              onClick={() => setShowCreateModal(true)}
              className="theme-btn theme-admin-btn"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <Plus size={18} /> Create Your Own Template
            </button>
          </div>
        </div>
      )}

      {/* Markdown Guide Tab */}
      {activeTab === 'markdown' && (
        <div className="space-y-4">
          <SectionCard title="Markdown Formatting Guide" description="Master markdown syntax for beautiful notes">
            <div className="p-6 space-y-4">
              {[
                {
                  id: 'm1',
                  title: 'Headings',
                  icon: <FileText size={16} className="text-indigo-600" />,
                  markdown: '# Heading 1\n## Heading 2\n### Heading 3',
                  preview: (
                      <div className="space-y-2">
                        <h1 className="theme-h2">Heading 1</h1>
                        <h2 className="theme-h3">Heading 2</h2>
                        <h3 className="theme-h4">Heading 3</h3>
                      </div>
                  ),
                },
                {
                  id: 'm2',
                  title: 'Text Formatting',
                  icon: <Lightbulb size={16} className="text-amber-600" />,
                  markdown: '**Bold Text**\n*Italic Text*\n***Bold & Italic***\n~~Strikethrough~~',
                  preview: (
                    <div className="space-y-2">
                      <p>
                        <strong>Bold Text</strong>
                      </p>
                      <p>
                        <em>Italic Text</em>
                      </p>
                      <p>
                        <strong>
                          <em>Bold & Italic</em>
                        </strong>
                      </p>
                      <p>
                        <s>Strikethrough</s>
                      </p>
                    </div>
                  ),
                },
                {
                  id: 'm3',
                  title: 'Lists',
                  icon: <BookOpen size={16} className="text-emerald-600" />,
                  markdown: '- Item 1\n- Item 2\n  - Nested Item\n\n1. First\n2. Second\n3. Third',
                  preview: (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <ul style={{ listStyle: 'disc', marginLeft: 24, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li style={{ marginLeft: 16 }}>Nested Item</li>
                      </ul>
                      <ol style={{ listStyle: 'decimal', marginLeft: 24, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <li>First</li>
                        <li>Second</li>
                        <li>Third</li>
                      </ol>
                    </div>
                  ),
                },
                {
                  id: 'm4',
                  title: 'Code',
                  icon: <Code size={16} className="text-violet-600" />,
                  markdown: '`inline code`\n\n```\ncode block\nmultiple lines\n```',
                  preview: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <p>
                        <code style={{ backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: 6 }}>inline code</code>
                      </p>
                      <pre style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: 12, borderRadius: 8, fontSize: 13 }}>
                        code block
                        <br />
                        multiple lines
                      </pre>
                    </div>
                  ),
                },
                {
                  id: 'm5',
                  title: 'Blockquotes',
                  icon: <MessageSquare size={16} style={{ color: '#06b6d4' }} />,
                  markdown: '> This is a quote\n> Continues here\n>> Nested quote',
                  preview: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <blockquote style={{ borderLeft: '4px solid #6366f1', paddingLeft: 12, fontStyle: 'italic', color: '#475569' }}>
                        This is a quote
                        <br />
                        Continues here
                      </blockquote>
                      <blockquote style={{ borderLeft: '4px solid #93c5fd', paddingLeft: 12, marginLeft: 16, fontStyle: 'italic', color: '#64748b' }}>
                        Nested quote
                      </blockquote>
                    </div>
                  ),
                },
                {
                  id: 'm6',
                  title: 'Links & Images',
                  icon: <ArrowRight size={16} style={{ color: '#f43f5e' }} />,
                  markdown: '[Link text](https://example.com)\n![Alt text](image-url.jpg)',
                  preview: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <p>
                        <a href="https://example.com" style={{ color: '#4f46e5', textDecoration: 'underline' }}>
                          Link text
                        </a>
                      </p>
                      <p className="theme-text-sm" style={{ color: '#475569' }}>![Alt text] for images</p>
                    </div>
                  ),
                },
              ].map((item) => (
                <div key={item.id} className="theme-card" style={{ overflow: 'hidden' }}>
                  <button
                    onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                    style={{ width: '100%', padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc' }}
                  >
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="theme-text-base">
                      {item.icon}
                      {item.title}
                    </h3>
                    {expandedItem === item.id ? (
                      <ChevronUp size={18} style={{ color: '#4f46e5' }} />
                    ) : (
                      <ChevronDown size={18} style={{ color: '#94a3b8' }} />
                    )}
                  </button>
                  {expandedItem === item.id && (
                    <div style={{ padding: 12, backgroundColor: 'white' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                        <div>
                          <h4 className="theme-text-sm" style={{ fontWeight: 600, marginBottom: 8 }}>Markdown</h4>
                          <pre style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: 12, borderRadius: 8, fontSize: 13, overflowX: 'auto' }}>
                            {item.markdown}
                          </pre>
                          <button
                            onClick={() => copyToClipboard(item.markdown, item.id)}
                            className="theme-btn theme-admin-btn"
                            style={{ marginTop: 8 }}
                          >
                            {copiedCode === item.id ? (
                              <>
                                <Check size={16} /> Copied!
                              </>
                            ) : (
                              <>
                                <Copy size={16} /> Copy Code
                              </>
                            )}
                          </button>
                        </div>
                        <div>
                          <h4 className="theme-text-sm" style={{ fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Eye size={14} /> Preview
                          </h4>
                          <div className="theme-card" style={{ padding: 12 }}>
                            {item.preview}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* Create Template Modal */}
      {showCreateModal && (
        <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
          <div style={{ width: '90vw', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 className="theme-h3">Create Your Template</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <X size={24} style={{ color: '#64748b' }} />
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="theme-text-base" style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>
                Template Name
              </label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g., Project Proposal, Weekly Summary..."
                className="theme-input"
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 14 }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="theme-text-base" style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>
                Template Content (Markdown)
              </label>
              <textarea
                value={templateContent}
                onChange={(e) => setTemplateContent(e.target.value)}
                placeholder="Enter your template content using markdown. You can include headings, bullet points, placeholders like [Your text here], etc."
                style={{ width: '100%', minHeight: 300, padding: 12, border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 14, fontFamily: 'monospace', backgroundColor: '#f8fafc' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCreateModal(false)}
                className="theme-btn"
                style={{ backgroundColor: '#e2e8f0', color: '#1e293b' }}
              >
                Cancel
              </button>
              <button
                onClick={createTemplate}
                className="theme-btn theme-admin-btn"
              >
                <Plus size={16} /> Create Template
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

