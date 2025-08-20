import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { placeOrder } from "./trade.ts";


const server = new McpServer({
  name: "Zerodha_Trade",
  version: "1.0.0"
});

server.tool(
  "buy-stock", "Buys the stock on zerodha exchange for the user. It executes a real order to buy the stock.",
  { stock: z.string(), qty: z.number() },
  async ({ stock, qty }) => {
    try {
      await placeOrder(stock, qty, "BUY");
      return {
        content: [{ type: "text", text: "Stock has been bought." }]
      };
    } catch (error: any) {
      console.error("Buy order failed:", error);
      const message = error?.message || JSON.stringify(error);
      return {
        content: [{ type: "text", text: ` Buy order failed: ${message}` }]
      };
    }
  }
);


server.tool("sell-stock", "Sells the stock on the zerodha exchange for the user. It executes a real order to sell the stock.",
  { stock: z.string(), qty: z.number() },
  async ({ stock, qty }) => {
    placeOrder(stock, qty, "SELL");
    return {
      content: [{ type: "text", text: "Stock has been sold" }]
    };
  }
);


server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);





// import { KiteConnect } from "kiteconnect";

// const apiKey = "";
// const apiSecret = "";
// // const requestToken = "";

// const kc = new KiteConnect({ api_key: apiKey });

// // console.log(kc.getLoginURL());

// async function init() {
//   try {
//     kc.setAccessToken("")
//     // await generateSession();
//     await getProfile();
//   } catch (err) {
//     console.error(err);
//   }
// }

// // async function generateSession() {
// //   try {
// //     const response = await kc.generateSession(requestToken, apiSecret);
// //     kc.setAccessToken(response.access_token);
// //     console.log(response.access_token);
// //   } catch (err) {
// //     console.error("Error generating session:", err);
// //   }
// // }

// async function getProfile() {
//   try {
//     const profile = await kc.getProfile();
//     console.log("Profile:", profile);
//   } catch (err) {
//     console.error("Error getting profile:", err);
//   }
// }
// // Initialize the API calls
// init();


















