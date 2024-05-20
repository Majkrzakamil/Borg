import React, { useRef, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useHistoricalPrice } from '../contexts/HistoricalPriceContext';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Filler,
  Legend,
  CategoryScale,
  ScriptableContext,
} from 'chart.js';
import { Period } from '../types/apiTypes';
import LoadingSpinner from '../components/Common/LoadingSpinner';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Filler,
  Legend,
  CategoryScale
);

const LineChart = () => {
  const chartRef = useRef<Chart<'line', number[], unknown> | null>(null);
  const { data, isLoading, error, period } = useHistoricalPrice();

  const formatDate = (dateString: string, period: Period) => {
    const date = new Date(dateString);

    const getTwoDigitYear = (date: Date) => {
      return date.getFullYear().toString().slice(-2);
    };

    switch (period) {
      case 'day':
        return date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
      case 'month':
        return date.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
        });
      case 'year':
      case 'all':
        const month = date.toLocaleDateString('en-US', { month: '2-digit' });
        const year = getTwoDigitYear(date);
        return `${month}/${year}`;
      default:
        return date.toLocaleDateString('en-US');
    }
  };

  const chartData = useMemo(
    () => ({
      labels: data?.map(item => formatDate(item.timestamp, period)) || [],
      datasets: [
        {
          label: 'Price over Time',
          data: data?.map(item => item.price) || [],
          borderColor: '#01C38D',
          fill: 'start',
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const ctx = context.chart.ctx;
            const canvasHeight = ctx.canvas.clientHeight;
            const gradientStroke = ctx.createLinearGradient(
              0,
              0,
              0,
              canvasHeight
            );
            gradientStroke.addColorStop(0, '#01C38D80');
            gradientStroke.addColorStop(0.25, '#01C38D80');
            gradientStroke.addColorStop(0.35, '#01C38D80');
            gradientStroke.addColorStop(1, 'transparent');
            return gradientStroke;
          },
          tension: 0.1,
          borderWidth: 1,
          pointRadius: 0,
        },
      ],
    }),
    [data, period]
  );

  const options = useMemo(
    () => ({
      scales: {
        y: {
          beginAtZero: false,
          position: 'right' as const,
          ticks: {
            maxTicksLimit: 5,
            color: 'white',
            font: {
              family: 'TT Commons',
            },
          },
          grid: {
            color: '#8F96A133',
            drawBorder: false,
            drawTicks: false,
            drawOnChartArea: true,
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
            drawTicks: false,
          },
          ticks: {
            maxTicksLimit: 6,
            color: 'white',
            font: {
              family: 'TT Commons',
            },
          },
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          mode: 'index' as const,
          intersect: false,
        },
      },
    }),
    []
  );

  if (isLoading) {
    return <LoadingSpinner $mobileHeight="10.75rem" $desktopHeight="22.5rem" />;
  }

  if (error) {
    return <p>Error loading chart data: {error.message}</p>;
  }

  if (!data) {
    return <LoadingSpinner $mobileHeight="10.75rem" $desktopHeight="22.5rem" />;
  }

  return <Line ref={chartRef} data={chartData} options={options} />;
};

export default LineChart;
