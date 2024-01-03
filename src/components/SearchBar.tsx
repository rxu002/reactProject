import {
  IconButton,
  InputAdornment,
  TextField,
  autocompleteClasses,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

// pull search bar out from book card, see how to link it together

const queryWithPlus = (string: string) => {
  const stringArray = string.split(" ");
  const stringWithPlus = stringArray.join("+");
  return stringWithPlus;
};

const getBooks = async (query: string) => {
  const searchStringWithPlus = queryWithPlus(query);
  const url = "https://openlibrary.org/search.json?q=" + searchStringWithPlus;
  const data = await fetch(url);
  const booksFound = await data.json();
  return booksFound.docs;
};

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setBooks: Dispatch<SetStateAction<any[]>>;
  setMessage: Dispatch<SetStateAction<string>>;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  setIsLoading,
  setBooks,
  setMessage,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    setMessage("");
    if (!searchTerm) {
      setMessage("Please enter a search term.");
    } else {
      const getFoundBooks = async (searchTerm: string) => {
        try {
          setIsLoading(true);
          const foundBooks = await getBooks(searchTerm);
          setIsLoading(false);
          setBooks(foundBooks);
          if (foundBooks.length === 0) {
            setMessage("No results found.");
          }
        } catch (error) {
          setMessage(
            "Error getting results. Please contact us at support@shelf.com for more help."
          );
          console.log(error);
        }
      };
      getFoundBooks(searchTerm);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <section style={{ display: "flex" }}>
      <TextField
        sx={{ width: "88vw", my: "2vh", mx: "auto" }}
        value={searchTerm}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyDown={handleEnter}
      />
    </section>
  );
};
