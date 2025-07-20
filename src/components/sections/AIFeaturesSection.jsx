import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  Zap, 
  Target, 
  Activity, 
  TrendingUp, 
  Shield, 
  Cpu,
  Bot,
  Eye,
  BarChart3,
  Lightbulb,
  Rocket,
  Star,
  CheckCircle,
  Play,
  Settings
} from 'lucide-react';

const AI_TOOLS = [
  {
    id: 'financial-advisor',
    name: 'AI Financial Advisor',
    description: '24/7 personal financial guidance with advanced machine learning',
    accuracy: 94,
    status: 'active',
    category: 'Advisory',
    features: [
      'Real-time portfolio analysis',
      'Personalized investment recommendations',
      'Risk assessment and management',
      'Market trend predictions',
      'Automated rebalancing suggestions'
    ],
    icon: Brain,
    color: 'from-blue-500 to-purple-500',
    usage: '2.4M queries/month',
    rating: 4.8
  },
  {
    id: 'quantum-optimizer',
    name: 'Quantum Portfolio Optimizer',
    description: 'Quantum computing-powered portfolio optimization',
    accuracy: 97,
    status: 'active',
    category: 'Optimization',
    features: [
      'Quantum algorithm processing',
      'Multi-dimensional optimization',
      'Advanced risk modeling',
      'Real-time market adaptation',
      'Institutional-grade performance'
    ],
    icon: Cpu,
    color: 'from-purple-500 to-pink-500',
    usage: '156K optimizations/month',
    rating: 4.9
  },
  {
    id: 'sentiment-engine',
    name: 'Sentiment Fusion Engine',
    description: 'Multi-source sentiment analysis with natural language processing',
    accuracy: 89,
    status: 'beta',
    category: 'Analysis',
    features: [
      'Social media sentiment tracking',
      'News article analysis',
      'Market sentiment scoring',
      'Emotion detection algorithms',
      'Real-time sentiment alerts'
    ],
    icon: Activity,
    color: 'from-emerald-500 to-teal-500',
    usage: '890K analyses/month',
    rating: 4.6
  },
  {
    id: 'predictive-analytics',
    name: 'Predictive Analytics Engine',
    description: 'Advanced machine learning for market predictions',
    accuracy: 91,
    status: 'active',
    category: 'Prediction',
    features: [
      'Time series forecasting',
      'Pattern recognition',
      'Anomaly detection',
      'Trend prediction',
      'Risk probability modeling'
    ],
    icon: TrendingUp,
    color: 'from-orange-500 to-red-500',
    usage: '1.8M predictions/month',
    rating: 4.7
  },
  {
    id: 'risk-guardian',
    name: 'AI Risk Guardian',
    description: 'Intelligent risk management and fraud detection',
    accuracy: 96,
    status: 'active',
    category: 'Security',
    features: [
      'Real-time fraud detection',
      'Behavioral analysis',
      'Transaction monitoring',
      'Risk scoring algorithms',
      'Automated security responses'
    ],
    icon: Shield,
    color: 'from-red-500 to-pink-500',
    usage: '5.2M scans/month',
    rating: 4.9
  },
  {
    id: 'market-intelligence',
    name: 'Market Intelligence AI',
    description: 'Comprehensive market analysis and insights',
    accuracy: 88,
    status: 'active',
    category: 'Intelligence',
    features: [
      'Market trend analysis',
      'Competitive intelligence',
      'Economic indicator tracking',
      'Sector performance analysis',
      'Investment opportunity identification'
    ],
    icon: Eye,
    color: 'from-cyan-500 to-blue-500',
    usage: '678K reports/month',
    rating: 4.5
  }
];

