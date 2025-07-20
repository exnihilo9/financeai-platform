import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Book,
  Video,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Star,
  Send,
  Paperclip,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Zap,
  Shield,
  Headphones,
  Globe,
  FileText,
  PlayCircle
} from 'lucide-react';

const SupportSection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const supportChannels = [
    {
      id: 'live-chat',
      name: 'Live Chat',
      icon: MessageCircle,
      description: 'Get instant help from our support team',
      availability: '24/7',
      responseTime: '< 2 minutes',
      status: 'online',
      color: 'text-green-500'
    },
    {
      id: 'phone',
      name: 'Phone Support',
      icon: Phone,
      description: 'Speak directly with our experts',
      availability: 'Mon-Fri 9AM-6PM EST',
      responseTime: 'Immediate',
      status: 'available',
      color: 'text-blue-500'
    },
    {
      id: 'email',
      name: 'Email Support',
      icon: Mail,
      description: 'Send us a detailed message',
      availability: '24/7',
      responseTime: '< 4 hours',
      status: 'online',
      color: 'text-purple-500'
    },
    {
      id: 'priority',
      name: 'Priority Support',
      icon: Zap,
      description: 'Premium support for Pro users',
      availability: '24/7',
      responseTime: '< 30 minutes',
      status: 'premium',
      color: 'text-yellow-500'
    }
  ];

  const knowledgeBase = [
    {
      category: 'Getting Started',
      icon: Book,
      articles: [
        { title: 'Setting up your FinanceAI account', views: '12.5K', rating: 4.8 },
        { title: 'Understanding the dashboard', views: '8.3K', rating: 4.9 },
        { title: 'Making your first investment', views: '15.2K', rating: 4.7 },
        { title: 'Connecting your bank accounts', views: '9.8K', rating: 4.6 }
      ]
    },
    {
      category: 'AI Features',
      icon: Zap,
      articles: [
        { title: 'How AI predictions work', views: '18.7K', rating: 4.9 },
        { title: 'Understanding accuracy metrics', views: '11.4K', rating: 4.8 },
        { title: 'Customizing AI models', views: '7.2K', rating: 4.7 },
        { title: 'AI risk assessment guide', views: '13.6K', rating: 4.8 }
      ]
    },
    {
      category: 'Security',
      icon: Shield,
      articles: [
        { title: 'Two-factor authentication setup', views: '22.1K', rating: 4.9 },
        { title: 'Account security best practices', views: '16.8K', rating: 4.8 },
        { title: 'Understanding data encryption', views: '8.9K', rating: 4.7 },
        { title: 'Reporting suspicious activity', views: '5.3K', rating: 4.6 }
      ]
    }
  ];

  const faqs = [
    {
      question: 'How accurate are the AI predictions?',
      answer: 'Our AI models achieve an average accuracy of 94.7% across all predictions. Individual model accuracy ranges from 85% to 97.8%, with specific performance metrics available for each model in the AI Predictions section.'
    },
    {
      question: 'Is my financial data secure?',
      answer: 'Yes, we use bank-grade encryption (AES-256) and follow strict security protocols. All data is encrypted in transit and at rest, and we never store your banking credentials directly.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time from the Billing section in Settings. Your access will continue until the end of your current billing period.'
    },
    {
      question: 'How do I connect my bank account?',
      answer: 'Go to the Banking section and click "Add Account". We use secure, read-only connections through our banking partners to access your account information safely.'
    },
    {
      question: 'What markets do you support?',
      answer: 'We support major stock markets, cryptocurrency exchanges, commodities (oil, gas, precious metals), and forex markets. New markets are added regularly based on user demand.'
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started with FinanceAI',
      duration: '5:32',
      views: '45.2K',
      thumbnail: '/api/placeholder/300/200',
      description: 'Complete walkthrough of setting up your account and making your first investment'
    },
    {
      title: 'Understanding AI Predictions',
      duration: '8:15',
      views: '32.7K',
      thumbnail: '/api/placeholder/300/200',
      description: 'Deep dive into how our AI models work and how to interpret predictions'
    },
    {
      title: 'Portfolio Management Best Practices',
      duration: '12:45',
      views: '28.9K',
      thumbnail: '/api/placeholder/300/200',
      description: 'Learn how to optimize your portfolio using our advanced tools'
    }
  ];

  const supportStats = [
    { label: 'Average Response Time', value: '< 2 min', icon: Clock },
    { label: 'Customer Satisfaction', value: '98.5%', icon: Star },
    { label: 'Issues Resolved', value: '99.2%', icon: CheckCircle },
    { label: 'Support Agents', value: '24/7', icon: Users }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {supportStats.map((stat, index) => (
          <motion.div 
            key={index}
            className="glass-card p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
          >
            <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportChannels.map((channel, index) => (
          <motion.div 
            key={channel.id}
            className="glass-card p-6 floating-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.8, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <channel.icon className={`w-8 h-8 ${channel.color}`} />
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                channel.status === 'online' ? 'bg-green-500/20 text-green-500' :
                channel.status === 'available' ? 'bg-blue-500/20 text-blue-500' :
                'bg-yellow-500/20 text-yellow-500'
              }`}>
                {channel.status}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2">{channel.name}</h3>
            <p className="text-muted-foreground text-sm mb-4">{channel.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Availability:</span>
                <span className="text-sm font-medium text-foreground">{channel.availability}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Response Time:</span>
                <span className="text-sm font-medium text-primary">{channel.responseTime}</span>
              </div>
            </div>

            <button className="btn-primary w-full">
              Contact {channel.name}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Submit Ticket</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
            <Download className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Download Reports</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">System Status</span>
          </button>
        </div>
      </motion.div>
    </div>
  );

  const renderKnowledgeBaseTab = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search knowledge base..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="glass-input pl-10 pr-4 py-3 w-full text-lg"
        />
      </div>

      {/* Knowledge Base Categories */}
      <div className="space-y-6">
        {knowledgeBase.map((category, index) => (
          <motion.div 
            key={category.category}
            className="glass-card p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <category.icon className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-foreground">{category.category}</h3>
            </div>
            
            <div className="space-y-3">
              {category.articles.map((article, articleIndex) => (
                <div key={articleIndex} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{article.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{article.views} views</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>{article.rating}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderFaqTab = () => (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div 
          key={index}
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
        >
          <button
            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <h3 className="font-semibold text-foreground">{faq.question}</h3>
            {expandedFaq === index ? (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
          
          {expandedFaq === index && (
            <div className="px-6 pb-6">
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  const renderTutorialsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutorials.map((tutorial, index) => (
        <motion.div 
          key={index}
          className="glass-card overflow-hidden floating-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
        >
          <div className="relative">
            <div className="w-full h-48 bg-secondary/30 flex items-center justify-center">
              <PlayCircle className="w-16 h-16 text-primary" />
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {tutorial.duration}
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-foreground mb-2">{tutorial.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{tutorial.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{tutorial.views} views</span>
              <button className="btn-primary">Watch</button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderContactTab = () => (
    <div className="max-w-2xl mx-auto">
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-foreground mb-4">Send us a message</h3>
        
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Name</label>
              <input type="text" className="glass-input w-full" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input type="email" className="glass-input w-full" placeholder="your@email.com" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
            <input type="text" className="glass-input w-full" placeholder="How can we help?" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Message</label>
            <textarea 
              rows="6" 
              className="glass-input w-full" 
              placeholder="Describe your issue or question in detail..."
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button type="button" className="btn-secondary">
              <Paperclip className="w-4 h-4 mr-2" />
              Attach File
            </button>
            <button type="submit" className="btn-primary">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'knowledge', label: 'Knowledge Base' },
    { id: 'faq', label: 'FAQ' },
    { id: 'tutorials', label: 'Tutorials' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview': return renderOverviewTab();
      case 'knowledge': return renderKnowledgeBaseTab();
      case 'faq': return renderFaqTab();
      case 'tutorials': return renderTutorialsTab();
      case 'contact': return renderContactTab();
      default: return renderOverviewTab();
    }
  };

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
            Support Center
          </h1>
          <p className="text-muted-foreground text-lg">
            Professional support with multiple contact channels and comprehensive help resources
          </p>
        </div>
        <motion.div 
          className="text-right"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="text-3xl font-bold text-green-500 mb-1">
            98.5%
          </div>
          <div className="text-sm text-muted-foreground">
            Satisfaction Rate
          </div>
        </motion.div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div 
        className="flex gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {renderActiveTab()}
      </motion.div>
    </div>
  );
};

export default SupportSection;

