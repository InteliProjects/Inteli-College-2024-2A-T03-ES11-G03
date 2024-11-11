const express = require('express');
const authController = require("../controllers/auth.controller")

const router = express.Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login
 *     description: This route verificates your role and store
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *                 description: The CPF of an employee.
 *                 example: "88990011223"
 *     responses:
 *       200:
 *         description: Login with success.
 *       400:
 *         description: Bad request. The file format is not supported or another error occurred.
 *       500:
 *         description: Server error. Failed to upload the file.
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register in the company
 *     description: This route register you.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_employee:
 *                 type: string
 *                 example: "892"
 *               name:
 *                 type: string
 *                 example: "Jonatan"
 *               surname:
 *                 type: string
 *                 example: "Doe"
 *               role_employee:
 *                 type: string
 *                 example: "gerente"
 *               store_id:
 *                 type: string
 *                 example: "255"
 *     responses:
 *       200:
 *         description: Login with success.
 *       400:
 *         description: Bad request. The file format is not supported or another error occurred.
 *       500:
 *         description: Server error. Failed to upload the file.
 */
router.post('/register', authController.register);

router.post('/logout', authController.logout);

module.exports = router;
