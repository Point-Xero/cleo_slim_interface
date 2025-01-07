import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import mqtt from "mqtt";
import '../sub-views/css/sub-view-global.css';


function Default() {

    return (
    
    <div>
        <div className="subnav">
        <NavLink to="guestroom" className={({ isActive }) => (isActive ? 'active' : '')}>
          GuestRoom
        </NavLink>
        <NavLink to="bathroom" className={({ isActive }) => (isActive ? 'active' : '')}>
          Bathroom
        </NavLink>
        <NavLink to="outdoor" className={({ isActive }) => (isActive ? 'active' : '')}>
          Outdoor
        </NavLink>
        <NavLink to="alarm" className={({ isActive }) => (isActive ? 'active' : '')}>
          Alarm
        </NavLink>
      </div>
      <div className="subnav-outlet">
        <Outlet />
      </div>
    </div>
    );
}

export default Default;
