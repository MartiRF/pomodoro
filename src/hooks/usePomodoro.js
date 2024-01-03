import React, { useCallback, useEffect, useState } from 'react'

export const usePomodoro = (config) => {
  
  //Recibo el tiempo en segundos
  const [ configMain, setConfigMain ] = useState(config);
  const [timeMain, setTimeMain] = useState(configMain.focus)
  const [isRunning, setIsRunning] = useState(false);
  const [modePomodoro, setModePomodoro] = useState("focus");
	// sound
  const [isPause, setIsPause] = useState(false)

	const handleStart = useCallback(() => {
    setIsRunning(true);
    setIsPause(true)
  },[],);

	const handleStop = useCallback(() => {
    setIsRunning(false);
    setIsPause(true);
  },[],);

	const handlerReset = useCallback(() => {
    // sonido
    setIsPause(true);

    // const {focusTime,freeTime} = pomodoroType;
    if(modePomodoro === "focus"){
      setIsRunning(false)
      setTimeMain(configMain.focus)
    }
    else if(modePomodoro === "free"){
      setIsRunning(false)
      parseInt(configMain.free)
      setTimeMain(configMain.free)
    }
  },[modePomodoro],);
  
	const pomodoroFree = () => {
    setModePomodoro("free");
    setTimeMain(configMain.free)
    setIsRunning(false)
  }

  const pomodoroFocus = () => {
    setModePomodoro("focus");
    setTimeMain(configMain.focus)
  };

  const updateTime = () => {
    setTimeMain(timeMain => timeMain - 1);
  };

  // Control de tiempo
  useEffect(() => {
    let intervalId;
    if(timeMain === 0){
      setIsRunning(false)
    };
    if(isRunning){
      intervalId = setInterval(() => {
        updateTime();
        //Control del tick
      },1000)
    }else if(!isRunning && timeMain === 0){
      clearInterval(intervalId);
      //implementacion de cambio de pomodoro
      modePomodoro === "focus" ? pomodoroFree() : pomodoroFocus();
    };
    //limpiar bucle
    return () => {
      clearInterval(intervalId)
    };
  }, [isRunning, timeMain]);

  useEffect(() => {
    setTimeMain(config.focus)
  },[configMain]);


  return ({
    timeMain,
		isPause,
		setIsPause,
		modePomodoro,
		isRunning,
		handleStart,
		handleStop,
		handlerReset,
    setConfigMain
  })
}
