import { createRoot } from 'react-dom/client'
import App from './app/App'
import { LangProvider } from './locales/LangContext'
createRoot(document.getElementById('root')).render(
    <LangProvider>
        <App/>
    </LangProvider>
)
