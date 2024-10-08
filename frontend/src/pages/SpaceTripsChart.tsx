import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartOptions, ScriptableContext } from "chart.js";
import type { ChartData } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IPlanet {
  [key: string]: string;
}

interface IJournal {
  planet: string;
  tripDate: string;
  images: { [key: string]: string }[];
  data?: IPlanet;
}

const SpaceTripsChart = () => {
  const [journalEntries, setJournalEntries] = useState<{ [key: string]: IJournal[] }>({});

  useEffect(() => {
    const entries = localStorage.getItem("journal");

    if (entries) {
      const journalData: { [key: string]: IJournal[] } = JSON.parse(entries);
      setJournalEntries(journalData);
    }
  }, []);

  // Data processing
  const planetsVisitCount: { [planet: string]: { [month: string]: number } } = {};
  const months = Object.keys(journalEntries);

  // Initialize planet counts per month
  months.forEach(month => {
    journalEntries[month].forEach(({ planet }) => {
      if (!planetsVisitCount[planet]) {
        planetsVisitCount[planet] = {};
      }
      planetsVisitCount[planet][month] = (planetsVisitCount[planet][month] || 0) + 1;
    });
  });

  // Prepare stacked chart data
  const planetsLabels = Object.keys(planetsVisitCount);
  const datasets = planetsLabels.map(planet => ({
    label: planet, // Planet name as dataset label
    data: months.map(month => planetsVisitCount[planet][month] || 0),
    backgroundColor: (context: ScriptableContext<"bar">) => {
      const colors = [
        "rgb(0, 255, 170)", // Cyan
        "rgb(0, 85, 255)", // Blue
        "rgb(255, 0, 0)", // Red
        "rgb(75, 0, 130)", // Indigo
        "rgb(125, 0, 180)", // Violet
        "rgb(255, 127, 0)", // Orange
        "rgb(255, 255, 0)", // Yellow
        "rgb(0, 255, 0)", // Green
        "rgb(0, 0, 255)", // Dark Blue
        "rgb(170, 0, 255)", // Purple
      ];
      return colors[context.datasetIndex! % colors.length];
    },
  }));

  const handleResetData = () => {
    setJournalEntries({});
    localStorage.setItem("journal", "");
  };

  const data: ChartData<"bar"> = {
    labels: months, // Months on the x-axis
    datasets: datasets,
  };

  // Chart.js options for stacked bar chart
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Stacked Bar Chart: Planet Visits by Month",
        color: "#fff",
      },
      legend: {
        position: "top",
        labels: {
          color: "#fff", // Legend text color
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: context => `Trips: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "#fff", // X-axis labels color,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light grid line color
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "#fff", // Y-axis labels color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light grid line color
        },
      },
    },
  };

  return (
    <div>
      <h2 className='text-3xl font-bold mb-8'>Space Exploration Data Visualizations</h2>

      {datasets.length ? (
        <div>
          <Bar data={data} options={options} />

          <button
            onClick={handleResetData}
            className={"text-white cursor-pointer px-2 py-1 mt-6 bg-cyan-700 hover:bg-cyan-500 rounded-md flex items-center"}>
            <span>Reset Data</span>
          </button>
        </div>
      ) : (
        <h2 className='text-lg text-gray-200 text-center mb-8 max-w-2xl'>No Data yet. Embark on more trips!</h2>
      )}
    </div>
  );
};

export default SpaceTripsChart;
