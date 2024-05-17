import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSupplyStats } from '../contexts/SupplyStatsContext';
import {
  Chart as ChartJS,
  ChartDataset,
  ArcElement,
  Tooltip,
  TooltipItem,
  Legend,
} from 'chart.js';
import LoadingSpinner from '../components/Common/LoadingSpinner';

ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutLabelPlugin = {
  id: 'doughnutLabelPlugin',
  afterDraw: (chart: ChartJS<'doughnut', number[], string>) => {
    // Access the canvas context
    const ctx = chart.ctx;
    ctx.save();
    ctx.font = '14px TT Commons';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    chart.data.datasets.forEach((dataset: ChartDataset, i) => {
      chart.getDatasetMeta(i).data.forEach((arc, j) => {
        // Get geometric properties of the arc
        const model = arc.getProps([
          'x',
          'y',
          'startAngle',
          'endAngle',
          'outerRadius',
        ]);

        // Calculate the middle angle of the arc
        const midAngle = (model.startAngle + model.endAngle) / 2;

        // Define an offset to push the label away from the edge of the arc
        const radiusOffset = 20;

        // Calculate the xy where the label will be placed
        const xPos =
          model.x + Math.cos(midAngle) * (model.outerRadius + radiusOffset);
        const yPos =
          model.y + Math.sin(midAngle) * (model.outerRadius + radiusOffset);

        // If angle is in the right half of the chart
        if (midAngle < Math.PI) {
          // Align text to the left side
          ctx.textAlign = 'start';
        } else {
          // Align text to the right side of the text
          ctx.textAlign = 'end';
        }

        // Set the circle color of the current dataset
        const backgroundColor = Array.isArray(dataset.backgroundColor)
          ? dataset.backgroundColor[j]
          : '#999999';
        ctx.fillStyle = backgroundColor;
        const circleRadius = 5;

        // Draw a circle before the text
        ctx.beginPath();
        ctx.arc(
          xPos - (ctx.textAlign === 'end' ? -10 : 10),
          yPos,
          circleRadius,
          0,
          2 * Math.PI
        );
        ctx.fill();

        // Text color
        ctx.fillStyle = '#191E29';

        // Split label into lines
        const label = chart.data.labels ? chart.data.labels[j] : '';
        const maxCharsPerLine = 8;
        const words = label.split(' ');
        let lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
          if (currentLine.length + words[i].length + 1 <= maxCharsPerLine) {
            currentLine += ' ' + words[i];
          } else {
            lines.push(currentLine);
            currentLine = words[i];
          }
        }
        lines.push(currentLine);

        // Draw each line of the label
        const lineHeight = 14;
        lines.forEach((line, index) => {
          ctx.fillText(
            line,
            xPos,
            yPos + index * lineHeight - ((lines.length - 1) * lineHeight) / 2
          );
        });
      });
    });

    ctx.restore();
  },
};

const DoughnutChart = () => {
  const { supplyData, isLoading, error } = useSupplyStats();

  if (isLoading)
    return <LoadingSpinner $mobileHeight="27rem" $desktopHeight="27rem" />;
  if (error) return <p>Error loading data: {error.message}</p>;
  if (!supplyData) return <p>No data available</p>;

  const chartData = {
    labels: [
      'Staked',
      'Burned',
      'In Yield',
      'In buyback pool',
      'Circulating Supply',
    ],
    datasets: [
      {
        data: [
          supplyData.stakedBorgPercentage * 100,
          supplyData.borgBurnedPercentage * 100,
          supplyData.borgInYieldPercentage * 100,
          supplyData.borgInBubackPoolPercentage * 100,
          supplyData.circulatingSupplyPercentage * 100,
        ],
        backgroundColor: [
          '#13E5BF',
          '#364053',
          '#AD95FF',
          '#7ABCFF',
          '#CCF3E8',
        ],
        borderColor: [
          'transparent',
          'transparent',
          'transparent',
          'transparent',
          'transparent',
        ],
        hoverBackgroundColor: [
          '#01C38D',
          '#191E29',
          '#7869FF',
          '#2D95FF',
          '#a3e9d5',
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    layout: {
      padding: {
        top: 80,
        right: 80,
        bottom: 80,
        left: 80,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'doughnut'>) =>
            ` ${tooltipItem.parsed.toFixed(2)}%`,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '27rem', height: '27rem' }}>
      <Doughnut
        data={chartData}
        options={options}
        plugins={[doughnutLabelPlugin]}
      />
    </div>
  );
};

export default DoughnutChart;
