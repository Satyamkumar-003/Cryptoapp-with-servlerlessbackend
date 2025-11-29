/**
 * History Storage Utility
 * Manages storing and retrieving historical price data (last 10 readings)
 */

const STORAGE_KEY = 'crypto_price_history'
const MAX_HISTORY = 10

/**
 * Get historical data from localStorage
 */
export const getHistory = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading history from storage:', error)
    return []
  }
}

/**
 * Save new price reading to history
 * @param {Object} btcData - Bitcoin data
 * @param {Object} ethData - Ethereum data
 */
export const saveToHistory = (btcData, ethData) => {
  try {
    const history = getHistory()
    const newEntry = {
      timestamp: new Date().toISOString(),
      bitcoin: {
        price: btcData.current_price,
        change24h: btcData.price_change_percentage_24h,
        marketCap: btcData.market_cap,
        high24h: btcData.high_24h,
        low24h: btcData.low_24h,
        volume: btcData.total_volume,
      },
      ethereum: {
        price: ethData.current_price,
        change24h: ethData.price_change_percentage_24h,
        marketCap: ethData.market_cap,
        high24h: ethData.high_24h,
        low24h: ethData.low_24h,
        volume: ethData.total_volume,
      },
    }

    // Add new entry at the beginning
    const updatedHistory = [newEntry, ...history].slice(0, MAX_HISTORY)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
    return updatedHistory
  } catch (error) {
    console.error('Error saving to history:', error)
    return []
  }
}

/**
 * Clear all history
 */
export const clearHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing history:', error)
  }
}

