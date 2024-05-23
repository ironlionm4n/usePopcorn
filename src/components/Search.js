import { useRef } from "react";
import { useKey } from "../hooks/useKey";

export const Search = ({ query, setQuery }) => {
  const inputEle = useRef(null);

  useKey("Enter", () => {
    if (document.activeElement === inputEle.curent) return;

    inputEle.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEle}
    />
  );
};
