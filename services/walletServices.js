import { ethers } from "ethers";
import provider from "../config/provider.js";
import walletModel from "../models/walletModel.js";
import supabase from "../supabase.js";

async function generateNewWallet(walletName, isMainWallet = false) {
  const wallet = ethers.Wallet.createRandom();
  const connectedWallet = wallet.connect(provider);

  const newWallet = await walletModel.createWallet({
    wallet_name: walletName,
    address: connectedWallet.address,
    private_key: connectedWallet.privateKey,
    is_main_wallet: isMainWallet,
  });

  return newWallet;
}

async function getTotalBalancerForUser(user_id = 1) {
  try {
    // Mengambil data wallet berdasarkan user_id
    const { data: wallets, error } = await supabase.from("wallets").select("*").eq("user_id", user_id);

    if (error) {
      throw new Error(`Gagal mengambil wallet: ${error.message}`);
    }

    let total_balance = ethers.parseEther("0");
    const walletBalances = [];

    // Iterasi melalui wallet yang dimiliki user
    for (const wallet of wallets) {
      try {
        const balance = await provider.getBalance(wallet.address);
        total_balance += balance;
        walletBalances.push({
          wallet_id: wallet.id,
          wallet_name: wallet.wallet_name,
          address: wallet.address,
          is_main_wallet: wallet.is_main_wallet,
          balance_eth: ethers.formatEther(balance),
        });
      } catch (err) {
        console.error(`Gagal mengambil saldo untuk ${wallet.address}:`, err.message);
      }
    }
    return {
      total_eth: ethers.formatEther(total_balance), // Mengonversi saldo total menjadi ETH
      wallets: walletBalances, // Mengembalikan rincian saldo untuk setiap wallet
    };
  } catch (err) {
    console.error("Gagal mengambil total saldo:", err.message);
    throw err;
  }
}

async function getBalanceWallet(walletId) {
  const { data, error } = await supabase.from("wallets").select("*").eq("id", walletId).single();

  if (error) {
    throw new Error("Wallet tidak ditemukan");
  }

  try {
    const balance = await provider.getBalance(data.address);
    return {
      wallet_id: data.id,
      address: data.address,
      balance_eth: ethers.formatEther(balance),
    };
  } catch (err) {
    console.error(`Gagal mengambil saldo untuk ${data.address}:`, err.message);
    throw new Error("Gagal mengambil saldo");
  }
}

export default { generateNewWallet, getTotalBalancerForUser, getBalanceWallet };
