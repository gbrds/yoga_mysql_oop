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

    async getArticleBySlug (req, res) {
        try {
            console.log('Getting article by slug:', req.params.slug);
            const article = await ArticleModel.findOne(req.params.slug);
            if (!article) {
                return res.status(404).json({error: 'Article not found'});
            }
            res.status(200).json({article: article});
        } catch (error) {
            console.error('Error fetching article by slug:', error);
            res.status(500).json({error: 'Database error' });
        }
    }
}

module.exports = ArticleController