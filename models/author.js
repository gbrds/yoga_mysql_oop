// filepath: /home/juss-joosep/joga_mysql_oop/routes/author.js

const BaseSQLModel = require('./base')

class AuthorModel extends BaseSQLModel {
    constructor() {
        super ('author')
    }
}

module.exports = AuthorModel