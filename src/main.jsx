import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Theme from './Contexts/Theme.jsx'
import Tabs from './Contexts/Tabs.jsx'
import AppContext from './Contexts/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Theme>
        <Tabs>
          <AppContext>
            <App />
          </AppContext>
        </Tabs>
      </Theme>
    </BrowserRouter>
  </StrictMode>,
)
