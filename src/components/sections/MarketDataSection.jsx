import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3, 
  Globe, 
  Zap,
  Fuel,
  Droplets,
  Factory,
  DollarSign,
  Clock,
  AlertTriangle,
  Target,
  Newspaper,
  Brain,
  TrendingDown as Impact,
  Calendar,
  Filter,
  Search,
  Bell,
  Bookmark,
  Share,
  ExternalLink,
  BarChart,
  PieChart,
  Calculator,
  Settings,
  Download,
  RefreshCw,
  Eye,
  Star,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const MARKET_DATA = {
  overview: {
    marketCap: '2.4T',
    marketCapChange: 3.2,
    volume24h: '89.2B',
    volumeChange: 12.8,
    fearGreedIndex: 73,
    fearGreedLabel: 'Greed',
    dominance: {
      btc: 42.3,
      eth: 18.7,
      others: 39.0
    }
  },
  energy: [
    {
      symbol: 'WTI',
      name: 'WTI Crude Oil',
      price: 78.45,
      change: 2.34,
      volume: '245M',
      high24h: 79.12,
      low24h: 76.89,
      marketCap: '1.2T',
      icon: Droplets,
      color: 'from-slate-600 to-slate-700',
      sentiment: 'Bullish',
      aiScore: 87
    },
    {
      symbol: 'BRENT',
      name: 'Brent Crude Oil',
      price: 82.67,
      change: 1.89,
      volume: '189M',
      high24h: 83.45,
      low24h: 81.23,
      marketCap: '1.1T',
      icon: Fuel,
      color: 'from-amber-600 to-orange-600',
      sentiment: 'Bullish',
      aiScore: 84
    },
    {
      symbol: 'NATGAS',
      name: 'Natural Gas',
      price: 3.42,
      change: -1.23,
      volume: '156M',
      high24h: 3.56,
      low24h: 3.38,
      marketCap: '890B',
      icon: Factory,
      color: 'from-blue-600 to-cyan-600',
      sentiment: 'Bearish',
      aiScore: 62
    },
    {
      symbol: 'GASOLINE',
      name: 'Gasoline Futures',
      price: 2.34,
      change: 0.87,
      volume: '98M',
      high24h: 2.38,
      low24h: 2.31,
      marketCap: '567B',
      icon: Zap,
      color: 'from-red-600 to-pink-600',
      sentiment: 'Neutral',
      aiScore: 75
    }
  ],
  crypto: [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 43250.00,
      change: 2.34,
      volume: '2.4B',
      high24h: 44100.00,
      low24h: 42800.00,
      marketCap: '847B',
      icon: '₿',
      color: 'from-orange-500 to-yellow-500',
      sentiment: 'Bullish',
      aiScore: 91
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2650.50,
      change: 3.45,
      volume: '1.8B',
      high24h: 2720.00,
      low24h: 2580.00,
      marketCap: '318B',
      icon: 'Ξ',
      color: 'from-blue-500 to-purple-500',
      sentiment: 'Bullish',
      aiScore: 88
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.52,
      change: -0.89,
      volume: '234M',
      high24h: 0.54,
      low24h: 0.51,
      marketCap: '18.2B',
      icon: '₳',
      color: 'from-blue-600 to-indigo-600',
      sentiment: 'Bearish',
      aiScore: 67
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 98.45,
      change: 4.67,
      volume: '567M',
      high24h: 102.30,
      low24h: 94.20,
      marketCap: '42.1B',
      icon: '◎',
      color: 'from-purple-500 to-pink-500',
      sentiment: 'Bullish',
      aiScore: 85
    }
  ]
};

