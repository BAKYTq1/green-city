import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './app/App'
import { LangProvider } from './locales/LangContext'
import { ThemeProvider } from './theme/ThemeContext'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <LangProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LangProvider>
  </HelmetProvider>,
)