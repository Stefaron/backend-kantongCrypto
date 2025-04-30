import supabase from "../supabase.js";

async function testSupabaseConnection() {
  const { data, error } = await supabase.from("wallets").select("*").limit(1); // ambil 1 data saja untuk tes

  if (error) {
    console.error("❌ Koneksi ke Supabase gagal:", error.message);
  } else {
    console.log("✅ Koneksi ke Supabase berhasil. Contoh data:", data);
  }
}

testSupabaseConnection();
