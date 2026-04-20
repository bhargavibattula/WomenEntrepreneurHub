import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { SocketProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <SocketProvider>
        <App />
        <ToastContainer        
          position="top-right" // You can change the position
          autoClose={3000} // Auto close duration in ms
          hideProgressBar={false} // You can show/hide progress bar
          newestOnTop={false} // Whether to show new toasts on top
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>
    </SocketProvider>
  </BrowserRouter>
  </StrictMode>,
)
