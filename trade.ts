import { KiteConnect } from "kiteconnect";

const apiKey = process.env.API_KEY || "";
const accessToken = process.env.ACCESS_TOKEN || "";

const kc = new KiteConnect({ api_key: " " });

export async function placeOrder(tradingsymbol: string, quantity: number, type: "BUY" | "SELL") {

  try {
    kc.setAccessToken("");
  
    await kc.placeOrder("regular", {
      exchange: "NSE",               
      tradingsymbol,
      transaction_type: type,
      quantity,
      product: "CNC",                  
      order_type: "MARKET"             
    });
  } catch (error) {
    console.error(error)
  }
}
