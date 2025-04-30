import transactionService from "../services/transactionService.js";

async function sendTransaction(req, res) {
  const { from_wallet_id, to_wallet_id, amount_eth } = req.body;

  try {
    const tx = await transactionService.sendEthTransaction(from_wallet_id, to_wallet_id, amount_eth);
    res.json(tx);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Gagal mengirim ETH" });
  }
}

async function getAllTransactions(req, res) {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.json(transactions);
  } catch (err) {
    console.error("Error getting transactions:", err.message);
    res.status(500).json({ error: "Gagal mengambil transaksi" });
  }
}

async function getTransactionByWalletId(req, res) {
  try {
    const transaction = await transactionService.getTransactionByWalletId(req.params.id);
    res.json(transaction);
  } catch (err) {
    console.error("Error getting transaction:", err.message);
    res.status(500).json({ error: "Gagal mengambil transaksi" });
  }
}

export default { sendTransaction, getAllTransactions, getTransactionByWalletId };