const MARKET_NEWS = [
  {
    id: 1,
    title: 'OPEC+ Announces Production Cut Extension Through Q2 2024',
    summary: 'Major oil producers extend production cuts, potentially driving crude prices higher amid global demand recovery.',
    source: 'Energy Intelligence',
    timestamp: '2 hours ago',
    category: 'Oil & Gas',
    impact: {
      score: 8.5,
      direction: 'positive',
      markets: ['WTI', 'BRENT', 'Energy Stocks'],
      analysis: 'Production cuts likely to support oil prices in the near term, with potential 5-8% price increase expected.'
    },
    sentiment: 'Bullish',
    readTime: '3 min',
    tags: ['OPEC', 'Production', 'Oil Prices']
  },
  {
    id: 2,
    title: 'Bitcoin ETF Sees Record $2.1B Inflow This Week',
    summary: 'Institutional investors continue massive Bitcoin accumulation as regulatory clarity improves.',
    source: 'CryptoNews Pro',
    timestamp: '4 hours ago',
    category: 'Cryptocurrency',
    impact: {
      score: 9.2,
      direction: 'positive',
      markets: ['BTC', 'ETH', 'Crypto Market'],
      analysis: 'Massive institutional inflows signal strong confidence, potentially driving Bitcoin above $45,000 resistance.'
    },
    sentiment: 'Very Bullish',
    readTime: '4 min',
    tags: ['Bitcoin', 'ETF', 'Institutional']
  },
  {
    id: 3,
    title: 'Natural Gas Prices Drop on Mild Winter Forecast',
    summary: 'Weather models predict warmer than expected winter, reducing heating demand projections.',
    source: 'Energy Markets Today',
    timestamp: '6 hours ago',
    category: 'Natural Gas',
    impact: {
      score: 7.3,
      direction: 'negative',
      markets: ['NATGAS', 'Energy Utilities'],
      analysis: 'Mild winter forecast reduces heating demand, potentially pressuring natural gas prices by 10-15%.'
    },
    sentiment: 'Bearish',
    readTime: '2 min',
    tags: ['Natural Gas', 'Weather', 'Demand']
  },
  {
    id: 4,
    title: 'Ethereum Layer 2 Solutions See 300% Growth in TVL',
    summary: 'Layer 2 scaling solutions attract massive capital as Ethereum ecosystem expands rapidly.',
    source: 'DeFi Analytics',
    timestamp: '8 hours ago',
    category: 'Cryptocurrency',
    impact: {
      score: 8.1,
      direction: 'positive',
      markets: ['ETH', 'Layer 2 Tokens'],
      analysis: 'Growing Layer 2 adoption strengthens Ethereum ecosystem, supporting long-term price appreciation.'
    },
    sentiment: 'Bullish',
    readTime: '5 min',
    tags: ['Ethereum', 'Layer 2', 'DeFi']
  }
];

const PROFESSIONAL_TOOLS = [
  {
    id: 1,
    name: 'Market Correlation Matrix',
    description: 'Advanced correlation analysis between different asset classes',
    icon: BarChart,
    color: 'from-blue-500 to-cyan-500',
    users: '12.4K',
    accuracy: '94.2%'
  },
  {
    id: 2,
    name: 'Volatility Surface Analyzer',
    description: 'Real-time volatility analysis and surface mapping',
    icon: Activity,
    color: 'from-purple-500 to-pink-500',
    users: '8.7K',
    accuracy: '91.8%'
  },
  {
    id: 3,
    name: 'Options Flow Scanner',
    description: 'Track large options trades and unusual activity',
    icon: Target,
    color: 'from-green-500 to-emerald-500',
    users: '15.2K',
    accuracy: '96.5%'
  },
  {
    id: 4,
    name: 'Sentiment Heat Map',
    description: 'Real-time market sentiment across all asset classes',
    icon: Brain,
    color: 'from-orange-500 to-red-500',
    users: '9.8K',
    accuracy: '89.3%'
  },
  {
    id: 5,
    name: 'Risk Parity Calculator',
    description: 'Advanced portfolio risk allocation and optimization',
    icon: Calculator,
    color: 'from-indigo-500 to-blue-500',
    users: '6.3K',
    accuracy: '93.7%'
  },
  {
    id: 6,
    name: 'Economic Calendar Impact',
    description: 'AI-powered economic event impact prediction',
    icon: Calendar,
    color: 'from-yellow-500 to-orange-500',
    users: '11.9K',
    accuracy: '87.4%'
  }
];

