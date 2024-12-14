import  apiResults from "..api-results.json"
import  noResults from "..no-results.json"
import { useMemo } from "react"
import { useRef } from "react"
import { useState } from "react"
import { useCallback } from "react"



export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const[error, setError] = useState(null) 
  const previosSearch = useRef(search) 
  
  const getMovies = useCallback(async ({search}) => {
    if (search === previosSearch.current) return

    try{
      setLoading(true)
      setError(null)
      previosSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
   }, []) 


  const getSortedMovies = () => {
    console.log("getSortedMovies")
    const sortedMovies = sort
    ? [...movies].sort((a,b) => a.title.localCompare(b.title))
    : movies

    return sortedMovies
  }


  const sortedmovies = useMemo(() => {
    return sort
    ? [...movies].sort((a,b) => a.title.localCompare(b.title))
    : movies

  }, [sort, movies])

  return {movies: getSortedMovies(movies), getMovies, loading}
  }