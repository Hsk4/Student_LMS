/**
 * Shared Notes Component
 * Markdown editor and preview for both Student and Admin
 */

import React, { useState } from 'react'
import { FileText, Save, Eye, Edit } from 'lucide-react'
import type { NotesProps } from '@/types/components'

export const Notes: React.FC<NotesProps> = ({ role = 'student' }) => {
  const [notes, setNotes] = useState<string>('# My Notes\n\nStart typing here...\n');
  const [isPreview, setIsPreview] = useState(false);

  const handleSave = () => {
    // TODO: Replace with actual API call
    // POST /api/{role}/notes with notes content
    console.log(`Saving ${role} notes:`, notes);
    alert('Notes saved successfully!');
  };

  const handleExport = () => {
    const element = document.createElement('a');
    const file = new Blob([notes], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `notes-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText size={32} className="text-purple-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              {role === 'admin' ? 'Admin Notes' : 'My Notes'}
            </h1>
          </div>
          <p className="text-slate-600">
            {role === 'admin'
              ? 'Manage and organize your administrative notes'
              : 'Create and organize your personal study notes'}
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setIsPreview(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              !isPreview
                ? 'bg-purple-600 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Edit size={18} />
            Edit
          </button>

          <button
            onClick={() => setIsPreview(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isPreview
                ? 'bg-purple-600 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Eye size={18} />
            Preview
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            <Save size={18} />
            Save
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors ml-auto"
          >
            ⬇️ Export
          </button>
        </div>

        {/* Editor / Preview */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          {!isPreview ? (
            // Edit Mode
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your notes here... (Supports Markdown)"
              className="w-full h-96 p-6 font-mono text-sm resize-none focus:outline-none border-none"
            />
          ) : (
            // Preview Mode
            <div className="p-6 prose prose-sm max-w-none">
              <MarkdownPreview content={notes} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            💡 <strong>Tip:</strong> Use Markdown syntax for formatting. Supports headings (#), bold (**text**), 
            italics (*text*), lists, code blocks, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Simple Markdown Preview Component
 * Renders basic markdown without external dependencies
 */
const MarkdownPreview: React.FC<{ content: string }> = ({ content }) => {
  const renderMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, idx) => {
        // Headings
        if (line.startsWith('### ')) {
          return <h3 key={idx} className="text-lg font-bold mt-4 mb-2">{line.slice(4)}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={idx} className="text-xl font-bold mt-4 mb-2">{line.slice(3)}</h2>;
        }
        if (line.startsWith('# ')) {
          return <h1 key={idx} className="text-2xl font-bold mt-6 mb-3">{line.slice(2)}</h1>;
        }

        // Bold and italic inline
        const processInline = (str: string) => {
          return str
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
        };

        // Bullet lists
        if (line.startsWith('- ')) {
          return <li key={idx} className="ml-6 mb-1">{processInline(line.slice(2))}</li>;
        }

        // Empty lines
        if (!line.trim()) {
          return <br key={idx} />;
        }

        // Regular paragraph
        return (
          <p key={idx} className="mb-2" dangerouslySetInnerHTML={{ __html: processInline(line) }} />
        );
      });
  };

  return <div>{renderMarkdown(content)}</div>;
};

export default Notes;
