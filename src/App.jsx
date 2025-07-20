import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  CreditCard, 
  TrendingUp, 
  ArrowUpDown, 
  ShoppingCart, 
  LineChart, 
  Brain, 
  PieChart, 
  Cpu, 
  Settings, 
  HelpCircle,
  Search,
  Bell,
  User,
  Moon,
  Sun,
  Menu,
  X,
  Target,
  Shield,
  Activity,
  Zap,
  Rocket,
  DollarSign,
  AlertTriangle,
  Eye
} from 'lucide-react';

// Import all sections
import BankingSection from './components/sections/BankingSection';
import ExchangeSection from './components/sections/ExchangeSection';
import MarketplaceSection from './components/sections/MarketplaceSection';
import MarketDataSection from './components/sections/MarketDataSection';
import AIFeaturesSection from './components/sections/AIFeaturesSection';
import InvestingSection from './components/sections/InvestingSection';
import AIPredictionsSection from './components/sections/AIPredictionsSection';
import PortfolioSection from './components/sections/PortfolioSection';
import SettingsSection from './components/sections/SettingsSection';
import SupportSection from './components/sections/SupportSection';

import './App.css';

const FinanceAI = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Optimized loading with much faster timing
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Reduced to 500ms for faster loading
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply theme to document with smooth transitions
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const navigationItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: BarChart3, 
      color: 'text-blue-500',
      description: 'Portfolio overview and analytics'
    },
    { 
      id: 'banking', 
      label: 'Banking', 
      icon: CreditCard, 
      color: 'text-green-500',
      description: 'Professional banking services'
    },
    { 
      id: 'investing', 
      label: 'Investing', 
      icon: TrendingUp, 
      color: 'text-purple-500',
      description: 'Smart investment strategies'
    },
    { 
      id: 'exchange', 
      label: 'Exchange', 
      icon: ArrowUpDown, 
      color: 'text-orange-500',
      description: 'Cryptocurrency trading'
    },
    { 
      id: 'marketplace', 
      label: 'P2P Market', 
      icon: ShoppingCart, 
      color: 'text-pink-500',
      description: 'Peer-to-peer marketplace'
    },
    { 
      id: 'market-data', 
      label: 'Market Data', 
      icon: LineChart, 
      color: 'text-indigo-500',
      description: 'Real-time market analytics'
    },
    { 
      id: 'ai-predictions', 
      label: 'AI Predictions', 
      icon: Brain, 
      color: 'text-cyan-500',
      description: 'Machine learning predictions'
    },
    { 
      id: 'portfolio', 
      label: 'Portfolio', 
      icon: PieChart, 
      color: 'text-red-500',
      description: 'Portfolio management'
    },
    { 
      id: 'ai-features', 
      label: 'AI Features', 
      icon: Cpu, 
      color: 'text-emerald-500',
      description: 'Advanced AI tools'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      color: 'text-gray-500',
      description: 'Account settings'
    },
    { 
      id: 'support', 
      label: 'Support', 
      icon: HelpCircle, 
      color: 'text-yellow-500',
      description: 'Professional support'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gpu-accelerated">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-6"></div>
          <motion.h2 
            className="text-3xl font-bold text-foreground mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }} // Reduced delay and duration
          >
            FinanceAI
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }} // Reduced delay and duration
          >
            Loading your financial command center...
          </motion.p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back to your financial command center
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your wealth with AI-powered precision
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-1">
            $284,567.89
          </div>
          <div className="text-sm text-green-500 flex items-center gap-2 justify-end">
            <TrendingUp className="w-4 h-4" />
            +4.56% today
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Banking', icon: CreditCard, section: 'banking', color: 'text-blue-500' },
            { name: 'Exchange', icon: ArrowUpDown, section: 'exchange', color: 'text-purple-500' },
            { name: 'AI Predictions', icon: Brain, section: 'ai-predictions', color: 'text-emerald-500' },
            { name: 'Portfolio', icon: PieChart, section: 'portfolio', color: 'text-orange-500' },
            { name: 'Market Data', icon: BarChart3, section: 'market-data', color: 'text-red-500' },
            { name: 'AI Features', icon: Zap, section: 'ai-features', color: 'text-cyan-500' }
          ].map((action) => (
            <button
              key={action.section}
              onClick={() => setActiveSection(action.section)}
              className="glass-card p-4 text-center hover:scale-105 transition-all duration-300"
            >
              <action.icon className={`w-8 h-8 ${action.color} mx-auto mb-2`} />
              <h3 className="font-semibold text-foreground text-sm">{action.name}</h3>
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Tools */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Dashboard Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Portfolio Optimizer Pro', icon: Target, accuracy: '98.4%', users: '67K+', color: 'text-blue-500' },
            { name: 'Advanced Risk Analyzer', icon: Shield, accuracy: '97.1%', users: '89K+', color: 'text-green-500' },
            { name: 'AI Market Predictor', icon: Brain, accuracy: '95.7%', users: '123K+', color: 'text-purple-500' },
            { name: 'Performance Analytics', icon: Activity, accuracy: '96.8%', users: '45K+', color: 'text-orange-500' },
            { name: 'Smart Rebalancer', icon: Zap, accuracy: '95.9%', users: '78K+', color: 'text-pink-500' },
            { name: 'AI Market Scanner', icon: Rocket, accuracy: '98.7%', users: '156K+', color: 'text-indigo-500' }
          ].map((tool, index) => (
            <div key={index} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <tool.icon className={`w-8 h-8 ${tool.color}`} />
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{tool.accuracy}</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{tool.name}</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <div className="text-xs text-muted-foreground">{tool.users} users</div>
              </div>
              <button className="btn-primary w-full">Launch Tool</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'banking':
        return <BankingSection />;
      case 'exchange':
        return <ExchangeSection />;
      case 'investing':
        return <InvestingSection />;
      case 'marketplace':
        return <MarketplaceSection />;
      case 'market-data':
        return <MarketDataSection />;
      case 'ai-predictions':
        return <AIPredictionsSection />;
      case 'portfolio':
        return <PortfolioSection />;
      case 'ai-features':
        return <AIFeaturesSection />;
      case 'settings':
        return <SettingsSection />;
      case 'support':
        return <SupportSection />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Mobile Overlay */}
      {isMobile && (
        <div 
          className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Professional Sidebar */}
      <motion.div 
        className={`glass-sidebar ${
          isMobile 
            ? (isMobileMenuOpen ? 'mobile-open' : '') 
            : (isSidebarOpen ? '' : 'collapsed')
        } p-6 flex flex-col`}
        initial={{ x: isMobile ? -100 : -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo Section */}
        <div className="mb-8">
          <motion.h1 
            className={`text-2xl font-bold text-sidebar-foreground ${
              (!isSidebarOpen && !isMobile) && 'hidden'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            FinanceAI
          </motion.h1>
          <motion.p 
            className={`text-sm text-sidebar-foreground/70 ${
              (!isSidebarOpen && !isMobile) && 'hidden'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Professional Platform
          </motion.p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + 0.5 }}
              title={(!isSidebarOpen && !isMobile) ? item.label : ''}
            >
              <item.icon className={`nav-icon ${item.color}`} />
              {(isSidebarOpen || isMobile) && (
                <>
                  <span className="font-medium">{item.label}</span>
                  <span className="nav-badge">{index + 1}</span>
                </>
              )}
            </motion.button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col ${
        isMobile ? 'main-content' : 
        (isSidebarOpen ? 'main-content' : 'main-content sidebar-collapsed')
      }`}>
        {/* Professional Header */}
        <header className="glass-header p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Hamburger Menu for Mobile */}
            {isMobile ? (
              <button
                onClick={toggleSidebar}
                className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
                title="Toggle Menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            ) : (
              <button
                onClick={toggleSidebar}
                className="theme-toggle"
                title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
            
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search anything..."
                className="glass-input pl-10 pr-4 py-2 w-80"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="theme-toggle relative" title="Notifications">
              <Bell className="w-5 h-5" />
              <div className="notification-badge"></div>
            </button>
            
            <button 
              onClick={toggleTheme}
              className="theme-toggle"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </button>
            
            <button className="theme-toggle" title="Profile">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// Performance optimizations
const MemoizedNavItem = React.memo(({ item, index, activeSection, handleSectionChange, isSidebarOpen, isMobile }) => (
  <motion.button
    key={item.id}
    onClick={() => handleSectionChange(item.id)}
    className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 + 0.5 }}
    title={(!isSidebarOpen && !isMobile) ? item.label : ''}
  >
    <item.icon className={`nav-icon ${item.color}`} />
    {(isSidebarOpen || isMobile) && (
      <>
        <span className="font-medium">{item.label}</span>
        <span className="nav-badge">{index + 1}</span>
      </>
    )}
  </motion.button>
));

const MemoizedDashboardCard = React.memo(({ tool, index }) => (
  <motion.div 
    key={index} 
    className="glass-card p-6 floating-card gpu-accelerated"
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      delay: index * 0.1 + 0.5, 
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 15
    }}
    whileHover={{ 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center justify-between mb-4">
      <motion.div
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <tool.icon className={`w-8 h-8 ${tool.color}`} />
      </motion.div>
      <div className="text-right">
        <motion.div 
          className="text-2xl font-bold text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.8 }}
        >
          {tool.accuracy}
        </motion.div>
        <div className="text-xs text-muted-foreground">Accuracy</div>
      </div>
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{tool.name}</h3>
    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{tool.description}</p>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <motion.div 
          className="status-indicator pulse-animation"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        ></motion.div>
        <span className="text-xs text-muted-foreground">{tool.status}</span>
      </div>
      <motion.div 
        className="text-xs text-muted-foreground"
        whileHover={{ scale: 1.05 }}
      >
        {tool.users} users
      </motion.div>
    </div>
    <motion.button 
      className="btn-primary w-full"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      Launch Tool
    </motion.button>
  </motion.div>
));

// Export the main component with React.memo for performance
export default React.memo(FinanceAI);

