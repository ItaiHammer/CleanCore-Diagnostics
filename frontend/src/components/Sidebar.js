import React from 'react';
import { motion } from 'framer-motion';
import './Sidebar.css';

// icon imports
import { ReactComponent as BuyMeACoffeIcon } from "../assets/icons/buymeacoffe.svg";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";

// page imports
import Home from '../pages/Home';
import Processes from '../pages/Processes';
import Storage from '../pages/Storage';

const sidebarVariants = {
  initial: {
    x: -200,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// icons sourced from https://icon-sets.iconify.design
export const pages = [
  { id: 0, 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19"/></svg>,
    label: "Home",
    element: <Home /> 
  },
  { id: 1,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm8 8h6V5h-6zm-8 2v6h6v-6zm0-2h6V5H5z"/></g></svg>,
    label: "Processes",
    element: <Processes />
  },
  { id: 2,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 2h-7.17c-.53 0-1.04.21-1.42.59L4.6 7.42c-.37.37-.6.88-.6 1.4V20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-7 6c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1m3 0c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1m3 0c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1"/></svg>,
    label: "Storage",
    element: <Storage />
  },
];

function Sidebar({ activePage, onChangePage }) {
  return (
    <motion.aside
      className="sidebar"
      variants={sidebarVariants}
      initial="initial"
      animate="animate"
    >
      <div className="sidebar-separator" />
      <div className="sidebar-logo">
        <Logo />
      </div>

      <nav className="nav-links">
        {pages.map((page) => (
          <motion.button
            key={page.id}
            className={`sidebar-button ${
              activePage.id === page.id ? 'active current-page' : ''
            }`}
            onClick={() => onChangePage(page)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (page.id * 0.1) + 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            {page.icon}
            {page.label}
          </motion.button>
        ))}
      </nav>

      <a href="https://www.buymeacoffee.com/itaihammer" target="_blank" rel="noreferrer">
          <motion.button
          initial={{ opacity: 0, y: 20}}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 }}}
          whileHover={{ scale: 1.05, transition: {duration: 0.3, delay: 0, ease: "easeInOut"} }}
          className="coffee-btn"
        >
          <BuyMeACoffeIcon className="coffee-icon" />
        </motion.button>
      </a>

      <div className="bottom-icons">
        <button
          className="icon-btn"
          title="Settings"
        >
          <span className="gear-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zm1.225-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"/></svg></span>
        </button>

        <button
          className="icon-btn"
          title="Notifications"
        >
          <span className="bell-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"/></svg></span>
          <span className="notification-dot" />
        </button>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
