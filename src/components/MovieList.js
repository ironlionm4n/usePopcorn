import { Movie } from "./Movie";

export const MovieList = ({ movies, setSelectedID }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => {
        return (
          <Movie
            movie={movie}
            key={movie.imdbID}
            setSelectedID={setSelectedID}
          />
        );
      })}
    </ul>
  );
};
