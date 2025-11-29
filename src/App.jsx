import { useState, useEffect } from 'react'
import CryptoCard from './components/CryptoCard'
import Header from './components/Header'
import HistoryTable from './components/HistoryTable'
import PriceChart from './components/PriceChart'
import StatsSection from './components/StatsSection'
import { fetchCryptoPrices } from './services/coinGeckoAPI'
import { getHistory, saveToHistory } from './utils/historyStorage'
import './App.css'

function App() {
  const [bitcoinData, setBitcoinData] = useState(null)
  const [ethereumData, setEthereumData] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const updatePrices = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setIsRefreshing(true)
      }
      setError(null)
      const data = await fetchCryptoPrices(['bitcoin', 'ethereum'])
      
      if (data && data.length === 2) {
        const btc = data.find(crypto => crypto.id === 'bitcoin')
        const eth = data.find(crypto => crypto.id === 'ethereum')
        
        setBitcoinData(btc)
        setEthereumData(eth)
        
        // Save to history
        const updatedHistory = saveToHistory(btc, eth)
        setHistory(updatedHistory)
        
        setLastUpdate(new Date())
        setLoading(false)
      }
    } catch (err) {
      setError(err.message)
      setLoading(false)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    // Load existing history
    const existingHistory = getHistory()
    setHistory(existingHistory)
    
    // Initial fetch
    updatePrices()
    
    // Update every 30 seconds
    const interval = setInterval(() => updatePrices(false), 30000)
    
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    updatePrices(true)
  }

  return (
    <div className="app">
      <Header 
        lastUpdate={lastUpdate} 
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <main className="app-main">
        {loading && !bitcoinData && !ethereumData ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading cryptocurrency prices...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>❌ Error: {error}</p>
            <button onClick={handleRefresh} className="retry-button">
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Current Prices Section */}
            <section className="section current-prices-section">
              <h2 className="section-title-main">💎 Current Prices</h2>
              <div className="crypto-grid">
                {bitcoinData && (
                  <CryptoCard
                    name={bitcoinData.name}
                    symbol={bitcoinData.symbol.toUpperCase()}
                    price={bitcoinData.current_price}
                    priceChange24h={bitcoinData.price_change_percentage_24h}
                    marketCap={bitcoinData.market_cap}
                    image={bitcoinData.image}
                  />
                )}
                {ethereumData && (
                  <CryptoCard
                    name={ethereumData.name}
                    symbol={ethereumData.symbol.toUpperCase()}
                    price={ethereumData.current_price}
                    priceChange24h={ethereumData.price_change_percentage_24h}
                    marketCap={ethereumData.market_cap}
                    image={ethereumData.image}
                  />
                )}
              </div>
            </section>

            {/* Statistics Section */}
            {bitcoinData && ethereumData && (
              <section className="section">
                <StatsSection 
                  bitcoinData={bitcoinData} 
                  ethereumData={ethereumData} 
                />
              </section>
            )}

            {/* Price Chart Section */}
            <section className="section">
              <PriceChart history={history} />
            </section>

            {/* History Table Section */}
            <section className="section">
              <HistoryTable history={history} />
            </section>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer">CoinGecko API</a></p>
        <p>Data updates every 30 seconds</p>
      </footer>
    </div>
  )
}

export default App
