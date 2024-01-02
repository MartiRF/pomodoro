import React, { useCallback, useEffect, useState } from 'react'

export const usePomodoro = (focusTime,freeTime) => {
  console.log(focusTime,freeTime)


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
    // sonido
    setIsClick(true);

    // const {focusTime,freeTime} = pomodoroType;
    if(isFocus){
      setTime(focusTime * 60)
      setSeconds(focusTime * 60)
      setMinutes(focusTime);
      setHours(focusTime / 60)

      shapeTime();
      setIsRunning(false)
    }else{
      setTime(freeTime * 60)
      setSeconds(freeTime * 60)
      setMinutes(freeTime);
      setHours(freeTime / 60)

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
    // console.log(freeTime)
    setTime(freeTime * 60);
    setSeconds(freeTime * 60);
    setMinutes(freeTime);
    setHours(freeTime / 60);

    setIsFocus(false);
    setIsRunning(false)
    


    // shapeTime();
    
  }

  const pomodoroFocus = () => {
    // setIsRunning(false)

    // const {focusTime} = pomodoroType;

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

  // Control de tiempo
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
