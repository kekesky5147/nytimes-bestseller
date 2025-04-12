// app/list/[name]/page.tsx
import BuyLinks from './BuyLinks'

// PageProps 타입 정의
type PageProps = {
  params: Promise<{ name: string }> // params가 Promise임을 반영
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

async function getListData (name: string): Promise<ListData> {
  const response = await fetch(
    `https://books-api.nomadcoders.workers.dev/list?name=${name}`,
    { cache: 'no-store' }
  )
  if (!response.ok) throw new Error(`데이터를 가져오지 못했어요: ${name}`)
  const json = await response.json()
  return json.results
}

// ListPage는 async로 선언
export default async function ListPage ({ params }: PageProps) {
  // params를 await로 풀기
  const resolvedParams = await params

  // resolvedParams.name이 string임을 보장
  if (!resolvedParams || !resolvedParams.name) {
    return <div className='page'>에러: 리스트 이름을 찾을 수 없어요!</div>
  }

  try {
    const listData = await getListData(resolvedParams.name)

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <div className='page'>에러: {error.message}</div>
    }
    return <div className='page'>알 수 없는 에러가 발생했어요!</div>
  }
}
