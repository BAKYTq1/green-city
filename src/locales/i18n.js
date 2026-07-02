// Импортируем все JSON файлы один раз
import en from './en/en.json'
import ru from './ru/ru.json'
import kg from './kg/kg.json'

// Единый объект со всеми переводами
export const translations = {
  ky: kg,
  ru: ru,
  en: en,
}

// Доступные языки
export const langs = ['ky', 'ru', 'en']
export const langLabels = { ky: 'KY', ru: 'RU', en: 'EN' }

// Функция для получения перевода
export function getTranslation(lang, key) {
  const keys = key.split('.')
  let result = translations[lang]
  
  for (const k of keys) {
    if (result && result[k]) {
      result = result[k]
    } else {
      return key
    }
  }
  
  return result
}