require('dotenv').config();
const express = require('express');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware-ek
app.use(cors());
app.use(express.json());

// Útvonalak (Routes) csatlakoztatása
// Minden jegyzettel kapcsolatos végpont az /api/notes alá kerül
app.use('/api/notes', noteRoutes);

// Globális hibakezelő Middleware 
app.use((err, req, res, next) => {
    console.error('Rendszerhiba:', err.message);
    res.status(500).json({ 
        error: 'Váratlan szerverhiba történt!',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});
// Szerver indítása
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 A szerver fut a http://localhost:${PORT} címen.`);
    });
}

module.exports = app;