import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  TrendingUp, 
  TrendingDown,
  ArrowUpDown,
  Target,
  AlertCircle
} from 'lucide-react';

const QuickCalculator = ({ className = '' }) => {
  const [calculatorType, setCalculatorType] = useState('profit-loss'); // profit-loss, fee, position-size
  const [inputs, setInputs] = useState({
    entryPrice: '',
    exitPrice: '',
    amount: '',
    leverage: '1',
    feeRate: '0.1'
  });
  const [results, setResults] = useState({});

  const calculatorTypes = [
    { id: 'profit-loss', label: 'P&L Calculator', icon: TrendingUp },
    { id: 'fee', label: 'Fee Calculator', icon: Percent },
    { id: 'position-size', label: 'Position Size', icon: Target }
  ];

  useEffect(() => {
    calculateResults();
  }, [inputs, calculatorType]);

  const calculateResults = () => {
    const { entryPrice, exitPrice, amount, leverage, feeRate } = inputs;
    const entry = parseFloat(entryPrice) || 0;
    const exit = parseFloat(exitPrice) || 0;
    const qty = parseFloat(amount) || 0;
    const lev = parseFloat(leverage) || 1;
    const fee = parseFloat(feeRate) || 0.1;

    switch (calculatorType) {
      case 'profit-loss':
        if (entry && exit && qty) {
          const positionValue = qty * entry;
          const leveragedPosition = positionValue * lev;
          const priceDiff = exit - entry;
          const grossProfit = (priceDiff / entry) * leveragedPosition;
          const entryFee = (positionValue * fee) / 100;
          const exitFee = (qty * exit * fee) / 100;
          const totalFees = entryFee + exitFee;
          const netProfit = grossProfit - totalFees;
          const roe = (netProfit / positionValue) * 100;

          setResults({
            positionValue: positionValue.toFixed(2),
            leveragedPosition: leveragedPosition.toFixed(2),
            grossProfit: grossProfit.toFixed(2),
            totalFees: totalFees.toFixed(2),
            netProfit: netProfit.toFixed(2),
            roe: roe.toFixed(2),
            isProfit: netProfit >= 0
          });
        }
        break;

      case 'fee':
        if (qty && entry) {
          const positionValue = qty * entry;
          const makerFee = (positionValue * fee) / 100;
          const takerFee = (positionValue * (fee + 0.05)) / 100; // Taker fee usually higher
          const dailyFees = makerFee * 10; // Assume 10 trades per day
          const monthlyFees = dailyFees * 30;

          setResults({
            positionValue: positionValue.toFixed(2),
            makerFee: makerFee.toFixed(2),
            takerFee: takerFee.toFixed(2),
            dailyFees: dailyFees.toFixed(2),
            monthlyFees: monthlyFees.toFixed(2)
          });
        }
        break;

      case 'position-size':
        if (entry) {
          const riskAmount = 1000; // $1000 risk
          const stopLossPercent = 2; // 2% stop loss
          const stopLossPrice = entry * (1 - stopLossPercent / 100);
          const maxPosition = riskAmount / (entry - stopLossPrice);
          const positionValue = maxPosition * entry;
          const leveragedAmount = positionValue / lev;

          setResults({
            maxPosition: maxPosition.toFixed(4),
            positionValue: positionValue.toFixed(2),
            stopLossPrice: stopLossPrice.toFixed(2),
            leveragedAmount: leveragedAmount.toFixed(2),
            riskReward: '1:3' // Assume 3:1 risk-reward
          });
        }
        break;
    }
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const renderCalculator = () => {
    switch (calculatorType) {
      case 'profit-loss':
        return (
          <div className="space-y-4">
            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Entry Price ($)
                </label>
                <input
                  type="number"
                  value={inputs.entryPrice}
                  onChange={(e) => handleInputChange('entryPrice', e.target.value)}
                  className="glass-input w-full p-3"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Exit Price ($)
                </label>
                <input
                  type="number"
                  value={inputs.exitPrice}
                  onChange={(e) => handleInputChange('exitPrice', e.target.value)}
                  className="glass-input w-full p-3"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={inputs.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="glass-input w-full p-3"
                  placeholder="0.00"
                  min="0"
                  step="0.0001"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Leverage
                </label>
                <select
                  value={inputs.leverage}
                  onChange={(e) => handleInputChange('leverage', e.target.value)}
                  className="glass-input w-full p-3"
                >
                  <option value="1">1x</option>
                  <option value="2">2x</option>
                  <option value="5">5x</option>
                  <option value="10">10x</option>
                  <option value="20">20x</option>
                </select>
              </div>
            </div>

            {/* Results */}
            {results.positionValue && (
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
                <h4 className="font-bold text-foreground mb-4">P&L Results</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Position Value</p>
                    <p className="font-semibold text-foreground">${results.positionValue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Leveraged Position</p>
                    <p className="font-semibold text-foreground">${results.leveragedPosition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Fees</p>
                    <p className="font-semibold text-red-500">-${results.totalFees}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ROE</p>
                    <p className={`font-bold ${results.isProfit ? 'text-emerald-500' : 'text-red-500'}`}>
                      {results.roe}%
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Net P&L:</span>
                    <div className={`flex items-center space-x-2 ${results.isProfit ? 'text-emerald-500' : 'text-red-500'}`}>
                      {results.isProfit ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-lg font-bold">
                        {results.isProfit ? '+' : ''}${results.netProfit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'fee':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={inputs.entryPrice}
                  onChange={(e) => handleInputChange('entryPrice', e.target.value)}
                  className="glass-input w-full p-3"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={inputs.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="glass-input w-full p-3"
                  placeholder="0.00"
                />
              </div>
            </div>

            {results.positionValue && (
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
                <h4 className="font-bold text-foreground mb-4">Fee Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Position Value:</span>
                    <span className="font-semibold text-foreground">${results.positionValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Maker Fee (0.1%):</span>
                    <span className="font-semibold text-red-500">${results.makerFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Taker Fee (0.15%):</span>
                    <span className="font-semibold text-red-500">${results.takerFee}</span>
                  </div>
                  <div className="flex justify-between border-t border-border/50 pt-2">
                    <span className="text-sm text-muted-foreground">Est. Daily Fees:</span>
                    <span className="font-bold text-red-500">${results.dailyFees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Est. Monthly Fees:</span>
                    <span className="font-bold text-red-500">${results.monthlyFees}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'position-size':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Entry Price ($)
                </label>
                <input
                  type="number"
                  value={inputs.entryPrice}
                  onChange={(e) => handleInputChange('entryPrice', e.target.value)}
                  className="glass-input w-full p-3"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Leverage
                </label>
                <select
                  value={inputs.leverage}
                  onChange={(e) => handleInputChange('leverage', e.target.value)}
                  className="glass-input w-full p-3"
                >
                  <option value="1">1x</option>
                  <option value="2">2x</option>
                  <option value="5">5x</option>
                  <option value="10">10x</option>
                </select>
              </div>
            </div>

            {results.maxPosition && (
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
                <h4 className="font-bold text-foreground mb-4">Position Sizing (2% Risk)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Max Position Size:</span>
                    <span className="font-bold text-foreground">{results.maxPosition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Position Value:</span>
                    <span className="font-semibold text-foreground">${results.positionValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Stop Loss Price:</span>
                    <span className="font-semibold text-red-500">${results.stopLossPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Required Margin:</span>
                    <span className="font-semibold text-blue-500">${results.leveragedAmount}</span>
                  </div>
                  <div className="flex justify-between border-t border-border/50 pt-2">
                    <span className="text-sm text-muted-foreground">Risk:Reward:</span>
                    <span className="font-bold text-emerald-500">{results.riskReward}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calculator className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Quick Calculator</h3>
        </div>
      </div>

      {/* Calculator Type Selector */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-6">
        {calculatorTypes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCalculatorType(id)}
            className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg transition-all text-sm font-medium ${
              calculatorType === id 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Calculator Content */}
      {renderCalculator()}

      {/* Info */}
      <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
          <div className="text-xs text-blue-500">
            <p className="font-semibold mb-1">Calculator Info</p>
            <p>
              {calculatorType === 'profit-loss' && 'Calculate potential profits and losses including fees and leverage.'}
              {calculatorType === 'fee' && 'Estimate trading fees for different order types and trading frequencies.'}
              {calculatorType === 'position-size' && 'Determine optimal position size based on risk management rules.'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickCalculator;