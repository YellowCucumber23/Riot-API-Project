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
          <button onClick= {() => window.location.reload(false)} class = "noot">
            Refresh Page!</button>
        </div>
      </div>
      <RolesDoughnutChart></RolesDoughnutChart>
    </div>

  );
}
export default App;