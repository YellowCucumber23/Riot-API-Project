import './App.css';
import React, {useRef, useEffect, useState} from 'react';
import RolesDoughnutChart from './components/RolesDoughnutChart';
import TopDoughnutChart from './components/TopDoughnutChart';
import JungleDoughnutChart from './components/JungleDoughnutChart';
import MidDoughnutChart from './components/MidDoughnutChart';
import BottomDoughnutChart from './components/BottomDoughnutChart';
import SupportDoughnutChart from './components/SupportDoughnutChart';


function App() {
  
  const rolesRef = useRef(null);
  const topRef = useRef(null)
  const jungleRef = useRef(null)
  const midRef = useRef(null)
  const botRef = useRef(null)
  const supportRef = useRef(null)


  const scrollToRoles = () => rolesRef.current.scrollIntoView();  
  const scrollToTop = () => topRef.current.scrollIntoView();
  const scrollToJungle = () => jungleRef.current.scrollIntoView();
  const scrollToMid = () => midRef.current.scrollIntoView();
  const scrollToBot = () => botRef.current.scrollIntoView();
  const scrollToSupport = () => supportRef.current.scrollIntoView();
  
  return (
    <div>
      <div className="container">
        <div className="center">
          <button onClick= {() => window.location.reload(false)} className = "reload">
            Refresh Data! hi i am fat</button>
        </div>
      </div>

      {/*Buttons at top of screen*/}
      <div className = "grid-container">
        <div className = "grid-item">
          <button className = "scrollButton" onClick= {scrollToRoles}>Roles</button>
        </div>

        <div className = "grid-item">
        <button className = "scrollButton" onClick= {scrollToTop}>TOP</button>
        </div>

        <div className = "grid-item">
        <button className = "scrollButton" onClick= {scrollToJungle}>JUNGLE</button>
        </div>

        <div className = "grid-item">
        <button className = "scrollButton" onClick= {scrollToMid}>MIDDLE</button>
        </div>

        <div className = "grid-item">
        <button className = "scrollButton" onClick= {scrollToBot}>BOTTOM</button>
        </div>

        <div className = "grid-item">
        <button className = "scrollButton" onClick= {scrollToSupport}>SUPPORT</button>
        </div>
      </div>
      <h1 ref={rolesRef}> All Roles</h1>
      <RolesDoughnutChart/>
      <h1 ref={topRef}>Top</h1>
      <TopDoughnutChart/>
      <h1 ref={midRef}>Mid</h1>
      <MidDoughnutChart/>
      <h1 ref={jungleRef}>Jungle</h1>
      <JungleDoughnutChart/>
      <h1 ref={botRef}>Bottom</h1>
      <BottomDoughnutChart/>
      <h1 ref={supportRef}>Support</h1>
      <SupportDoughnutChart/>

    </div>

  );
}

export default App;