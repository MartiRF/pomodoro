import React, { useCallback, useEffect, useState } from 'react'
import ReactHowler from 'react-howler'


import soundClick from '../../assets/sounds/RUST_HitSoundEffect.mp3'
import { usePomodoro } from '../../hooks/usePomodoro'
import { Config } from '../Config'

export const Pomodoro = ({config, setConfig}) => {
  const {focusTime, freeTime} = config;

  const {
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
		handlerReset,} = usePomodoro(focusTime,freeTime);
    
    useEffect(() => {
    }, [config]);
  return (
    <div className='bg-white h-screen flex justify-center items-center -z-10'>
      
      <ReactHowler 
        src={soundClick}
        playing={isClick}
        loop={false}
        onEnd={() => setIsClick(false)}
      />
      <div className='flex flex-col items-center gap-2 z-30'>
        <Config setConfig={setConfig}/>
        <h1 className='text-4xl uppercase'>
          {isFocus ? 'Focus time' : 'Free time'}
        </h1>
        <h1 className='text-6xl'>
          {`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
        </h1>

        <div className='flex w-full justify-between mt-6'>
          <button 
            className='btn_primary'
            style={isRunning ? {display:'none'} : {display: 'block'}} 
            onClick={handleStart} 
            disabled={isRunning}>
            Start
          </button>
          <button 
            className='btn_primary'
            style={!isRunning ? {display:'none'} : {display: 'block'}} 
            onClick={handleStop} 
            disabled={!isRunning}>
            Stop
          </button>
          <button
            className='btn_primary'
            onClick={handlerReset}>
            Reset
          </button>
        </div>
      </div>
      <div className='bg-yellow-400 h-full w-full absolute z-20' style={{width:'10%'}}></div>
      <div className='bg-yellow-400 h-full w-full absolute z-20' style={{height:'10%'}}></div>
      <div className='bg-white h-full w-full absolute z-10' ></div>
      <div className='bg-white h-[95%] w-[92%] absolute z-20'></div>

    </div>
  )
}
