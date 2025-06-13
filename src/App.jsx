import React from 'react';
import axios from 'axios';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { 
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, ReferenceLine
} from 'recharts';

const queryClient = new QueryClient();

// Enhanced color palette
const colors = ['#3498db', '#e74c3c', '#9b59b6', '#2ecc71', '#f39c12', '#1abc9c', '#e67e22', '#16a085', '#34495e', '#95a5a6'];
const gradientColors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

// API configuration - connect to your backend
const api = axios.create({
  baseURL: '/api'
});

const MetricCard = ({ title, value, trend, icon, color = '#f5eb0c' }) => (
  <div style={{
    backgroundColor: '#1a1a1a',
    padding: '25px',
    borderRadius: '15px',
    flex: 1,
    minWidth: '200px',
    boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
    border: `2px solid ${color}20`,
    transition: 'transform 0.2s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
  onMouseLeave={(e) => e.target.style.transform = 'translateY(0px)'}
  >
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <span style={{ fontSize: '24px', marginRight: '10px' }}>{icon}</span>
      <h3 style={{ margin: 0, fontSize: '16px', color: '#aaa', fontWeight: '500' }}>{title}</h3>
    </div>
    <p style={{ margin: 0, fontSize: '28px', color: color, fontWeight: 'bold' }}>{value}</p>
    {trend && (
      <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: trend > 0 ? '#2ecc71' : '#e74c3c' }}>
        {trend > 0 ? '↗️' : '↘️'} {Math.abs(trend)}%
      </p>
    )}
  </div>
);

