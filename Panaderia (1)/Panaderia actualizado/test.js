import { supabase } from "./supabaseClient.js";

async function probarConexion() {
  const { data, error } = await supabase.from("test").select("*");

  if (error) {
    console.error("❌ Error conectando:", error);
  } else {
    console.log("✅ Conexión exitosa");
    console.log("Datos recibidos:", data);
  }
}

probarConexion();
