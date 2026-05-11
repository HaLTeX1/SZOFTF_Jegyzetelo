const BASE = '/api/notes';

export async function fetchNotes() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Nem sikerült betölteni a jegyzeteket');
  const data = await res.json();
  return data.data ?? data;
}

export async function searchNotes(q) {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error('Keresési hiba');
  return res.json();
}

export async function createNote(title, content) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error('Nem sikerült létrehozni a jegyzetet');
  const note = await res.json();
  return { ...note, updatedAt: new Date().toISOString() };
}

export async function updateNote(id, title, content) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error('Nem sikerült menteni a változtatásokat');
  const data = await res.json();
  return { id: Number(data.id), title: data.title, content: data.content, updatedAt: new Date().toISOString() };
}

export async function deleteNote(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Nem sikerült törölni a jegyzetet');
}
