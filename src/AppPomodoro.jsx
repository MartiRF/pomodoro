import React, { useState } from 'react'
import { Pomodoro } from './components'

export const AppPomodoro = () => {
  const [configTime, setConfigTime] = useState({
    focusTime: 25,
    freeTime: 5
  })
  //console.log(configTime)
  return (
    <div>
      <Pomodoro config={configTime} setConfig={setConfigTime} />
    </div>
  )
}
