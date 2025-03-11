import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeDarazProduct } from "@/lib/scraper";
import { getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectToDB();

    // find all the products 
    const products = await Product.find({});

    if (!products) throw new Error("No products found");

    // 1. SCRAPE LATEST PRODUCT DETAILS AND UPDATE DB

    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapeProduct = await scrapeDarazProduct(currentProduct.url);

        if (!scrapeProduct) throw new Error("No product found");

        const updatedPriceHistory = [...currentProduct.priceHistory, { price: scrapeProduct.currentPrice }];

        const product = {
          ...scrapeProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory)
        };

        const updateProduct = await Product.findOneAndUpdate(
          { url: scrapeProduct.url },
          product, // update / create the data 
        );

        // 2. CHECK EACH PRODUCT STATUS AND SEND EMAIL ACCOURDINGLY

        const emailNotfType = getEmailNotifType(scrapeProduct, currentProduct);

        // If notification exist (i.e if new lowest price comes) and 
        // if there is some users to notify (if users has done track )
        if (emailNotfType && updateProduct.users.length > 0) {

          const productInfo = {
            title: updateProduct.productTitle,
            url: updateProduct.url,
          }

          const emailContent = generateEmailBody(productInfo, emailNotfType);

          // send email to all the users that have done track
          const userEmails = updateProduct.users.map((user: any) => user.email);

          await sendEmail(emailContent, userEmails);
        }
        return updateProduct;
      })
    )
    return NextResponse.json({
      message: "OK", data: updatedProducts
    })
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}
