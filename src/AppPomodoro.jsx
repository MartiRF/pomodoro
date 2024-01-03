import React, { useState } from 'react'
import { Pomodoro } from './components'

export const AppPomodoro = () => {
  const [configTime, setConfigTime] = useState({
    focus: 25 * 60,
    free: 5 * 60
  })
  
  return (
    <div>
      <Pomodoro config={configTime} setConfig={setConfigTime} />
    </div>
  )
}
