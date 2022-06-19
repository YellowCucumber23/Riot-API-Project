import './App.css';
import React, {useState, useEffect} from 'react'

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
      <h1 class = "Gamer">Wins</h1>

      {(typeof data.win == 'undefined') ? (
        <p>Loading....</p>
      ) : (
        data.win.map((win,i) => (
          <p key={i}>{win}</p>
        ))
      )}

      <button onClick= {() => window.location.reload(false)} class = "noot">Refresh Page!</button>

    </div>

  )
}
export default App;