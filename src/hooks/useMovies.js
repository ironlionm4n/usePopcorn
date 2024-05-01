import { useState, useEffect } from "react";

const key = "73f906da";

export const useMovies = (query) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(`HTTP Error, status: ${response.status}`);
        }
        const data = await response.json();

        if (data.Response === "False") {
          throw new Error("No results found!");
        }

        setMovies(data.Search);
        setErrorMessage("");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(`Error fetching data: ${error.message}`);
          setErrorMessage(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setErrorMessage("");
      return;
    }

    //handleCloseMove();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, errorMessage };
};
