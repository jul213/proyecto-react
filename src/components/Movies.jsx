export function ListofMovies ({movies})  {
    return  (
        <ul className="movies">
            {
                movies.map(movie => (
                    <li className="movies" key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.Title} />
                    </li>
                ))
            }
        </ul>
    )
}

function NoMoviesResults () {
    return (
        <p>no se encontraron peliculas </p>
    )
} 

export function Movies () {
    const movies = apiResults.Search
    const hasmovies = movies?.length > 0

    return (
        hasmovies
        ? <Movies movies={movies} />
        : <NoMoviesResults />
    )
}