import Chart from 'chart.js';

// eslint-disable-next-line prefer-const
let booksChart = document.querySelector('#stats__booksChart').getContext('2d');

// eslint-disable-next-line no-unused-vars
const massPopChart = new Chart(booksChart, {
  type: 'bar',
  data: {
    labels: ['CHART',
      'LINE1'],
    datasets: [{
      label: 'Liczba',
      data: [100],
      backgroundColor: 'cadetblue',
    }],
  },
  options: {
    responsive: 'true',
    maintainAspectRatio: 'true',
  },
});

const addDataToChart = () => {
  massPopChart.data.datasets[0].data = [100];
  massPopChart.update();
};

export { addDataToChart as default };
