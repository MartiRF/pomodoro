import React, { useCallback, useEffect, useState } from 'react'

export const Pomodoro = ({focuesTime = 5}) => {

  const [time, setTime] = useState(focuesTime * 60)
  const [seconds, setSeconds] = useState(focuesTime * 60);
  const [minutes, setMinutes] = useState(focuesTime);
  const [hours, setHours] = useState(focuesTime / 60);
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = useCallback(() => {
    setIsRunning(true)
  },[],);
  
  
  const handleStop = useCallback(() => {
    setIsRunning(false)
  },[],);

  const handlerReset = useCallback(() => {
    setSeconds(focuesTime * 60)
    setMinutes(focuesTime);
    setHours(focuesTime / 60)
    if(seconds >= 59){
      setSeconds(0)
    }
    if(minutes >= 59){
      setMinutes(0)
    }
    if(hours < 1){
      setHours(0)
    }
    setIsRunning(false)
  },[],);
  
  const updateTimie = () => {
    setTime(time => time - 1);
    setSeconds(preSeconds => preSeconds - 1)
    if(seconds === 0){
      setSeconds(59)
      setMinutes(preMinutes => preMinutes - 1);
      if(hours > 0){
        if(minutes === 0){
          setHours(preHours => preHours - 1)
          setMinutes(59)
        };
      };
    };
  };

  useEffect(() => {
    let intervalId;
    if(time === 0){
      setIsRunning(false)
    };
    if(isRunning){
      intervalId = setInterval(() => {
        updateTimie();
      },10)
    }else if(!isRunning && time == 0){
      clearInterval(intervalId);
    };
    return () => {
      clearInterval(intervalId)
    };
  }, [time, isRunning]);

  useEffect(() => {
    if(seconds >= 59){
      setSeconds(0)
    }
    if(minutes >= 59){
      setMinutes(0)
    }
    if(hours < 1){
      setHours(0)
    }
    
  },[]);

  return (
    <div>
        <h1>Timer: {`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</h1>
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleStop} disabled={!isRunning}>Stop</button>
        <button onClick={handlerReset}>Reset</button>
        {!isRunning && time == 0? <p>Termino</p> : null}
    </div>
  )
}
