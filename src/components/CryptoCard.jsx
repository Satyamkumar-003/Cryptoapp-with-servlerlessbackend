import { formatCurrency, formatMarketCap } from '../services/coinGeckoAPI'
import './CryptoCard.css'

const CryptoCard = ({ name, symbol, price, priceChange24h, marketCap, image }) => {
  const isPositive = priceChange24h >= 0
  const priceChangeClass = isPositive ? 'positive' : 'negative'
  const priceChangeIcon = isPositive ? '📈' : '📉'

  return (
    <div className="crypto-card">
      <div className="crypto-header">
        <div className="crypto-info">
          <img src={image} alt={name} className="crypto-icon" />
          <div>
            <h2 className="crypto-name">{name}</h2>
            <p className="crypto-symbol">{symbol}</p>
          </div>
        </div>
      </div>
      
      <div className="crypto-price">
        <span className="price-label">Current Price</span>
        <span className="price-value">{formatCurrency(price)}</span>
      </div>

      <div className="crypto-stats">
        <div className="stat-item">
          <span className="stat-label">24h Change</span>
          <span className={`stat-value ${priceChangeClass}`}>
            {priceChangeIcon} {Math.abs(priceChange24h).toFixed(2)}%
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Market Cap</span>
          <span className="stat-value">{formatMarketCap(marketCap)}</span>
        </div>
      </div>
    </div>
  )
}

export default CryptoCard

