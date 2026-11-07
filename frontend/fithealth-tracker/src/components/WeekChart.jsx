import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function WeekChart({ workouts }) {
  const canvasRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

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
            backgroundColor: "rgba(111, 72, 47, 0.88)",
            borderColor: "#6F482F",
            borderWidth: 1.5,
            borderRadius: 6,
            maxBarThickness: 56,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#000000",
              font: { size: 13, weight: "600" },
            },
            grid: {
              color: "rgba(111, 72, 47, 0.14)",
            },
            border: { color: "rgba(111, 72, 47, 0.3)" },
          },
          x: {
            ticks: {
              color: "#000000",
              font: { size: 12, weight: "600" },
            },
            grid: { display: false },
            border: { color: "rgba(111, 72, 47, 0.3)" },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "#000000",
              font: { size: 14, weight: "600" },
            },
          },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, [workouts]);

  return (
    <div className="card">
      <h2>Last 7 Days Burn</h2>
      <div style={{ position: "relative", height: "320px" }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
