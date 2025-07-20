import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  CreditCard, 
  ArrowRightLeft, 
  DollarSign, 
  Clock, 
  Shield,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';

const ACCOUNT_DATA = [
  { 
    id: 'checking', 
    name: 'Premium Checking', 
    balance: 45678.90, 
    type: 'checking',
    apy: 0.5,
    accountNumber: '****1234',
    routingNumber: '021000021',
    status: 'active'
  },
  { 
    id: 'savings', 
    name: 'High-Yield Savings', 
    balance: 123456.78, 
    type: 'savings',
    apy: 4.2,
    accountNumber: '****5678',
    routingNumber: '021000021',
    status: 'active'
  },
  { 
    id: 'investment', 
    name: 'Investment Account', 
    balance: 115432.21, 
    type: 'investment',
    apy: 8.7,
    accountNumber: '****9012',
    routingNumber: '021000021',
    status: 'active'
  }
];

const RECENT_TRANSACTIONS = [
  {
    id: 1,
    type: 'transfer',
    description: 'Transfer to Investment Account',
    amount: -5000,
    date: '2025-07-19',
    status: 'completed',
    reference: 'TXN001234'
  },
  {
    id: 2,
    type: 'deposit',
    description: 'Direct Deposit - Salary',
    amount: 8500,
    date: '2025-07-18',
    status: 'completed',
    reference: 'DEP001235'
  },
  {
    id: 3,
    type: 'payment',
    description: 'Online Bill Payment - Utilities',
    amount: -245.67,
    date: '2025-07-17',
    status: 'completed',
    reference: 'PAY001236'
  }
];

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

