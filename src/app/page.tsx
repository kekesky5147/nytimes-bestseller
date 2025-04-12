// app/page.tsx
import Link from 'next/link'

// API 응답 데이터의 구조를 정의
type List = {
  list_name: string
  list_name_encoded: string
}

const URL = 'https://books-api.nomadcoders.workers.dev/lists'

// getLists가 List 배열을 반환한다고 명시
async function getLists (): Promise<List[]> {
  const response = await fetch(URL, { cache: 'no-store' })
  if (!response.ok) throw new Error('리스트를 가져오지 못했어요!')
  const json = await response.json()
  return json.results
}

export default async function HomePage () {
  try {
    const lists = await getLists()

    return (
      <div className='page'>
        <h1 className='title'>THE NEW YORK TIMES BEST SELLER EXPLORER</h1>
        <div className='list-container'>
          {lists.map(list => (
            <Link
              href={`/list/${list.list_name_encoded}`}
              key={list.list_name_encoded}
              className='list-box'
            >
              <span>{list.list_name}</span>
              <span className='arrow'>→</span>
            </Link>
          ))}
        </div>
      </div>
    )
  } catch (error: unknown) {
    // error가 Error 객체인지 확인
    if (error instanceof Error) {
      return <div className='page'>에러: {error.message}</div>
    }
    // Error 객체가 아니면 기본 메시지
    return <div className='page'>알 수 없는 에러가 발생했어요!</div>
  }
}
