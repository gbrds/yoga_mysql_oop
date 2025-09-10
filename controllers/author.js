// filepath: /home/juss-joosep/joga_mysql_oop/routes/author.js

const authorDbModel = require('../models/author.js');
const ArticleDbModel = require('../models/article.js');

const authorModel = new authorDbModel();
const articleModel = new ArticleDbModel();

class AuthorController {
    constructor() {
        console.log('AuthorController initialized');
    }

    async getAuthorById(req, res) {
        try {
            const author = await authorModel.findById(req.params.id);
            if (!author) {
                return res.status(404).json({ error: 'Author not found' });
            }
            const articles = await articleModel.findMany('author_id', author.id)
            author.articles = articles
            res.status(200).json({author})
        } catch (error) {
            console.error('Error fetching author:', error);
            res.status(500).json({ error: 'database error' });
        }
    }
}

module.exports = AuthorController;