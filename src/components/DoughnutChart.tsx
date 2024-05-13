import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSupplyStats } from '../contexts/SupplyStatsContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutLabelPlugin = {
	id: 'doughnutLabelPlugin',
	afterDraw: (chart) => {
		// Access the canvas context
		const ctx = chart.ctx;
		ctx.save();
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		chart.data.datasets.forEach((dataset, i) => {
			chart.getDatasetMeta(i).data.forEach((arc, j) => {
				// Get geometric properties of the arc
				const model = arc.getProps(['x', 'y', 'startAngle', 'endAngle', 'outerRadius']);

				// Calculate the middle angle of the arc
				const midAngle = (model.startAngle + model.endAngle) / 2;

				// Define an offset to push the label away from the edge of the arc
				const radiusOffset = 40;

				// Calculate the xy where the label will be placed
				const xPos = model.x + Math.cos(midAngle) * (model.outerRadius + radiusOffset);
				const yPos = model.y + Math.sin(midAngle) * (model.outerRadius + radiusOffset);

				// If angle is in the right half of the chart
				if (midAngle < Math.PI) {
					// Align text to the left side
					ctx.textAlign = 'start';
				} else {
					// Align text to the right side of the text
					ctx.textAlign = 'end';
				}

				// Set the circle color of the current dataset
				ctx.fillStyle = dataset.backgroundColor[j];
				const circleRadius = 5;

				// Draw a circle before the text
				ctx.beginPath();
				ctx.arc(xPos - (ctx.textAlign === 'end' ? -10 : 10), yPos, circleRadius, 0, 2 * Math.PI);
				ctx.fill();
				
				// Text color
				ctx.fillStyle = '#333';

				// Draw the label at the calculated position
				ctx.fillText(chart.data.labels[j], xPos, yPos);
			});
		});

		ctx.restore();
	}
};


const DoughnutChart = () => {
	const { supplyData, isLoading, error } = useSupplyStats();

	if (isLoading) return <p>Loading data...</p>;
	if (error) return <p>Error loading data: {error.message}</p>;
	if (!supplyData) return <p>No data available</p>;

	const chartData = {
		labels: [
			'Staked',
			'Burned',
			'In Yield',
			'In buyback pool',
			'Circulating Supply'
		],
		datasets: [{
			data: [
				supplyData.stakedBorgPercentage * 100,
				supplyData.borgBurnedPercentage * 100,
				supplyData.borgInYieldPercentage * 100,
				supplyData.borgInBubackPoolPercentage * 100,
				supplyData.circulatingSupplyPercentage * 100
			],
			backgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56',
				'#4BC0C0',
				'#CCF3E8'
			],
			borderColor: [
				'#FFFFFF',
				'#FFFFFF',
				'#FFFFFF',
				'#FFFFFF',
				'#FFFFFF'
			],
			hoverBackgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56',
				'#4BC0C0',
				'#9966FF'
			]
		}]
	};

	const options = {
		maintainAspectRatio: false,
		layout: {
			padding: {
				top: 50,
				right: 50,
				bottom: 50,
				left: 50
			}
		},
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				callbacks: {
					label: (tooltipItem) => ` ${tooltipItem.parsed.toFixed(2)}%`
				}
			}
		}
	};

	return <div style={{ width: '100%', height: '27rem' }}>
		<Doughnut data={chartData} options={options} plugins={[doughnutLabelPlugin]} />
	</div>;
};

export default DoughnutChart;
