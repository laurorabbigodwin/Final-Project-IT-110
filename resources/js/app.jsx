import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import '../css/app.css'

const pages = import.meta.glob('./Pages/**/*.jsx')

createInertiaApp({
  resolve: name => {
    return pages[`./Pages/${name}.jsx`]()
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
