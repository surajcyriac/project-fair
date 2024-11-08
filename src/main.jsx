import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import Contextapi from './context/Contextapi.jsx'
import Authcontext from './context/Authcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<Authcontext>
  <Contextapi>
    <BrowserRouter>
          <App />
      
    </BrowserRouter> 
  </Contextapi>
</Authcontext>

 </StrictMode>,
)
