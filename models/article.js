// filepath: /home/juss-joosep/joga_mysql_oop/models/article.js
const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
    constructor() {
        super('article');
    }

    async findAll() {
        const article = await super.findAll()
        return article
    }

    async findOne(slug) {
        const article = await super.findOne('slug', slug)
        return article
    }

    async create(article) {
        const createArticle = await super.create(article)
        return createArticle
    }

    async update(id, article) {
        const updateArticle = await super.update(id, article)
        return updateArticle
    }

    async delete(id) {
        const deleteArticle = await super.delete(id)
        return deleteArticle
    }
}

module.exports = ArticleModel;