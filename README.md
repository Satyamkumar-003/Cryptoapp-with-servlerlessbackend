# Crypto Price Ticker

A comprehensive, real-time cryptocurrency price ticker built with React.js and the CoinGecko API. Features beautiful UI, historical data tracking, interactive charts, and detailed statistics for Bitcoin and Ethereum.
Live : https://cryptoanalyserapp.netlify.app/
## ✨ Features

### Core Features
- 🪙 **Real-time Prices** - Live Bitcoin and Ethereum prices with auto-refresh every 30 seconds
- 📊 **24-hour Statistics** - Price changes, market cap, and volume data
- 💰 **Market Data** - Market capitalization, 24h high/low, and trading volume
- 📈 **Price Charts** - Interactive line charts showing price trends over time
- 📋 **History Tracking** - Stores and displays the last 10 price readings for comparison
- 🎨 **Modern UI** - Dark theme with glassmorphism effects and smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices

### Advanced Features
- **Historical Data Table** - Compare prices across the last 10 readings with change indicators
- **Interactive Charts** - Visualize price trends using Recharts library
- **Detailed Statistics** - View 24h high/low, volume, and market cap rankings
- **Price Change Tracking** - See how prices changed between readings
- **Local Storage** - History persists across page refreshes
- **Manual Refresh** - Refresh button for instant updates

## 🛠️ Tech Stack

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Recharts** - Beautiful, responsive charts
- **CoinGecko API** - Reliable cryptocurrency data source
- **CSS3** - Modern styling with gradients, animations, and glassmorphism
- **LocalStorage** - Client-side data persistence

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📡 API Usage

This project uses the CoinGecko API (free tier, no API key required):
- **Endpoint**: `https://api.coingecko.com/api/v3/coins/markets`
- **Rate Limit**: 10-50 calls/minute (free tier)
- **Update Frequency**: Every 30 seconds (configurable in `App.jsx`)
- **Data Retrieved**: Price, market cap, 24h change, 24h high/low, volume, rank

## 📁 Project Structure

```
serverless/
├── src/
│   ├── components/
│   │   ├── CryptoCard.jsx          # Main price card component
│   │   ├── CryptoCard.css          # Card styling
│   │   ├── Header.jsx               # App header with refresh button
│   │   ├── Header.css              # Header styling
│   │   ├── HistoryTable.jsx        # Historical data table
│   │   ├── HistoryTable.css        # Table styling
│   │   ├── PriceChart.jsx          # Interactive price charts
│   │   ├── PriceChart.css         # Chart styling
│   │   ├── StatsSection.jsx        # Detailed statistics
│   │   └── StatsSection.css       # Stats styling
│   ├── services/
│   │   └── coinGeckoAPI.js         # API service functions
│   ├── utils/
│   │   └── historyStorage.js      # History management utilities
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App styling
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
└── README.md                       # This file
```

## 🎨 UI Sections

The app is organized into several distinct sections:

1. **Header** - Title, last update time, and manual refresh button
2. **Current Prices** - Large cards showing Bitcoin and Ethereum current prices
3. **Statistics** - Detailed 24h statistics (high/low, volume, rank)
4. **Price Charts** - Interactive line charts showing price trends
5. **History Table** - Tabular view of last 10 price readings
6. **Footer** - API attribution and update frequency info

## ⚙️ Customization

### Change Update Frequency

Edit `src/App.jsx` and modify the interval:
```javascript
const interval = setInterval(() => updatePrices(false), 30000) // 30000ms = 30 seconds
```

### Add More Cryptocurrencies

1. Update the `coinIds` array in `App.jsx`:
```javascript
const data = await fetchCryptoPrices(['bitcoin', 'ethereum', 'cardano'])
```

2. Add corresponding state and rendering logic in the components.

### Modify History Storage

Edit `src/utils/historyStorage.js` to change:
- Maximum history entries (currently 10)
- Storage key name
- Data structure

### Customize Styling

- **Card colors**: Edit gradients in `src/components/CryptoCard.css`
- **Theme colors**: Modify color values in `src/App.css`
- **Chart colors**: Update stroke colors in `src/components/PriceChart.jsx`
- **Global styles**: Update `src/index.css`

## 📊 Features in Detail

### History Tracking
- Automatically saves each price update to localStorage
- Displays last 10 readings in a sortable table
- Shows price changes between consecutive readings
- Color-coded indicators for price increases/decreases

### Charts
- Interactive line charts with hover tooltips
- Shows both Bitcoin and Ethereum on the same chart
- Responsive design that adapts to screen size
- Custom styling to match the app theme

### Statistics
- 24-hour high and low prices
- Trading volume
- Market cap rankings
- Organized in easy-to-read cards

## 🔧 Development

The app uses:
- **React Hooks** - useState, useEffect for state management
- **LocalStorage API** - For persisting history data
- **Fetch API** - For CoinGecko API calls
- **Recharts** - For chart rendering

## 📝 License

MIT

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com) for providing free cryptocurrency data
- [Recharts](https://recharts.org/) for the charting library
