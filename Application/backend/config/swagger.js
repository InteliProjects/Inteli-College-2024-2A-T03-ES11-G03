const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Dashboard API',
        version: '1.0.0',
        description: 'API for managing store sales and targets',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./routes/dashboardRoutes.js','./routes/uploadRoutes.js', './routes/userRoutes.js'],
  };

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;