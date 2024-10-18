import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FavoriteEmailsContextProvider } from './contexts/FavoriteEmailsContext'
import { ReadEmailsContextProvider } from './contexts/ReadEmailsContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoriteEmailsContextProvider>
      <ReadEmailsContextProvider>
        <App />
      </ReadEmailsContextProvider>
    </FavoriteEmailsContextProvider>
  </StrictMode>,
)
