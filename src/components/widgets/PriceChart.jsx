import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Activity, 
  Maximize2,
  Settings,
  Clock
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Generate realistic price data for the chart
const generatePriceData = (basePrice, symbol) => {
  const data = [];
  const now = Date.now();
  let currentPrice = basePrice;
  
  for (let i = 0; i < 100; i++) {
    const time = now - (99 - i) * 60 * 1000; // 1 minute intervals
    const volatility = 0.002; // 0.2% volatility
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    currentPrice += change;
    
    const open = currentPrice;
    const close = currentPrice + (Math.random() - 0.5) * volatility * currentPrice;
    const high = Math.max(open, close) + Math.random() * volatility * currentPrice;
    const low = Math.min(open, close) - Math.random() * volatility * currentPrice;
    const volume = Math.floor(Math.random() * 1000000) + 100000;
    
    data.push({
      time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: time,
      price: Number(currentPrice.toFixed(2)),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume
    });
  }
  
  return data;
};

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
  volume: {
    label: "Volume",
    color: "hsl(var(--chart-2))",
  },
};

const PriceChart = ({ pair = 'BTC/USD', basePrice = 43250, className = '' }) => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('line'); // line, area, candlestick
  const [timeframe, setTimeframe] = useState('1h'); // 1m, 5m, 15m, 1h, 4h, 1d
  const [showVolume, setShowVolume] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Generate initial data
    const data = generatePriceData(basePrice, pair);
    setChartData(data);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setChartData(prevData => {
        const newData = [...prevData];
        const lastPoint = newData[newData.length - 1];
        const volatility = 0.001;
        const change = (Math.random() - 0.5) * volatility * lastPoint.price;
        const newPrice = lastPoint.price + change;
        
        // Update the last point or add a new one
        const now = Date.now();
        if (now - lastPoint.timestamp > 60000) { // Add new point every minute
          newData.push({
            time: new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: now,
            price: Number(newPrice.toFixed(2)),
            open: lastPoint.close,
            high: Number(Math.max(lastPoint.close, newPrice).toFixed(2)),
            low: Number(Math.min(lastPoint.close, newPrice).toFixed(2)),
            close: Number(newPrice.toFixed(2)),
            volume: Math.floor(Math.random() * 1000000) + 100000
          });
          
          // Keep only last 100 points
          if (newData.length > 100) {
            newData.shift();
          }
        } else {
          // Update current point
          newData[newData.length - 1] = {
            ...lastPoint,
            price: Number(newPrice.toFixed(2)),
            close: Number(newPrice.toFixed(2)),
            high: Number(Math.max(lastPoint.high, newPrice).toFixed(2)),
            low: Number(Math.min(lastPoint.low, newPrice).toFixed(2))
          };
        }
        
        return newData;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [basePrice, pair]);

  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : basePrice;
  const previousPrice = chartData.length > 1 ? chartData[chartData.length - 2].price : basePrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 10, right: 30, left: 0, bottom: 0 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['dataMin - 10', 'dataMax + 10']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={80}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{ r: 4, fill: isPositive ? "#10b981" : "#ef4444" }}
            />
          </AreaChart>
        );
      
      case 'line':
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['dataMin - 10', 'dataMax + 10']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={80}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: isPositive ? "#10b981" : "#ef4444" }}
            />
            <ReferenceLine 
              y={basePrice} 
              stroke="#6b7280" 
              strokeDasharray="5 5" 
              label={{ value: "Base Price", position: "topLeft" }}
            />
          </LineChart>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 ${className}`}
    >
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="text-xl font-bold text-foreground">{pair}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-foreground">
                ${currentPrice.toLocaleString()}
              </span>
              <div className={`flex items-center space-x-1 ${
                isPositive ? 'text-emerald-500' : 'text-red-500'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-semibold">
                  {isPositive ? '+' : ''}${priceChange.toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent}%)
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Chart Type Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {[
              { type: 'line', icon: Activity, label: 'Line' },
              { type: 'area', icon: BarChart3, label: 'Area' }
            ].map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`p-2 rounded-md transition-all ${
                  chartType === type 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title={label}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Timeframe Selector */}
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="glass-input text-sm px-3 py-1"
          >
            <option value="1m">1m</option>
            <option value="5m">5m</option>
            <option value="15m">15m</option>
            <option value="1h">1h</option>
            <option value="4h">4h</option>
            <option value="1d">1d</option>
          </select>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            title="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Settings">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
            <ChartTooltip 
              content={<ChartTooltipContent 
                labelFormatter={(value) => `Time: ${value}`}
                formatter={(value, name) => [
                  `$${Number(value).toLocaleString()}`,
                  'Price'
                ]}
              />} 
            />
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Chart Footer Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50">
        {[
          { label: 'High 24h', value: `$${Math.max(...chartData.map(d => d.high)).toLocaleString()}`, color: 'text-emerald-500' },
          { label: 'Low 24h', value: `$${Math.min(...chartData.map(d => d.low)).toLocaleString()}`, color: 'text-red-500' },
          { label: 'Volume 24h', value: `${(chartData.reduce((sum, d) => sum + d.volume, 0) / 1000000).toFixed(1)}M`, color: 'text-blue-500' },
          { label: 'Avg Price', value: `$${(chartData.reduce((sum, d) => sum + d.price, 0) / chartData.length).toFixed(2)}`, color: 'text-purple-500' }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className={`font-semibold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PriceChart;