const BankingSection = () => {
  const [activeTab, setActiveTab] = useState('accounts');
  const [transferForm, setTransferForm] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    recipientName: '',
    recipientBank: '',
    routingNumber: '',
    accountNumber: '',
    transferType: 'internal',
    memo: '',
    scheduledDate: ''
  });
  const [showAccountNumbers, setShowAccountNumbers] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    alert('Transfer initiated successfully!');
    
    // Reset form
    setTransferForm({
      fromAccount: '',
      toAccount: '',
      amount: '',
      recipientName: '',
      recipientBank: '',
      routingNumber: '',
      accountNumber: '',
      transferType: 'internal',
      memo: '',
      scheduledDate: ''
    });
  };

  const AccountCard = ({ account, index }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ delay: index * 0.1 }}
      className="glass-card p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${
            account.type === 'checking' ? 'bg-blue-500/20 text-blue-500' :
            account.type === 'savings' ? 'bg-emerald-500/20 text-emerald-500' :
            'bg-purple-500/20 text-purple-500'
          }`}>
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">{account.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{account.type} Account</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">APY</span>
            <span className="text-sm font-semibold text-emerald-500">{account.apy}%</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-3xl font-bold text-foreground mb-2">
          ${account.balance.toLocaleString()}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Account: {showAccountNumbers ? account.accountNumber.replace('****', account.routingNumber.slice(-4)) : account.accountNumber}
          </span>
          <button
            onClick={() => setShowAccountNumbers(!showAccountNumbers)}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            {showAccountNumbers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span className="text-sm text-emerald-500 font-medium">Active</span>
        </div>
        <button className="glass-button px-4 py-2 text-sm">
          View Details
        </button>
      </div>
    </motion.div>
  );

  const TransferForm = () => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="glass-card p-8"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/20 text-primary">
          <ArrowRightLeft className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Transfer Funds</h3>
          <p className="text-muted-foreground">Send money securely between accounts</p>
        </div>
      </div>

      <form onSubmit={handleTransferSubmit} className="space-y-6">
        {/* Transfer Type */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setTransferForm({...transferForm, transferType: 'internal'})}
            className={`p-4 rounded-xl border-2 transition-all ${
              transferForm.transferType === 'internal' 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border bg-background text-muted-foreground hover:border-primary/50'
            }`}
          >
            <Building2 className="w-6 h-6 mx-auto mb-2" />
            <span className="font-semibold">Internal Transfer</span>
          </button>
          <button
            type="button"
            onClick={() => setTransferForm({...transferForm, transferType: 'external'})}
            className={`p-4 rounded-xl border-2 transition-all ${
              transferForm.transferType === 'external' 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border bg-background text-muted-foreground hover:border-primary/50'
            }`}
          >
            <ArrowRightLeft className="w-6 h-6 mx-auto mb-2" />
            <span className="font-semibold">External Transfer</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From Account */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              From Account *
            </label>
            <select
              value={transferForm.fromAccount}
              onChange={(e) => setTransferForm({...transferForm, fromAccount: e.target.value})}
              className="glass-input w-full p-3"
              required
            >
              <option value="">Select Account</option>
              {ACCOUNT_DATA.map(account => (
                <option key={account.id} value={account.id}>
                  {account.name} - ${account.balance.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* To Account (Internal) or Recipient Info (External) */}
          {transferForm.transferType === 'internal' ? (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                To Account *
              </label>
              <select
                value={transferForm.toAccount}
                onChange={(e) => setTransferForm({...transferForm, toAccount: e.target.value})}
                className="glass-input w-full p-3"
                required
              >
                <option value="">Select Account</option>
                {ACCOUNT_DATA.filter(account => account.id !== transferForm.fromAccount).map(account => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Recipient Name *
              </label>
              <input
                type="text"
                value={transferForm.recipientName}
                onChange={(e) => setTransferForm({...transferForm, recipientName: e.target.value})}
                className="glass-input w-full p-3"
                placeholder="Enter recipient's full name"
                required
              />
            </div>
          )}
        </div>

        {/* External Transfer Fields */}
        {transferForm.transferType === 'external' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Recipient Bank *
              </label>
              <input
                type="text"
                value={transferForm.recipientBank}
                onChange={(e) => setTransferForm({...transferForm, recipientBank: e.target.value})}
                className="glass-input w-full p-3"
                placeholder="Bank name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Routing Number *
              </label>
              <input
                type="text"
                value={transferForm.routingNumber}
                onChange={(e) => setTransferForm({...transferForm, routingNumber: e.target.value})}
                className="glass-input w-full p-3"
                placeholder="9-digit routing number"
                pattern="[0-9]{9}"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Account Number *
              </label>
              <input
                type="text"
                value={transferForm.accountNumber}
                onChange={(e) => setTransferForm({...transferForm, accountNumber: e.target.value})}
                className="glass-input w-full p-3"
                placeholder="Recipient's account number"
                required
              />
            </div>
          </div>
        )}

        {/* Amount and Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Amount *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="number"
                value={transferForm.amount}
                onChange={(e) => setTransferForm({...transferForm, amount: e.target.value})}
                className="glass-input w-full p-3 pl-10"
                placeholder="0.00"
                min="0.01"
                step="0.01"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Schedule Date
            </label>
            <input
              type="date"
              value={transferForm.scheduledDate}
              onChange={(e) => setTransferForm({...transferForm, scheduledDate: e.target.value})}
              className="glass-input w-full p-3"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Memo */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Memo (Optional)
          </label>
          <input
            type="text"
            value={transferForm.memo}
            onChange={(e) => setTransferForm({...transferForm, memo: e.target.value})}
            className="glass-input w-full p-3"
            placeholder="Add a note for this transfer"
            maxLength={100}
          />
        </div>

        {/* Security Notice */}
        <div className="flex items-start space-x-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-500 mb-1">Secure Transfer</p>
            <p className="text-xs text-blue-500/80">
              All transfers are encrypted and protected by bank-grade security. 
              {transferForm.transferType === 'external' && ' External transfers may take 1-3 business days to complete.'}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="glass-button w-full p-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing Transfer...</span>
            </div>
          ) : (
            `${transferForm.transferType === 'internal' ? 'Transfer' : 'Send'} $${transferForm.amount || '0.00'}`
          )}
        </button>
      </form>
    </motion.div>
  );

  const TransactionHistory = () => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">Recent Transactions</h3>
        <button className="text-primary hover:text-primary/80 text-sm font-semibold">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {RECENT_TRANSACTIONS.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 glass-card hover:bg-accent/30 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                transaction.type === 'transfer' ? 'bg-blue-500/20 text-blue-500' :
                transaction.type === 'deposit' ? 'bg-emerald-500/20 text-emerald-500' :
                'bg-orange-500/20 text-orange-500'
              }`}>
                {transaction.type === 'transfer' ? <ArrowRightLeft className="w-5 h-5" /> :
                 transaction.type === 'deposit' ? <Plus className="w-5 h-5" /> :
                 <DollarSign className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-semibold text-foreground">{transaction.description}</p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{new Date(transaction.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Ref: {transaction.reference}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${
                transaction.amount > 0 ? 'text-emerald-500' : 'text-red-500'
              }`}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
              </p>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span className="text-xs text-emerald-500 capitalize">{transaction.status}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex space-x-1 glass-card p-1">
        {[
          { id: 'accounts', label: 'Accounts', icon: CreditCard },
          { id: 'transfer', label: 'Transfer', icon: ArrowRightLeft },
          { id: 'history', label: 'History', icon: Clock }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'accounts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACCOUNT_DATA.map((account, index) => (
            <AccountCard key={account.id} account={account} index={index} />
          ))}
        </div>
      )}

      {activeTab === 'transfer' && <TransferForm />}

      {activeTab === 'history' && <TransactionHistory />}
    </div>
  );
};

export default BankingSection;

