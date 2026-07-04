import { createRoot } from 'react-dom/client'
import App from './app/App'
import { LangProvider } from './locales/LangContext'
import { ThemeProvider } from './theme/ThemeContext'

createRoot(document.getElementById('root')).render(
  <LangProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </LangProvider>,
)
