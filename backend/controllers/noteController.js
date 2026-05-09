const db = require('../config/db');

// Összes jegyzet lekérdezése
exports.getAllNotes = (req, res, next) => {
    const sql = 'SELECT * FROM notes ORDER BY createdAt DESC';
    db.all(sql, [], (err, rows) => {
        if (err) return next(err); // Átadjuk a hibakezelő middleware-nek
        res.json(rows);
    });
};

// Keresés a jegyzetek között
exports.searchNotes = (req, res, next) => {
    const searchTerm = req.query.q;
    if (!searchTerm) {
        return res.status(400).json({ error: 'Keresési kifejezés (q) megadása kötelező!' });
    }

    const sql = "SELECT * FROM notes WHERE title LIKE ? OR content LIKE ? ORDER BY createdAt DESC";
    const params = [`%${searchTerm}%`, `%${searchTerm}%`];

    db.all(sql, params, (err, rows) => {
        if (err) return next(err);
        res.json(rows);
    });
};

// Egy jegyzet lekérdezése ID alapján
exports.getNoteById = (req, res, next) => {
    const sql = 'SELECT * FROM notes WHERE id = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) return next(err);
        if (!row) return res.status(404).json({ error: 'A jegyzet nem található.' });
        res.json(row);
    });
};

// Új jegyzet létrehozása (Validációval)
exports.createNote = (req, res, next) => {
    const { title, content } = req.body;

    // Szigorúbb validáció
    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'A cím (title) megadása kötelező és nem lehet üres!' });
    }

    const sql = 'INSERT INTO notes (title, content) VALUES (?, ?)';
    db.run(sql, [title.trim(), content], function(err) {
        if (err) return next(err);
        res.status(201).json({ id: this.lastID, title: title.trim(), content });
    });
};

// Jegyzet frissítése
exports.updateNote = (req, res, next) => {
    const { title, content } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'A cím (title) megadása kötelező!' });
    }

    const sql = 'UPDATE notes SET title = ?, content = ? WHERE id = ?';
    db.run(sql, [title.trim(), content, req.params.id], function(err) {
        if (err) return next(err);
        if (this.changes === 0) return res.status(404).json({ error: 'A jegyzet nem található.' });
        res.json({ message: 'Jegyzet sikeresen frissítve.', id: req.params.id, title, content });
    });
};

// Jegyzet törlése
exports.deleteNote = (req, res, next) => {
    const sql = 'DELETE FROM notes WHERE id = ?';
    db.run(sql, [req.params.id], function(err) {
        if (err) return next(err);
        if (this.changes === 0) return res.status(404).json({ error: 'A jegyzet nem található.' });
        res.json({ message: 'Jegyzet sikeresen törölve.' });
    });
};