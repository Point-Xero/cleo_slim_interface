import React, { useEffect, useState, useRef } from "react";
import mqtt from "mqtt";

function Bathroom() {
  const [elementOneState, setElementOneState] = useState("OFF");
  const [elementTwoState, setElementTwoState] = useState("OFF");
  const [temperature, setTemperature] = useState("--");
  const clientRef = useRef(null); // Store MQTT client instance

  // MQTT Connection Setup
  useEffect(() => {
    const client = mqtt.connect("ws://192.168.0.150:9001", {
      username: "mike",
      password: "shardadmin",
    });
    clientRef.current = client;

    client.on("connect", () => {
      console.log("Connected to MQTT Broker");

      // Subscribe to required topics
      client.subscribe("sensors/temperature", (err) => {
        if (err) console.error("Failed to subscribe to temperature topic");
      });
      client.subscribe("relays/element1", (err) => {
        if (err) console.error("Failed to subscribe to status/element1");
      });
      client.subscribe("relays/element2", (err) => {
        if (err) console.error("Failed to subscribe to status/element2");
      });
    });

    client.on("message", (topic, message) => {
      const payload = message.toString();
      if (topic === "sensors/temperature") {
        setTemperature(payload);
      } else if (topic === "relays/element1") {
        setElementOneState(payload); // Update state for element one
      } else if (topic === "relays/element2") {
        setElementTwoState(payload); // Update state for element two
      }
    });

    return () => {
      client.end(); // Ensure the connection is closed on unmount
    };
  }, []);

  // Publish Command
  const sendCommand = (topic, message) => {
    if (clientRef.current) {
      clientRef.current.publish(topic, message, {}, (err) => {
        if (err) console.error("Failed to publish MQTT message");
      });
    }
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
            const newState = elementOneState === "OFF" ? "ON" : "OFF";
            sendCommand("relays/element1", newState); // Publish the new state
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
            const newState = elementTwoState === "OFF" ? "ON" : "OFF";
            sendCommand("relays/element2", newState); // Publish the new state
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
  );
}

export default Bathroom;
