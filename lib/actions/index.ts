"use server"

import { scrapeDarazProduct } from "../scraper";

export async function scrapeAndStoreProduct(url: string) {
  if (!url) return;

  try {
    const scrapeDaraz = await scrapeDarazProduct(url);
  } catch (err: any) {
    throw new Error("Failed to create/update product : ", err.message);
  }
}
