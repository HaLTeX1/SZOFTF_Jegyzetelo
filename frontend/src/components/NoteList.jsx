import { useState } from 'react';

export default function NoteList({ notes, selectedId, onSelect, onNew, onDelete, onSearch }) {
  const [query, setQuery] = useState('');

  function handleSearch(e) {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' });
  }

  return (
    <aside className="note-list">
      <div className="note-list-header">
        <h1 className="app-title">Jegyzeteim</h1>
        <button className="btn-new" onClick={onNew}>+ Új</button>
      </div>
      <input
        className="search-input"
        type="text"
        placeholder="Keresés..."
        value={query}
        onChange={handleSearch}
      />
      <ul className="notes-ul">
        {notes.length === 0 && (
          <li className="no-notes">Nincs találat</li>
        )}
        {notes.map(note => (
          <li
            key={note.id}
            className={`note-item ${note.id === selectedId ? 'active' : ''}`}
            onClick={() => onSelect(note)}
          >
            <div className="note-item-body">
              <span className="note-title">{note.title || 'Névtelen'}</span>
              <span className="note-date">{formatDate(note.updatedAt)}</span>
            </div>
            <button
              className="btn-delete"
              onClick={e => { e.stopPropagation(); onDelete(note.id); }}
              title="Törlés"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
