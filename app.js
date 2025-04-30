import express from "express";
import walletRoutes from "./routes/walletRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import setupSwagger from "./config/swagger.js";
import cors from "cors";

const app = express();
app.use(cors());
// require("dotenv").config();

app.use(express.json());

app.use("/api/wallet", walletRoutes);
app.use("/api/transaction", transactionRoutes);

// setup swagger
setupSwagger(app);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
