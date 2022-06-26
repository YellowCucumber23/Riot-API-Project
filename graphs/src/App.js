import './App.css';
import React, {useState, useEffect} from 'react';
import DoughnutChart from './components/DoughnutChart';

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
      <DoughnutChart></DoughnutChart>
      {/* <h1 class = "Gamer">Wins</h1> */}

      {(typeof data.win == 'undefined') ? (
        <p>Loading....</p>
      ) : (
        data.win.map((win,i) => (
          <p key={i}>{win}</p>
        ))
      )}
  
    </div>

  );
}
export default App;