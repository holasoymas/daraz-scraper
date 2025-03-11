"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { User } from "@/types";
import { connectToDB } from "../mongoose";
import { scrapeDarazProduct } from "../scraper";
import { getHighestPrice, getLowestPrice } from "../utils";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapeAndStoreProduct(url: string) {
  if (!url) return;

  try {
    await connectToDB();

    const scrapeDarazData = await scrapeDarazProduct(url);

    if (!scrapeDarazData) return;

    let product = scrapeDarazData;

    const existingProduct = await Product.findOne({ url: product.url });

    if (existingProduct) {
      const updatedPriceHistory = [...existingProduct.priceHistory, { price: scrapeDarazData.currentPrice }];

      product = {
        ...scrapeDarazData,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory)
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapeDarazData.url },
      product, // update / create the data 
      { upsert: true, new: true }, // if data doesnt exist create one
    );

    // this page will stuck in cache so we get refreshed data whenever we go to that page
    revalidatePath(`product/${newProduct._id}`);
    console.log(scrapeDarazData);
  } catch (err: any) {
    throw new Error("Failed to create/update product : ", err.message);
  }
}

export async function getProductById(productId: string) {
  try {
    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();

    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(productId: string, email: string) {
  try {
    const product = await Product.findById(productId);

    if (!product) return;

    const userExists = product.users.some((user: User) => user.email === email);

    if (!userExists) {
      product.users.push({ email });

      await product.save();

      const productEmail = {
        title: product.productTitle,
        url: product.url,
      }
      const emailContent = generateEmailBody(productEmail, "WELCOME");

      await sendEmail(emailContent, [email]);
    }
  } catch (error) {
    console.log(error);

  }
}


