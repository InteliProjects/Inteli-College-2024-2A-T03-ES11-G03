const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/dashboard/target-sales:
 *   get:
 *     summary: Get sales target by store
 *     description: Retrieve the sales target of a specific store.
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         description: ID of the store to retrieve sales target.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the sales target.
 *       400:
 *         description: Bad request.
 */
router.get('/target-sales', authMiddleware.checkRoleAndStore(), dashboardController.getSalesTargetByStore);

/**
 * @swagger
 * /api/dashboard/total-sales:
 *   post:
 *     summary: Get total sales by store
 *     description: Retrieve the total sales of a specific store.
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         description: ID of the store to retrieve total sales.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               month:
 *                 type: string
 *                 description: The month to filter sales in YYYYMM format.
 *                 example: "202401"
 *     responses:
 *       200:
 *         description: Successful response with total sales.
 *       400:
 *         description: Bad request.
 */
router.post("/total-sales",authMiddleware.checkRoleAndStore(), dashboardController.getRevenueToDateByStore);

/**
 * @swagger
 * /api/dashboard/total-transactions:
 *   get:
 *     summary: Get total transactions by store
 *     description: Retrieve the total transactions of a specific store.
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         description: ID of the store to retrieve total transactions.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with total transactions.
 *       400:
 *         description: Bad request.
 */
router.get("/total-transactions", authMiddleware.checkRoleAndStore(), dashboardController.getTotalTransactionsByStore);

/**
 * @swagger
 * /api/dashboard/daily-sales:
 *   post:
 *     summary: Get daily sales by store
 *     description: Retrieve the daily sales of a specific store.
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         description: ID of the store to retrieve daily sales.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               month:
 *                 type: string
 *                 description: The month to filter sales in YYYYMM format.
 *                 example: "202401"
 *     responses:
 *       200:
 *         description: Successful response with daily sales.
 *       400:
 *         description: Bad request.
 */
router.post("/daily-sales", authMiddleware.checkRoleAndStore(), dashboardController.getRevenueByStore);

/**
 * @swagger
 * /api/dashboard/top-sellers:
 *   post:
 *     summary: Get top sellers by store
 *     description: Retrieve the top sellers of a specific store.
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         description: ID of the store to retrieve top sellers.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               month:
 *                 type: string
 *                 description: The month to filter sales in YYYYMM format.
 *                 example: "202401"
 *     responses:
 *       200:
 *         description: Successful response with top sellers.
 *       400:
 *         description: Bad request.
 */
router.post("/top-sellers", authMiddleware.checkRoleAndStore(), dashboardController.getTopSellersByStore);

/**
 * @swagger
 * /api/dashboard/top-products:
 *   post:
 *     summary: Get top products by store
 *     description: Retrieve the top products of a specific store.
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         description: ID of the store to retrieve top products.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               month:
 *                 type: string
 *                 description: The month to filter sales in YYYYMM format.
 *                 example: "202401"
 *     responses:
 *       200:
 *         description: Successful response with top products.
 *       400:
 *         description: Bad request.
 */
router.post("/top-products", authMiddleware.checkRoleAndStore(), dashboardController.getTopProducts);

/**
 * @swagger
 * /api/dashboard/store-performance:
 *   post:
 *     summary: Ranks stores by their performance compared to others
 *     description: Retrieve a list of stores ranked by their performance based on the given criteria.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               month:
 *                 type: string
 *                 description: The month to get the rank.
 *                 example: "2023-10"
 *     responses:
 *       200:
 *         description: Successful response with the sales target.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       storeId:
 *                         type: string
 *                         description: The ID of the store.
 *                         example: "store123"
 *                       rank:
 *                         type: integer
 *                         description: The performance rank of the store.
 *                         example: 1
 *       400:
 *         description: Bad request. Invalid input data.
 */
router.post("/store-performance", authMiddleware.checkRoleAndStore(), dashboardController.getStorePerformance);


/**
 * @swagger
 * /api/dashboard/manager-salary:
 *   post:
 *     summary: Calculate the manager's total salary
 *     description: Calculates the total salary of the manager based on base salary, target achievement, and regional performance.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               month:
  *                 type: string
  *                 description: The month to get the rank.
  *                 example: "2023-10"
  *               regiao:
  *                 type: string
  *                 description: Region that the store is located.
  *                 example: "Norte"
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the store to check for bonus eligibility.
 *     responses:
 *       200:
 *         description: Successfully calculated the manager's total salary.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSalary:
 *                   type: number
 *                   description: The total calculated salary of the manager.
 *                   example: 10000
 *                 storeData:
 *                   type: array
 *                   description: Data of the store for the specified month.
 *                   items:
 *                     type: object
 *                     properties:
 *                       nome_loja:
 *                         type: string
 *                         description: Store name.
 *                       mes_meta:
 *                         type: string
 *                         description: Month of the sales target.
 *                       regiao:
 *                         type: string
 *                         description: Region of the store.
 *                       meta_loja:
 *                         type: number
 *                         description: Sales target of the store.
 *                       vendas:
 *                         type: number
 *                         description: Total sales of the store.
 *                       percentual_meta:
 *                         type: number
 *                         description: Percentage of the sales target achieved.
 *       400:
 *         description: Bad request. Invalid input data.
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error calculating the manager's bonus."
 */
router.post('/manager-salary', authMiddleware.checkRoleAndStore(), dashboardController.getManagerBonus)

module.exports = router;
