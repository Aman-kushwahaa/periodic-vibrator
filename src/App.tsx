import React, { useState, useEffect, useRef } from "react";

const App: React.FC = () => {
  const [isVibrating, setIsVibrating] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const handleButtonClick = () => {
    if (isVibrating) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsVibrating(false);
    } else {
      intervalRef.current = window.setInterval(() => {
        if (navigator.vibrate) {
          navigator.vibrate(200); // Vibrate for 200ms
        }
      }, 300000); // 300000ms = 5 minutes
      setIsVibrating(true);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={handleButtonClick}>
        {isVibrating ? "Stop Vibration" : "Start Vibration"}
      </button>
    </div>
  );
};

export default App;
