import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpDown, 
  DollarSign, 
  Activity, 
  BarChart3,
  Clock,
  Shield,
  Zap,
  Target,
  AlertTriangle,
  Layout,
  Grid3X3,
  Maximize2
} from 'lucide-react';

// Import new widgets
import PriceChart from '../widgets/PriceChart';
import TradeHistory from '../widgets/TradeHistory';
import PortfolioBalance from '../widgets/PortfolioBalance';
import QuickCalculator from '../widgets/QuickCalculator';

const TRADING_PAIRS = [
  { 
    pair: 'BTC/USD', 
    price: 43250.00, 
    change: 2.34, 
    volume: '2.4B',
    high24h: 44100.00,
    low24h: 42800.00,
    marketCap: '847B'
  },
  { 
    pair: 'ETH/USD', 
    price: 2650.50, 
    change: -1.23, 
    volume: '1.8B',
    high24h: 2720.00,
    low24h: 2580.00,
    marketCap: '318B'
  },
  { 
    pair: 'ADA/USD', 
    price: 0.485, 
    change: 5.67, 
    volume: '456M',
    high24h: 0.492,
    low24h: 0.458,
    marketCap: '17.2B'
  },
  { 
    pair: 'SOL/USD', 
    price: 98.75, 
    change: 3.45, 
    volume: '892M',
    high24h: 102.30,
    low24h: 94.20,
    marketCap: '44.8B'
  },
  { 
    pair: 'DOT/USD', 
    price: 7.23, 
    change: -0.87, 
    volume: '234M',
    high24h: 7.45,
    low24h: 7.10,
    marketCap: '9.1B'
  },
  { 
    pair: 'AVAX/USD', 
    price: 36.42, 
    change: 4.12, 
    volume: '567M',
    high24h: 37.80,
    low24h: 34.90,
    marketCap: '14.2B'
  }
];

