// Create a web server
var express = require('express');
var router = express.Router();

// Load the MySQL pool connection
const pool = require('../../data/config');

// Route the app
router.get('/', (request, response) => {
    pool.query('SELECT * FROM comments', (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

router.get('/:id', (request, response) => {
    const id = request.params.id;

    pool.query('SELECT * FROM comments WHERE id = ?', id, (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

router.post('/', (request, response) => {
    pool.query('INSERT INTO comments SET ?', request.body, (error, result) => {
        if (error) throw error;

        response.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

router.put('/:id', (request, response) => {
    const id = request.params.id;

    pool.query('UPDATE comments SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) throw error;

        response.send('User updated successfully.');
    });
});

router.delete('/:id', (request, response) => {
    const id = request.params.id;

    pool.query('DELETE FROM comments WHERE id = ?', id, (error, result) => {
        if (error) throw error;

        response.send('User deleted.');
    });
});

// Export the router
module.exports = router;