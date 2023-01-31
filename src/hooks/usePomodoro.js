import React, { useCallback, useEffect, useState } from 'react'

export const usePomodoro = (focusTime,freeTime) => {
  
  const [pomodoroType, setPomodoroType] = useState({
    focusTime,
    freeTime
  });
  const [time, setTime] = useState(focusTime * 60);
  const [seconds, setSeconds] = useState(focusTime * 60);
  const [minutes, setMinutes] = useState(focusTime);
  const [hours, setHours] = useState(focusTime / 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
	// sound
  const [isClick, setIsClick] = useState(false)

	const handleStart = useCallback(() => {
    setIsRunning(true);
    setIsClick(true)
  },[],);

	const handleStop = useCallback(() => {
    setIsRunning(false);
    setIsClick(true);
  },[],);

	const handlerReset = useCallback(() => {
    setIsClick(true);
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


  return ({
		isClick,
		setIsClick,
		isFocus,
		time,
		hours,
		minutes,
		seconds,
		isRunning,
		handleStart,
		handleStop,
		handlerReset,
  })
}
