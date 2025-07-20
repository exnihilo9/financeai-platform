import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  TrendingDown,
  Activity, 
  BarChart3, 
  LineChart,
  PieChart,
  Cpu,
  Rocket,
  Shield,
  Eye,
  Clock,
  Users,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Fuel,
  Droplets,
  Flame,
  Bitcoin,
  DollarSign
} from 'lucide-react';

const AIPredictionsSection = () => {
  const [activeModel, setActiveModel] = useState('all');
  const [timeframe, setTimeframe] = useState('1d');

  const predictionModels = [
    {
      id: 'quantum-predictor',
      name: 'Quantum Predictor Pro',
      icon: Zap,
      accuracy: '97.8%',
      specialty: 'Oil & Gas Markets',
      description: 'Advanced quantum computing algorithms for energy market predictions',
      users: '45.2K',
      predictions: '2.3M',
      uptime: '99.9%',
      features: ['Quantum Computing', 'Real-time Analysis', 'Multi-asset Prediction', 'Risk Assessment'],
      color: 'text-purple-500',
      status: 'Active',
      lastUpdate: '2 min ago'
    },
    {
      id: 'neural-elite',
      name: 'Neural Network Elite',
      icon: Brain,
      accuracy: '95.4%',
      specialty: 'Cryptocurrency',
      description: 'Deep learning neural networks for cryptocurrency market analysis',
      users: '78.9K',
      predictions: '5.7M',
      uptime: '99.7%',
      features: ['Deep Learning', 'Pattern Recognition', 'Sentiment Analysis', 'Volume Prediction'],
      color: 'text-blue-500',
      status: 'Active',
      lastUpdate: '1 min ago'
    },
    {
      id: 'ensemble-master',
      name: 'Ensemble Master AI',
      icon: Target,
      accuracy: '93.7%',
      specialty: 'Petroleum Markets',
      description: 'Ensemble learning methods for petroleum and refined products',
      users: '32.4K',
      predictions: '1.8M',
      uptime: '99.8%',
      features: ['Ensemble Learning', 'Market Correlation', 'Supply Chain Analysis', 'Price Forecasting'],
      color: 'text-orange-500',
      status: 'Active',
      lastUpdate: '3 min ago'
    },
    {
      id: 'transformer-pro',
      name: 'Transformer AI Pro',
      icon: Rocket,
      accuracy: '96.2%',
      specialty: 'Energy Sector',
      description: 'Transformer architecture for comprehensive energy sector analysis',
      users: '56.7K',
      predictions: '3.4M',
      uptime: '99.6%',
      features: ['Transformer Models', 'Attention Mechanisms', 'Long-term Forecasting', 'Cross-market Analysis'],
      color: 'text-green-500',
      status: 'Active',
      lastUpdate: '1 min ago'
    },
    {
      id: 'reinforcement-ai',
      name: 'Reinforcement Learning AI',
      icon: Shield,
      accuracy: '94.8%',
      specialty: 'Natural Gas',
      description: 'Reinforcement learning for natural gas market optimization',
      users: '41.3K',
      predictions: '2.1M',
      uptime: '99.5%',
      features: ['Reinforcement Learning', 'Strategy Optimization', 'Risk Management', 'Adaptive Learning'],
      color: 'text-indigo-500',
      status: 'Active',
      lastUpdate: '4 min ago'
    },
    {
      id: 'vision-ai',
      name: 'Computer Vision AI',
      icon: Eye,
      accuracy: '92.3%',
      specialty: 'Market Sentiment',
      description: 'Computer vision for market sentiment analysis from visual data',
      users: '29.8K',
      predictions: '1.5M',
      uptime: '99.4%',
      features: ['Computer Vision', 'Sentiment Analysis', 'News Processing', 'Social Media Analysis'],
      color: 'text-pink-500',
      status: 'Active',
      lastUpdate: '5 min ago'
    }
  ];

  const marketPredictions = [
    {
      asset: 'WTI Crude Oil',
      icon: Fuel,
      current: '$78.45',
      prediction: '$82.30',
      change: '+4.9%',
      confidence: '94.2%',
      timeframe: '7 days',
      trend: 'bullish',
      factors: ['Supply constraints', 'Geopolitical tensions', 'Demand recovery']
    },
    {
      asset: 'Brent Crude Oil',
      icon: Droplets,
      current: '$82.67',
      prediction: '$86.15',
      change: '+4.2%',
      confidence: '91.8%',
      timeframe: '7 days',
      trend: 'bullish',
      factors: ['OPEC+ decisions', 'Inventory levels', 'Economic growth']
    },
    {
      asset: 'Natural Gas',
      icon: Flame,
      current: '$3.42',
      prediction: '$3.78',
      change: '+10.5%',
      confidence: '89.7%',
      timeframe: '7 days',
      trend: 'bullish',
      factors: ['Weather patterns', 'Storage levels', 'Export demand']
    },
    {
      asset: 'Bitcoin',
      icon: Bitcoin,
      current: '$43,250',
      prediction: '$46,800',
      change: '+8.2%',
      confidence: '87.3%',
      timeframe: '7 days',
      trend: 'bullish',
      factors: ['Institutional adoption', 'Regulatory clarity', 'Market sentiment']
    },
    {
      asset: 'Gasoline Futures',
      icon: DollarSign,
      current: '$2.34',
      prediction: '$2.41',
      change: '+3.0%',
      confidence: '92.5%',
      timeframe: '7 days',
      trend: 'bullish',
      factors: ['Refinery capacity', 'Seasonal demand', 'Crude oil prices']
    },
    {
      asset: 'Heating Oil',
      icon: Flame,
      current: '$2.89',
      prediction: '$2.76',
      change: '-4.5%',
      confidence: '88.9%',
      timeframe: '7 days',
      trend: 'bearish',
      factors: ['Mild weather', 'High inventories', 'Alternative heating']
    }
  ];

  const performanceMetrics = [
    { label: 'Total Predictions', value: '16.8M', change: '+2.3M', positive: true },
    { label: 'Average Accuracy', value: '94.7%', change: '+1.2%', positive: true },
    { label: 'Active Models', value: '47', change: '+5', positive: true },
    { label: 'Processing Speed', value: '0.3s', change: '-0.1s', positive: true }
  ];

  const filteredModels = activeModel === 'all' 
    ? predictionModels 
    : predictionModels.filter(model => 
        model.specialty.toLowerCase().includes(activeModel.toLowerCase())
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
            AI Predictions Center
          </h1>
          <p className="text-muted-foreground text-lg">
            Machine learning predictions with up to 97% accuracy for energy and financial markets
          </p>
        </div>
        <motion.div 
          className="text-right"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="text-3xl font-bold text-primary mb-1">
            94.7%
          </div>
          <div className="text-sm text-muted-foreground">
            Average Accuracy
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

      {/* Model Filters */}
      <motion.div 
        className="flex gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {[
          { id: 'all', label: 'All Models' },
          { id: 'oil', label: 'Oil & Gas' },
          { id: 'crypto', label: 'Cryptocurrency' },
          { id: 'energy', label: 'Energy Sector' }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveModel(filter.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeModel === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </motion.div>

      {/* AI Prediction Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model, index) => (
          <motion.div 
            key={model.id} 
            className="glass-card p-6 floating-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.8, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <model.icon className={`w-8 h-8 ${model.color}`} />
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{model.accuracy}</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2">{model.name}</h3>
            <div className="text-sm text-primary font-medium mb-2">{model.specialty}</div>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{model.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Users:</span>
                <span className="text-sm font-medium text-foreground">{model.users}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Predictions:</span>
                <span className="text-sm font-medium text-foreground">{model.predictions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Uptime:</span>
                <span className="text-sm font-medium text-green-500">{model.uptime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Update:</span>
                <span className="text-sm font-medium text-blue-500">{model.lastUpdate}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-muted-foreground mb-2">Key Features:</div>
              <div className="flex flex-wrap gap-1">
                {model.features.slice(0, 2).map((feature, idx) => (
                  <span key={idx} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="status-indicator"></div>
                <span className="text-xs text-muted-foreground">{model.status}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-muted-foreground">AI Powered</span>
              </div>
            </div>

            <button className="btn-primary w-full">Launch Model</button>
          </motion.div>
        ))}
      </div>

      {/* Market Predictions */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Live Market Predictions</h2>
          <div className="flex gap-2">
            {['1d', '7d', '30d'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                  timeframe === period
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketPredictions.map((prediction, index) => (
            <div key={index} className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <prediction.icon className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">{prediction.asset}</h3>
                    <div className="text-sm text-muted-foreground">{prediction.timeframe} forecast</div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  prediction.trend === 'bullish' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                }`}>
                  {prediction.trend === 'bullish' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current:</span>
                  <span className="text-sm font-medium text-foreground">{prediction.current}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Predicted:</span>
                  <span className="text-sm font-medium text-primary">{prediction.prediction}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Change:</span>
                  <span className={`text-sm font-medium ${
                    prediction.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>{prediction.change}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">{prediction.confidence} confidence</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <div className="mb-1">Key Factors:</div>
                <div className="flex flex-wrap gap-1">
                  {prediction.factors.slice(0, 2).map((factor, idx) => (
                    <span key={idx} className="bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Model Performance Chart */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-foreground mb-4">Model Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">16.8M</div>
            <div className="text-sm text-muted-foreground">Total Predictions Made</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">94.7%</div>
            <div className="text-sm text-muted-foreground">Average Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">0.3s</div>
            <div className="text-sm text-muted-foreground">Average Response Time</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIPredictionsSection;

