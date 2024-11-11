const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const s3Client = require('../config/S3Config')

require('dotenv').config();

const client = s3Client.getS3Client()

class UploadService {
  constructor() {
    this.client = client;
  }

  async uploadFileToS3(file) {
    try {
      if (!file) return res.status(400).json({ message: 'Nenhum arquivo foi encontrado.' });

      if (path.extname(file.originalname).toLowerCase() !== '.csv') return res.status(400).json({ message: 'Somente arquivos CSV são permitidos.' });

      const bucketName = process.env.BUCKET_NAME;
      if (!bucketName) throw new Error('Bucket não existente');
      
      const fileContent = fs.readFileSync(file.path);

      const uploadParams = {
        Bucket: bucketName,
        Key: `./uploads/${path.basename(file.originalname)}`,
        Body: fileContent,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };

      const command = new PutObjectCommand(uploadParams);
      await this.client.send(command);

      console.log(`File ${file.originalname} uploaded to S3 successfully.`);
      return { message: 'Upload successful!', fileName: file.originalname };
    } catch (error) {
      console.error('Erro ao fazer upload para S3:', error);
      throw new Error('Erro ao fazer upload para S3');
    } finally {

      fs.unlinkSync(file.path);
    }
  }
}

module.exports = new UploadService();
