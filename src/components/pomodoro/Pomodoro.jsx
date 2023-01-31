import React, { useCallback, useEffect, useState } from 'react'

export const Pomodoro = ({focusTime = 10, freetime = 5}) => {

  const [pomodoroType, setPomodoroType] = useState({
    focusTime,
    freetime
  })

  const [time, setTime] = useState(focusTime * 60);
  const [seconds, setSeconds] = useState(focusTime * 60);
  const [minutes, setMinutes] = useState(focusTime);
  const [hours, setHours] = useState(focusTime / 60);
  const [isRunning, setIsRunning] = useState(false);
  // Cambio de pomodoro
  const [isFocus, setIsFocus] = useState(true)

  const handleStart = useCallback(() => {
    setIsRunning(true)
  },[],);
  
  const handleStop = useCallback(() => {
    setIsRunning(false)
  },[],);

  const handlerReset = useCallback(() => {

    const {focusTime,freetime} = pomodoroType;
    if(isFocus){
      setTime(focusTime * 60)
      setSeconds(focusTime * 60)
      setMinutes(focusTime);
      setHours(focusTime / 60)

      shapeTime();
      setIsRunning(false)
    }else{
      setTime(freetime * 60)
      setSeconds(freetime * 60)
      setMinutes(freetime);
      setHours(freetime / 60)

      shapeTime();
      setIsRunning(false)
    }
  },[isFocus],);

  //formatear el tiempo
  const shapeTime = () => {
    if(seconds >= 59){
      setSeconds(0)
    }
    if(minutes >= 59){
      setMinutes(0)
    }
    if(hours < 1){
      setHours(0)
    }
  }

  // Cambio de pomodoro
  
  const pomodoroFree = () => {
    const {freetime} = pomodoroType
    setTime(freetime * 60);
    setSeconds(freetime * 60);
    setMinutes(freetime);
    setHours(freetime / 60);
    shapeTime();

    setIsFocus(false);
    // setIsRunning(false)
  }

  const pomodoroFocus = () => {
    // setIsRunning(false)

    const {focusTime} = pomodoroType;

    setTime(focusTime * 60);
    setSeconds(focusTime * 60);
    setMinutes(focusTime);
    setHours(focusTime / 60);
    shapeTime();

    setIsFocus(true);
  };

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
      },1000)
    }else if(!isRunning && time == 0){
      clearInterval(intervalId);
      //implementacion de cambio de pomodoro
      isFocus ? pomodoroFree() : pomodoroFocus();
    };
    return () => {
      clearInterval(intervalId)
    };
  }, [time, isRunning]);

  useEffect(() => {
    shapeTime();
  },[isFocus]);

  return (
    <div>
        <h1>{isFocus ? 'Focus time' : 'Free time'}</h1>
        <h1>Timer: {`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</h1>
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleStop} disabled={!isRunning}>Stop</button>
        <button onClick={handlerReset}>Reset</button>
        {!isRunning && time == 0? <p>Termino</p> : null}
    </div>
  )
}
