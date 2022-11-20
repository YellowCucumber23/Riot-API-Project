import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './RolesDoughnutChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

var roles = ['Top', 'Jungle', 'Middle', 'ADC', 'Support']
var rolesArray = [0,0,0,0,0]
var rolesMap = {}
let mostPlayed, maxValue

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
          if (wins[i] === "TOP"){rolesArray[0]++}
          if (wins[i] === "JUNGLE"){rolesArray[1]++}
          if (wins[i] === "MIDDLE"){rolesArray[2]++}
          if (wins[i] === "BOTTOM"){rolesArray[3]++}
          if (wins[i] === "SUPPORT"){rolesArray[4]++}
        }
        for(let i = 0; i < loss.length; i++){
          if (loss[i] === "TOP"){rolesArray[0]++}
          if (loss[i] === "JUNGLE"){rolesArray[1]++}
          if (loss[i] === "MIDDLE"){rolesArray[2]++}
          if (loss[i] === "BOTTOM"){rolesArray[3]++}
          if (loss[i] === "SUPPORT"){rolesArray[4]++}
        }
        rolesArray.forEach((element, index) => {
          rolesMap[element] = roles[index];
        })
        maxValue = Object.keys(rolesMap).reduce(function(a, b){ return rolesMap[a] > rolesMap[b] ? a : b });
        mostPlayed = rolesMap[maxValue]
      },
    )
      }, [])
      const data = {
        labels: ['Top', 'Jungle', 'Mid', 'Adc', 'Support'],
        datasets: [
          {
            label: '# of Votes',
            data: [rolesArray[0], rolesArray[1], rolesArray[2], rolesArray[3], rolesArray[4]],
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
      <div className = "row">
        <div className = "column">
            <Doughnut data={data}
            height={500}
            width={800}
            options = {{
                maintainAspectRatio: false
            }}/>
        </div>

        <div className = " column">
          <p className = 'tag'>The most played role is {mostPlayed} with {maxValue} games played </p>
        </div>
      </div>
    )
};
export default DoughnutChart;