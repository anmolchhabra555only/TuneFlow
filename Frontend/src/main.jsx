import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MusicProvider from './context/MusicContext'
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MusicProvider>
    <App />
    <Toaster position="top-right" />
    </MusicProvider>
  </BrowserRouter> 
)
