import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Background from "../components/backgrounds/SpinningGearsBackground";
import "./Settings.css";

const sections = [
  { id: "appearance", label: "Appearance", Content: (label) => {
    return (<div className="settings-section">
      <p>Content for {label}...</p>
    </div>);
  } },
  { id: "user-experience", label: "User Experience", Content: (label) => {
    return (<div className="settings-section">
      <p>Content for {label}...</p>
    </div>);
  } },
  { id: "graphics", label: "Graphics", Content: (label) => {
    return (<div className="settings-section">
      <p>Content for {label}...</p>
    </div>);
  } },
  { id: "privacy", label: "Privacy and Security", Content: (label) => {
    return (<div className="settings-section">
      <p>Content for {label}...</p>
    </div>);
  } },
  { id: "advanced", label: "Advanced", Content: (label) => {
    return (<div className="settings-section">
      <p>Content for {label}...</p>
    </div>);
  } },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState("appearance");
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0.1 }
    );

    sections.forEach(({ id }) => {
      if (sectionRefs.current[id]) {
        observer.observe(sectionRefs.current[id]);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="settings-container">
      <Background />
      <div className="settings-sidebar-container">
        <div className="settings-sidebar">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              className={id === activeSection ? "active" : ""}
              onClick={() => scrollToSection(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-content">
        {sections.map(({ id, label, Content }) => (
          <section key={id} id={id} ref={(el) => (sectionRefs.current[id] = el)}>
            <h2>{label}</h2>
            <div className="settings-section">
              <p>Content for {label}...</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Settings;
