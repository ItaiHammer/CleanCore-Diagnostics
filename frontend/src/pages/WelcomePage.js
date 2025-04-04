import React, { useState } from "react";
import { motion } from "framer-motion";

import SpaceBackground from "../components/backgrounds/SpaceBackground";
import "./WelcomePage.css";
import logo from "../assets/icons/logo.svg";

const pageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 5, delay: 1 } 
  },
};

const welcomeVariants = {
  hidden: { opacity: 0,},
  visible: { 
    opacity: 1,
    transition: { duration: 2, delay: 1 } 
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 3, delayChildren: 1, staggerChildren: 0.8 } 
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 3 } 
  },
};

const buttonTap = { scale: 0.95 };

function Popup({ onComplete }) {
  const [machineName, setMachineName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await window.pywebview.api.App.ConfigManager.set_config_value(
      "systemName",
      machineName.trim()
    );
    await window.pywebview.api.App.ConfigManager.set_config_value("hasSeenWelcome", true);
    onComplete();
  }

  async function handleSkip(e) {
    e.preventDefault();
    await window.pywebview.api.App.ConfigManager.set_config_value("hasSeenWelcome", true);
    onComplete();
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="welcome-page-container"
    >
      <SpaceBackground />
      <div className="welcome-page">
        <motion.img 
          src={logo} 
          className="welcome-logo" 
          alt="Logo" 
          variants={childVariants} 
        />
        <motion.div 
          className="welcome"
          variants={welcomeVariants}
          style={{ display: 'block', margin: '30px auto', textAlign: 'center' }}
        >
          Welcome
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <motion.div className="input-with-icon" variants={childVariants}>
            <div className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 8 8"
                className="input-icon"
              >
                <path fill="currentColor" d="M6 0L5 1l2 2l1-1zM4 2L0 6v2h2l4-4z" />
              </svg>
            </div>
            <motion.input
              className="welcome-input"
              type="text"
              value={machineName}
              onChange={(e) => setMachineName(e.target.value)}
              placeholder="Choose a name for this computer"
              variants={childVariants}
            />
          </motion.div>
          <motion.button
            type="submit"
            className={machineName.trim() ? "active" : ""}
            disabled={!machineName.trim()}
            variants={childVariants}
            whileTap={buttonTap}
          >
            Start
          </motion.button>
          <motion.div className="welcome-page-skip-container" variants={childVariants}>
            <motion.button
              type="button"
              style={{
                background: "none",
                width: "fit-content",
                fontWeight: 600,
                color: "#FFFFFF",
              }}
              onClick={handleSkip}
              variants={childVariants}
              whileTap={buttonTap}
            >
              Maybe Later
            </motion.button>
            <motion.p variants={childVariants}>
              You can always change it in Settings
            </motion.p>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}

export default Popup;
