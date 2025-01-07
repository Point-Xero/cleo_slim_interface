import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import mqtt from "mqtt";
import '../sub-views/css/sub-view-global.css';


function Default() {
    const [elementOneState, setElementOneState] = useState("OFF");
    const [elementTwoState, setElementTwoState] = useState("OFF");
    const [temperature, setTemperature] = useState("--");
  
    // MQTT Connection Setup
    useEffect(() => {
      const client = mqtt.connect("mqtt://192.168.0.150", {
        username: "mike",
        password: "shardadmin",
      });
  
      client.on("connect", () => {
        console.log("Connected to MQTT Broker");
        client.subscribe("sensors/temperature", (err) => {
          if (err) console.error("Failed to subscribe to temperature topic");
        });
      });
  
      client.on("message", (topic, message) => {
        if (topic === "sensors/temperature") {
          setTemperature(message.toString());
        }
      });
  
      return () => {
        client.end();
      };
    }, []);
  
    // Publish Function
    const sendCommand = (topic, message) => {
      const client = mqtt.connect("mqtt://192.168.0.150", {
        username: "mike",
        password: "shardadmin",
      });
  
      client.publish(topic, message, {}, (err) => {
        if (err) console.error("Failed to publish MQTT message");
        client.end();
      });
  
      client.end();
    };

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
