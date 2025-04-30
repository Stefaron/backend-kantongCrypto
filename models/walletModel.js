import db from "../config/db.js";
import supabase from "../supabase.js";

async function createWallet({ wallet_name, address, private_key, is_main_wallet }) {
  const { data, error } = await supabase
    .from("wallets")
    .insert([
      {
        wallet_name,
        address,
        private_key,
        is_main_wallet,
      },
    ])
    .select(); // untuk mengambil data yang baru saja dimasukkan

  if (error) {
    throw new Error(`Gagal membuat wallet: ${error.message}`);
  }

  return data[0]; // kembalikan 1 wallet yang dibuat
}

export default { createWallet };
