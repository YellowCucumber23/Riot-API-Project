import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './RolesDoughnutChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

var win, lose
win = lose = 0


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
            if (wins[i] === "MID"){win++}
          }
          for(let i = 0; i < loss.length; i++){
            if (loss[i] === "MID"){lose++}
          }
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
        <div>
            <Doughnut data={data}
            height={500}
            width={800}
            options = {{
                maintainAspectRatio: false
            }}/>
        </div>
    )
};

export default DoughnutChart;
