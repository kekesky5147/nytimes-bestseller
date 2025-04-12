// app/list/[name]/page.tsx
'use client' // 클라이언트 컴포넌트로 선언

import { use } from 'react'
import BuyLinks from './BuyLinks'

// PageProps 타입 정의
type PageProps = {
  params: Promise<{ name: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

type Book = {
  rank: number
  title: string
  author: string
  book_image: string
  amazon_product_url: string
}

type ListData = {
  list_name: string
  books: Book[]
}

// 데이터 페칭 함수
async function fetchListData (name: string): Promise<ListData> {
  const response = await fetch(
    `https://books-api.nomadcoders.workers.dev/list?name=${name}`,
    { cache: 'no-store' }
  )
  if (!response.ok) throw new Error(`데이터를 가져오지 못했어요: ${name}`)
  const json = await response.json()
  return json.results
}

export default function ListPage ({ params }: PageProps) {
  // use 훅으로 params 풀기
  const resolvedParams = use(params)

  // resolvedParams.name이 string임을 보장
  if (!resolvedParams || !resolvedParams.name) {
    return <div className='page'>에러: 리스트 이름을 찾을 수 없어요!</div>
  }

  // 클라이언트에서 데이터 페칭
  const listDataPromise = fetchListData(resolvedParams.name)
  const listData = use(listDataPromise)

  return (
    <div className='page'>
      <h1 className='title'>{listData.list_name}</h1>
      <div className='list-container'>
        {listData.books.map(book => (
          <div key={book.rank} className='book-item'>
            <img
              src={book.book_image}
              alt={book.title}
              className='book-image'
            />
            <div className='book-info'>
              <h3>{book.title}</h3>
              <p>
                Author: <br />
                {book.author}
              </p>
              <BuyLinks
                amazonUrl={book.amazon_product_url}
                title={book.title}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
