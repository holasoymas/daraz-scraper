// import axios from "axios";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import * as Parcer from "@/lib/utils"
import { Product } from "@/types";

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
    // const response = await axios.get(url, options);

    // const $ = cheerio.load(response.data);

    // const browser = await puppeteer.launch({ headless: false });
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium', // Adjust if needed
      // headless: false,
    });
    const page = await browser.newPage();

    // Go to the page and wait until all network requests are complete
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Get the fully rendered page HTML
    const pageContent = await page.content();

    const $ = cheerio.load(pageContent);

    // extract the product title 
    const productTitle = $(".pdp-mod-product-badge-title").text().trim();

    // Get the current price (orange text)
    const currentPrice = $('.pdp-price_color_orange').text().trim();

    // Get the original price (crossed-out text)
    const originalPrice = $('.pdp-price_color_lightgray').text().trim() || currentPrice;

    const discountRate = $(".pdp-product-price__discount").text() || "";

    // getting product image url
    const image = $(".gallery-preview-panel__image").attr("src");
    // console.log(image)

    // Construct the data object with the scraped information

    const data: Product = {
      url,
      image: String(image),
      productTitle,
      currentPrice: Parcer.parsePrice(currentPrice),
      originalPrice: Parcer.parsePrice(originalPrice),
      priceHistory: [],
      highestPrice: Parcer.parsePrice(originalPrice),
      lowestPrice: Parcer.parsePrice(currentPrice),
      discountRate,
      currency: Parcer.parseCurrency(currentPrice)
    }
    return data;

  } catch (error: any) {
    throw new Error(`Failed to scrape products ${error.message}`)
  }
}
