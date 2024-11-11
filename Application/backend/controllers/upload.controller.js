const UploadService = require('../services/upload.service');
const path = require('path');

class UploadController {
  async uploadFile(req, res) {
    try {

      const result = await UploadService.uploadFileToS3(req.file);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao tentar subir arquivo.', error: error.message });
    }
  }
}

module.exports = new UploadController();
