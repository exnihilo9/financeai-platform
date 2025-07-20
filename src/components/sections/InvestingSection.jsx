import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  PieChart, 
  BarChart3, 
  DollarSign, 
  Zap, 
  Shield, 
  Brain,
  Activity,
  Rocket,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Users,
  Award
} from 'lucide-react';

const InvestingSection = () => {
  const [activeStrategy, setActiveStrategy] = useState('all');

  const investmentStrategies = [
    {
      id: 'ai-growth',
      name: 'AI Growth Portfolio',
      icon: Brain,
      risk: 'Moderate',
      expectedReturn: '12.4%',
      minInvestment: '$1,000',
      description: 'AI-powered growth strategy focusing on emerging technologies and high-potential stocks',
      performance: '+18.7%',
      positive: true,
      users: '45.2K',
      accuracy: '94.3%',
      features: ['Machine Learning Analysis', 'Real-time Rebalancing', 'Risk Management', 'Tax Optimization'],
      color: 'text-blue-500'
    },
    {
      id: 'quantum-optimizer',
      name: 'Quantum Optimizer',
      icon: Zap,
      risk: 'High',
      expectedReturn: '15.8%',
      minInvestment: '$5,000',
      description: 'Advanced quantum computing algorithms for maximum portfolio optimization',
      performance: '+24.3%',
      positive: true,
      users: '23.8K',
      accuracy: '97.1%',
      features: ['Quantum Computing', 'Advanced Analytics', 'Multi-Asset Strategy', 'Dynamic Hedging'],
      color: 'text-purple-500'
    },
    {
      id: 'conservative-ai',
      name: 'Conservative AI Shield',
      icon: Shield,
      risk: 'Low',
      expectedReturn: '8.2%',
      minInvestment: '$500',
      description: 'Low-risk AI strategy with capital preservation and steady growth',
      performance: '+9.4%',
      positive: true,
      users: '67.5K',
      accuracy: '91.8%',
      features: ['Capital Protection', 'Dividend Focus', 'Low Volatility', 'Stable Returns'],
      color: 'text-green-500'
    },
    {
      id: 'sector-rotation',
      name: 'Smart Sector Rotation',
      icon: Activity,
      risk: 'Moderate',
      expectedReturn: '11.6%',
      minInvestment: '$2,500',
      description: 'AI-driven sector rotation strategy based on market cycles and trends',
      performance: '+14.2%',
      positive: true,
      users: '34.7K',
      accuracy: '89.5%',
      features: ['Sector Analysis', 'Cycle Prediction', 'Momentum Trading', 'Risk Rotation'],
      color: 'text-orange-500'
    },
    {
      id: 'esg-smart',
      name: 'ESG Smart Investing',
      icon: Star,
      risk: 'Moderate',
      expectedReturn: '10.3%',
      minInvestment: '$1,500',
      description: 'Sustainable investing with AI-powered ESG analysis and impact measurement',
      performance: '+12.8%',
      positive: true,
      users: '28.9K',
      accuracy: '88.7%',
      features: ['ESG Scoring', 'Impact Tracking', 'Sustainable Growth', 'Social Responsibility'],
      color: 'text-emerald-500'
    },
    {
      id: 'crypto-ai',
      name: 'Crypto AI Strategy',
      icon: Rocket,
      risk: 'High',
      expectedReturn: '22.5%',
      minInvestment: '$1,000',
      description: 'Advanced cryptocurrency investment strategy with AI-powered market analysis',
      performance: '+31.6%',
      positive: true,
      users: '19.3K',
      accuracy: '85.2%',
      features: ['DeFi Integration', 'Volatility Management', 'Yield Farming', 'Cross-chain Analysis'],
      color: 'text-indigo-500'
    }
  ];

  const marketInsights = [
    {
      title: 'Technology Sector Outlook',
      trend: 'Bullish',
      confidence: '92%',
      change: '+5.7%',
      positive: true,
      description: 'AI and cloud computing driving strong growth'
    },
    {
      title: 'Energy Transition',
      trend: 'Strong Buy',
      confidence: '88%',
      change: '+8.3%',
      positive: true,
      description: 'Renewable energy investments showing momentum'
    },
    {
      title: 'Healthcare Innovation',
      trend: 'Moderate Buy',
      confidence: '85%',
      change: '+3.2%',
      positive: true,
      description: 'Biotech and medical devices leading growth'
    },
    {
      title: 'Financial Services',
      trend: 'Hold',
      confidence: '76%',
      change: '-1.4%',
      positive: false,
      description: 'Mixed signals amid regulatory changes'
    }
  ];

  const performanceMetrics = [
    { label: 'Total AUM', value: '$2.4B', change: '+12.3%', positive: true },
    { label: 'Active Strategies', value: '47', change: '+5', positive: true },
    { label: 'Avg. Performance', value: '14.2%', change: '+2.1%', positive: true },
    { label: 'Client Satisfaction', value: '96.8%', change: '+1.2%', positive: true }
  ];

  const filteredStrategies = activeStrategy === 'all' 
    ? investmentStrategies 
    : investmentStrategies.filter(strategy => 
        activeStrategy === 'low' ? strategy.risk === 'Low' :
        activeStrategy === 'moderate' ? strategy.risk === 'Moderate' :
        activeStrategy === 'high' ? strategy.risk === 'High' : true
      );

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
            Smart Investment Strategies
          </h1>
          <p className="text-muted-foreground text-lg">
            AI-powered investment strategies with advanced portfolio optimization
          </p>
        </div>
        <motion.div 
          className="text-right"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="text-3xl font-bold text-primary mb-1">
            $2.4B
          </div>
          <div className="text-sm text-muted-foreground">
            Assets Under Management
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

      {/* Strategy Filters */}
      <motion.div 
        className="flex gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {[
          { id: 'all', label: 'All Strategies' },
          { id: 'low', label: 'Low Risk' },
          { id: 'moderate', label: 'Moderate Risk' },
          { id: 'high', label: 'High Risk' }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveStrategy(filter.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeStrategy === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </motion.div>

      {/* Investment Strategies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStrategies.map((strategy, index) => (
          <motion.div 
            key={strategy.id} 
            className="glass-card p-6 floating-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.8, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <strategy.icon className={`w-8 h-8 ${strategy.color}`} />
              <div className="text-right">
                <div className={`text-lg font-bold ${strategy.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {strategy.performance}
                </div>
                <div className="text-xs text-muted-foreground">12M Performance</div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2">{strategy.name}</h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{strategy.description}</p>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Risk Level:</span>
                <span className={`text-sm font-medium ${
                  strategy.risk === 'Low' ? 'text-green-500' :
                  strategy.risk === 'Moderate' ? 'text-yellow-500' :
                  'text-red-500'
                }`}>{strategy.risk}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Expected Return:</span>
                <span className="text-sm font-medium text-primary">{strategy.expectedReturn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Min Investment:</span>
                <span className="text-sm font-medium text-foreground">{strategy.minInvestment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">AI Accuracy:</span>
                <span className="text-sm font-medium text-blue-500">{strategy.accuracy}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-muted-foreground mb-2">Key Features:</div>
              <div className="flex flex-wrap gap-1">
                {strategy.features.slice(0, 2).map((feature, idx) => (
                  <span key={idx} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{strategy.users} investors</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-muted-foreground">AI Powered</span>
              </div>
            </div>

            <button className="btn-primary w-full">Invest Now</button>
          </motion.div>
        ))}
      </div>

      {/* Market Insights */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-foreground">AI Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketInsights.map((insight, index) => (
            <div key={index} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{insight.title}</h3>
                <div className={`text-xs px-2 py-1 rounded ${
                  insight.trend === 'Bullish' || insight.trend === 'Strong Buy' ? 'bg-green-500/20 text-green-500' :
                  insight.trend === 'Moderate Buy' ? 'bg-blue-500/20 text-blue-500' :
                  'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {insight.trend}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">{insight.confidence} confidence</span>
                </div>
                <div className={`text-sm font-medium ${insight.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {insight.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default InvestingSection;

