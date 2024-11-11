const express = require("express");
const router = express.Router();
const multer = require("multer");
const UploadController = require("../controllers/upload.controller");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
});

const upload = multer({ storage });

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a CSV file
 *     description: Upload a CSV file to the server for processing.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The CSV file to upload.
 *     responses:
 *       200:
 *         description: File uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File uploaded successfully."
 *                 filePath:
 *                   type: string
 *                   example: "/uploads/yourfile.csv"
 *       400:
 *         description: Bad request. The file format is not supported or another error occurred.
 *       500:
 *         description: Server error. Failed to upload the file.
 */
router.post("/upload", upload.single("file"), UploadController.uploadFile);

module.exports = router;
