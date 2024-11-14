import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import axios from "axios"

function App() {

  // teste para recebimento de dados da backend
  const [teste, setTeste] = useState([]);
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api"); 
    setTeste(response.data.teste);
    console.log(response.data.teste);
  }; 

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <div>
        {teste.map((test, index) => (
          <div key={index}>
            <p>{test}</p>
          </div>
        ))}
      </div>
      <div className="container">
            <h1 className="p-5 text-center">Olá, Bootstrap com React!</h1>
            <button variant="primary">Clique aqui</button>
        </div>
    </>
  )
}

export default App
