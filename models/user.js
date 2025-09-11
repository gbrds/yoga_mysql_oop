const BaseSQLModel = require('./base')

class UserDbModel extends BaseSQLModel {
    constructor() {
        super ('users')
    }

    async register(data) {
        try {
            const userId = await this.create(data);
            return userId;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
}

module.exports = UserDbModel