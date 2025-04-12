const URL = ' https://books-api.nomadcoders.workers.dev/lists'

async function getMovies () {
  const response = await fetch(URL)
  const json = await response.json()
  return json
}

export default async function HomePage () {
  const movies = await getMovies()
  return <div>{JSON.stringify(movies)}</div>
}
