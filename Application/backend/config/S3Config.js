const { S3Client } = require('@aws-sdk/client-s3');

class S3Config {
  constructor() {
    if (!S3Config.instance) {
      this.s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          sessionToken: process.env.AWS_SESSION_TOKEN,
        },
      });
      S3Config.instance = this;
    }
    return S3Config.instance;
  }

  getS3Client() {
    return this.s3Client;
  }
}

module.exports = new S3Config();
