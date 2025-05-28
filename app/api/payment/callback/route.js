export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const Authority = searchParams.get("Authority");
  const Status = searchParams.get("Status");
  const amount = parseInt(searchParams.get("amount"), 10);
  const merchant_id = "1d4d1c16-4308-4dd9-ae32-bd6eb2f5d86f";

  let success = "false";

  if (Status === "OK") {
    try {
      const response = await axios.post("https://api.zarinpal.com/pg/v4/payment/verify.json", {
        merchant_id,
        authority: Authority,
        amount,
      });

      if (response.data.data.code === 100) {
        success = "true";
      }
    } catch (error) {
      success = "false";
    }
  }

  return new Response(`
    <html>
      <head><meta http-equiv="refresh" content="0; url=/UserPannle/Basket?success=${success}" /></head>
      <body>در حال بازگشت...</body>
    </html>
  `, {
    headers: { "Content-Type": "text/html" },
  });
}
