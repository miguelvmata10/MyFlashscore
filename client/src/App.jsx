import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path="/about" element={<div>Sobre a aplicação</div>} />
      </Routes>
    </Router>
  )
}

export default App
