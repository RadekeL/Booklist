/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Chart from 'chart.js';
import Story from './storyStats';

// NIECH WYSWIETLA SIE WYKRES OD RAZU
const dataStats = new Story();
const booksChart = document.querySelector('#stats__booksChart').getContext('2d');
const speedOfReadingChart = document.querySelector('#stats__speed').getContext('2d');
// CHART JS
export const readingStats = new Chart(booksChart, {
  type: 'bar',
  data: {
    labels: [`${dataStats.stats.read.name}`,
      `${dataStats.stats.stillRead.name}`,
      `${dataStats.stats.english.name}`,
      `${dataStats.stats.polish.name}`,
      `${dataStats.stats.spanish.name}`],
    datasets: [{
      label: 'Liczba',
      data: [dataStats.stats.read.value,
        dataStats.stats.stillRead.value,
        dataStats.stats.english.value,
        dataStats.stats.polish.value,
        dataStats.stats.spanish.value],
      backgroundColor: 'cadetblue',
    }],
  },
  options: {
    responsive: 'true',
    maintainAspectRatio: 'true',
  },
});
export const speedReadingStats = new Chart(speedOfReadingChart, {
  type: 'bar',
  data: {
    labels: [`${dataStats.stats.readingTime.name}`,
      `${dataStats.stats.numberPages.name}`],
    datasets: [{
      label: 'Liczba',
      data: [dataStats.stats.readingTime.value,
        dataStats.stats.numberPages.value],
      backgroundColor: 'cadetblue',
    }],
  },
  options: {
    responsive: 'true',
    maintainAspectRatio: 'true',
  },
});

export const addDataToChart = (dataX) => {
  readingStats.data.datasets[0].data = [dataX.stats.read.value,
    dataX.stats.stillRead.value,
    dataX.stats.english.value,
    dataX.stats.polish.value,
    dataX.stats.spanish.value];
  readingStats.update();
};

export const addDataToSpeedChart = (dataX) => {
  speedReadingStats.data.datasets[0].data = [dataX.stats.readingTime.value,
    dataX.stats.numberPages.value];
  speedReadingStats.update();
};

export const renderChart = (dataX) => {
  // console.log(dataX);
  addDataToChart(dataX);
  addDataToSpeedChart(dataX);
};
