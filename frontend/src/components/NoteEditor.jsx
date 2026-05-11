import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function NoteEditor({ note, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tab, setTab] = useState('edit');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setTitle(note?.title ?? '');
    setContent(note?.content ?? '');
    setMsg('');
  }, [note?.id]);

  async function handleSave() {
    if (!title.trim()) {
      setMsg('A cím nem lehet üres.');
      return;
    }
    setSaving(true);
    try {
      await onSave(title.trim(), content);
      setMsg('Mentve!');
      setTimeout(() => setMsg(''), 2000);
    } catch (err) {
      setMsg('Hiba: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  if (!note) {
    return (
      <main className="editor-empty">
        <p>Válassz ki egy jegyzetet, vagy hozz létre újat.</p>
      </main>
    );
  }

  return (
    <main className="note-editor">
      <div className="editor-top">
        <input
          className="title-input"
          type="text"
          placeholder="Cím..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="editor-actions">
          {msg && <span className="save-msg">{msg}</span>}
          <button className="btn-save" onClick={handleSave} disabled={saving}>
            {saving ? 'Mentés...' : 'Mentés'}
          </button>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${tab === 'edit' ? 'active' : ''}`}
          onClick={() => setTab('edit')}
        >Szerkesztő</button>
        <button
          className={`tab-btn ${tab === 'preview' ? 'active' : ''}`}
          onClick={() => setTab('preview')}
        >Előnézet</button>
        <button
          className={`tab-btn ${tab === 'split' ? 'active' : ''}`}
          onClick={() => setTab('split')}
        >Osztott</button>
      </div>

      <div className={`editor-body ${tab}`}>
        {(tab === 'edit' || tab === 'split') && (
          <textarea
            className="md-textarea"
            placeholder="Írj ide markdown szöveget..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        )}
        {(tab === 'preview' || tab === 'split') && (
          <div className="md-preview">
            {content ? (
              <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
              <p className="preview-empty">Az előnézet itt jelenik meg...</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
