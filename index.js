// filepath: /home/juss-joosep/joga_mysql_oop/index.js

const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60*24 }
}));

// Root route for health check
app.get('/', (req, res) => {
    res.send('API is running, Try /articles endpoint');
});

// Article routes
const articleRoutes = require('./routes/article');
app.use('/articles', articleRoutes);

// author routes
const authorRoutes = require('./routes/author');
app.use('/authors', authorRoutes);

// user routes
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

app.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        // If not logged in, redirect to login
        return res.redirect("/users/login");
    }

    // Admin dashboard redirection
    if (req.session.user.role === 'admin') {
        return res.redirect('/admin/dashboard');
    }

    // If logged in, render dashboard
    return res.render("dashboard", { user: req.session.user });
});

app.get("/admin/dashboard", (req, res) => {
    if (!req.session.user) {
        // If not logged in or not admin, redirect to login
        return res.redirect("/users/login");
    }
    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access denied. Admins only.');
    }

    // If logged in as admin, render admin dashboard
    return res.render("admin_dashboard", { user: req.session.user });
})

// Start server
app.listen(3025, () => {
    console.log('Server is running on port 3025');
});