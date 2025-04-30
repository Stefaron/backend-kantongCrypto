import express from "express";
import walletController from "../controllers/walletController.js";
import walletServices from "../services/walletServices.js";

const router = express.Router();

/**
 * @swagger
 * /wallet/create:
 *   post:
 *     summary: Membuat wallet baru
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               wallet_name:
 *                 type: string
 *               is_main_wallet:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Wallet baru berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 wallet_id:
 *                   type: integer
 *                 address:
 *                   type: string
 *                 private_key:
 *                   type: string
 *                 is_main_wallet:
 *                   type: boolean
 */
router.post("/create", walletController.createWallet);

/**
 * @swagger
 * /wallet/total-funds:
 *   get:
 *     summary: Mendapatkan total saldo dari keseluruhan wallet
 *     parameters:
 *       - in: path
 *         name: user_id (sementara menggunakan default 1)
 *         required: true
 *         description: user_id wallet
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Total saldo wallet berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_eth:
 *                   type: string
 *                 wallets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       wallet_id:
 *                         type: integer
 *                       address:
 *                         type: string
 *                       balance_eth:
 *                         type: string
 *       404:
 *         description: Wallet tidak ditemukan
 */
router.get("/total-funds", walletController.getTotalFunds);

/**
 * @swagger
 * /wallet/{id}/balance:
 *   get:
 *     summary: Mendapatkan saldo dari wallet tertentu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dari wallet
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Saldo wallet berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 wallet_id:
 *                   type: integer
 *                 address:
 *                   type: string
 *                 balance_eth:
 *                   type: string
 *       404:
 *         description: Wallet tidak ditemukan
 */
router.get("/:id/balance", walletController.getBalanceWallet);

export default router;
