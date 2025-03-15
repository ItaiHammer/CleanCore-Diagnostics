import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VaporwaveBackground from '../components/VaporwaveBackground.js';
import './Home.css';

const sunVariants = {
  initial: {
    opacity: 0.9,
    scale: 0.95,
    y: -10,
  },
  animate: {
    opacity: [0.9, 1, 0.9],
    scale: [0.95, 1.0, 0.95],
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    }
  }
};

export default function Home() {
  const [hostname, setHostname] = useState();

  useEffect(() => {
    const fetchHostname = async () => {
      try {
        if (window.pywebview && window.pywebview.api) {
          const name = await window.pywebview.api.get_name();
          setHostname(name);
        }
      } catch (error) {
        console.error('Error fetching hostname:', error);
        setHostname("User");
      }
    };

    fetchHostname();
  }, [window.pywebview]);

  return (
    <div className="home-container">
      <VaporwaveBackground />
      <div className="sun-container">
        <motion.div 
        className="sun"
        variants={sunVariants}
        initial="initial"
        animate="animate"
        />
      </div>
      
      <motion.div 
        className="title-group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="hello-text">HELLO</h1>
        <h2 className="username">{hostname}</h2>
      </motion.div>

      <p style={{zIndex: 1}}>Other content...</p>
    </div>
  );
}