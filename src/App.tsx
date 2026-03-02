import React from 'react'
import './styles/global.css'
import MainLayout from './components/layout/MainLayout'
import { useNavigationData } from './hooks/useNavigationData'

/** Root application component — renders only one child component. */
const App: React.FC = () => {
  const { telemetry, setTelemetry } = useNavigationData()

  return <MainLayout telemetry={telemetry} setTelemetry={setTelemetry} />
}

export default App
