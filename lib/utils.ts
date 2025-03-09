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
