import { useEffect, useState } from "react";
import MetricCard from "../components/MetricCard";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Background from "../components/backgrounds/SpinningGearsBackground";
import "./Settings.css";

const metricsCardVarients = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: (custom) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: custom * 0.1,
      ease: "easeOut",
    },
  }),
};

const Settings = () => {
  // settings variables
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [hostname, setHostname] = useState("");
  const [antialias, setAntialias] = useState(null);
  const [powerPreference, setPowerPreference] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const name = await window.pywebview.api.get_name();
        const hostname = await window.pywebview.api.System.get_hostname();
        const antialias = await window.pywebview.api.App.ConfigManager.get_config_value("antialias");
        const powerPreference = await window.pywebview.api.App.ConfigManager.get_config_value("powerPreference");
        setName(name);
        setHostname(hostname);
        setAntialias(antialias);
        setPowerPreference(powerPreference);
      } catch (error) {
        setName("Your Device");
      }
    };

    fetchSettings();
  }, []);

  const handleNameChange = async (e) => {
    e.preventDefault();
    if (newName.length < 2) {
      alert("Device name must be at least 2 characters long.");
      return;
    }
    try {
      await window.pywebview.api.set_name(newName);
      setName(newName);
      setNewName("");
    } catch (error) {
      console.error("Failed to set name:", error);
    }
  };

  const handleNameReset = async () => {
    try {
      await window.pywebview.api.delete_name();
      const defaultName = await window.pywebview.api.get_name();
      setName(defaultName);
      setNewName("");
    } catch (error) {
      console.error("Failed to reset name:", error);
    }
  };

  const handleAntialiasChange = async (value) => {
    try {
      await window.pywebview.api.App.ConfigManager.set_config_value("antialias", value);
      setAntialias(value);
    } catch (error) {
      console.error("Failed to set antialias:", error);
    }
  };

  const handlePowerPreferenceChange = async (value) => {
    try {
      await window.pywebview.api.App.ConfigManager.set_config_value("powerPreference", value);
      setPowerPreference(value);
    } catch (error) {
      console.error("Failed to set power preference:", error);
    }
  };

  return (
    <div className="settings-container">
      <Background />
      <div className="header">
        <p className="device-name">{name}'s</p>
        <h1 className="app-title">Settings</h1>
      </div>
      <form onSubmit={handleNameChange} className="settings-form">
        <label>
          New Device Name:
        </label>
        <input
            type="text"
            placeholder={name}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        <motion.button whileHover={newName != "" ? {scale: 1.05} : {}} className={newName != "" ? "active" : ""} disabled={newName == ""} type="submit">Change Name</motion.button>
        <motion.button whileHover={hostname != name ? {scale: 1.05} : {}} className={hostname != name ? "active" : ""} disabled={hostname == name} type="button" onClick={handleNameReset}>Reset Name</motion.button>
      </form>
      <form className="settings-form">
        <h2>Performance Settings</h2>
        <label>Antialias:</label>
        <div className="form-group">
          <motion.button whileHover={antialias != true ? {scale: 1.05} : {}} className={antialias == true ? "active" : ""} style={antialias == false ? {cursor: "pointer"} : {cursor: "default"}} onClick={() => handleAntialiasChange(true)} type="button">True</motion.button>
          <motion.button whileHover={antialias != false ? {scale: 1.05} : {}} className={antialias == false ? "active" : ""} style={antialias == true ? {cursor: "pointer"} : {cursor: "default"}} onClick={() => handleAntialiasChange(false)} type="button">False</motion.button>
        </div>
        <label>Power Preference:</label>
        <div className="form-group">
          <motion.button whileHover={powerPreference != "default" ? {scale: 1.05} : {}} className={powerPreference === "default" ? "active" : ""} style={powerPreference != "default" ? {cursor: "pointer"} : {cursor: "default"}} onClick={() => handlePowerPreferenceChange("default")} type="button">Default</motion.button>
          <motion.button whileHover={powerPreference != "high-performance" ? {scale: 1.05} : {}} className={powerPreference === "high-performance" ? "active" : ""} style={powerPreference != "high-performance" ? {cursor: "pointer"} : {cursor: "default"}} onClick={() => handlePowerPreferenceChange("high-performance")} type="button">High Performance</motion.button>
          <motion.button whileHover={powerPreference != "low-power" ? {scale: 1.05} : {}} className={powerPreference === "low-power" ? "active" : ""} style={powerPreference != "low-power" ? {cursor: "pointer"} : {cursor: "default"}} onClick={() => handlePowerPreferenceChange("low-power")} type="button">Low Power</motion.button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
