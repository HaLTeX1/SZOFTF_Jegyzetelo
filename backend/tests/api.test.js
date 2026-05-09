// tests/api.test.js
const request = require('supertest');
const app = require('../server');
const db = require('../config/db');

describe('Jegyzet API Végpontok Tesztelése', () => {
    let letrehozottJegyzetId;

    // Teszt: Új jegyzet létrehozása
    it('POST /api/notes - Létre kell hoznia egy új jegyzetet', async () => {
        const response = await request(app)
            .post('/api/notes')
            .send({
                title: 'Teszt Jegyzet Címe',
                content: 'Ez egy automatizált teszt tartalma.'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Teszt Jegyzet Címe');
        
        letrehozottJegyzetId = response.body.id; // Eltároljuk a későbbi tesztekhez
    });

    // Teszt: Jegyzetek lekérdezése
    it('GET /api/notes - Vissza kell adnia a jegyzeteket (lapozással)', async () => {
        const response = await request(app).get('/api/notes');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    // Teszt: Jegyzet törlése
    it('DELETE /api/notes/:id - Törölnie kell a létrehozott jegyzetet', async () => {
        const response = await request(app).delete(`/api/notes/${letrehozottJegyzetId}`);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Jegyzet sikeresen törölve.');
    });
});

// Tesztek végén lezárjuk az adatbázis kapcsolatot, hogy a Jest ne ragadjon be
afterAll((done) => {
    db.close();
    done();
});