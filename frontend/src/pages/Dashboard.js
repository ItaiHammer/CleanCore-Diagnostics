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
import "./Dashboard.css";
import Background from "../components/backgrounds/PulsingBackground";

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

const Dashboard = () => {
  const [cpuData, setCpuData] = useState({ usage: 0, speed: 0 });
  const [memoryData, setMemoryData] = useState({
    used: 0,
    total: 0,
    percent: 0,
  });
  const [cpuHistory, setCpuHistory] = useState(
    Array.from({ length: 60 }, (_, i) => ({
      time: Date.now() - (60 - i) * 1000,
      usage: 0,
    }))
  );
  const [memoryHistory, setMemoryHistory] = useState(
    Array.from({ length: 60 }, (_, i) => ({
      time: Date.now() - (60 - i) * 1000,
      usage: 0,
    }))
  );
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    const fetchHostname = async () => {
      try {
        const name = await window.pywebview.api.get_name();
        setHostname(name);
      } catch (error) {
        setHostname("Your Device");
      }
    };
    fetchHostname();
  }, []);

  useEffect(() => {
    const fetchHardwareData = async () => {
      try {
        const [cpu, memory] = await Promise.all([
          window.pywebview.api.System.HardwareUtils.get_cpu_data(),
          window.pywebview.api.System.HardwareUtils.get_memory_data(),
        ]);

        setCpuHistory((prev) => [
          ...prev.slice(-59),
          { time: Date.now(), usage: cpu.percent_usage },
        ]);

        setMemoryHistory((prev) => [
          ...prev.slice(-59),
          { time: Date.now(), usage: memory.percent_usage },
        ]);

        setCpuData({
          usage: cpu.percent_usage,
          speed: (cpu.speed / 1000).toFixed(2),
        });

        setMemoryData({
          used: (memory.used / 1024 ** 3).toFixed(1),
          total: (memory.total / 1024 ** 3).toFixed(1),
          percent: memory.percent_usage,
        });
      } catch (error) {
        console.error("Data fetch error:", error);
      }
    };

    const interval = setInterval(fetchHardwareData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <Background />
      <div className="header">
        <p className="device-name">{hostname}'s</p>
        <h1 className="app-title">Dashboard</h1>
      </div>

      <motion.div className="metrics-grid">
        {["CPU", "Memory", "Memory", "Memory", "Memory", "Memory", "Memory"].map((metric, index) => (
          <MetricCard
            key={index}
            metric={metric}
            data={metric === "CPU" ? cpuData : memoryData}
            history={metric === "CPU" ? cpuHistory : memoryHistory}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
