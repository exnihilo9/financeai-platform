import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Palette,
  Globe,
  CreditCard,
  Key,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  Edit,
  Save,
  Camera,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';

const SettingsSection = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    trading: true,
    portfolio: true,
    security: true
  });

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const securityLogs = [
    {
      action: 'Login',
      device: 'MacBook Pro',
      location: 'New York, NY',
      time: '2 hours ago',
      status: 'success'
    },
    {
      action: 'Password Changed',
      device: 'iPhone 15 Pro',
      location: 'New York, NY',
      time: '1 day ago',
      status: 'success'
    },
    {
      action: 'Failed Login Attempt',
      device: 'Unknown Device',
      location: 'London, UK',
      time: '3 days ago',
      status: 'warning'
    }
  ];

  const billingHistory = [
    {
      date: 'Dec 15, 2024',
      description: 'FinanceAI Pro Monthly',
      amount: '$49.99',
      status: 'Paid',
      invoice: 'INV-2024-001'
    },
    {
      date: 'Nov 15, 2024',
      description: 'FinanceAI Pro Monthly',
      amount: '$49.99',
      status: 'Paid',
      invoice: 'INV-2024-002'
    },
    {
      date: 'Oct 15, 2024',
      description: 'FinanceAI Pro Monthly',
      amount: '$49.99',
      status: 'Paid',
      invoice: 'INV-2024-003'
    }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Profile Information</h3>
        
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
              <Camera className="w-3 h-3" />
            </button>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground">John Anderson</h4>
            <p className="text-muted-foreground">Premium Member since 2023</p>
            <div className="flex items-center gap-2 mt-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">Verified Account</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
            <input 
              type="text" 
              defaultValue="John" 
              className="glass-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
            <input 
              type="text" 
              defaultValue="Anderson" 
              className="glass-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input 
              type="email" 
              defaultValue="john.anderson@email.com" 
              className="glass-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
            <input 
              type="tel" 
              defaultValue="+1 (555) 123-4567" 
              className="glass-input w-full"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
            <textarea 
              rows="3" 
              defaultValue="Professional investor with 10+ years of experience in financial markets."
              className="glass-input w-full"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button className="btn-primary">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
          <button className="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Password & Authentication</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="glass-input w-full pr-10"
                placeholder="Enter current password"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
            <input 
              type="password" 
              className="glass-input w-full"
              placeholder="Enter new password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
            <input 
              type="password" 
              className="glass-input w-full"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <button className="btn-primary mt-4">
          <Key className="w-4 h-4 mr-2" />
          Update Password
        </button>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Two-Factor Authentication</h3>
        
        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg mb-4">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-primary" />
            <div>
              <div className="font-medium text-foreground">Authenticator App</div>
              <div className="text-sm text-muted-foreground">
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`w-12 h-6 rounded-full transition-colors ${
              twoFactorEnabled ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
              twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        {twoFactorEnabled && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-500">Two-Factor Authentication Enabled</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your account is protected with two-factor authentication using your authenticator app.
            </p>
          </div>
        )}
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Recent Security Activity</h3>
        
        <div className="space-y-3">
          {securityLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  log.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <div>
                  <div className="font-medium text-foreground">{log.action}</div>
                  <div className="text-sm text-muted-foreground">
                    {log.device} • {log.location}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{log.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-3">
                {key === 'email' && <Mail className="w-5 h-5 text-primary" />}
                {key === 'push' && <Bell className="w-5 h-5 text-primary" />}
                {key === 'sms' && <Smartphone className="w-5 h-5 text-primary" />}
                {key === 'trading' && <TrendingUp className="w-5 h-5 text-primary" />}
                {key === 'portfolio' && <PieChart className="w-5 h-5 text-primary" />}
                {key === 'security' && <Shield className="w-5 h-5 text-primary" />}
                <div>
                  <div className="font-medium text-foreground capitalize">
                    {key === 'sms' ? 'SMS' : key} Notifications
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {key === 'email' && 'Receive notifications via email'}
                    {key === 'push' && 'Browser push notifications'}
                    {key === 'sms' && 'Text message notifications'}
                    {key === 'trading' && 'Trading alerts and updates'}
                    {key === 'portfolio' && 'Portfolio performance updates'}
                    {key === 'security' && 'Security and login alerts'}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  value ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Theme Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'light', label: 'Light', icon: Sun, description: 'Light theme' },
            { id: 'dark', label: 'Dark', icon: Moon, description: 'Dark theme' },
            { id: 'system', label: 'System', icon: Monitor, description: 'Follow system' }
          ].map((theme) => (
            <div key={theme.id} className="p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <theme.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">{theme.label}</span>
              </div>
              <p className="text-sm text-muted-foreground">{theme.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Display Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">Compact Mode</div>
              <div className="text-sm text-muted-foreground">Reduce spacing and padding</div>
            </div>
            <button className="w-12 h-6 rounded-full bg-gray-300">
              <div className="w-5 h-5 bg-white rounded-full translate-x-1" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">High Contrast</div>
              <div className="text-sm text-muted-foreground">Increase contrast for better visibility</div>
            </div>
            <button className="w-12 h-6 rounded-full bg-gray-300">
              <div className="w-5 h-5 bg-white rounded-full translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Current Plan</h3>
        
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-foreground">FinanceAI Pro</h4>
            <span className="text-2xl font-bold text-primary">$49.99/mo</span>
          </div>
          <p className="text-muted-foreground mb-3">
            Full access to all AI features, advanced analytics, and premium support
          </p>
          <div className="flex gap-2">
            <button className="btn-primary">Manage Plan</button>
            <button className="btn-secondary">Cancel Subscription</button>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Payment Method</h3>
        
        <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg mb-4">
          <CreditCard className="w-8 h-8 text-primary" />
          <div className="flex-1">
            <div className="font-medium text-foreground">•••• •••• •••• 4242</div>
            <div className="text-sm text-muted-foreground">Expires 12/2027</div>
          </div>
          <button className="btn-secondary">
            <Edit className="w-4 h-4" />
          </button>
        </div>
        
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Method
        </button>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Billing History</h3>
        
        <div className="space-y-3">
          {billingHistory.map((bill, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <div className="font-medium text-foreground">{bill.description}</div>
                <div className="text-sm text-muted-foreground">{bill.date}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-foreground">{bill.amount}</div>
                <div className="text-sm text-green-500">{bill.status}</div>
              </div>
              <button className="btn-secondary">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'security': return renderSecurityTab();
      case 'notifications': return renderNotificationsTab();
      case 'appearance': return renderAppearanceTab();
      case 'billing': return renderBillingTab();
      default: return renderProfileTab();
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
            Settings & Configuration
          </h1>
          <p className="text-muted-foreground text-lg">
            Account management, security settings, and platform preferences
          </p>
        </div>
      </motion.div>

      <div className="flex gap-8">
        {/* Settings Navigation */}
        <motion.div 
          className="w-64 space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {settingsTabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Settings Content */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {renderActiveTab()}
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsSection;