const ORDER_BOOK_DATA = {
  bids: [
    { price: 43245.00, amount: 0.5234, total: 22634.23 },
    { price: 43240.00, amount: 1.2456, total: 53845.34 },
    { price: 43235.00, amount: 0.8901, total: 38476.89 },
    { price: 43230.00, amount: 2.1234, total: 91789.12 },
    { price: 43225.00, amount: 0.6789, total: 29345.67 }
  ],
  asks: [
    { price: 43255.00, amount: 0.4567, total: 19756.78 },
    { price: 43260.00, amount: 1.1234, total: 48567.89 },
    { price: 43265.00, amount: 0.7890, total: 34123.45 },
    { price: 43270.00, amount: 1.8901, total: 81789.23 },
    { price: 43275.00, amount: 0.5678, total: 24567.89 }
  ]
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

const ExchangeSection = () => {
  const [selectedPair, setSelectedPair] = useState('BTC/USD');
  const [orderType, setOrderType] = useState('market');
  const [tradeType, setTradeType] = useState('buy');
  const [orderForm, setOrderForm] = useState({
    amount: '',
    price: '',
    stopPrice: '',
    total: ''
  });
  const [activeTab, setActiveTab] = useState('spot');
  const [isProcessing, setIsProcessing] = useState(false);
  const [layoutMode, setLayoutMode] = useState('advanced'); // simple, advanced

  const selectedPairData = TRADING_PAIRS.find(pair => pair.pair === selectedPair);

  useEffect(() => {
    if (orderType === 'market' && selectedPairData) {
      const amount = parseFloat(orderForm.amount) || 0;
      const total = amount * selectedPairData.price;
      setOrderForm(prev => ({ ...prev, total: total.toFixed(2) }));
    } else if (orderType !== 'market') {
      const amount = parseFloat(orderForm.amount) || 0;
      const price = parseFloat(orderForm.price) || 0;
      const total = amount * price;
      setOrderForm(prev => ({ ...prev, total: total.toFixed(2) }));
    }
  }, [orderForm.amount, orderForm.price, orderType, selectedPairData]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    alert(`${tradeType.toUpperCase()} order placed successfully!`);
    
    // Reset form
    setOrderForm({
      amount: '',
      price: '',
      stopPrice: '',
      total: ''
    });
  };

  const TradingPairCard = ({ pair, index }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ delay: index * 0.05 }}
      onClick={() => setSelectedPair(pair.pair)}
      className={`glass-card p-4 cursor-pointer transition-all ${
        selectedPair === pair.pair ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-accent/30'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-sm">
            {pair.pair.split('/')[0].slice(0, 2)}
          </div>
          <div>
            <h4 className="font-bold text-foreground">{pair.pair}</h4>
            <p className="text-xs text-muted-foreground">Vol: {pair.volume}</p>
          </div>
        </div>
        <div className={`p-1 rounded ${pair.change >= 0 ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
          {pair.change >= 0 ? (
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-foreground">
            ${pair.price.toLocaleString()}
          </span>
          <span className={`text-sm font-semibold ${
            pair.change >= 0 ? 'text-emerald-500' : 'text-red-500'
          }`}>
            {pair.change >= 0 ? '+' : ''}{pair.change}%
          </span>
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>H: ${pair.high24h.toLocaleString()}</span>
          <span>L: ${pair.low24h.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  );

  const OrderBook = () => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">Order Book</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Activity className="w-4 h-4" />
          <span>Live</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-xs font-semibold text-muted-foreground mb-2">
        <span>Price (USD)</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (Sell Orders) */}
      <div className="space-y-1 mb-4">
        {ORDER_BOOK_DATA.asks.reverse().map((ask, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 text-sm py-1 hover:bg-red-500/10 transition-colors">
            <span className="text-red-500 font-mono">{ask.price.toLocaleString()}</span>
            <span className="text-right text-foreground font-mono">{ask.amount}</span>
            <span className="text-right text-muted-foreground font-mono">{ask.total.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Current Price */}
      <div className="flex items-center justify-center py-3 mb-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
        <span className="text-lg font-bold text-primary">
          ${selectedPairData?.price.toLocaleString()}
        </span>
        <span className={`ml-2 text-sm ${
          selectedPairData?.change >= 0 ? 'text-emerald-500' : 'text-red-500'
        }`}>
          {selectedPairData?.change >= 0 ? '+' : ''}{selectedPairData?.change}%
        </span>
      </div>

      {/* Bids (Buy Orders) */}
      <div className="space-y-1">
        {ORDER_BOOK_DATA.bids.map((bid, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 text-sm py-1 hover:bg-emerald-500/10 transition-colors">
            <span className="text-emerald-500 font-mono">{bid.price.toLocaleString()}</span>
            <span className="text-right text-foreground font-mono">{bid.amount}</span>
            <span className="text-right text-muted-foreground font-mono">{bid.total.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const TradingForm = () => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="glass-card p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/20 text-primary">
          <ArrowUpDown className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Place Order</h3>
          <p className="text-muted-foreground">{selectedPair}</p>
        </div>
      </div>

      {/* Trading Type Tabs */}
      <div className="flex space-x-1 glass-card p-1 mb-6">
        {[
          { id: 'spot', label: 'Spot', icon: Target },
          { id: 'margin', label: 'Margin', icon: TrendingUp },
          { id: 'futures', label: 'Futures', icon: BarChart3 }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 p-2 rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleOrderSubmit} className="space-y-4">
        {/* Buy/Sell Toggle */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setTradeType('buy')}
            className={`p-3 rounded-xl font-semibold transition-all ${
              tradeType === 'buy' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30'
            }`}
          >
            Buy {selectedPair.split('/')[0]}
          </button>
          <button
            type="button"
            onClick={() => setTradeType('sell')}
            className={`p-3 rounded-xl font-semibold transition-all ${
              tradeType === 'sell' 
                ? 'bg-red-500 text-white' 
                : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
            }`}
          >
            Sell {selectedPair.split('/')[0]}
          </button>
        </div>

        {/* Order Type */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Order Type
          </label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="glass-input w-full p-3"
          >
            <option value="market">Market Order</option>
            <option value="limit">Limit Order</option>
            <option value="stop-loss">Stop Loss</option>
            <option value="stop-limit">Stop Limit</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Amount ({selectedPair.split('/')[0]})
          </label>
          <input
            type="number"
            value={orderForm.amount}
            onChange={(e) => setOrderForm({...orderForm, amount: e.target.value})}
            className="glass-input w-full p-3"
            placeholder="0.00"
            min="0"
            step="0.00000001"
            required
          />
        </div>

        {/* Price (for limit orders) */}
        {orderType !== 'market' && (
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Price (USD)
            </label>
            <input
              type="number"
              value={orderForm.price}
              onChange={(e) => setOrderForm({...orderForm, price: e.target.value})}
              className="glass-input w-full p-3"
              placeholder={selectedPairData?.price.toString()}
              min="0"
              step="0.01"
              required
            />
          </div>
        )}

        {/* Stop Price (for stop orders) */}
        {(orderType === 'stop-loss' || orderType === 'stop-limit') && (
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Stop Price (USD)
            </label>
            <input
              type="number"
              value={orderForm.stopPrice}
              onChange={(e) => setOrderForm({...orderForm, stopPrice: e.target.value})}
              className="glass-input w-full p-3"
              placeholder="Stop price"
              min="0"
              step="0.01"
              required
            />
          </div>
        )}

        {/* Total */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Total (USD)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={orderForm.total}
              className="glass-input w-full p-3 pl-10 bg-muted/50"
              placeholder="0.00"
              readOnly
            />
          </div>
        </div>

        {/* Trading Fee Notice */}
        <div className="flex items-start space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <Shield className="w-4 h-4 text-blue-500 mt-0.5" />
          <div className="text-xs">
            <p className="text-blue-500 font-semibold mb-1">Trading Fee: 0.1%</p>
            <p className="text-blue-500/80">
              Estimated fee: ${((parseFloat(orderForm.total) || 0) * 0.001).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing || !orderForm.amount}
          className={`w-full p-4 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            tradeType === 'buy' 
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            `${tradeType.toUpperCase()} ${selectedPair.split('/')[0]}`
          )}
        </button>
      </form>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Enhanced Header with Layout Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Crypto Exchange
          </h1>
          <p className="text-muted-foreground">
            Professional trading platform with advanced tools and analytics
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Layout Mode Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            {[
              { id: 'simple', icon: Layout, label: 'Simple' },
              { id: 'advanced', icon: Grid3X3, label: 'Advanced' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setLayoutMode(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                  layoutMode === id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title={label}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '24h Volume', value: '$89.2B', change: '+12.8%', icon: BarChart3, color: 'text-blue-500' },
          { label: 'Active Pairs', value: '247', change: '+5 new', icon: Activity, color: 'text-emerald-500' },
          { label: 'Total Users', value: '1.2M', change: '+5.4%', icon: Shield, color: 'text-purple-500' },
          { label: 'Avg Fee', value: '0.1%', change: 'Competitive', icon: Zap, color: 'text-orange-500' }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
              <span className="text-xs text-muted-foreground">{metric.change}</span>
            </div>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-xl font-bold text-foreground">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Trading Interface */}
      {layoutMode === 'advanced' ? (
        <div className="space-y-8">
          {/* Price Chart Section */}
          <PriceChart 
            pair={selectedPair} 
            basePrice={selectedPairData?.price || 43250}
            className="col-span-full"
          />

          {/* Grid Layout for Advanced Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Trading Pairs */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-foreground mb-4">Trading Pairs</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                {TRADING_PAIRS.map((pair, index) => (
                  <TradingPairCard key={pair.pair} pair={pair} index={index} />
                ))}
              </div>
            </div>

            {/* Order Book */}
            <div className="lg:col-span-1">
              <OrderBook />
            </div>

            {/* Trading Form */}
            <div className="lg:col-span-1">
              <TradingForm />
            </div>

            {/* Portfolio Balance */}
            <div className="lg:col-span-1">
              <PortfolioBalance />
            </div>

            {/* Trade History */}
            <div className="lg:col-span-2">
              <TradeHistory />
            </div>

            {/* Quick Calculator */}
            <div className="lg:col-span-2">
              <QuickCalculator />
            </div>
          </div>
        </div>
      ) : (
        /* Simple Layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trading Pairs */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Trading Pairs</h3>
            <div className="space-y-3">
              {TRADING_PAIRS.map((pair, index) => (
                <TradingPairCard key={pair.pair} pair={pair} index={index} />
              ))}
            </div>
          </div>

          {/* Order Book */}
          <OrderBook />

          {/* Trading Form */}
          <TradingForm />
        </div>
      )}
    </div>
  );
};

export default ExchangeSection;

