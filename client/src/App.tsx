import { useEffect } from 'react'
import './App.css'
import { searchMovies } from './services/movieApi'

function App() {
  useEffect(()=>{
    const fetchdata =async ()=>{
      try{
        const data = await searchMovies()
        console.log(data)

      }catch(error){
        console.log(error)
      }
    }
    fetchdata()
  },[])
  

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
    <h1 className="text-6xl font-bold text-[#D4AF37]">
      LUMIO
    </h1>
  </div>
  )
}

export default App
