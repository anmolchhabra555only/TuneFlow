import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MusicProvider from './context/MusicContext'
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MusicProvider>
    <App />
    </MusicProvider>
  </BrowserRouter> 
)
