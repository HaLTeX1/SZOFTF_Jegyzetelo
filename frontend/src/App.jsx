import { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import { fetchNotes, searchNotes, createNote, updateNote, deleteNote } from './api/notes';
import './App.css';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch (err) {
      setError('Nem sikerült betölteni a jegyzeteket: ' + err.message);
    }
  }

  async function handleSearch(q) {
    try {
      if (!q.trim()) {
        await loadNotes();
        return;
      }
      const data = await searchNotes(q);
      setNotes(data);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleNew() {
    setSelectedNote({ id: null, title: '', content: '' });
  }

  async function handleSave(title, content) {
    if (selectedNote.id === null) {
      const created = await createNote(title, content);
      setNotes(prev => [created, ...prev]);
      setSelectedNote(created);
    } else {
      const updated = await updateNote(selectedNote.id, title, content);
      setNotes(prev => prev.map(n => n.id === updated.id ? updated : n));
      setSelectedNote(updated);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Biztosan törlöd ezt a jegyzetet?')) return;
    try {
      await deleteNote(id);
      setNotes(prev => prev.filter(n => n.id !== id));
      if (selectedNote?.id === id) setSelectedNote(null);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app-layout">
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError('')}>×</button>
        </div>
      )}
      <NoteList
        notes={notes}
        selectedId={selectedNote?.id}
        onSelect={setSelectedNote}
        onNew={handleNew}
        onDelete={handleDelete}
        onSearch={handleSearch}
      />
      <NoteEditor
        note={selectedNote}
        onSave={handleSave}
      />
    </div>
  );
}
