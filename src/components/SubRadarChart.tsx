import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

interface SubRadarChartProps {
  subdimensions: {
    mindset: number
    ethiek: number
    kennis: number
    pedagogiek: number
    agency: number
  }
}

export default function SubRadarChart({ subdimensions }: SubRadarChartProps) {
  const data = {
    labels: ['A: Mindset', 'B: Ethiek', 'C: Kennis', 'D: Pedagogiek', 'E: Agency'],
    datasets: [
      {
        data: [
          subdimensions.mindset,
          subdimensions.ethiek,
          subdimensions.kennis,
          subdimensions.pedagogiek,
          subdimensions.agency,
        ],
        backgroundColor: 'rgba(121, 71, 186, 0.2)',
        borderColor: '#7947ba',
        borderWidth: 2,
        pointBackgroundColor: '#7947ba',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 4,
        ticks: {
          stepSize: 1,
          font: { size: 10, family: 'Poppins' },
          backdropColor: 'transparent',
          color: '#9ca3af',
        },
        pointLabels: {
          font: { size: 11, family: 'Poppins', weight: 500 as const },
          color: '#4a5568',
        },
        grid: {
          color: 'rgba(121, 71, 186, 0.1)',
        },
        angleLines: {
          color: 'rgba(121, 71, 186, 0.15)',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: { raw: unknown }) => `${(ctx.raw as number).toFixed(1)} / 4.0`,
        },
      },
    },
  }

  return <Radar data={data} options={options} />
}
