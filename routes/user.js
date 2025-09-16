const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const userController = new UserController();

router.post('/register', (req, res) => userController.register(req, res));

router.post('/login', (req, res) => userController.login(req, res));

router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router;