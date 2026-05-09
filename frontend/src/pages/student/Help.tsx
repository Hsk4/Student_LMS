import { useState } from 'react'
import { BookOpen, Code, Eye, ChevronDown, ChevronUp, Copy, Check, FileText, Lightbulb, MessageSquare, ArrowRight } from 'lucide-react'
import SectionCard from '@/components/common/SectionCard'

type TabType = 'essentials' | 'templates' | 'markdown'

export default function StudentHelp() {
  const [activeTab, setActiveTab] = useState<TabType>('essentials')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <BookOpen size={32} className="text-indigo-600" />
          Help & Guidelines
        </h1>
        <p className="text-slate-600 mt-2">Learn how to use notes effectively and master markdown formatting</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('essentials')}
          className={`px-4 py-3 font-medium transition-colors border-b-2 ${
            activeTab === 'essentials'
              ? 'text-indigo-600 border-indigo-600'
              : 'text-slate-600 border-transparent hover:text-slate-900'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <BookOpen size={16} /> Essentials
          </span>
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-3 font-medium transition-colors border-b-2 ${
            activeTab === 'templates'
              ? 'text-indigo-600 border-indigo-600'
              : 'text-slate-600 border-transparent hover:text-slate-900'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <FileText size={16} /> Templates
          </span>
        </button>
        <button
          onClick={() => setActiveTab('markdown')}
          className={`px-4 py-3 font-medium transition-colors border-b-2 ${
            activeTab === 'markdown'
              ? 'text-indigo-600 border-indigo-600'
              : 'text-slate-600 border-transparent hover:text-slate-900'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <Code size={16} /> Markdown Guide
          </span>
        </button>
      </div>

      {/* Essentials Tab */}
      {activeTab === 'essentials' && (
        <div className="space-y-4">
          <SectionCard title="Getting Started with Notes" description="Essential tips for effective note-taking">
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                {[
                  {
                    id: 'e1',
                      title: 'Organize by Subject',
                      icon: <Lightbulb size={16} className="text-indigo-600" />,
                    desc: 'Create separate notes for each subject. Use the Categories section to group your study materials. You can create custom subjects that match your curriculum.',
                  },
                  {
                    id: 'e2',
                      title: 'Save Your Work',
                      icon: <Check size={16} className="text-emerald-600" />,
                    desc: 'Always click the "Save" button after editing your notes. Your notes are stored locally, so refreshing without saving will lose unsaved changes.',
                  },
                  {
                    id: 'e3',
                      title: 'Search Efficiently',
                      icon: <BookOpen size={16} className="text-sky-600" />,
                    desc: 'Use the search box to find notes by title or content. Search works within the selected category for faster results.',
                  },
                  {
                    id: 'e4',
                      title: 'Export Notes',
                      icon: <ArrowRight size={16} className="text-amber-600" />,
                    desc: 'Export notes as Markdown files (.md) for backup or sharing. Downloaded files can be opened in any text editor or markdown viewer.',
                  },
                  {
                    id: 'e5',
                      title: 'Use Markdown',
                      icon: <Code size={16} className="text-violet-600" />,
                    desc: 'Write notes using Markdown syntax for better formatting. Use headings, lists, bold, and italic text to make your notes more readable.',
                  },
                  {
                    id: 'e6',
                      title: 'Preview Mode',
                      icon: <Eye size={16} className="text-slate-600" />,
                    desc: 'Switch to Preview mode to see how your formatted notes will look. This helps ensure proper formatting before saving.',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow"
                  >
                    <button
                      onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                        {item.icon}
                        {item.title}
                      </h3>
                      {expandedItem === item.id ? (
                        <ChevronUp size={18} className="text-indigo-600" />
                      ) : (
                        <ChevronDown size={18} className="text-slate-400" />
                      )}
                    </button>
                    {expandedItem === item.id && (
                      <p className="mt-2 text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Help Us Improve" description="Share feedback to make the notes experience better for everyone">
            <div className="p-6">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white p-3 shadow-sm">
                    <MessageSquare size={22} className="text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">Send us suggestions</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
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
        <div className="space-y-4">
          <SectionCard title="Note Templates" description="Use these templates as a starting point for your notes">
            <div className="p-6 space-y-4">
              {[
                {
                  id: 't1',
                  name: 'Lecture Notes Template',
                  template: `# Lecture Title - [Date]

## Topic Overview
[Add topic introduction]

## Key Concepts
- Concept 1: [Definition/Explanation]
- Concept 2: [Definition/Explanation]

## Important Points
1. Point 1
2. Point 2
3. Point 3

## Examples
[Add examples or formulas]

## Review Questions
- Question 1?
- Question 2?

## Next Topics
[What to study next]`,
                },
                {
                  id: 't2',
                  name: 'Study Guide Template',
                  template: `# Study Guide: [Topic Name]

## Learning Objectives
- Objective 1
- Objective 2
- Objective 3

## Main Topics
### Topic 1: [Name]
**Definition:** [Write definition]
**Key Points:**
- Point 1
- Point 2

### Topic 2: [Name]
**Definition:** [Write definition]
**Key Points:**
- Point 1
- Point 2

## Formulas & Important Terms
| Term | Definition |
|------|------------|
| [Term] | [Definition] |

## Practice Problems
**Problem 1:** [Problem statement]
**Solution:** [Solution]

## Summary
[Write a brief summary]`,
                },
                {
                  id: 't3',
                  name: 'Lab Report Template',
                  template: `# Lab Report - [Experiment Name]

## Objective
[State the objective of the experiment]

## Materials Required
- Material 1
- Material 2
- Material 3

## Procedure
1. Step 1
2. Step 2
3. Step 3

## Observations
[Write your observations]

## Results
[Present your results]

## Calculations
[Show calculations if needed]

## Conclusion
[Write your conclusion]

## Questions
1. Question 1?
2. Question 2?`,
                },
              ].map((template) => (
                <div key={template.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedItem(expandedItem === template.id ? null : template.id)}
                    className="w-full p-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <h3 className="font-semibold text-slate-900">{template.name}</h3>
                    {expandedItem === template.id ? (
                      <ChevronUp size={18} className="text-indigo-600" />
                    ) : (
                      <ChevronDown size={18} className="text-slate-400" />
                    )}
                  </button>
                  {expandedItem === template.id && (
                    <div className="p-4 bg-white space-y-3">
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-xs overflow-x-auto">
                        {template.template}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(template.template, template.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
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
          </SectionCard>
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
                      <h1 className="text-2xl font-bold">Heading 1</h1>
                      <h2 className="text-xl font-semibold">Heading 2</h2>
                      <h3 className="text-lg font-semibold">Heading 3</h3>
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
                    <div className="grid grid-cols-2 gap-4">
                      <ul className="list-disc ml-6 space-y-1">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li className="ml-4">Nested Item</li>
                      </ul>
                      <ol className="list-decimal ml-6 space-y-1">
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
                    <div className="space-y-2">
                      <p>
                        <code className="bg-slate-200 px-2 py-1 rounded">inline code</code>
                      </p>
                      <pre className="bg-slate-900 text-slate-100 p-3 rounded text-sm">
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
                  icon: <MessageSquare size={16} className="text-sky-600" />,
                  markdown: '> This is a quote\n> Continues here\n>> Nested quote',
                  preview: (
                    <div className="space-y-2">
                      <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600">
                        This is a quote
                        <br />
                        Continues here
                      </blockquote>
                      <blockquote className="border-l-4 border-indigo-300 pl-4 ml-4 italic text-slate-500">
                        Nested quote
                      </blockquote>
                    </div>
                  ),
                },
                {
                  id: 'm6',
                  title: 'Links & Images',
                  icon: <ArrowRight size={16} className="text-rose-600" />,
                  markdown: '[Link text](https://example.com)\n![Alt text](image-url.jpg)',
                  preview: (
                    <div className="space-y-2">
                      <p>
                        <a href="https://example.com" className="text-indigo-600 underline">
                          Link text
                        </a>
                      </p>
                      <p className="text-sm text-slate-600">![Alt text] for images</p>
                    </div>
                  ),
                },
              ].map((item) => (
                <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                    className="w-full p-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      {item.icon}
                      {item.title}
                    </h3>
                    {expandedItem === item.id ? (
                      <ChevronUp size={18} className="text-indigo-600" />
                    ) : (
                      <ChevronDown size={18} className="text-slate-400" />
                    )}
                  </button>
                  {expandedItem === item.id && (
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 mb-2">Markdown</h4>
                          <pre className="bg-slate-900 text-slate-100 p-3 rounded text-xs overflow-x-auto">
                            {item.markdown}
                          </pre>
                          <button
                            onClick={() => copyToClipboard(item.markdown, item.id)}
                            className="mt-2 flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
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
                          <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                            <Eye size={14} /> Preview
                          </h4>
                          <div className="bg-slate-50 p-3 rounded border border-slate-200 text-sm">
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
    </div>
  )
}

