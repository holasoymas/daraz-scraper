import axios from "axios";
import * as Cheerio from "cheerio";

export async function scrapeDarazProduct(url: string) {
  if (!url) return;

  // brightdata PROXY config 
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);

  const session_id = 1000000 * Math.random() | 0;

  const port = 33335

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false
  }

  try {
    const response = await axios.get(url, options);
    console.log(response.data);

    // feed the dom to the cheerio 
    const $ = Cheerio.load(response.data);

    // extract the product title 
    const productTitle = $(".pdp-mod-product-badge-title").text().trim();
    console.log(productTitle)

  } catch (error: any) {
    throw new Error(`Failed to scrape products ${error.message}`)
  }

}
