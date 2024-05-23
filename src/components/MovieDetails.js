import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useKey } from "../hooks/useKey";
import { Loader } from "./Loader";
import { key } from "../App";

export const MovieDetails = ({
  selectedID,
  onCloseMovie,
  onAddWatchedMovie,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) {
      countRef.current = countRef.current + 1;
    }
  }, [userRating]);

  const isWatched = watched.map((mov) => mov.imdbID).includes(selectedID);
  const watchedUserRating = watched.find(
    (mov) => mov.imdbID === selectedID
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&i=${selectedID}`
        );
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchMovieDetails();
  }, [selectedID]);

  useEffect(() => {
    if (!title) return;

    document.title = `Movie | ${title}`;

    return () => {
      document.title = "🍿 usePopcorn";
    };
  }, [title]);

  useKey("Escape", onCloseMovie);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatchedMovie(newWatchedMovie);
    onCloseMovie();
  };

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐{imdbRating} IMDB Rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You watched this movie and rated it {watchedUserRating} ⭐
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed By {director}</p>
          </section>
        </>
      )}
    </div>
  );
};
