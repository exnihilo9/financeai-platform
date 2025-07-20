import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown, 
  Filter,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

// Generate mock trade history data
const generateTradeHistory = () => {
  const trades = [];
  const pairs = ['BTC/USD', 'ETH/USD', 'ADA/USD', 'SOL/USD', 'DOT/USD', 'AVAX/USD'];
  const types = ['buy', 'sell'];
  
  for (let i = 0; i < 50; i++) {
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const amount = (Math.random() * 5 + 0.1).toFixed(4);
    const price = Math.floor(Math.random() * 50000 + 1000);
    const total = (amount * price).toFixed(2);
    const time = new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000);
    
    trades.push({
      id: `trade_${i}`,
      pair,
      type,
      amount: parseFloat(amount),
      price,
      total: parseFloat(total),
      time: time.toISOString(),
      timeFormatted: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: Math.random() > 0.1 ? 'completed' : 'pending',
      fee: (total * 0.001).toFixed(2)
    });
  }
  
  return trades.sort((a, b) => new Date(b.time) - new Date(a.time));
};

const TradeHistory = ({ className = '' }) => {
  const [trades, setTrades] = useState([]);
  const [filter, setFilter] = useState('all'); // all, buy, sell, pending
  const [showMyTrades, setShowMyTrades] = useState(false);
  const [selectedPair, setSelectedPair] = useState('all');

  useEffect(() => {
    const initialTrades = generateTradeHistory();
    setTrades(initialTrades);

    // Simulate new trades coming in
    const interval = setInterval(() => {
      setTrades(prevTrades => {
        const pairs = ['BTC/USD', 'ETH/USD', 'ADA/USD', 'SOL/USD', 'DOT/USD', 'AVAX/USD'];
        const types = ['buy', 'sell'];
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const amount = (Math.random() * 5 + 0.1).toFixed(4);
        const price = Math.floor(Math.random() * 50000 + 1000);
        const total = (amount * price).toFixed(2);
        const time = new Date();
        
        const newTrade = {
          id: `trade_${Date.now()}`,
          pair,
          type,
          amount: parseFloat(amount),
          price,
          total: parseFloat(total),
          time: time.toISOString(),
          timeFormatted: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'completed',
          fee: (total * 0.001).toFixed(2)
        };

        const updated = [newTrade, ...prevTrades.slice(0, 49)]; // Keep only 50 trades
        return updated;
      });
    }, 5000); // New trade every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredTrades = trades.filter(trade => {
    if (filter !== 'all' && trade.type !== filter && filter !== 'pending') return false;
    if (filter === 'pending' && trade.status !== 'pending') return false;
    if (selectedPair !== 'all' && trade.pair !== selectedPair) return false;
    return true;
  });

  const pairs = [...new Set(trades.map(trade => trade.pair))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">
            {showMyTrades ? 'My Trade History' : 'Recent Trades'}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Toggle My Trades */}
          <button
            onClick={() => setShowMyTrades(!showMyTrades)}
            className={`p-2 rounded-lg transition-all ${
              showMyTrades 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
            title={showMyTrades ? "Show All Trades" : "Show My Trades"}
          >
            {showMyTrades ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          {/* Download */}
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Export">
            <Download className="w-4 h-4" />
          </button>

          {/* Filter */}
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Filter">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-4 space-x-4">
        {/* Trade Type Filter */}
        <div className="flex bg-muted rounded-lg p-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'buy', label: 'Buy' },
            { id: 'sell', label: 'Sell' },
            { id: 'pending', label: 'Pending' }
          ].map(option => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`px-3 py-1 rounded-md text-sm transition-all ${
                filter === option.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Pair Filter */}
        <select
          value={selectedPair}
          onChange={(e) => setSelectedPair(e.target.value)}
          className="glass-input text-sm px-3 py-1"
        >
          <option value="all">All Pairs</option>
          {pairs.map(pair => (
            <option key={pair} value={pair}>{pair}</option>
          ))}
        </select>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 text-xs font-semibold text-muted-foreground mb-3 px-2">
        <span>Time</span>
        <span>Pair</span>
        <span>Type</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Price</span>
        <span className="text-right">Total</span>
      </div>

      {/* Trade List */}
      <div className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredTrades.map((trade, index) => (
          <motion.div
            key={trade.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`grid grid-cols-6 gap-4 text-sm py-2 px-2 rounded-lg transition-all hover:bg-accent/30 ${
              trade.status === 'pending' ? 'opacity-60' : ''
            }`}
          >
            {/* Time */}
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground font-mono">{trade.timeFormatted}</span>
              {trade.status === 'pending' && (
                <div className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse"></div>
              )}
            </div>

            {/* Pair */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-xs">
                {trade.pair.split('/')[0].slice(0, 2)}
              </div>
              <span className="font-medium text-foreground">{trade.pair}</span>
            </div>

            {/* Type */}
            <div className="flex items-center">
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-semibold ${
                trade.type === 'buy' 
                  ? 'bg-emerald-500/20 text-emerald-500' 
                  : 'bg-red-500/20 text-red-500'
              }`}>
                {trade.type === 'buy' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="uppercase">{trade.type}</span>
              </div>
            </div>

            {/* Amount */}
            <div className="text-right">
              <span className="font-mono text-foreground">{trade.amount}</span>
              <div className="text-xs text-muted-foreground">{trade.pair.split('/')[0]}</div>
            </div>

            {/* Price */}
            <div className="text-right">
              <span className="font-mono text-foreground">${trade.price.toLocaleString()}</span>
              <div className="text-xs text-muted-foreground">USD</div>
            </div>

            {/* Total */}
            <div className="text-right">
              <span className="font-mono font-semibold text-foreground">${trade.total.toLocaleString()}</span>
              <div className="text-xs text-muted-foreground">Fee: ${trade.fee}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50">
        {[
          { 
            label: 'Total Volume 24h', 
            value: `$${(filteredTrades.reduce((sum, trade) => sum + trade.total, 0) / 1000).toFixed(1)}K`,
            color: 'text-blue-500'
          },
          { 
            label: 'Total Trades', 
            value: filteredTrades.length.toString(),
            color: 'text-emerald-500'
          },
          { 
            label: 'Avg Trade Size', 
            value: `$${(filteredTrades.reduce((sum, trade) => sum + trade.total, 0) / filteredTrades.length || 0).toFixed(0)}`,
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

export default TradeHistory;