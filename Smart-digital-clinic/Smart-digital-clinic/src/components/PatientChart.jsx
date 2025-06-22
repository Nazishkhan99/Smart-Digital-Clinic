import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
import "./PatientChart.css";
Chart.register(BarElement, CategoryScale, LinearScale);

const getMonthlyPatientCount = () => {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const monthlyCount = Array(12).fill(0);

  patients.forEach((p) => {
    const date = new Date(p.date || p.createdAt || Date.now());
    const month = date.getMonth(); // 0–11
    monthlyCount[month]++;
  });

  return monthlyCount;
};

export default function PatientChart() {
  const [data, setData] = useState(getMonthlyPatientCount());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(getMonthlyPatientCount());
    }, 3000); // auto-refresh every 3s
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Patients Added",
        data: data,
        backgroundColor:  "#218838",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="patient-chart-container">
      <h3>📊 Monthly Patient Registration</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
}
