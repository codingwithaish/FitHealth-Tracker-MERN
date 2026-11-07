import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function WeekChart({ workouts }) {
  const canvasRef = useRef();
  let chartInstance = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // Destroy previous chart if exists
    if (chartInstance.current) chartInstance.current.destroy();

    // Last 7 days (oldest → newest)
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().slice(0, 10);
    });

    // Calories burned per day
    const data = last7Days.map((date) =>
      workouts
        .filter((w) => w.date.slice(0, 10) === date)
        .reduce((s, w) => s + w.calories, 0)
    );

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: last7Days,
        datasets: [
          {
            label: "Calories Burned",
            data,
            backgroundColor: "rgba(215, 238, 255, 0.6)",
            borderColor: "rgb(215, 238, 255)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: { 
          y: { 
            beginAtZero: true,
            ticks: {
              color: '#ffffff',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#ffffff',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#ffffff',
              font: {
                size: 18,
                weight: 'bold'
              }
            }
          }
        }
      },
    });
  }, [workouts]);

  return (
    <div className="card">
      <h2>Last 7 Days Burn</h2>
      <canvas ref={canvasRef} height="120"></canvas>
    </div>
  );
}