const PERFORMANCE_METRICS = {
  totalQueries: '12.4M',
  accuracy: '93.2%',
  uptime: '99.9%',
  responseTime: '0.3s',
  modelsActive: 47,
  dataPoints: '2.8B'
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

const AIFeaturesSection = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'Advisory', 'Optimization', 'Analysis', 'Prediction', 'Security', 'Intelligence'];
  
  const filteredTools = activeCategory === 'all' 
    ? AI_TOOLS 
    : AI_TOOLS.filter(tool => tool.category === activeCategory);

  const AIToolCard = ({ tool, index }) => {
    const Icon = tool.icon;
    
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        transition={{ delay: index * 0.1 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        {/* Background Gradient */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.color} opacity-10 rounded-full -translate-y-16 translate-x-16`} />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${tool.color} text-white`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{tool.name}</h3>
              <p className="text-sm text-muted-foreground">{tool.category}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              tool.status === 'active' 
                ? 'bg-emerald-500/20 text-emerald-500' 
                : 'bg-orange-500/20 text-orange-500'
            }`}>
              {tool.status.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>

        {/* Accuracy */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Accuracy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${tool.color} transition-all duration-1000`}
                style={{ width: `${tool.accuracy}%` }}
              />
            </div>
            <span className="text-sm font-bold text-foreground">{tool.accuracy}%</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 glass-card">
            <Star className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Rating</p>
            <p className="text-sm font-bold text-foreground">{tool.rating}</p>
          </div>
          <div className="text-center p-3 glass-card">
            <Activity className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Usage</p>
            <p className="text-sm font-bold text-foreground">{tool.usage.split('/')[0]}</p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Key Features</h4>
          <div className="space-y-1">
            {tool.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span className="text-xs text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedTool(tool)}
            className="flex-1 glass-button p-3 text-sm font-semibold"
          >
            <Play className="w-4 h-4 mr-2" />
            Launch Tool
          </button>
          <button className="p-3 glass-card hover:bg-accent/50 transition-colors">
            <Settings className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </motion.div>
    );
  };

  const PerformanceOverview = () => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="glass-card p-8 mb-8"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/20 text-primary">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">AI Performance Overview</h3>
          <p className="text-muted-foreground">Real-time metrics from our AI infrastructure</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {[
          { label: 'Total Queries', value: PERFORMANCE_METRICS.totalQueries, icon: Activity, color: 'text-blue-500' },
          { label: 'Avg Accuracy', value: PERFORMANCE_METRICS.accuracy, icon: Target, color: 'text-emerald-500' },
          { label: 'Uptime', value: PERFORMANCE_METRICS.uptime, icon: Shield, color: 'text-purple-500' },
          { label: 'Response Time', value: PERFORMANCE_METRICS.responseTime, icon: Zap, color: 'text-orange-500' },
          { label: 'Active Models', value: PERFORMANCE_METRICS.modelsActive, icon: Cpu, color: 'text-cyan-500' },
          { label: 'Data Points', value: PERFORMANCE_METRICS.dataPoints, icon: BarChart3, color: 'text-pink-500' }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <metric.icon className={`w-8 h-8 ${metric.color} mx-auto mb-2`} />
            <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
            <p className="text-xs text-muted-foreground">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const ToolModal = () => {
    if (!selectedTool) return null;
    
    const Icon = selectedTool.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedTool(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedTool.color} text-white`}>
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{selectedTool.name}</h2>
              <p className="text-muted-foreground">{selectedTool.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="glass-card p-4">
              <h4 className="font-semibold text-foreground mb-2">Accuracy Rate</h4>
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${selectedTool.color}`}
                    style={{ width: `${selectedTool.accuracy}%` }}
                  />
                </div>
                <span className="text-lg font-bold text-foreground">{selectedTool.accuracy}%</span>
              </div>
            </div>
            <div className="glass-card p-4">
              <h4 className="font-semibold text-foreground mb-2">Monthly Usage</h4>
              <p className="text-lg font-bold text-foreground">{selectedTool.usage}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-foreground mb-3">Complete Feature Set</h4>
            <div className="grid grid-cols-1 gap-2">
              {selectedTool.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 glass-card">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 glass-button p-4 text-lg font-semibold">
              <Rocket className="w-5 h-5 mr-2" />
              Launch {selectedTool.name}
            </button>
            <button 
              onClick={() => setSelectedTool(null)}
              className="px-6 py-4 glass-card hover:bg-accent/50 transition-colors text-foreground font-semibold"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 mb-4"
        >
          <Sparkles className="w-8 h-8 text-primary" />
          <h2 className="text-4xl font-bold text-gradient">AI Advanced Features</h2>
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Cutting-edge artificial intelligence tools powered by quantum computing and advanced machine learning
        </p>
      </div>

      {/* Performance Overview */}
      <PerformanceOverview />

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'glass-card hover:bg-accent/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            {category === 'all' ? 'All Tools' : category}
          </button>
        ))}
      </div>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, index) => (
          <AIToolCard key={tool.id} tool={tool} index={index} />
        ))}
      </div>

      {/* Innovation Showcase */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="glass-card p-8 text-center"
      >
        <Lightbulb className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-4">Innovation Pipeline</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our research team is continuously developing next-generation AI capabilities including 
          quantum neural networks, advanced natural language processing, and autonomous trading algorithms.
        </p>
        <div className="flex justify-center space-x-4">
          <div className="text-center">
            <Bot className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-foreground">Neural Networks</p>
          </div>
          <div className="text-center">
            <Cpu className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-foreground">Quantum Computing</p>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-foreground">Real-time Processing</p>
          </div>
        </div>
      </motion.div>

      {/* Tool Modal */}
      {selectedTool && <ToolModal />}
    </div>
  );
};

export default AIFeaturesSection;

