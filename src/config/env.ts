const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL as string | undefined,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
};

if (import.meta.env.DEV && import.meta.env.MODE !== "test") {
  if (import.meta.env.MODE === "production") {
    const allowProd = import.meta.env.VITE_ALLOW_PROD === "true";

    if (!allowProd) {
      throw new Error(
        "Production mode blocked. Set VITE_ALLOW_PROD=true in .env.production to proceed."
      );
    }
  }

  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error(
      "Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
    );
  }
}

export { env };
