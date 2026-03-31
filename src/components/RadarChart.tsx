import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'
import type { Scores } from '../utils/scoring'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

interface RadarChartProps {
  scores: Scores
}

export default function RadarChart({ scores }: RadarChartProps) {
  const data = {
    labels: ['Visie & Beleid', 'Docentvaardigheden', 'Onderwijs\naan leerlingen', 'Infrastructuur'],
    datasets: [
      {
        data: [scores.visie, scores.docent, scores.onderwijs, scores.infra],
        backgroundColor: 'rgba(161, 93, 245, 0.2)',
        borderColor: '#a15df5',
        borderWidth: 2,
        pointBackgroundColor: '#a15df5',
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
          color: 'rgba(161, 93, 245, 0.1)',
        },
        angleLines: {
          color: 'rgba(161, 93, 245, 0.15)',
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
