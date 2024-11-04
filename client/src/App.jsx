import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"

function App() {

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
    </>
  )
}

export default App
