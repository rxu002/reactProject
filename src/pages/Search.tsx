import { useState } from "react";
import { SearchBookCard } from "../components/SearchBookCard";
import { PageHeader } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { LinearProgress, Typography } from "@mui/material";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  return (
    <div>
      <PageHeader pageName="Search" />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIsLoading={setIsLoading}
        setBooks={setBooks}
        setMessage={setMessage}
      />
      <div className="searchResultSection">
        {isLoading ? (
          <section className="searchContent">
            <LinearProgress sx={{ width: "88vw", borderRadius: "10px" }} />
          </section>
        ) : message ? (
          <p className="searchContent">{message}</p>
        ) : (
          <>
            <Typography>{books.length} books found</Typography>
            {books.map((book) => {
              return <SearchBookCard key={book.key} book={book} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};
