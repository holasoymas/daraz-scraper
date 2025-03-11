import { NotificationType, PriceHistoryItem, Product } from "@/types";

export function parsePrice(value: string) {
  // Remove currency symbols and commas, preserve decimal points
  let cleanedValue = value.replace(/[^\d.]/g, '');

  if (cleanedValue[0] === ".") {
    cleanedValue = cleanedValue.slice(1)
  }

  // Check if cleaned value is a valid number
  if (isNaN(Number(cleanedValue))) {
    throw new Error('Invalid price format');
  }

  return parseFloat(cleanedValue);
}

export function parseCurrency(value: string) {
  // Regular expression to match currency symbol/word
  const currencyRegex = /([^\d.,]+)?\s?/;

  const match = value.match(currencyRegex);

  if (match) {
    // Extract the currency symbol/word (e.g., "Rs.", "$")
    return match[1] ? match[1].trim() : ''; // Returns currency symbol/word
  }
  throw new Error('Invalid format');
}

export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  // if newly fetch product is less than the lowest price in DB send lowest price Notification
  if (scrapedProduct.currentPrice < lowestPrice) {
    return "LOWEST_PRICE" as NotificationType;
  }
  return null;
};


