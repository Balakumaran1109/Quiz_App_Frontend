import React, { useEffect, useRef, useState } from "react";
import { getTimer, updateTimer } from "../api/timerApi";

const Countdown = ({handleTimeOut}) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const intervalRef = useRef(null);
  const timerId = localStorage.getItem("timer_id");

  const handleGetTimer = async () => {
    const data = await getTimer();
    setRemainingTime(data);
  };

  const handleUpdateTimer = async (newTime) => {
    await updateTimer(newTime);
  };


  // Get remaining time
  useEffect(() => {
    handleGetTimer();
  }, [timerId]);

  // Update Timer
  useEffect(() => {
    if (remainingTime === null) return;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (typeof prev !== "number" || isNaN(prev)) return 0;
        if (prev <= 0) {
          handleTimeOut(true)
          clearInterval(intervalRef.current);
          return 0;
        }

        const newTime = prev - 1;

        if (newTime % 5 === 0) {
          handleUpdateTimer(newTime);
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [remainingTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      <h1>{formatTime(remainingTime)}</h1>
    </>
  );
};

export default Countdown;
