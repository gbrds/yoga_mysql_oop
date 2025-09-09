// filepath: /home/juss-joosep/joga_mysql_oop/controllers/article.js

const ArticleDbModel = require('../models/article')
const ArticleModel = new ArticleDbModel();

class ArticleController {
    constructor() {
        console.log('ArticleController initialized')
    }
    
    async getAllArticles (req, res) {
        console.log('GET /articles - start')
        try {
            const articles = await ArticleModel.findAll()
            console.log('GET /articles - DB query finished')
            res.status(200).json({articles: articles});
        } catch (error) {
            console.error('Error fetching articles:', error)
            res.status(500).json({error: 'Database error'})
        }
        console.log('GET /articles - end')
    }
}

module.exports = ArticleController