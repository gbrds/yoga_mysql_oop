// filepath: /home/juss-joosep/joga_mysql_oop/routes/article.js

const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/article')
const articleController = new ArticleController()

router.get('/',(req, res) => {
    console.log('Route handler called')
    articleController.getAllArticles(req, res)
})

module.exports = router