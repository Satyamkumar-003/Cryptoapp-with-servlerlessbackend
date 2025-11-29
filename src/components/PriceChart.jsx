import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../services/coinGeckoAPI'
import './PriceChart.css'

const PriceChart = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="chart-container">
        <h2 className="section-title">📈 Price Trends</h2>
        <p className="no-data">No chart data available yet.</p>
      </div>
    )
  }

  // Prepare data for chart
  const chartData = history
    .slice()
    .reverse()
    .map((entry, index) => ({
      time: new Date(entry.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      bitcoin: entry.bitcoin.price,
      ethereum: entry.ethereum.price,
      index: index + 1,
    }))

  const formatPrice = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`
    }
    return formatCurrency(value)
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].payload.time}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-item" style={{ color: entry.color }}>
              {entry.name === 'bitcoin' ? 'Bitcoin' : 'Ethereum'}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="chart-container">
      <h2 className="section-title">📈 Price Trends</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255, 255, 255, 0.6)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="rgba(255, 255, 255, 0.6)"
              style={{ fontSize: '12px' }}
              tickFormatter={formatPrice}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: 'white' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="bitcoin" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', r: 4 }}
              activeDot={{ r: 6 }}
              name="Bitcoin"
            />
            <Line 
              type="monotone" 
              dataKey="ethereum" 
              stroke="#627eea" 
              strokeWidth={3}
              dot={{ fill: '#627eea', r: 4 }}
              activeDot={{ r: 6 }}
              name="Ethereum"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PriceChart

