import { formatCurrency, formatMarketCap } from '../services/coinGeckoAPI'
import './HistoryTable.css'

const HistoryTable = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="history-table-container">
        <h2 className="section-title">Price History</h2>
        <p className="no-data">No historical data available yet. Data will appear after the first update.</p>
      </div>
    )
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getPriceChange = (currentPrice, previousPrice) => {
    if (!previousPrice) return null
    const change = currentPrice - previousPrice
    const percentChange = ((change / previousPrice) * 100).toFixed(2)
    return { change, percentChange }
  }

  return (
    <div className="history-table-container">
      <h2 className="section-title">📊 Price History (Last 10 Readings)</h2>
      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Bitcoin Price</th>
              <th>Change</th>
              <th>Ethereum Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => {
              const prevEntry = history[index + 1]
              const btcChange = getPriceChange(entry.bitcoin.price, prevEntry?.bitcoin.price)
              const ethChange = getPriceChange(entry.ethereum.price, prevEntry?.ethereum.price)

              return (
                <tr key={entry.timestamp}>
                  <td className="time-cell">
                    <div className="time-primary">{formatTime(entry.timestamp)}</div>
                    <div className="time-secondary">{formatDate(entry.timestamp)}</div>
                  </td>
                  <td className="price-cell">
                    <span className="price-value">{formatCurrency(entry.bitcoin.price)}</span>
                  </td>
                  <td className="change-cell">
                    {btcChange ? (
                      <span className={btcChange.change >= 0 ? 'change positive' : 'change negative'}>
                        {btcChange.change >= 0 ? '↑' : '↓'} {Math.abs(btcChange.change).toFixed(2)} 
                        <span className="change-percent">({Math.abs(btcChange.percentChange)}%)</span>
                      </span>
                    ) : (
                      <span className="change neutral">—</span>
                    )}
                  </td>
                  <td className="price-cell">
                    <span className="price-value">{formatCurrency(entry.ethereum.price)}</span>
                  </td>
                  <td className="change-cell">
                    {ethChange ? (
                      <span className={ethChange.change >= 0 ? 'change positive' : 'change negative'}>
                        {ethChange.change >= 0 ? '↑' : '↓'} {Math.abs(ethChange.change).toFixed(2)}
                        <span className="change-percent">({Math.abs(ethChange.percentChange)}%)</span>
                      </span>
                    ) : (
                      <span className="change neutral">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HistoryTable

