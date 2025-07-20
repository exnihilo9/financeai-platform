import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  EyeOff, 
  Plus,
  ArrowUpDown,
  PieChart,
  DollarSign
} from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Mock portfolio data
const INITIAL_PORTFOLIO = [
  { 
    symbol: 'BTC', 
    name: 'Bitcoin', 
    amount: 0.5234, 
    price: 43250, 
    change24h: 2.34,
    color: '#f7931a'
  },
  { 
    symbol: 'ETH', 
    name: 'Ethereum', 
    amount: 3.2156, 
    price: 2650.50, 
    change24h: -1.23,
    color: '#627eea'
  },
  { 
    symbol: 'ADA', 
    name: 'Cardano', 
    amount: 1250.75, 
    price: 0.485, 
    change24h: 5.67,
    color: '#3cc8c8'
  },
  { 
    symbol: 'SOL', 
    name: 'Solana', 
    amount: 12.45, 
    price: 98.75, 
    change24h: 3.45,
    color: '#9945ff'
  },
  { 
    symbol: 'DOT', 
    name: 'Polkadot', 
    amount: 89.23, 
    price: 7.23, 
    change24h: -0.87,
    color: '#e6007a'
  }
];

const PortfolioBalance = ({ className = '' }) => {
  const [portfolio, setPortfolio] = useState(INITIAL_PORTFOLIO);
  const [hideBalances, setHideBalances] = useState(false);
  const [selectedView, setSelectedView] = useState('list'); // list, chart

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setPortfolio(prevPortfolio => 
        prevPortfolio.map(asset => {
          const volatility = 0.001; // 0.1% volatility
          const change = (Math.random() - 0.5) * volatility * asset.price;
          const newPrice = asset.price + change;
          const newChange24h = asset.change24h + (Math.random() - 0.5) * 0.5;
          
          return {
            ...asset,
            price: Number(newPrice.toFixed(asset.symbol === 'ADA' ? 3 : 2)),
            change24h: Number(newChange24h.toFixed(2))
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const totalValue = portfolio.reduce((sum, asset) => sum + (asset.amount * asset.price), 0);
  const totalChange = portfolio.reduce((sum, asset) => {
    const assetValue = asset.amount * asset.price;
    const assetChange = (assetValue * asset.change24h) / 100;
    return sum + assetChange;
  }, 0);
  const totalChangePercent = (totalChange / totalValue) * 100;

  const pieChartData = portfolio.map(asset => ({
    name: asset.symbol,
    value: asset.amount * asset.price,
    color: asset.color
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground">{data.name}</p>
          <p className="text-primary">${data.value.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">
            {((data.value / totalValue) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Wallet className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Portfolio Balance</h3>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            {[
              { id: 'list', icon: Wallet, label: 'List' },
              { id: 'chart', icon: PieChart, label: 'Chart' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setSelectedView(id)}
                className={`p-2 rounded-md transition-all ${
                  selectedView === id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title={label}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Hide/Show Balances */}
          <button
            onClick={() => setHideBalances(!hideBalances)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            title={hideBalances ? "Show Balances" : "Hide Balances"}
          >
            {hideBalances ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          {/* Quick Actions */}
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Deposit">
            <Plus className="w-4 h-4" />
          </button>
          
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Trade">
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Total Balance */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
            <div className="flex items-center space-x-3">
              <h2 className="text-3xl font-bold text-foreground">
                {hideBalances ? '•••••••' : `$${totalValue.toLocaleString()}`}
              </h2>
              <div className={`flex items-center space-x-1 ${
                totalChangePercent >= 0 ? 'text-emerald-500' : 'text-red-500'
              }`}>
                {totalChangePercent >= 0 ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
                <span className="font-semibold">
                  {hideBalances ? '••••' : `${totalChangePercent >= 0 ? '+' : ''}${totalChangePercent.toFixed(2)}%`}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {hideBalances ? '•••••••' : `${totalChangePercent >= 0 ? '+' : ''}$${Math.abs(totalChange).toFixed(2)} today`}
            </p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Content */}
      {selectedView === 'list' ? (
        <>
          {/* Asset List Header */}
          <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-muted-foreground mb-3 px-2">
            <span>Asset</span>
            <span className="text-right">Holdings</span>
            <span className="text-right">Price</span>
            <span className="text-right">24h Change</span>
            <span className="text-right">Value</span>
          </div>

          {/* Asset List */}
          <div className="space-y-1">
            {portfolio.map((asset, index) => {
              const assetValue = asset.amount * asset.price;
              const assetPercent = (assetValue / totalValue) * 100;
              
              return (
                <motion.div
                  key={asset.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-5 gap-4 text-sm py-3 px-2 rounded-lg hover:bg-accent/30 transition-all"
                >
                  {/* Asset Info */}
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                      style={{ backgroundColor: asset.color }}
                    >
                      {asset.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{asset.symbol}</p>
                      <p className="text-xs text-muted-foreground">{asset.name}</p>
                    </div>
                  </div>

                  {/* Holdings */}
                  <div className="text-right">
                    <p className="font-mono text-foreground">
                      {hideBalances ? '••••' : asset.amount.toFixed(4)}
                    </p>
                    <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-mono text-foreground">${asset.price.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">USD</p>
                  </div>

                  {/* 24h Change */}
                  <div className="text-right">
                    <div className={`flex items-center justify-end space-x-1 ${
                      asset.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'
                    }`}>
                      {asset.change24h >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span className="font-semibold">
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                      </span>
                    </div>
                  </div>

                  {/* Value */}
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      {hideBalances ? '•••••' : `$${assetValue.toLocaleString()}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {hideBalances ? '••' : `${assetPercent.toFixed(1)}%`}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      ) : (
        /* Pie Chart View */
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50">
        {[
          { 
            label: 'Best Performer', 
            value: portfolio.reduce((best, asset) => 
              asset.change24h > (best?.change24h || -Infinity) ? asset : best
            ).symbol,
            color: 'text-emerald-500'
          },
          { 
            label: 'Total Assets', 
            value: portfolio.length.toString(),
            color: 'text-blue-500'
          },
          { 
            label: 'Diversity Score', 
            value: `${Math.min(100, (portfolio.length * 20)).toFixed(0)}%`,
            color: 'text-purple-500'
          }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className={`font-semibold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PortfolioBalance;