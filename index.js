// filepath: /home/juss-joosep/joga_mysql_oop/index.js

const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Root route for health check
app.get('/', (req, res) => {
    res.send('API is running, Try /articles endpoint');
});

// Article routes
const articleRoutes = require('./routes/article');
app.use('/articles', articleRoutes);

// Start server
app.listen(3025, () => {
    console.log('Server is running on port 3025');
});