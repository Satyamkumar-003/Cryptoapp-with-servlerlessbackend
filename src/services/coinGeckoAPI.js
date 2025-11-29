/**
 * CoinGecko API Service
 * Fetches real-time cryptocurrency data from CoinGecko API
 */

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3'

/**
 * Fetches current prices and market data for specified cryptocurrencies
 * @param {string[]} coinIds - Array of coin IDs (e.g., ['bitcoin', 'ethereum'])
 * @returns {Promise<Object[]>} Array of cryptocurrency data objects
 */
export const fetchCryptoPrices = async (coinIds) => {
  try {
    const ids = coinIds.join(',')
    const url = `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching crypto prices:', error)
    throw new Error(`Failed to fetch cryptocurrency data: ${error.message}`)
  }
}

/**
 * Formats a number to currency format
 * @param {number} value - The number to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Formats a large number (like market cap) with abbreviations
 * @param {number} value - The number to format
 * @returns {string} Formatted string with abbreviation (e.g., $1.5B)
 */
export const formatMarketCap = (value) => {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`
  } else {
    return formatCurrency(value)
  }
}

