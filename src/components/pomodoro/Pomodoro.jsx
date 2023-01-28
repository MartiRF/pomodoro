import React, { useCallback, useEffect, useState } from 'react'

export const Pomodoro = () => {
  console.log('render')
  const [time, setTime] = useState(0)
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false)

  const handleStart = useCallback(() => {
    setIsRunning(true)
  },[],);
  
  
  const handleStop = useCallback(() => {
    setIsRunning(false)
  },[],);

  const handlerReset = useCallback(() => {
    setSeconds(0)
    setMinutes(0);
    setHours(0)
    setIsRunning(false)
  },[],);

  const updateTimie = () => {
    setTime(time => time + 1);
    setSeconds(preSeconds => preSeconds + 1);
    if(seconds === 59){
      setSeconds(0);
      setMinutes(preMinutes => preMinutes + 1)
    }
    if(minutes === 59){
      setMinutes(0);
      setHours(preHours => preHours + 1)
    }
  }

  useEffect(() => {
    let intervalId;
    if(isRunning){
      intervalId = setInterval(() => {
        updateTimie();
      },1000)
    }else if(!isRunning && time !== 0){
      clearInterval(intervalId);
    }
  
    return () => {
      clearInterval(intervalId)
    }
  }, [time, isRunning])
  

  return (
    <div>
        <h1>Timer: {`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</h1>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handlerReset}>Reset</button>
    </div>
  )
}
