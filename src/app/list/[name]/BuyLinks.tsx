'use client'

import { useState, useEffect, useRef } from 'react'

type BuyLinksProps = {
  amazonUrl: string
  title: string
}

export default function BuyLinks ({ amazonUrl, title }: BuyLinksProps) {
  const [showLinks, setShowLinks] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null) // 드롭다운

  //빈공간 등, 외부 클릭 설정
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLinks(false)
      }
    }

    if (showLinks) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showLinks])

  const encodedTitle = encodeURIComponent(
    title.toLowerCase().replace(/\s+/g, '-')
  )

  const links = [
    { name: 'Amazon', url: amazonUrl },
    {
      name: 'Apple Books',
      url: `https://books.apple.com/us/book/${encodedTitle}`
    },
    {
      name: 'Barnes & Noble',
      url: `https://www.barnesandnoble.com/w/${encodedTitle}`
    },
    {
      name: 'Books-a-Million',
      url: `https://www.booksamillion.com/search?query=${encodedTitle}`
    }
  ]

  return (
    <div className='buy-links-container' ref={dropdownRef}>
      <button
        onClick={e => {
          e.stopPropagation()
          setShowLinks(!showLinks)
        }}
        className='buy-button'
      >
        Buy {showLinks ? '▲' : '▼'}
      </button>
      {showLinks && (
        <ul className='buy-links-list'>
          {links.map(link => (
            <li key={link.name}>
              <a
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className='buy-link'
                onClick={e => e.stopPropagation()}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
