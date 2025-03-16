import React, { useState, useEffect } from 'react';

import Background from '../components/StructuredSquaresBackground';

function Storage() {
  const [hostname, setHostname] = useState('');
    
      useEffect(() => {
        const fetchHostname = async () => {
          try {
            if (window.pywebview?.api) {
              const name = await window.pywebview.api.get_name();
              setHostname(name);
            }
          } catch (error) {
            setHostname('Your Device');
          }
        };
        fetchHostname();
      }, []);

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <Background />
      <div className="header">
        <p className="device-name">{hostname}'s</p>
        <h1 className="app-title">Storage</h1>
        <p>Storage cleanup and info here.</p>
      </div>
    </div>
  );
}

export default Storage;
