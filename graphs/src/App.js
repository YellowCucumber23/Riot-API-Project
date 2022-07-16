import './App.css';
import React, {useState, useEffect} from 'react';
import RolesDoughnutChart from './components/RolesDoughnutChart';
import TopDoughnutChart from './components/TopDoughnutChart';
import JungleDoughnutChart from './components/JungleDoughnutChart';
import MidDoughnutChart from './components/MidDoughnutChart';
import BottomDoughnutChart from './components/BottomDoughnutChart';
import SupportDoughnutChart from './components/SupportDoughnutChart';


function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setData(data)
        }
    )
      }, [])

  return (
    <div>
      <div class="container">
        <div class="center">
          <button onClick= {() => window.location.reload(false)} className = "noot">
            Refresh Data!</button>
        </div>
      </div>

      <RolesDoughnutChart></RolesDoughnutChart>
      <h1>Top</h1>
      <TopDoughnutChart></TopDoughnutChart>
      <h1>Jungle</h1>
      <JungleDoughnutChart></JungleDoughnutChart>
      <h1>Mid</h1>
      <MidDoughnutChart></MidDoughnutChart>
      <h1>Bottom</h1>
      <BottomDoughnutChart></BottomDoughnutChart>
      <h1>Support</h1>
      <SupportDoughnutChart></SupportDoughnutChart>

      {/* {(typeof data.win === 'undefined') ? (
        <p>Loading...</p>
      ) : (
          data.win.map((win, i) => (
            <p key={i}>{win}</p>
          ))
      )} */}
    </div>

  );
}
export default App;