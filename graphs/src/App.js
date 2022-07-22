import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import RolesDoughnutChart from './components/RolesDoughnutChart';
import TopDoughnutChart from './components/TopDoughnutChart';
import JungleDoughnutChart from './components/JungleDoughnutChart';
import MidDoughnutChart from './components/MidDoughnutChart';
import BottomDoughnutChart from './components/BottomDoughnutChart';
import SupportDoughnutChart from './components/SupportDoughnutChart';


function App() {
  const rolesRef = useRef(null);
  const scrollToRoles = () => rolesRef.current.scrollIntoView();
  const useMountEffect = fun => useEffect(fun, []);
  useMountEffect(scrollToRoles);
  

  return (
    <div>
      <div className="container">
        <div className="center">
          <button onClick= {() => window.location.reload(false)} className = "reload">
            Refresh Data!</button>
        </div>
      </div>

      <div className = "grid-container">
        <div className = "grid-item">
          {/* <h2>Roles</h2> */}
          <button className = "scrollButton" onClick= {scrollToRoles}>Roles</button>
          {/* <RolesDoughnutChart/> */}
        </div>

        <div className = "grid-item">
        <button className = "scrollButton">TOP</button>
          {/* <TopDoughnutChart/> */}
        </div>

        <div className = "grid-item">
        <button className = "scrollButton">JUNGLE</button>
          {/* <JungleDoughnutChart/> */}
        </div>

        <div className = "grid-item">
        <button className = "scrollButton">MIDDLE</button>
          {/* <MidDoughnutChart/> */}
        </div>

        <div className = "grid-item">
        <button className = "scrollButton">BOTTOM</button>
          {/* <BottomDoughnutChart/> */}
        </div>

        <div className = "grid-item">
        <button className = "scrollButton">SUPPORT</button>
          {/* <SupportDoughnutChart/> */}
        </div>
      </div>

      <div style={{ height: 1500 }} /> {/* just to demonstrate scroll*/}

      <h1 ref={rolesRef}>hi</h1>

    </div>

  );
}
export default App;