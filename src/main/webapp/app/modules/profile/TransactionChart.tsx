import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const TransactionChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartCanvas = chartRef.current.getContext('2d');
    new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Transactions',
            data: [10, 20, 30, 25, 15, 18],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <canvas ref={chartRef} style={{ padding: '20px', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
  );
};

export default TransactionChart;