const MarketDataSection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsFilter, setNewsFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const filteredNews = MARKET_NEWS.filter(news => {
    const matchesFilter = newsFilter === 'all' || news.category.toLowerCase().includes(newsFilter.toLowerCase());
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         news.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const MarketCard = ({ item, index }) => (
    <motion.div
      className="glass-card p-6 group"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-lg`}>
            {typeof item.icon === 'string' ? item.icon : <item.icon className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{item.symbol}</h3>
            <p className="text-sm text-muted-foreground">{item.name}</p>
          </div>
        </div>
        
        {/* AI Score Badge */}
        <motion.div 
          className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <Brain className="w-3 h-3" />
          {item.aiScore}%
        </motion.div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-foreground">
            ${typeof item.price === 'number' ? item.price.toLocaleString() : item.price}
          </span>
          <div className={`flex items-center gap-1 ${
            item.change > 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {item.change > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span className="font-medium">{Math.abs(item.change)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Volume</span>
            <div className="font-medium">{item.volume}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Market Cap</span>
            <div className="font-medium">{item.marketCap}</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className={`px-2 py-1 rounded-full text-xs ${
            item.sentiment === 'Bullish' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
            item.sentiment === 'Bearish' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
          }`}>
            {item.sentiment}
          </div>
          <motion.button 
            className="btn-secondary px-3 py-1 text-xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Chart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const NewsCard = ({ news, index }) => (
    <motion.div
      className="glass-card p-6 cursor-pointer group"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
      onClick={() => setSelectedNews(news)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs ${
            news.category === 'Oil & Gas' ? 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300' :
            news.category === 'Cryptocurrency' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
          }`}>
            {news.category}
          </span>
          <span className="text-xs text-muted-foreground">{news.readTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{news.timestamp}</span>
        </div>
      </div>

      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {news.title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {news.summary}
      </p>

      {/* Market Impact Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium">Market Impact</span>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${
              news.impact.direction === 'positive' ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className="text-xs font-medium">{news.impact.score}/10</span>
          </div>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <motion.div 
            className={`h-2 rounded-full ${
              news.impact.direction === 'positive' ? 'bg-green-500' : 'bg-red-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${news.impact.score * 10}%` }}
            transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Source:</span>
          <span className="text-xs font-medium">{news.source}</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button 
            className="p-1 hover:bg-secondary rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bookmark className="w-4 h-4" />
          </motion.button>
          <motion.button 
            className="p-1 hover:bg-secondary rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const ToolCard = ({ tool, index }) => (
    <motion.div
      className="glass-card p-6 group cursor-pointer"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center text-white`}>
          <tool.icon className="w-6 h-6" />
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-primary">{tool.accuracy}</div>
          <div className="text-xs text-muted-foreground">Accuracy</div>
        </div>
      </div>

      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {tool.name}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4">
        {tool.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Eye className="w-3 h-3" />
          {tool.users} users
        </div>
        <motion.button 
          className="btn-primary px-4 py-2 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Launch Tool
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <motion.div 
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Market Data Center
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time market data with AI-powered analysis and professional tools
          </p>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            onClick={refreshData}
            className="glass-card p-3 hover:bg-primary/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={refreshing}
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
          </motion.button>
          
          <div className="glass-card p-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Live Data</span>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Navigation Tabs */}
      <motion.div 
        className="glass-card p-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Market Overview', icon: Globe },
            { id: 'energy', label: 'Energy Markets', icon: Fuel },
            { id: 'crypto', label: 'Cryptocurrency', icon: DollarSign },
            { id: 'tools', label: 'Professional Tools', icon: Settings },
            { id: 'news', label: 'Market News', icon: Newspaper }
          ].map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Market Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Market Cap', value: MARKET_DATA.overview.marketCap, change: MARKET_DATA.overview.marketCapChange, icon: Globe },
                { label: '24h Volume', value: MARKET_DATA.overview.volume24h, change: MARKET_DATA.overview.volumeChange, icon: BarChart3 },
                { label: 'Fear & Greed Index', value: MARKET_DATA.overview.fearGreedIndex, label2: MARKET_DATA.overview.fearGreedLabel, icon: Brain },
                { label: 'BTC Dominance', value: `${MARKET_DATA.overview.dominance.btc}%`, change: 0.8, icon: TrendingUp }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                    {stat.change && (
                      <div className={`flex items-center gap-1 text-sm ${
                        stat.change > 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {stat.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(stat.change)}%
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  {stat.label2 && <div className="text-xs text-primary font-medium">{stat.label2}</div>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'energy' && (
          <motion.div
            key="energy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {MARKET_DATA.energy.map((item, index) => (
              <MarketCard key={item.symbol} item={item} index={index} />
            ))}
          </motion.div>
        )}

        {activeTab === 'crypto' && (
          <motion.div
            key="crypto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {MARKET_DATA.crypto.map((item, index) => (
              <MarketCard key={item.symbol} item={item} index={index} />
            ))}
          </motion.div>
        )}

        {activeTab === 'tools' && (
          <motion.div
            key="tools"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Professional Trading Tools</h2>
              <p className="text-muted-foreground">Advanced analytics and trading tools for professional traders</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROFESSIONAL_TOOLS.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'news' && (
          <motion.div
            key="news"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* News Filters */}
            <div className="glass-card p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search market news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="glass-input pl-10 pr-4 py-3 w-full"
                  />
                </div>
                <div className="flex gap-2">
                  {['all', 'cryptocurrency', 'oil & gas', 'natural gas'].map((filter) => (
                    <motion.button
                      key={filter}
                      onClick={() => setNewsFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        newsFilter === filter 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredNews.map((news, index) => (
                <NewsCard key={news.id} news={news} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              className="glass-card w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      selectedNews.category === 'Oil & Gas' ? 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300' :
                      selectedNews.category === 'Cryptocurrency' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {selectedNews.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{selectedNews.timestamp}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedNews(null)}
                    className="p-2 hover:bg-secondary rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h1 className="text-2xl font-bold text-foreground mb-4">{selectedNews.title}</h1>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">{selectedNews.summary}</p>

                {/* Market Impact Analysis */}
                <div className="glass-card p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    AI Market Impact Analysis
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Impact Score</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-secondary rounded-full h-3">
                          <motion.div 
                            className={`h-3 rounded-full ${
                              selectedNews.impact.direction === 'positive' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedNews.impact.score * 10}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                        <span className="font-bold">{selectedNews.impact.score}/10</span>
                      </div>
                    </div>

                    <div>
                      <span className="font-medium">Affected Markets:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedNews.impact.markets.map((market, index) => (
                          <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {market}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-medium">AI Analysis:</span>
                      <p className="text-muted-foreground mt-1">{selectedNews.impact.analysis}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Source: {selectedNews.source}</span>
                    <span className="text-sm text-muted-foreground">Read time: {selectedNews.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button 
                      className="btn-secondary px-4 py-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Article
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketDataSection;

