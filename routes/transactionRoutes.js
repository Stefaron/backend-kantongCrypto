import express from "express";
import transactionController from "../controllers/transactionController.js";
import transactionService from "../services/transactionService.js";

const router = express.Router();

/**
 * @swagger
 * /transaction/send:
 *   post:
 *     summary: Mengirim ETH dari wallet ke wallet lain
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from_wallet_id:
 *                 type: integer
 *               to_wallet_id:
 *                 type: integer
 *               amount_eth:
 *                 type: string
 *     responses:
 *       200:
 *         description: ETH berhasil dikirim
 */
router.post("/send", transactionController.sendTransaction);

/**
 * @swagger
 * /transaction/allTransactions:
 *   get:
 *     summary: Ambil semua transaksi
 *     responses:
 *       200:
 *         description: Daftar transaksi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   from_address:
 *                     type: string
 *                   to_address:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   tx_hash:
 *                     type: string
 *                   status:
 *                     type: string
 *                   created_at:
 *                     type: string
 *       500:
 *         description: Gagal mengambil transaksi
 */
router.get("/allTransactions", transactionController.getAllTransactions);

/**
 * @swagger
 * /transaction/{id}:
 *   get:
 *     summary: Ambil semua transaksi dari wallet tertentu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dari wallet
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Daftar transaksi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   from_address:
 *                     type: string
 *                   to_address:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   tx_hash:
 *                     type: string
 *                   status:
 *                     type: string
 *                   created_at:
 *                     type: string
 *       500:
 *         description: Gagal mengambil transaksi
 */
router.get("/:id", transactionController.getTransactionByWalletId);

export default router;
