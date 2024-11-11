const jwt = require('jsonwebtoken');
require('dotenv').config()

const blacklist = [];

class AuthService {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    generateToken(user) {
        return jwt.sign(
            { id: user.id, cpf: user.cpf, role_employee: user.role_employee, store_id: user.store_id },
            this.secretKey,
            { expiresIn: '1h' }
        );
    }

    verifyToken(token) {            
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            console.log('Erro ao verificar o token:', error.message);
            throw new Error('Invalid token');
        }
    }

    async addToBlacklist(token) {
        blacklist.push(token);
    }

    isTokenBlacklisted(token) {
        return blacklist.includes(token);
    }

}

module.exports = AuthService;