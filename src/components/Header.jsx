import './Header.css'

const Header = ({ lastUpdate, onRefresh, isRefreshing }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">
            <span className="title-icon">💰</span>
            Crypto Price Ticker
          </h1>
          <p className="header-subtitle">Real-time cryptocurrency market data</p>
        </div>
        <div className="header-right">
          {lastUpdate && (
            <div className="update-info">
              <span className="update-label">Last updated:</span>
              <span className="update-time">{lastUpdate.toLocaleTimeString()}</span>
            </div>
          )}
          <button 
            onClick={onRefresh} 
            className="refresh-button"
            disabled={isRefreshing}
          >
            {isRefreshing ? '🔄 Updating...' : '🔄 Refresh'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

