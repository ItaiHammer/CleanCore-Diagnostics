import React, { useState, useEffect } from 'react';
import Background from '../components/SpinningShapesBackground';

function Processes() {
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
        <h1 className="app-title">Processes</h1>
        <p>List or manage processes here.</p>
      </div>
    </div>
  );
}

export default Processes;
