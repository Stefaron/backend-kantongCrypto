import walletService from "../services/walletServices.js";

async function createWallet(req, res) {
  const { wallet_name, is_main_wallet } = req.body;
  try {
    const wallet = await walletService.generateNewWallet(wallet_name, is_main_wallet);
    res.json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create wallet");
  }
}

async function getTotalFunds(req, res) {
  try {
    const result = await walletService.getTotalBalancerForUser();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getBalanceWallet(req, res) {
  const walletId = parseInt(req.params.id);
  if (isNaN(walletId)) {
    return res.status(400).json({ error: "Wallet ID harus berupa angka" });
  }

  try {
    const result = await walletService.getBalanceWallet(walletId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default { createWallet, getTotalFunds, getBalanceWallet };
