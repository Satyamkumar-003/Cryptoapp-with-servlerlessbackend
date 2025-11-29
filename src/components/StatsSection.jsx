import { formatCurrency, formatMarketCap } from '../services/coinGeckoAPI'
import './StatsSection.css'

const StatsSection = ({ bitcoinData, ethereumData }) => {
  if (!bitcoinData || !ethereumData) {
    return null
  }

  const stats = [
    {
      title: 'Bitcoin Statistics',
      data: [
        { label: '24h High', value: bitcoinData.high_24h ? formatCurrency(bitcoinData.high_24h) : 'N/A', type: 'positive' },
        { label: '24h Low', value: bitcoinData.low_24h ? formatCurrency(bitcoinData.low_24h) : 'N/A', type: 'negative' },
        { label: '24h Volume', value: bitcoinData.total_volume ? formatMarketCap(bitcoinData.total_volume) : 'N/A', type: 'neutral' },
        { label: 'Market Cap Rank', value: bitcoinData.market_cap_rank ? `#${bitcoinData.market_cap_rank}` : 'N/A', type: 'neutral' },
      ],
      color: '#f59e0b',
    },
    {
      title: 'Ethereum Statistics',
      data: [
        { label: '24h High', value: ethereumData.high_24h ? formatCurrency(ethereumData.high_24h) : 'N/A', type: 'positive' },
        { label: '24h Low', value: ethereumData.low_24h ? formatCurrency(ethereumData.low_24h) : 'N/A', type: 'negative' },
        { label: '24h Volume', value: ethereumData.total_volume ? formatMarketCap(ethereumData.total_volume) : 'N/A', type: 'neutral' },
        { label: 'Market Cap Rank', value: ethereumData.market_cap_rank ? `#${ethereumData.market_cap_rank}` : 'N/A', type: 'neutral' },
      ],
      color: '#627eea',
    },
  ]

  return (
    <div className="stats-section">
      <h2 className="section-title">📊 Detailed Statistics</h2>
      <div className="stats-grid">
        {stats.map((statGroup, index) => (
          <div key={index} className="stat-card">
            <h3 className="stat-card-title" style={{ color: statGroup.color }}>
              {statGroup.title}
            </h3>
            <div className="stat-items">
              {statGroup.data.map((item, itemIndex) => (
                <div key={itemIndex} className="stat-item">
                  <span className="stat-label">{item.label}</span>
                  <span className={`stat-value stat-${item.type}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsSection

