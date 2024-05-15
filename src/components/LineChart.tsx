import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useHistoricalPrice } from '../contexts/HistoricalPriceContext';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Filler, Legend, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Filler, Legend, CategoryScale);

const LineChart = () => {
	const chartRef = useRef<Chart<"line", number[], unknown> | null>(null);
	const { data, isLoading, error } = useHistoricalPrice();
	const [windowSize, setWindowSize] = useState(window.innerWidth);

	const handleResize = () => {
		setWindowSize(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const chart = chartRef.current;
		if (chart && chart.ctx) {
			const ctx = chart.ctx;
			const canvasHeight = ctx.canvas.clientHeight;
			const gradientStroke = ctx.createLinearGradient(0, 0, 0, canvasHeight);
			gradientStroke.addColorStop(0, '#01C38D80');
			gradientStroke.addColorStop(0.25, '#01C38D80');
			gradientStroke.addColorStop(0.35, '#01C38D80');
			gradientStroke.addColorStop(1, 'transparent');

			if (chart.data.datasets.length) {
				chart.data.datasets[0].backgroundColor = gradientStroke;
				chart.update();
			}
		}
	}, [data, windowSize]);

	if (isLoading) return <p>Loading chart data...</p>;
	if (error) return <p>Error loading chart data: {error.message}</p>;
	if (!data) return <p>No data available</p>;

	const prices = data.map(item => item.price);
	const minPrice = Math.min(...prices);
	const maxPrice = Math.max(...prices);
	const stepSize = (maxPrice - minPrice) / 7;

	const chartData = {
		labels: data.map(item => new Date(item.timestamp).toLocaleTimeString()),
		datasets: [
			{
				label: 'Price over Time',
				data: prices,
				borderColor: '#01C38D',
				backgroundColor: '#191D27',
				fill: true,
				tension: 0.1,
				borderWidth: 1,
				pointRadius: 0,
			}
		]
	};

	const options = {
		scales: {
			y: {
				beginAtZero: false,
				position: 'right' as const,
				min: minPrice,
				max: maxPrice,
				ticks: {
					stepSize,
					maxTicksLimit: 5,
					color: 'white',
					font: {
						family: 'Arial',
					},
				},
				grid: {
					color: '#8F96A133',
					drawBorder: false,
					drawTicks: false,
					drawOnChartArea: true
				},
			},
			x: {
				grid: {
					display: false,
					drawBorder: false,
					drawTicks: false
				},
				ticks: {
					maxTicksLimit: 6,
					color: 'white',
					font: {
						family: 'Arial',
					}
				}
			}
		},
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				enabled: true,
				mode: 'index' as const,
				intersect: false,
			}
		}
	};

	return <Line ref={chartRef} data={chartData} options={options} />;
};

export default LineChart;
