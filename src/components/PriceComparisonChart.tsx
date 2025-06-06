import Chart from 'react-apexcharts';
import { useAppContext } from '@/context/AppContext';
import { useLocation } from 'react-router-dom';

const PriceComparisonChart = () => {
  const location = useLocation();
  const { services, contractor } = useAppContext();

  // Get quote from URL parameter and parse as number
  const searchParams = new URLSearchParams(location.search);
  const yourQuote = Number(searchParams.get('quote')) || 0;
  const serviceId = parseInt(searchParams.get('service') || '', 10);

  console.log('serviceId:', yourQuote);

  // Find matching service from context
  const selectedService = services?.find(
    (service: any) => service.service_id === serviceId
  );

  console.log('Selected Service:', selectedService);

  // Calculate values
  const competitorQuote = yourQuote * 1.2;
  const nationalAvg = selectedService?.services.national_avg || 0;
  const maxValue = Math.max(yourQuote, competitorQuote, nationalAvg);
  const yAxisTickAmount = 5;

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
      animations: { enabled: true },
    },
    series: [{
      name: 'Prices',
      data: [
        { 
          x: 'National Avg.', 
          y: nationalAvg, 
          fillColor: '#d1d5db' 
        },
        { 
          x: 'Competitor', 
          y: competitorQuote, 
          fillColor: '#d1d5db' 
        },
        { 
          x: 'Your Quote', 
          y: yourQuote, 
          fillColor: contractor?.colors?.accent || '#3b82f6'
        }
        
      ]
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '25px',
        borderRadius: 0,
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['National Avg.', 'Competitor', 'Your Quote'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
        }
      }
    },
    yaxis: {
      min: 0,
      max: maxValue,
      tickAmount: yAxisTickAmount,
      labels: {
        align: 'left',
        minWidth: 0,
        maxWidth: 140,
        style: {
          colors: '#6b7280',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
        formatter: (value: number) => `$${Math.round(value)}`
      }
    },
    grid: {
      borderColor: '#e5e7eb',
      padding: { left: 20, right: 20 }
    },
    states: {
      hover: {
        filter: { type: 'darken', value: 0.9 }
      }
    },
    tooltip: {
      y: { formatter: (value: number) => `$${Math.round(value)}` },
      custom: function ({ seriesIndex, dataPointIndex, w }: any) {
        const categories = w.config.xaxis.categories;
        const value = w.globals.series[seriesIndex][dataPointIndex];
        const title = categories[dataPointIndex];
        
        return `
          <div class="bg-white shadow-lg rounded-lg p-2 border border-gray-200">
            <div class="text-sm font-semibold text-gray-700">${title}</div>
            <div class="text-lg font-bold text-gray-900">$${Math.round(value)}</div>
          </div>
        `;
      }
    },
    responsive: [{
      breakpoint: 640,
      options: {
        plotOptions: { bar: { columnWidth: '20px' } },
        xaxis: { labels: { style: { fontSize: '12px' } } },
        yaxis: { labels: { style: { fontSize: '10px' } } }
      }
    }]
  };

  if (!services) {
    return null; // or a loading spinner
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mx-auto w-full">
      <div className="text-lg font-semibold text-gray-800 mb-4">
        Price Comparison
      </div>
      <div className="relative w-full" style={{ minHeight: '250px' }}>
        <Chart
          options={chartOptions as any}
          series={chartOptions.series}
          type="bar"
          height={250}
          width="100%"
          className="mx-auto"
          style={{ 
            maxWidth: '800px',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        />
      </div>
    </div>
  );
  
};

export default PriceComparisonChart;