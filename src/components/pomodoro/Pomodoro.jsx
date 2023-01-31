import React, { useCallback, useEffect, useState } from 'react'
import ReactHowler from 'react-howler'


import soundClick from '../../assets/sounds/RUST_HitSoundEffect.mp3'
import { usePomodoro } from '../../hooks/usePomodoro'

export const Pomodoro = ({focusTime = 10, freeTime = 5}) => {

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

    </div>
  )
}
