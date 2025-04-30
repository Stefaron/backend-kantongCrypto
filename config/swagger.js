import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Kantong Crypto API",
      version: "1.0.0",
      description: "API untuk mengelola wallet Ethereum di jaringan Sepolia",
    },
    servers: [
      {
        url: "https://backend-kantongcrypto-production.up.railway.app/api",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"], // cari anotasi Swagger di semua file route
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default setupSwagger;
