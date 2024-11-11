const AuthService = require('../services/auth.service');
require('dotenv').config();

class AuthMiddleware {
    constructor(authService) {
        this.authService = authService;
    }

    verifyToken(req, res) {
        const token = req.headers['authorization'];
        if (!token) return res.status(403).json({ message: 'Unauthorized: No token provided' });

        const jwtToken = token.split(' ')[1];

        if (this.authService.isTokenBlacklisted(jwtToken)) return res.status(403).json({ message: 'Unauthorized: Token is blacklisted. Please log in again.' }); 

        try {
            const decoded = this.authService.verifyToken(jwtToken);
            return decoded;
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    }

    checkRoleAndStore() {
        return (req, res, next) => {
            const decoded = this.verifyToken(req, res);
            if (!decoded) return;
            const roleFromToken = decoded.role_employee;

            if (roleFromToken !== 'gerente') return res.status(403).json({ message: 'Acesso Negado! Você precisa ser um gerente para poder acessar' });
            
            req.user = decoded;
            next();
        };
    }
}

const authService = new AuthService(process.env.SECRET_KEY);
const authMiddleware = new AuthMiddleware(authService);

module.exports = {
    checkRoleAndStore: authMiddleware.checkRoleAndStore.bind(authMiddleware)
};
