import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import axios from "axios"
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

function App() {

  return (
    <>
      <Navbar/>
      <Sidebar/>
    </>
  )
}

export default App
