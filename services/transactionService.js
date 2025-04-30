import { ethers } from "ethers";
import provider from "../config/provider.js";
import db from "../config/db.js";
import supabase from "../supabase.js";

async function sendEthTransaction(fromWalletId, toWalletId, amountEth) {
  // 1. Ambil wallet pengirim
  const { data: fromWallet, error: fromError } = await supabase.from("wallets").select("*").eq("id", fromWalletId).single();

  // 2. Ambil wallet penerima
  const { data: toWallet, error: toError } = await supabase.from("wallets").select("*").eq("id", toWalletId).single();

  if (fromError || toError || !fromWallet || !toWallet) {
    throw new Error("Wallet tidak ditemukan.");
  }

  // 3. Inisialisasi wallet pengirim
  const wallet = new ethers.Wallet(fromWallet.private_key, provider);

  // 4. Kirim transaksi ETH
  const tx = await wallet.sendTransaction({
    to: toWallet.address,
    value: ethers.parseEther(amountEth.toString()),
  });

  console.log("📨 Transaksi dikirim, menunggu konfirmasi...");

  try {
    const receipt = await tx.wait();

    const status = receipt.status === 1 ? "success" : "failed";
    console.log(status === "success" ? "✅ Transaksi sukses" : "❌ Transaksi gagal");

    // 5. Simpan transaksi ke Supabase
    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          from_wallet_id: fromWalletId,
          to_wallet_id: toWalletId,
          amount_eth: amountEth,
          tx_hash: tx.hash,
          status: status,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error("Gagal menyimpan transaksi ke database: " + error.message);
    }

    return data;
  } catch (error) {
    console.error("❌ Error saat menunggu konfirmasi transaksi:", error.message);
    throw new Error("Gagal mengonfirmasi transaksi");
  }
}

async function getTransactionByWalletId(walletId) {
  const { data, error } = await supabase.from("transactions").select("*").or(`from_wallet_id.eq.${walletId},to_wallet_id.eq.${walletId}`);

  if (error) {
    throw new Error("Gagal mengambil transaksi: " + error.message);
  }
  return data;
}

async function getAllTransactions() {
  const { data, error } = await supabase.from("transactions").select("*").order("created_at", { ascending: false });

  if (error) {
    throw new Error("Gagal mengambil transaksi: " + error.message);
  }
  return data;
}

export default { sendEthTransaction, getTransactionByWalletId, getAllTransactions };
