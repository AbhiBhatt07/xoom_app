// ============================================
// 2. ThemeToggle.tsx - Dark/Light Mode Toggle
// ============================================
'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const theme = localStorage.getItem('theme') || 'dark'
    setIsDark(theme === 'dark')
    applyTheme(theme)
  }, [])

  const applyTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    }
  }

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    setIsDark(!isDark)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-lg bg-dark-3 hover:bg-dark-4 text-yellow-1 transition-all duration-250 hover:shadow-dark-md transform hover:scale-110 active:scale-95'
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={20} className='animate-spin-slow' />
      ) : (
        <Moon size={20} />
      )}
    </button>
  )
}

export default ThemeToggle