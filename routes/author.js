// filepath: /home/juss-joosep/joga_mysql_oop/routes/author.js

const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/author');
const authorController = new AuthorController();

router.get('/:id', (req, res) => {
    console.log('getting author by id', req.params.id);
    authorController.getAuthorById(req, res);
})

module.exports = router;