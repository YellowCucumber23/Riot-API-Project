import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './RolesDoughnutChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

var top, jungle, mid, adc, support
top = jungle = mid = adc = support = 0


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
          if (wins[i] === "TOP"){top++}
          if (wins[i] === "JUNGLE"){jungle++}
          if (wins[i] === "MIDDLE"){mid++}
          if (wins[i] === "BOTTOM"){adc++}
          if (wins[i] === "SUPPORT"){support++}
        }
        for(let i = 0; i < loss.length; i++){
          if (loss[i] === "TOP"){top++}
          if (loss[i] === "JUNGLE"){jungle++}
          if (loss[i] === "MIDDLE"){mid++}
          if (loss[i] === "BOTTOM"){adc++}
          if (loss[i] === "SUPPORT"){support++}
        }
      }
    )
      }, [])
      const data = {
        labels: ['Top', 'Jungle', 'Mid', 'Adc', 'Support'],
        datasets: [
          {
            label: '# of Votes',
            data: [top, jungle, mid, adc, support],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
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
