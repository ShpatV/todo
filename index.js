const express = require("express");
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");

const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'API për menaxhimin e Todo-ve',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/todoRoutes.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));

// Routes
app.use('/api', todoRoutes);

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
