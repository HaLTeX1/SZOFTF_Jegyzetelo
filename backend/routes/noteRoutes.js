const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
// A /search útvonalnak a /:id elé kell kerülnie!
router.get('/search', noteController.searchNotes); 

router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;