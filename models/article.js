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
}
module.exports = ArticleModel;