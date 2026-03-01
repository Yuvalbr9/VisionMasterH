  import React, { useEffect, useState } from 'react'
  import './Timer.css'

const Timer: React.FC = () => {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="timer">
      <div className="now">{now.toUTCString().split(' GMT')[0]}</div>
      <div className="small">UTC</div>
    </div>
  )
}

export default Timer
