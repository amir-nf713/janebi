import axios from "axios";

export async function POST(req) {
  const { amount, description, mobile, email } = await req.json();

  const merchant_id = "1d4d1c16-4308-4dd9-ae32-bd6eb2f5d86f";
  const callback_url = `https://janebi-speed.ir/api/payment/callback?amount=${amount}`;

  try {
    const response = await axios.post("https://api.zarinpal.com/pg/v4/payment/request.json", {
      merchant_id,
      amount,
      callback_url,
      description,
      metadata: {
        mobile,
        email
      }
    });

    const { authority, code } = response.data.data;

    if (code === 100) {
      return new Response(JSON.stringify({ url: `https://www.zarinpal.com/pg/StartPay/${authority}` }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "خطا در درخواست پرداخت" }), { status: 400 });
    }
  } catch (error) {
    console.error("Payment request error:", error.response ? error.response.data : error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  
}
