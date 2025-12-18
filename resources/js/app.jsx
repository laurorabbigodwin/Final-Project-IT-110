import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import '../css/app.css'

const pages = import.meta.glob('./Pages/**/*.jsx')

// Initialize theme on page load (before React hydrates)
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme')
  const theme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  root.style.colorScheme = theme
}

createInertiaApp({
  resolve: name => {
    return pages[`./Pages/${name}.jsx`]()
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
