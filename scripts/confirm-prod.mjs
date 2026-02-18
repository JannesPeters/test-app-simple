const allowProd = process.env.ALLOW_PROD_DB_PUSH === "true";

if (!allowProd) {
  console.error(
    "Production push blocked. Re-run with ALLOW_PROD_DB_PUSH=true if you are sure."
  );
  process.exit(1);
}
