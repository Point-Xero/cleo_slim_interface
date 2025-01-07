import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import mqtt from "mqtt";

function Bathroom() {
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      <h1>Smart Boiler Control</h1>
      <div style={{ margin: "20px 0" }}>
        <h2>Temperature: {temperature}°C</h2>
      </div>
      <div>
        <button
          onClick={() => {
            sendCommand("relays/element1", elementOneState === "OFF" ? "ON" : "OFF");
            setElementOneState(elementOneState === "OFF" ? "ON" : "OFF");
          }}
          style={{
            padding: "10px 20px",
            margin: "10px",
            fontSize: "16px",
            backgroundColor: elementOneState === "OFF" ? "red" : "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Element One: {elementOneState}
        </button>
        <button
          onClick={() => {
            sendCommand("relays/element2", elementTwoState === "OFF" ? "ON" : "OFF");
            setElementTwoState(elementTwoState === "OFF" ? "ON" : "OFF");
          }}
          style={{
            padding: "10px 20px",
            margin: "10px",
            fontSize: "16px",
            backgroundColor: elementTwoState === "OFF" ? "red" : "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Element Two: {elementTwoState}
        </button>
      </div>
    </div>
    )
}

export default Bathroom
