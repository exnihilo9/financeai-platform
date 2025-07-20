import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Shield, 
  Clock, 
  DollarSign,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  Award,
  Verified,
  Package,
  Truck,
  Bot,
  Lock,
  AlertTriangle,
  CheckCircle,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  UserCheck,
  ShieldCheck,
  Zap,
  Activity,
  Bell,
  X
} from 'lucide-react';

const MARKETPLACE_CATEGORIES = [
  { id: 'crypto', name: 'Cryptocurrency', icon: '₿', color: 'from-orange-500 to-yellow-500', count: 1247 },
  { id: 'gold', name: 'Gold & Precious Metals', icon: '🥇', color: 'from-yellow-500 to-amber-500', count: 892 },
  { id: 'oil-gas', name: 'Oil & Gas', icon: '⛽', color: 'from-slate-600 to-slate-700', count: 456 },
  { id: 'watches', name: 'Luxury Watches', icon: '⌚', color: 'from-blue-500 to-indigo-500', count: 634 },
  { id: 'real-estate', name: 'Real Estate', icon: '🏠', color: 'from-emerald-500 to-teal-500', count: 289 },
  { id: 'art', name: 'Art & Collectibles', icon: '🎨', color: 'from-purple-500 to-pink-500', count: 567 }
];

const FEATURED_PRODUCTS = [
  {
    id: 1,
    title: 'Bitcoin Mining Rig - Antminer S19 Pro',
    price: 12500,
    category: 'crypto',
    seller: {
      name: 'CryptoMiner Pro',
      rating: 4.8,
      verified: true,
      location: 'Austin, TX',
      fraudScore: 98.5,
      trustLevel: 'Excellent'
    },
    image: '/api/placeholder/300/200',
    views: 2847,
    likes: 156,
    description: 'Professional Bitcoin mining rig with 110 TH/s hashrate. Excellent condition, includes power supply.',
    tags: ['Mining', 'Bitcoin', 'ASIC', 'Professional'],
    shipping: 'Free shipping',
    condition: 'Like New',
    aiVerified: true,
    riskLevel: 'Low'
  },
  {
    id: 2,
    title: 'American Eagle Gold Coin 1oz',
    price: 2150,
    category: 'gold',
    seller: {
      name: 'PreciousMetals LLC',
      rating: 4.9,
      verified: true,
      location: 'New York, NY',
      fraudScore: 99.2,
      trustLevel: 'Excellent'
    },
    image: '/api/placeholder/300/200',
    views: 1923,
    likes: 89,
    description: 'Certified 1oz American Eagle Gold Coin, 2024 mint. Perfect condition with certificate of authenticity.',
    tags: ['Gold', 'Coin', 'Investment', 'Certified'],
    shipping: 'Insured shipping',
    condition: 'Mint',
    aiVerified: true,
    riskLevel: 'Low'
  },
  {
    id: 3,
    title: 'Oil Drilling Equipment Package',
    price: 85000,
    category: 'oil-gas',
    seller: {
      name: 'Energy Solutions',
      rating: 4.7,
      verified: true,
      location: 'Houston, TX',
      fraudScore: 96.8,
      trustLevel: 'Very Good'
    },
    image: '/api/placeholder/300/200',
    views: 567,
    likes: 34,
    description: 'Complete oil drilling equipment package including pumps, pipes, and safety equipment.',
    tags: ['Oil', 'Drilling', 'Industrial', 'Complete Set'],
    shipping: 'Freight shipping',
    condition: 'Good',
    aiVerified: true,
    riskLevel: 'Low'
  },
  {
    id: 4,
    title: 'Rolex Submariner Date - 126610LN',
    price: 13500,
    category: 'watches',
    seller: {
      name: 'Luxury Timepieces',
      rating: 4.9,
      verified: true,
      location: 'Beverly Hills, CA',
      fraudScore: 97.3,
      trustLevel: 'Excellent'
    },
    image: '/api/placeholder/300/200',
    views: 1456,
    likes: 78,
    description: 'Authentic Rolex Submariner with box and papers. Purchased 2023, excellent condition.',
    tags: ['Rolex', 'Luxury', 'Investment', 'Authentic'],
    shipping: 'Insured shipping',
    condition: 'Excellent',
    aiVerified: true,
    riskLevel: 'Low'
  }
];

const AI_FRAUD_ALERTS = [
  {
    id: 1,
    type: 'warning',
    title: 'Suspicious Price Alert',
    message: 'Item priced 40% below market average. Verify authenticity.',
    confidence: 85,
    timestamp: '2 minutes ago'
  },
  {
    id: 2,
    type: 'info',
    title: 'Seller Verification Complete',
    message: 'AI has verified seller credentials and transaction history.',
    confidence: 98,
    timestamp: '5 minutes ago'
  }
];

const MarketplaceSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showFraudDetection, setShowFraudDetection] = useState(false);
  const [fraudAlerts, setFraudAlerts] = useState(AI_FRAUD_ALERTS);
  const [isTyping, setIsTyping] = useState(false);

  // Simulate real-time fraud detection
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert = {
          id: Date.now(),
          type: Math.random() > 0.5 ? 'info' : 'warning',
          title: 'AI Security Scan Complete',
          message: 'All current listings verified. No suspicious activity detected.',
          confidence: Math.floor(Math.random() * 20) + 80,
          timestamp: 'Just now'
        };
        setFraudAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate seller response
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        text: "Thanks for your interest! I'm available to answer any questions about this item.",
        sender: 'seller',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 2000);
  };

  const ProductCard = ({ product, index }) => (
    <motion.div
      className="glass-card p-6 group cursor-pointer"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      onClick={() => setSelectedProduct(product)}
    >
      {/* AI Verification Badge */}
      {product.aiVerified && (
        <motion.div 
          className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          <Bot className="w-3 h-3" />
          AI Verified
        </motion.div>
      )}

      {/* Risk Level Indicator */}
      <motion.div 
        className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs ${
          product.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
          product.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        {product.riskLevel} Risk
      </motion.div>

      {/* Product Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center">
          <Package className="w-16 h-16 text-slate-400" />
        </div>
        
        {/* Hover Actions */}
        <motion.div 
          className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.button 
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button 
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button 
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowChat(true);
            }}
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Eye className="w-4 h-4" />
            {product.views}
          </div>
        </div>

        {/* Seller Info with Fraud Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {product.seller.verified && <Verified className="w-4 h-4 text-blue-500" />}
              <span className="text-sm font-medium">{product.seller.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm">{product.seller.rating}</span>
            </div>
          </div>
          
          {/* Trust Score */}
          <div className="flex items-center gap-1 text-xs">
            <Shield className="w-3 h-3 text-green-500" />
            <span className="text-green-600 font-medium">{product.seller.fraudScore}%</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 3).map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <motion.button 
            className="btn-primary flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Details
          </motion.button>
          <motion.button 
            className="btn-secondary px-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowChat(true);
            }}
          >
            <MessageCircle className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Enhanced Header with AI Fraud Detection */}
      <motion.div 
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            P2P Marketplace
          </h1>
          <p className="text-muted-foreground text-lg">
            Secure peer-to-peer trading with AI-powered fraud protection
          </p>
        </div>

        {/* AI Fraud Detection Panel */}
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className="glass-card p-4 flex items-center gap-3 hover:bg-green-500/10 transition-colors"
            onClick={() => setShowFraudDetection(!showFraudDetection)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <Bot className="w-6 h-6 text-green-500" />
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="text-left">
              <div className="font-semibold text-sm">AI Guardian</div>
              <div className="text-xs text-muted-foreground">Active Protection</div>
            </div>
          </motion.button>

          <div className="glass-card p-4 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
            <div>
              <div className="font-semibold text-sm">98.7% Safe</div>
              <div className="text-xs text-muted-foreground">Trust Score</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* AI Fraud Detection Panel */}
      <AnimatePresence>
        {showFraudDetection && (
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Bot className="w-5 h-5 text-green-500" />
                AI Fraud Detection System
              </h3>
              <button 
                onClick={() => setShowFraudDetection(false)}
                className="p-1 hover:bg-secondary rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Real-time Scanning</span>
                </div>
                <div className="text-2xl font-bold text-blue-500">2,847</div>
                <div className="text-sm text-muted-foreground">Items scanned today</div>
              </div>

              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">Threats Blocked</span>
                </div>
                <div className="text-2xl font-bold text-yellow-500">23</div>
                <div className="text-sm text-muted-foreground">Suspicious listings</div>
              </div>

              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Verified Safe</span>
                </div>
                <div className="text-2xl font-bold text-green-500">98.7%</div>
                <div className="text-sm text-muted-foreground">Platform safety</div>
              </div>
            </div>

            {/* Recent Alerts */}
            <div>
              <h4 className="font-medium mb-3">Recent AI Alerts</h4>
              <div className="space-y-2">
                {fraudAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.type === 'warning' 
                        ? 'bg-yellow-50 border-yellow-500 dark:bg-yellow-900/20' 
                        : 'bg-blue-50 border-blue-500 dark:bg-blue-900/20'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium text-sm">{alert.title}</div>
                        <div className="text-sm text-muted-foreground">{alert.message}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{alert.timestamp}</div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="text-xs">Confidence:</div>
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <motion.div 
                          className="bg-primary h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${alert.confidence}%` }}
                          transition={{ delay: 0.5, duration: 1 }}
                        />
                      </div>
                      <div className="text-xs font-medium">{alert.confidence}%</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Search and Filters */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search marketplace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input pl-10 pr-4 py-3 w-full"
            />
          </div>
          <motion.button 
            className="btn-secondary flex items-center gap-2 px-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced Categories */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {MARKETPLACE_CATEGORIES.map((category, index) => (
          <motion.button
            key={category.id}
            className={`glass-card p-4 text-center group transition-all ${
              activeCategory === category.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setActiveCategory(category.id)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform`}>
              {category.icon}
            </div>
            <h3 className="font-medium text-sm mb-1">{category.name}</h3>
            <p className="text-xs text-muted-foreground">{category.count} items</p>
          </motion.button>
        ))}
      </motion.div>

      {/* Enhanced Products Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {FEATURED_PRODUCTS.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </motion.div>

      {/* Secure Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowChat(false)}
          >
            <motion.div
              className="glass-card w-full max-w-md h-96 flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Secure Chat</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      End-to-end encrypted
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowChat(false)}
                  className="p-1 hover:bg-secondary rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Start a secure conversation</p>
                  </div>
                ) : (
                  chatMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className={`max-w-xs p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                      </div>
                    </motion.div>
                  ))
                )}
                
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-secondary p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <motion.div 
                          className="w-2 h-2 bg-muted-foreground rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-muted-foreground rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-muted-foreground rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-secondary rounded">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a secure message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 glass-input py-2"
                  />
                  <button className="p-2 hover:bg-secondary rounded">
                    <Smile className="w-4 h-4" />
                  </button>
                  <motion.button 
                    onClick={sendMessage}
                    className="btn-primary p-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketplaceSection;

