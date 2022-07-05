import './App.css';
import React, {useState, useEffect} from 'react';
import RolesDoughnutChart from './components/RolesDoughnutChart';

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

      {(typeof data.win === 'undefined') ? (
        <p>Loading...</p>
      ) : (
          data.win.map((win, i) => (
            <p key={i}>{win}</p>
          ))
      )}
    </div>

  );
}
export default App;