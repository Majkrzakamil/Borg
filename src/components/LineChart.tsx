import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useHistoricalPrice } from '../contexts/HistoricalPriceContext';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Filler, Legend, CategoryScale } from 'chart.js';
import { Period } from '../types/apiTypes'

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Filler, Legend, CategoryScale);

const LineChart = () => {
	const chartRef = useRef<Chart<"line", number[], unknown> | null>(null);
	const { data, isLoading, error, period } = useHistoricalPrice();
	const [windowSize, setWindowSize] = useState<number | null>(null);
	const [initialLoad, setInitialLoad] = useState(true);

	const handleResize = () => {
		if (typeof window !== 'undefined') {
			setWindowSize(window.innerWidth);
		}
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setWindowSize(window.innerWidth);
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, []);

	useEffect(() => {
		if (data && initialLoad && !isLoading) {
			setInitialLoad(false);
		}
	}, [data, isLoading]);

	useEffect(() => {
		if (!isLoading && data && chartRef.current) {
			const chart = chartRef.current;
			chart.data.labels = data.map(item => formatDate(item.timestamp, period));
			chart.data.datasets.forEach((dataset) => {
				dataset.data = data.map(item => item.price);
			});
			chart.update();
		}
	}, [data, period, isLoading]);

	useEffect(() => {
		if (chartRef.current && data) {
			const ctx = chartRef.current.ctx;
			const canvasHeight = ctx.canvas.clientHeight;
			const gradientStroke = ctx.createLinearGradient(0, 0, 0, canvasHeight);
			gradientStroke.addColorStop(0, '#01C38D80');
			gradientStroke.addColorStop(0.25, '#01C38D80');
			gradientStroke.addColorStop(0.35, '#01C38D80');
			gradientStroke.addColorStop(1, 'transparent');

			chartRef.current.data.datasets.forEach(dataset => {
				dataset.backgroundColor = gradientStroke;
			});
			chartRef.current.update();
		}
	}, [chartRef.current, data, windowSize]);

	if (error) return <p>Error loading chart data: {error.message}</p>;
	if (isLoading && initialLoad) return <p>Loading chart data...</p>;
	if (!data) return <p>Loading chart data...</p>;

	const prices = data.map(item => item.price);
	const minPrice = Math.min(...prices);
	const maxPrice = Math.max(...prices);
	const stepSize = (maxPrice - minPrice) / 7;

	const formatDate = (dateString: string, period: Period) => {
		const date = new Date(dateString);

		const getTwoDigitYear = (date: Date) => {
			return date.getFullYear().toString().slice(-2);
		};

		switch (period) {
			case 'day':
				return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
			case 'month':
				return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
			case 'year':
			case 'all':
				const month = date.toLocaleDateString('en-US', { month: '2-digit' });
				const year = getTwoDigitYear(date);
				return `${month}/${year}`;
			default:
				return date.toLocaleDateString('en-US');
		}
	};

	const formattedData = data.map(item => ({
		timestamp: formatDate(item.timestamp, period),
		price: item.price
	}));

	const chartData = {
		labels: formattedData.map(item => item.timestamp),
		datasets: [
			{
				label: 'Price over Time',
				data: formattedData.map(item => item.price),
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
				// min: minPrice,
				// max: maxPrice,
				ticks: {
					// stepSize,
					maxTicksLimit: 5,
					color: 'white',
					font: {
						family: 'TT Commons',
					},
					// padding: -20,
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
						family: 'TT Commons',
					},
					// padding: -20,
				}
			}
		},
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
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
