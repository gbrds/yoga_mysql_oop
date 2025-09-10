// filepath: /home/juss-joosep/joga_mysql_oop/routes/article.js

const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/article')
const articleController = new ArticleController()

router.get('/',(req, res) => {
    console.log('Route handler called')
    articleController.getAllArticles(req, res)
})

router.get('/:slug', (req, res) => {
    console.log('Getting article by slug:', req.params.slug);
    articleController.getArticleBySlug(req, res);
})

router.post('/create', (req, res) => {
    articleController.createArticle(req, res)
})

router.put('/edit/:id', (req, res) => {
    articleController.updateArticle(req, res)
})

router.delete('/delete/:id', (req, res) => {
    articleController.deleteArticle(req, res)
})

module.exports = router