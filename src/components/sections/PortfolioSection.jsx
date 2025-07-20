import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  BarChart3, 
  Target, 
  Shield, 
  Zap,
  Activity,
  DollarSign,
  Percent,
  Calendar,
  Clock,
  Users,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Settings,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Minus
} from 'lucide-react';

const PortfolioSection = () => {
  const [activeView, setActiveView] = useState('overview');
  const [timeframe, setTimeframe] = useState('1m');

  const portfolioOverview = {
    totalValue: '$284,567.89',
    totalChange: '+4.56%',
    totalChangeValue: '+$12,456.78',
    dayChange: '+1.23%',
    dayChangeValue: '+$3,456.78',
    positive: true
  };

  const portfolioTools = [
    {
      id: 'rebalancer',
      name: 'Smart Rebalancer Pro',
      icon: Target,
      description: 'AI-powered portfolio rebalancing with tax optimization',
      status: 'Active',
      lastRun: '2 hours ago',
      nextRun: 'Tomorrow 9:00 AM',
      performance: '+2.3%',
      users: '34.5K',
      color: 'text-blue-500',
      features: ['Tax Loss Harvesting', 'Drift Monitoring', 'Auto-rebalancing', 'Risk Management']
    },
    {
      id: 'analyzer',
      name: 'Performance Analyzer',
      icon: BarChart3,
      description: 'Comprehensive portfolio performance analysis and reporting',
      status: 'Active',
      lastRun: '1 hour ago',
      nextRun: 'Daily at 6:00 AM',
      performance: '+1.8%',
      users: '45.2K',
      color: 'text-green-500',
      features: ['Performance Attribution', 'Benchmark Comparison', 'Risk Metrics', 'Custom Reports']
    },
    {
      id: 'optimizer',
      name: 'Risk Optimizer',
      icon: Shield,
      description: 'Advanced risk management and portfolio optimization',
      status: 'Active',
      lastRun: '30 min ago',
      nextRun: 'Every 4 hours',
      performance: '+3.1%',
      users: '28.7K',
      color: 'text-purple-500',
      features: ['VaR Calculation', 'Stress Testing', 'Correlation Analysis', 'Hedging Strategies']
    },
    {
      id: 'tracker',
      name: 'Asset Tracker Pro',
      icon: Activity,
      description: 'Real-time asset tracking with performance monitoring',
      status: 'Active',
      lastRun: 'Live',
      nextRun: 'Continuous',
      performance: '+2.7%',
      users: '52.1K',
      color: 'text-orange-500',
      features: ['Real-time Tracking', 'Price Alerts', 'Performance Metrics', 'Dividend Tracking']
    },
    {
      id: 'allocator',
      name: 'Smart Allocator',
      icon: PieChart,
      description: 'Intelligent asset allocation based on market conditions',
      status: 'Active',
      lastRun: '45 min ago',
      nextRun: 'Weekly on Monday',
      performance: '+4.2%',
      users: '37.8K',
      color: 'text-indigo-500',
      features: ['Dynamic Allocation', 'Market Timing', 'Sector Rotation', 'Factor Investing']
    },
    {
      id: 'monitor',
      name: 'Risk Monitor',
      icon: Eye,
      description: 'Continuous risk monitoring with real-time alerts',
      status: 'Active',
      lastRun: 'Live',
      nextRun: 'Continuous',
      performance: '+1.5%',
      users: '41.3K',
      color: 'text-red-500',
      features: ['Risk Alerts', 'Exposure Monitoring', 'Compliance Tracking', 'Stress Scenarios']
    }
  ];

  const holdings = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      allocation: '15.2%',
      value: '$43,254.32',
      shares: '245',
      price: '$176.54',
      change: '+2.34%',
      changeValue: '+$987.65',
      positive: true,
      sector: 'Technology'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      allocation: '12.8%',
      value: '$36,424.69',
      shares: '98',
      price: '$371.68',
      change: '+1.87%',
      changeValue: '+$667.23',
      positive: true,
      sector: 'Technology'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      allocation: '10.5%',
      value: '$29,879.63',
      shares: '215',
      price: '$139.02',
      change: '-0.45%',
      changeValue: '-$134.56',
      positive: false,
      sector: 'Technology'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      allocation: '8.7%',
      value: '$24,757.41',
      shares: '102',
      price: '$242.72',
      change: '+5.23%',
      changeValue: '+$1,234.78',
      positive: true,
      sector: 'Automotive'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      allocation: '7.3%',
      value: '$20,773.26',
      shares: '45',
      price: '$461.63',
      change: '+3.12%',
      changeValue: '+$629.45',
      positive: true,
      sector: 'Technology'
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      allocation: '6.2%',
      value: '$17,643.29',
      shares: '0.408',
      price: '$43,250.00',
      change: '+4.67%',
      changeValue: '+$786.23',
      positive: true,
      sector: 'Cryptocurrency'
    }
  ];

  const performanceMetrics = [
    { label: 'Total Return', value: '+18.7%', change: '+2.3%', positive: true },
    { label: 'Sharpe Ratio', value: '1.42', change: '+0.08', positive: true },
    { label: 'Max Drawdown', value: '-8.3%', change: '+1.2%', positive: true },
    { label: 'Beta', value: '0.87', change: '-0.05', positive: true }
  ];

  const riskMetrics = [
    { label: 'Portfolio Risk', value: 'Moderate', level: 6.8, color: 'text-yellow-500' },
    { label: 'Diversification', value: 'Good', level: 8.2, color: 'text-green-500' },
    { label: 'Volatility', value: 'Low', level: 4.3, color: 'text-blue-500' },
    { label: 'Correlation', value: 'Optimal', level: 7.5, color: 'text-purple-500' }
  ];

  const alerts = [
    {
      type: 'warning',
      icon: AlertTriangle,
      message: 'Technology sector allocation above target (45% vs 40%)',
      time: '2 hours ago',
      action: 'Rebalance'
    },
    {
      type: 'success',
      icon: CheckCircle,
      message: 'Portfolio rebalancing completed successfully',
      time: '1 day ago',
      action: 'View Report'
    },
    {
      type: 'info',
      icon: Eye,
      message: 'New dividend payment received from AAPL',
      time: '2 days ago',
      action: 'View Details'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Portfolio Management
          </h1>
          <p className="text-muted-foreground text-lg">
            Advanced portfolio tracking with risk analysis and rebalancing tools
          </p>
        </div>
        <motion.div 
          className="text-right"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-1">
            {portfolioOverview.totalValue}
          </div>
          <div className={`text-sm flex items-center gap-2 justify-end ${
            portfolioOverview.positive ? 'text-green-500' : 'text-red-500'
          }`}>
            {portfolioOverview.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {portfolioOverview.totalChange} ({portfolioOverview.totalChangeValue})
          </div>
        </motion.div>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="glass-card p-4">
            <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
            <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
            <div className={`text-xs flex items-center gap-1 ${
              metric.positive ? 'text-green-500' : 'text-red-500'
            }`}>
              {metric.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {metric.change}
            </div>
          </div>
        ))}
      </motion.div>

      {/* View Tabs */}
      <motion.div 
        className="flex gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'holdings', label: 'Holdings' },
          { id: 'tools', label: 'Management Tools' },
          { id: 'analytics', label: 'Analytics' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeView === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Content based on active view */}
      {activeView === 'overview' && (
        <div className="space-y-6">
          {/* Risk Metrics */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {riskMetrics.map((metric, index) => (
              <div key={index} className="glass-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                  <div className={`text-sm font-medium ${metric.color}`}>{metric.value}</div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${metric.color.replace('text-', 'bg-')}`}
                    style={{ width: `${(metric.level / 10) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{metric.level}/10</div>
              </div>
            ))}
          </motion.div>

          {/* Recent Alerts */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <alert.icon className={`w-5 h-5 ${
                      alert.type === 'warning' ? 'text-yellow-500' :
                      alert.type === 'success' ? 'text-green-500' :
                      'text-blue-500'
                    }`} />
                    <div>
                      <div className="text-sm font-medium text-foreground">{alert.message}</div>
                      <div className="text-xs text-muted-foreground">{alert.time}</div>
                    </div>
                  </div>
                  <button className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded">
                    {alert.action}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {activeView === 'holdings' && (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">Current Holdings</h3>
              <div className="flex gap-2">
                <button className="btn-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button className="btn-primary">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {holdings.map((holding, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-semibold text-foreground">{holding.symbol}</div>
                      <div className="text-sm text-muted-foreground">{holding.name}</div>
                    </div>
                    <div className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                      {holding.sector}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{holding.value}</div>
                    <div className="text-sm text-muted-foreground">{holding.allocation}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{holding.shares} shares</div>
                    <div className="text-sm text-foreground">{holding.price}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-medium ${holding.positive ? 'text-green-500' : 'text-red-500'}`}>
                      {holding.change}
                    </div>
                    <div className={`text-sm ${holding.positive ? 'text-green-500' : 'text-red-500'}`}>
                      {holding.changeValue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeView === 'tools' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioTools.map((tool, index) => (
            <motion.div 
              key={tool.id} 
              className="glass-card p-6 floating-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.8, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <tool.icon className={`w-8 h-8 ${tool.color}`} />
                <div className="text-right">
                  <div className="text-lg font-bold text-green-500">{tool.performance}</div>
                  <div className="text-xs text-muted-foreground">Performance</div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">{tool.name}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{tool.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className="text-sm font-medium text-green-500">{tool.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Run:</span>
                  <span className="text-sm font-medium text-foreground">{tool.lastRun}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Next Run:</span>
                  <span className="text-sm font-medium text-blue-500">{tool.nextRun}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-muted-foreground mb-2">Key Features:</div>
                <div className="flex flex-wrap gap-1">
                  {tool.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="status-indicator"></div>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{tool.users}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn-primary flex-1">Launch Tool</button>
                <button className="btn-secondary">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeView === 'analytics' && (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Portfolio Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">$284.5K</div>
                <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">+18.7%</div>
                <div className="text-sm text-muted-foreground">YTD Performance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">1.42</div>
                <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PortfolioSection;

