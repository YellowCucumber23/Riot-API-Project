import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './RolesDoughnutChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export var win, lose
win = lose = 0
let winRate

const DoughnutChart = () => {
  const [chartData, setChartData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setChartData(data)
        let wins = Object.entries(data)[0][1]
        let loss = Object.entries(data)[1][1]
        for(let i = 0; i < wins.length; i++){
            if (wins[i] === "SUPPORT"){win++}
          }
          for(let i = 0; i < loss.length; i++){
            if (loss[i] === "SUPPORT"){lose++}
          }
          winRate = Math.round((win / (win + lose)) * 100.0 * 100.0) / 100.0
      }
    )
      }, [])
      const data = {
        labels: ['Win', 'Loss'],
        datasets: [
          {
            label: '# of Votes',
            data: [win, lose],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };


    return (
      <div className = "row">
        <div className = "column">
            <Doughnut data={data}
            height={500}
            width={800}
            options = {{
                maintainAspectRatio: false
            }}/>
        </div>

        <div className = "column">
          <p className = 'tag'>The win rate of Support is {winRate}%</p>
        </div>
      </div>
    )
};

export default DoughnutChart;