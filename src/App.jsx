import './App.css'
import { Movies } from "./components/Movies.jsx"
import { useMovies } from './hooks/useMovies.js'
import { useEffect, useRef, useState, useCallback } from "react" 

function useSearch() {
  const [search, updateSearch] = useState("")
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => { 
  if (isFirstInput.current) {
    isFirstInput.current = search == ""
    return
  }

  if (search == ""){
    setError("no se puede realizar esta accion")
    return
  }

if (search.match(/^\d+$/)){
  setError("no se puede colocar numeros en el buscador")
}

if (search.length < 3){
  setError("no exite una pelicula con menos de 3 caracteres")
}

setError(null)

}, [search])

return {search, updateSearch, error} 
} 




function App() {
  const { movies } = useMovies()
  const [search, updateSearch, error] = useSearch()
  const debounceGetMovies = useCallback(
    debounce(search => {
    console.log("search", search)
    getMovies({search})
  }, 2000)
  , []
)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ search })
   }

   const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
   debounceGetMovies(newSearch) 

 }


  return (
    <>
    <div className='page'>

      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name="query" placeholder='guerra de los simios, rampage, lego' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p className='error' style={{color: "red"}}>{error}</p>}
      </header>

      <main>
      <Movies movies={movies} />
      </main>
    </div>
    </>
  )
}

export default App
