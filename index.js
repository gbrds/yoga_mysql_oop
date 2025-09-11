// filepath: /home/juss-joosep/joga_mysql_oop/index.js

const express = require('express');
const app = express();
const session = require('express-session');

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

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

// Start server
app.listen(3025, () => {
    console.log('Server is running on port 3025');
});