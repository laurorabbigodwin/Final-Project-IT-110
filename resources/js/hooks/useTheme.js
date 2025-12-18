import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        return savedTheme
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const html = document.documentElement
      
      // Remove any existing theme classes first
      html.classList.remove('light', 'dark')
      
      // Add the current theme class
      html.classList.add(theme)
      localStorage.setItem('theme', theme)
      
      // Set color scheme for browser UI
      html.style.colorScheme = theme
      
      // Force a reflow to trigger repaint
      void html.offsetHeight
      
      // Debug log
      console.log('✅ Theme changed to:', theme)
      console.log('✅ HTML classes:', html.classList.toString())
      console.log('✅ Dark class present:', html.classList.contains('dark'))
    })
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      console.log('Toggling theme from', prevTheme, 'to', newTheme)
      return newTheme
    })
  }

  return { theme, toggleTheme, setTheme }
}

