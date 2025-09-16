const bcrypt = require('bcrypt');
const userDBModel = require('../models/user');
const userModel = new userDBModel();

class UserController {

    async register(req, res) {
        // Check if username exists
        const existingUsername = await userModel.findOne('username', req.body.username);
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Check if email exists
        const existingEmail = await userModel.findOne('email', req.body.email);
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const password = req.body.password;
        if(password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }
        const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if(!complexityRegex.test(password)) {
            return res.status(400).json({ error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
        }

        // Hash password and create user
        const cryptedPassword = await bcrypt.hash(req.body.password, 10);
        const registeredUser = await userModel.register({
            username: req.body.username,
            email: req.body.email,
            password: cryptedPassword
        });
        if (registeredUser) {
            const userData = await userModel.findById(registeredUser);
            req.session.user = {
                username: userData.username,
                userId: userData.id
            }
            res.json({
                message: 'User registered successfully',
                user_session: req.session.user
            });
        }
    }

    async login(req, res) {
        const user = await userModel.findOne('username', req.body.username);
        if (!user) {
            if (req.accepts('html')) {
                return res.status(400).render('login', { error: 'Invalid username or password' });
            } else {
                return res.status(400).json({ error: 'Invalid username or password' });
            }
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            if (req.accepts('html')) {
                return res.status(400).render('login', { error: 'Invalid username or password' });
            } else {
                return res.status(400).json({ error: 'Invalid username or password' });
            }
        }
        req.session.user = {
            username: user.username,
            userId: user.id
        }
        if (req.accepts('html')) {
            return res.redirect('/dashboard');
        } else {
            res.json({
                message: 'Login successful',
                user_session: req.session.user
            });
        }
    }
}

module.exports = UserController;