import React, { useCallback, useEffect, useState } from 'react'
import ReactHowler from 'react-howler'
import soundClick from '../../assets/sounds/RUST_HitSoundEffect.mp3'
export const Pomodoro = ({focusTime = 10, freetime = 5}) => {

  const [pomodoroType, setPomodoroType] = useState({
    focusTime,
    freetime
  })

  //click sound
  const [isClick, setIsClick] = useState(false)
  //

  const [time, setTime] = useState(focusTime * 60);
  const [seconds, setSeconds] = useState(focusTime * 60);
  const [minutes, setMinutes] = useState(focusTime);
  const [hours, setHours] = useState(focusTime / 60);
  const [isRunning, setIsRunning] = useState(false);
  // Cambio de pomodoro
  const [isFocus, setIsFocus] = useState(true)

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
    <div className='w-full h-screen flex flex-col justify-center items-center gap-y-4'>
      
      <ReactHowler 
        src={soundClick}
        playing={isClick}
        loop={false}
        onEnd={() => setIsClick(false)}
      />

      <h1 className='text-5xl font-sans'>
        {isFocus ? 'Focus time' : 'Free time'}
      </h1>
      <h1 className='font-mono text-7xl'>
        {`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
      </h1>

      <div className='flex'>
        <button 
          className='btn_custum'
          style={isRunning ? {display:'none'} : {display: 'block'}} 
          onClick={handleStart} 
          disabled={isRunning}>
          Start
        </button>
        <button 
          className='btn_custum'
          style={!isRunning ? {display:'none'} : {display: 'block'}} 
          onClick={handleStop} 
          disabled={!isRunning}>
          Stop
        </button>
        <button
          className='btn_custum'
          onClick={handlerReset}>
          Reset
        </button>
      </div>
      <div className='border-4 border-indigo-600 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-96 w-96 absolute -z-20 rounded-full'></div>
      <div className='bg-white h-80 w-80 absolute -z-10 rounded-full'></div>
      {!isRunning && time == 0? <p>Termino</p> : null}
    </div>
  )
}
