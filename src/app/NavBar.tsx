// app/NavBar.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function NavBar () {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 다크모드 상태 관리
  useEffect(() => {
    // 페이지 로드 시 localStorage에서 다크모드 상태 가져오기
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode) {
      setIsDarkMode(JSON.parse(savedMode))
    }
  }, [])

  useEffect(() => {
    // 다크모드 상태에 따라 body 클래스 추가/제거
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
    // localStorage에 다크모드 상태 저장
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  return (
    <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
      <Link href='/' className='nav-link'>
        Home
      </Link>
      <div style={{ flex: 1 }} />
      <Link href='/aboutus' className='nav-link'>
        AboutUs
      </Link>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className='theme-toggle'
      >
        {isDarkMode ? '☀️ ' : '🌙 '}
      </button>
    </nav>
  )
}
