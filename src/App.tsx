import React from 'react'
import TopBar from './components/TopBar'
import LeftPanel from './components/LeftPanel'
import Radar from './components/Radar'
import RightPanel from './components/RightPanel'
import Footer from './components/Footer'
import './index.css'

const App: React.FC = () => {
  return (
    <div className="vmh-app">
      <TopBar />
      <div className="vmh-body">
        <aside className="vmh-left"><LeftPanel /></aside>
        <main className="vmh-center"><Radar /></main>
        <aside className="vmh-right"><RightPanel /></aside>
      </div>
      <Footer />
    </div>
  )
}

export default App
