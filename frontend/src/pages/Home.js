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

const splashTexts = [
  "Cleancore: Because your PC deserves it.",
  "Keeping things tidy, one byte at a time.",
  "Smooth sailing ahead! 🌊",
  "Your PC just took a deep breath. 😌",
  "Like a fresh install... but better!",
  "Every click feels faster now. 🏎️",
  "A clean PC is a happy PC.",
  "Performance levels: Over 9000!",
  "Your PC just got a digital detox.",
  "Like magic, but real!",
  "No lag, no worries!",
  "We just took out the digital trash. 🗑️",
  "Cleaner, faster, better!",
  "Cleancore: Your system’s best friend.",
  "The bytes feel lighter already. 🎈",
  "Junk-free and stress-free! 🌿",
  "Your PC feels lighter already! 🎈",
  "Click. Clean. Optimize. Repeat. 🔄",
  "Because speed matters. 🏎️💨"
];

export default function Home() {
  const [hostname, setHostname] = useState();
  const [catchPhrase, setCatchPhrase] = useState(splashTexts[Math.floor(Math.random() * splashTexts.length)]);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const fetchHostname = async () => {
      try {
        if (window.pywebview) {
          const name = await window.pywebview.api.get_name();
          setHostname(name);
        }
      } catch (error) {
        console.error('Error fetching hostname:', error);
        setHostname("User");
      }
    };

    fetchHostname();
  }, []);

  useEffect(() => {
    let i = 0;
    let text = ""
    setDisplayText("");
    const interval = setInterval(() => {
      if (i < catchPhrase.length) {
        text += catchPhrase.charAt(i);
        setDisplayText(text);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [catchPhrase]);

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

      <p
        className="catch-phrase"
      >
        {displayText}
      </p>
    </div>
  );
}
