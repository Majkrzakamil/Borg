import React from 'react';
import { Line } from 'react-chartjs-2';
import { useHistoricalPrice } from '../contexts/HistoricalPriceContext';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Filler, Legend, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Filler, Legend, CategoryScale);

const LineChart = () => {
	const { data, isLoading, error } = useHistoricalPrice();

	if (isLoading) return <p>Loading chart data...</p>;
	if (error) return <p>Error loading chart data: {error.message}</p>;
	if (!data) return <p>No data available</p>;

	const chartData = {
		labels: data.map(item => new Date(item.timestamp).toLocaleTimeString()),
		datasets: [
			{
				label: 'Price over Time',
				data: data.map(item => item.price),
				fill: false,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			}
		]
	};

	const options = {
		scales: {
			y: {
				beginAtZero: false
			}
		},
		plugins: {
			legend: {
				display: true
			},
			tooltip: {
				enabled: true,
				mode: 'index' as const,
				intersect: false
			}
		}
	};

	return <Line data={chartData} options={options} />;
};

export default LineChart;
