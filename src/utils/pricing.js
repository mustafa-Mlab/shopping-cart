/**
 * Calculates the dynamic variant price of a product based on the selected size and color.
 * Includes realistic price offsets for premium colors and larger sizes.
 * 
 * @param {Object} product - The product object
 * @param {string} size - The selected size (e.g., 's', 'm', 'xl', 'xxl', 'free')
 * @param {string} color - The selected color (e.g., 'blue', 'black', 'red-gold')
 * @returns {Object} { price, sell_price } - The adjusted prices
 */
export function getVariantPrice(product, size, color) {
  if (!product) return { price: 0, sell_price: 0 };
  
  let priceOffset = 0;
  let sellPriceOffset = 0;
  
  // Size-based offset
  if (size) {
    const s = size.toLowerCase();
    if (s === 'm') {
      priceOffset += 5;
      sellPriceOffset += 5;
    } else if (s === 'xl') {
      priceOffset += 12;
      sellPriceOffset += 10;
    } else if (s === 'xxl') {
      priceOffset += 25;
      sellPriceOffset += 20;
    }
  }
  
  // Color-based offset
  if (color) {
    const c = color.toLowerCase();
    if (c === 'washed-blue') {
      priceOffset += 8;
      sellPriceOffset += 6;
    } else if (c === 'black') {
      priceOffset += 6;
      sellPriceOffset += 5;
    } else if (c === 'crimson') {
      priceOffset += 40;
      sellPriceOffset += 30;
    } else if (c === 'emerald') {
      priceOffset += 50;
      sellPriceOffset += 40;
    } else if (c === 'red-gold') {
      priceOffset += 100;
      sellPriceOffset += 80;
    } else if (c === 'rainbow') {
      priceOffset += 4;
      sellPriceOffset += 3;
    }
  }

  const finalPrice = product.price + priceOffset;
  const finalSellPrice = product.sell_price + sellPriceOffset;
  
  return {
    price: finalPrice,
    sell_price: finalSellPrice
  };
}
