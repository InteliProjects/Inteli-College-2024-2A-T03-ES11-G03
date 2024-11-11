const AuthService = require("../services/auth.service");
const UserService = require("../services/user.service");
require("dotenv").config();

const authService = new AuthService(process.env.SECRET_KEY);
const userService = new UserService();

class AuthController {
  async login(req, res) {
    const { cpf } = req.body;

    const user = await userService.findByCPF(cpf);
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = authService.generateToken(user);
    return res.json({ token });
  }

  async register(req, res) {
    const { cpf, id_employee, name, surname, role_employee, store_id } =
      req.body;

    try {
      const user = await userService.findByCPF(cpf);
      if (user) return res.status(404).json({ message: "User already exists" });

      await userService.registerUser({
        cpf,
        id_employee,
        name,
        surname,
        role_employee,
        store_id,
      });

      return res.json({ message: "User successfully registered!" });
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: "Error registering user" });
    }
  }

  async logout(req, res) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
      const tokenPart = token.split(" ")[1];

      if (authService.isTokenBlacklisted(tokenPart))
        throw new Error("Você não está logado, precisa logar!");

      await authService.addToBlacklist(tokenPart);

      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      return res.status(500).json({ message: "Error logging out" });
    }
  }
}

const authController = new AuthController();

module.exports = authController;
