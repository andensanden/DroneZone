// useFlightTimer.js
import { useEffect, useState } from "react";

export default function useFlightTimer(active = true, resetTrigger = 0) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    setElapsedSeconds(0); // reset when resetTrigger changes
  }, [resetTrigger]);

  useEffect(() => {
    if (!active) return;

    const intervalId = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [active]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return {
    elapsedSeconds,
    formatted: formatTime(elapsedSeconds),
  };
}