const ChartContainer = ({ title, children, fullWidth = false }) => (
  <div style={{ 
    flex: fullWidth ? '1 1 100%' : '1 1 45%',
    minWidth: fullWidth ? '100%' : '400px',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', 
    padding: '25px', 
    borderRadius: '15px',
    boxShadow: '0px 4px 20px rgba(0,0,0,0.4)',
    border: '1px solid #333'
  }}>
    <h3 style={{ color: '#f5eb0c', marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>{title}</h3>
    {children}
  </div>
);

function Dashboard() {
  // Existing API calls - MANUAL REFRESH ONLY
  const { data: customers, refetch: refetchCustomers, isLoading: loadingCustomers, isFetching: fetchingCustomers } = useQuery({
    queryKey: ['top-customers'],
    queryFn: () => api.get('/top-customers').then(res => res.data),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: false,
  });

  const { data: revenue, refetch: refetchRevenue, isLoading: loadingRevenue, isFetching: fetchingRevenue } = useQuery({
    queryKey: ['total-revenue'],
    queryFn: () => api.get('/total-revenue').then(res => res.data),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: false,
  });

  const { data: revenueByMonth, refetch: refetchRevenueByMonth, isLoading: loadingRevenueByMonth, isFetching: fetchingRevenueByMonth } = useQuery({
    queryKey: ['revenue-by-month'],
    queryFn: () => api.get('/revenue-by-month').then(res => res.data),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: false,
  });

  const { data: invoices, refetch: refetchInvoices, isLoading: loadingInvoices, isFetching: fetchingInvoices } = useQuery({
    queryKey: ['total-invoices'],
    queryFn: () => api.get('/total-invoices').then(res => res.data),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: false,
  });

  const { data: taxes, refetch: refetchTaxes, isLoading: loadingTaxes, isFetching: fetchingTaxes } = useQuery({
    queryKey: ['total-taxes'],
    queryFn: () => api.get('/total-taxes').then(res => res.data),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: false,
  });

  // FIXED: Tax Breakdown Query
  const { data: taxBreakdown, refetch: refetchTaxBreakdown, isLoading: loadingTaxBreakdown, isFetching: fetchingTaxBreakdown } = useQuery({
    queryKey: ['tax-breakdown'],
    queryFn: () => api.get('/tax-breakdown').then(res => res.data),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: false,
  });
  
  // Top Products Query
const { data: topProducts } = useQuery({
  queryKey: ['top-products'],
  queryFn: () => api.get('/top-products').then(res => res.data),
  staleTime: Infinity,
  cacheTime: Infinity,
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  refetchInterval: false,
});

  // FIXED: Invoice Status Query
  const { data: invoiceStatus, refetch: refetchInvoiceStatus, isLoading: loadingInvoiceStatus, isFetching: fetchingInvoiceStatus } = useQuery({
    queryKey: ['invoice-status'],
    queryFn: () => api.get('/invoice-status').then(res => res.data),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: false,
  });

  const { data: quarterlyPerformance, refetch: refetchQuarterly, isLoading: loadingQuarterly, isFetching: fetchingQuarterly } = useQuery({
    queryKey: ['quarterly-performance'],
    queryFn: () => api.get('/quarterly-performance').then(res => res.data),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: false,
  });

  // FIXED: Loading states
  const isInitialLoading = loadingCustomers || loadingRevenue || loadingRevenueByMonth || 
                          loadingInvoices || loadingTaxes || loadingTaxBreakdown || 
                          loadingInvoiceStatus || loadingQuarterly;

  const isRefreshing = fetchingCustomers || fetchingRevenue || fetchingRevenueByMonth || 
                      fetchingInvoices || fetchingTaxes || fetchingTaxBreakdown || 
                      fetchingInvoiceStatus || fetchingQuarterly;

  const refreshAll = async () => {
    try {
      console.log('Refreshing all data...');
      
      await Promise.all([
        refetchCustomers(),
        refetchRevenue(),
        refetchRevenueByMonth(),
        refetchInvoices(),
        refetchTaxes(),
        refetchTaxBreakdown(),
        refetchInvoiceStatus(),
        refetchQuarterly(),
      ]);
      
      console.log('All data refreshed successfully!');
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  // Show loading spinner only on initial load
if (isInitialLoading) {
  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      width: '100%',
      minWidth: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#f5eb0c',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999
    }}>
      <div style={{ textAlign: 'center' }}>
        <img 
          src="/spinner.png" 
          alt="Loading" 
          style={{ 
            width: '60px', 
            height: '60px', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px',
            display: 'block'
          }}
        />
        <h2>Loading Dashboard...</h2>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
}

  return (
   <div style={{
  backgroundColor: '#0a0a0a',
  backgroundImage: 'linear-gradient(rgba(10, 10, 10, 0.97), rgba(10, 10, 10, 0.97)), url(/Pattern.png)',
  backgroundRepeat: 'repeat',
  backgroundSize: 'auto',
  backgroundPosition: 'center',
  minHeight: '100vh',
  padding: '20px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#fff',
  width: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  overflowX: 'hidden',
  overflowY: 'auto'
}}>
      
     {/* Refresh overlay indicator */}
{isRefreshing && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(2px)'
  }}>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    <div style={{ 
      backgroundColor: '#1a1a1a',
      padding: '30px',
      borderRadius: '15px',
      textAlign: 'center',
      border: '2px solid #f5eb0c'
    }}>
      <img 
        src="/spinner.png" 
        alt="Loading" 
        style={{ 
          width: '40px', 
          height: '40px', 
          animation: 'spin 1s linear infinite',
          margin: '0 auto 15px'
        }}
      />
      <p style={{ color: '#f5eb0c', margin: 0, fontSize: '16px' }}>Refreshing Data...</p>
    </div>
  </div>
)}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            style={{ width: '60px', height: '60px', borderRadius: '10px', marginRight: '20px' }} 
          />
          <h1 style={{ fontSize: '32px', color: '#f5eb0c', margin: 0, fontWeight: '700' }}>
            Finance Navigator
          </h1>
        </div>
        
        <>
  <style>{`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `}</style>
  
  <button 
    onClick={refreshAll} 
    disabled={isRefreshing}
    style={{
      backgroundColor: isRefreshing ? '#f5eb0c' : '#000', 
      color: isRefreshing ? '#000' : '#f5eb0c',
      padding: '12px 30px', 
      borderRadius: '50px', 
      fontWeight: 'bold',
      border: '2px solid #f5eb0c', 
      cursor: isRefreshing ? 'not-allowed' : 'pointer', 
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxShadow: isRefreshing 
        ? '0px 4px 15px rgba(245,235,12,0.4)' 
        : '0px 8px 20px rgba(245,235,12,0.3)',
      transform: isRefreshing ? 'scale(0.98)' : 'scale(1.0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }}
    onMouseEnter={e => {
      if (!isRefreshing) {
        e.target.style.backgroundColor = '#f5eb0c';
        e.target.style.color = '#000';
        e.target.style.boxShadow = '0px 10px 30px rgba(245,235,12,0.2)';
      }
    }}
    onMouseLeave={e => {
      if (!isRefreshing) {
        e.target.style.backgroundColor = '#000';
        e.target.style.color = '#f5eb0c';
        e.target.style.boxShadow = '0px 8px 20px rgba(245,235,12,0.3)';
      }
    }}
  >
    {isRefreshing ? (
      <>
        <img 
          src="/spinner.png" 
          alt="Loading" 
          style={{
            width: '16px',
            height: '16px',
            animation: 'spin 1s linear infinite'
          }}
        />
        Refreshing...
      </>
    ) : (
      'Refresh Data'
    )}
  </button>
</>
      </div>

      {/* Metrics Cards */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '40px', 
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>
        <MetricCard 
          title="Total Revenue" 
          value={`EGP ${Number(revenue?.total_revenue || 0).toLocaleString('en-EG')}`} 
          trend={12.5}
          icon="💰"
          color="#2ecc71"
        />
        <MetricCard 
          title="Total Invoices" 
          value={invoices?.total_invoices || 0} 
          trend={8.3}
          icon="📄"
          color="#3498db"
        />
        <MetricCard 
          title="Total Taxes" 
          value={`EGP ${Number(taxes?.total_tax || 0).toLocaleString('en-EG')}`} 
          trend={-2.1}
          icon="🏛️"
          color="#e74c3c"
        />
        <MetricCard 
          title="Active Customers" 
          value={customers?.length || 0} 
          trend={15.7}
          icon="👥"
          color="#9b59b6"
        />
      </div>

      {/* Charts Grid */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '25px', 
        marginBottom: '40px'
      }}>
        
        {/* Revenue Trend - Line Chart */}
        <ChartContainer title="📈 Revenue Trend Analysis" fullWidth={true}>
          <div style={{ 
            width: '100%', 
            height: '500px'
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={revenueByMonth || []} 
                margin={{ top: 20, right: 20, left: 65, bottom: 80 }}
              >
                <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  stroke="#aaa" 
                  tick={{ fontSize: 11, fill: '#aaa' }}
                  angle={-40}
                  textAnchor="end"
                  height={70}
                />
                <YAxis 
                  domain={[0, 'dataMax + 10000000']}
                  ticks={[0, 75000000, 150000000, 225000000, 300000000]}
                  tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} 
                  stroke="#aaa"
                  tick={{ fontSize: 11, fill: '#aaa' }}
                  width={60}
                  label={{ 
                    value: 'EGP (Millions)', 
                    angle: -90, 
                    position: 'insideLeft', 
                    style: { textAnchor: 'middle', fill: '#aaa', fontSize: '12px' } 
                  }}
                />
                <Tooltip 
                  formatter={(value) => [`EGP ${Number(value).toLocaleString('en-EG')}`, 'Revenue']} 
                  contentStyle={{ 
                    backgroundColor: '#2a2a2a', 
                    border: '1px solid #444',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  labelStyle={{ color: '#2ecc71' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#2ecc71" 
                  strokeWidth={2.5} 
                  dot={{ fill: '#2ecc71', strokeWidth: 2, r: 5 }} 
                  activeDot={{ r: 7, stroke: '#2ecc71', strokeWidth: 2, fill: '#fff' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        {/* Tax Breakdown - Pie Chart */}
<ChartContainer title="🏛️ Tax Distribution">
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={taxBreakdown}
        dataKey="amount"
        nameKey="type"
        cx="50%"
        cy="50%"
        outerRadius={80}
        innerRadius={40}
        labelLine={false}
      >
        {taxBreakdown.map((entry, index) => (
          <Cell key={index} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip formatter={(value) => `EGP ${Number(value).toLocaleString('en-EG')}`} />
    </PieChart>
  </ResponsiveContainer>

  {/* NEW Footer */}
  <div style={{ marginTop: '15px', color: '#ccc', fontSize: '14px' }}>
    {taxBreakdown.map((entry, index) => (
      <div key={index} style={{ marginBottom: '4px' }}>
        <span style={{ fontWeight: 'bold', color: colors[index % colors.length] }}>{entry.type}: </span>
        {entry.percentage}% (EGP {Number(entry.amount).toLocaleString('en-EG')})
      </div>
    ))}
  </div>
</ChartContainer>


       {/* Invoice Status Overview */}
<ChartContainer title="📄 Invoice Status Overview">
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={invoiceStatus}
        dataKey="count"
        nameKey="status"
        cx="50%"
        cy="50%"
        outerRadius={90}
        innerRadius={50}
        labelLine={false}
      >
        {invoiceStatus.map((entry, index) => (
          <Cell key={index} fill={gradientColors[index % gradientColors.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip formatter={(value) => `${value} Invoices`} />
    </PieChart>
  </ResponsiveContainer>

  {/* NEW Footer */}
  <div style={{ marginTop: '15px', color: '#ccc', fontSize: '14px' }}>
    {invoiceStatus.map((entry, index) => (
      <div key={index} style={{ marginBottom: '4px' }}>
        <span style={{ fontWeight: 'bold', color: gradientColors[index % gradientColors.length] }}>{entry.status}: </span>
        {Number(entry.count).toLocaleString('en-EG')} Invoices
      </div>
    ))}
  </div>
</ChartContainer>

{/* Top Products Table */}
<ChartContainer title="🏷️ Top 5 Selling Products" fullWidth={true}>
  {topProducts && topProducts.length > 0 ? (
    <table style={{ width: '100%', borderCollapse: 'collapse', color: '#eee', fontSize: '15px' }}>
      <thead>
        <tr style={{ background: '#333' }}>
          <th style={{ padding: '12px', textAlign: 'center' }}>#</th>
          <th style={{ padding: '12px', textAlign: 'center' }}>Product Name</th>
          <th style={{ padding: '12px', textAlign: 'center' }}>Total Sales (EGP)</th>
        </tr>
      </thead>
      <tbody>
        {topProducts.map((product, index) => (
          <tr key={index} style={{ background: index % 2 === 0 ? '#222' : '#1a1a1a' }}>
            <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
            <td style={{ padding: '10px', textAlign: 'center' }}>{product.item_primary_name}</td>
            <td style={{ padding: '10px', textAlign: 'center' }}>
              EGP {Number(product.total_sales).toLocaleString('en-EG')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div style={{ padding: '20px', textAlign: 'center', color: '#aaa' }}>
      No products data available.
    </div>
  )}
</ChartContainer>




        {/* Monthly Performance - Area Chart */}
        <ChartContainer title="📊 Monthly Performance Metrics">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueByMonth || []}>
              <CartesianGrid stroke="#333" />
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis 
                tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M EGP`} 
                stroke="#aaa"
              />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'invoices' ? value : `EGP ${Number(value).toLocaleString('en-EG')}`,
                  name === 'invoices' ? 'Invoices' : name === 'taxes' ? 'Taxes' : 'Revenue'
                ]}
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} 
              />
              <Area 
                type="monotone" 
                dataKey="invoices" 
                stackId="1"
                stroke="#3498db" 
                fill="url(#colorInvoices)" 
              />
              <Area 
                type="monotone" 
                dataKey="taxes" 
                stackId="2"
                stroke="#e74c3c" 
                fill="url(#colorTaxes)" 
              />
              <defs>
                <linearGradient id="colorInvoices" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3498db" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorTaxes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e74c3c" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#e74c3c" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Quarterly Performance vs Target - Composed Chart */}
        <ChartContainer title="🎯 Quarterly Performance vs Targets" fullWidth={true}>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={quarterlyPerformance || []}>
              <CartesianGrid stroke="#333" />
              <XAxis dataKey="quarter" stroke="#aaa" />
              <YAxis 
                tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M EGP`} 
                stroke="#aaa"
              />
              <Tooltip 
                formatter={(value, name) => [
                  `EGP ${Number(value).toLocaleString('en-EG')}`, 
                  name === 'revenue' ? 'Revenue' : 'Taxes'
                ]}
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              />
              <Bar dataKey="revenue" fill="#2ecc71" />
              <Bar dataKey="taxes" fill="#e74c3c" opacity={0.6} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>

      </div>

      {/* Top Customers Table */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#f5eb0c', marginBottom: '20px', fontSize: '24px' }}>🏆 Top Performing Customers</h2>
        <div style={{ 
          overflowX: 'hidden', 
          backgroundColor: '#1a1a1a', 
          borderRadius: '15px',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.4)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f5eb0c', color: '#000' }}>
  <tr>
    <th style={{ padding: '15px', fontWeight: '600', textAlign: 'center' }}>Rank</th>
    <th style={{ padding: '15px', fontWeight: '600', textAlign: 'center' }}>Customer Name</th>
    <th style={{ padding: '15px', fontWeight: '600', textAlign: 'center' }}>Total Payment</th>
    <th style={{ padding: '15px', fontWeight: '600', textAlign: 'center' }}>Status</th>
  </tr>
</thead>
            <tbody>
  {customers && customers.length > 0 ? (
    customers.map((customer, index) => (
      <tr key={index} style={{ 
        backgroundColor: index % 2 === 0 ? '#111' : '#222',
        transition: 'background-color 0.2s ease'
      }}>
        <td style={{ 
          padding: '15px', 
          textAlign: 'center',   // Centered now
          fontWeight: 'bold', 
          color: '#f5eb0c',
          fontSize: '16px'
        }}>
          #{index + 1}
        </td>
        <td style={{ 
          padding: '15px', 
          textAlign: 'center',  // Centered now
          color: '#fff',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          {customer.receiver_name || customer.customer_name || 'N/A'}
        </td>
        <td style={{ 
          padding: '15px', 
          textAlign: 'center',  // Centered now
          fontWeight: 'bold', 
          color: '#f5eb0c',
          fontSize: '16px'
        }}>
          EGP {Number(customer.total_payment || customer.total || 0).toLocaleString('en-EG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </td>
        <td style={{ padding: '15px', textAlign: 'center' }}>
          <span style={{
            backgroundColor: '#2ecc71',
            color: '#000',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            Active
          </span>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={4} style={{ 
        padding: '30px', 
        textAlign: 'center', 
        color: '#666',
        fontStyle: 'italic'
      }}>
        No customer data available
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}