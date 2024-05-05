import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Button from '@mui/material/Button';
import './App.css';

// Helper function to generate synthetic data for demonstration purposes
function generateSampleData(label, start = 0, range = 100) {
  return {
    labels: [...Array(15).keys()].map((day) => `Day ${day}`),
    datasets: [
      {
        label: label,
        data: [...Array(15).keys()].map(() => Math.random() * range + start), // Replace with actual calculations
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
}

// Chart options for consistent styling
const chartOptions = {
  scales: {
    y: {
      beginAtZero: false,
    },
  },
};

function ReportPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;

  // Parsing form data values
  let current_price = parseFloat(formData.Stock_Price) || 0;
  let strike_price = parseFloat(formData.Strike_Price) || 0;
  let contract_price = parseFloat(formData.Price) || 0;
  let theta = parseFloat(formData.theta) || 0;
  let delta = parseFloat(formData.delta) || 0;
  const timePeriod = 15;
  const leverage = (delta / contract_price) * current_price;

   // Reduce decay by decreasing theta's impact
   if (theta === 0) {
    theta = (strike_price - current_price) / (timePeriod * 2);
  }


  let new_price = contract_price;
  let predicted_price = current_price;

  let pricesOverTime = [];
  let predictedPrices = [];
  // Predicted prices plus standard deviation
  let predictedPricesPlusSD = [];
  // Predicted prices minus standard deviation
  let predictedPricesMinusSD = [];
  // Standard deviation for price ranges
  const standardDeviation = 5;

  for (let i = 0; i <= timePeriod; i++) {
    if (i === 0) {
      pricesOverTime.push(contract_price);
      predictedPrices.push(current_price);
      predictedPricesPlusSD.push(current_price + standardDeviation);
      predictedPricesMinusSD.push(current_price - standardDeviation);
      continue;
    }

    // Option price decay calculation
    let decay = theta * i;
    new_price -= decay;
    new_price = Math.max(0, new_price);
    pricesOverTime.push(new_price);

    // Predicted stock price based on delta
    predicted_price += delta;
    predictedPrices.push(predicted_price);
    predictedPricesPlusSD.push(predicted_price + standardDeviation);
    predictedPricesMinusSD.push(predicted_price - standardDeviation);
  }

  // Data for the predicted stock price chart based on deltas
  const dataPrediction = {
    labels: [...Array(timePeriod + 1).keys()].map((day) => `Day ${day}`),
    datasets: [
      {
        label: 'Predicted Stock Price',
        data: predictedPrices,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'Predicted Price + 1 SD',
        data: predictedPricesPlusSD,
        fill: false,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        borderDash: [5, 5],
      },
      {
        label: 'Predicted Price - 1 SD',
        data: predictedPricesMinusSD,
        fill: false,
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
        borderDash: [5, 5],
      },
    ],
  };

  // Generate data for each Greek chart
  const deltaData = generateSampleData('Delta Over Time', -1, 2); // Delta ranges typically between -1 to 1
  const gammaData = generateSampleData('Gamma Over Time', -0.1, 0.2); // Gamma values are usually smaller
  const thetaData = generateSampleData('Theta Over Time', -100, 200); // Theta usually decreases with time
  const vegaData = generateSampleData('Vega Over Time', 0, 100); // Vega measures sensitivity to volatility
  const rhoData = generateSampleData('Rho Over Time', -100, 200); // Rho shows sensitivity to interest rates

  // Data for Price per Contract Over Time
  const pricePerContractData = {
    labels: [...Array(timePeriod + 1).keys()].map((day) => `Day ${day}`),
    datasets: [
      {
        label: 'Price per Contract Over Time',
        data: pricesOverTime,
        fill: false,
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <header className="App-header2">
        <div className="back_button">
          <Button variant="contained" onClick={() => navigate(-1)}>←</Button>
        </div>
        <div className="leverage-display">
          <span>Contract Leverage: {leverage.toFixed(2)}</span>
        </div>
        
        <div className="grid-container">
        <div className="grid-item">
            <Line data={dataPrediction} options={chartOptions} />
        </div>
          <div className="grid-item">
            <Line data={pricePerContractData} options={chartOptions} />
          </div>
          <div className="grid-item">
            <Line data={deltaData} options={chartOptions} />
          </div>
          <div className="grid-item">
            <Line data={gammaData} options={chartOptions} />
          </div>
          <div className="grid-item">
            <Line data={thetaData} options={chartOptions} />
          </div>
          <div className="grid-item">
            <Line data={vegaData} options={chartOptions} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default ReportPage;
