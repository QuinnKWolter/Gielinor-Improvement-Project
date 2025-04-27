import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tickets from './pages/Tickets'
import About from './pages/About'
import Login from './pages/Login'
import Support from './pages/Support'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-base-300 text-base-content pt-16 pb-16">
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
