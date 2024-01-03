// 2 actions: add to book collection ( from search results ) & remove from book collection (from my collection or book review page )

import { createSlice } from "@reduxjs/toolkit";

interface bookCollection {
  myBooks: any[];
}

const initialState: bookCollection = {
  myBooks: [],
};

const getStoredBooksJson = () => {
  const currentBooksInCollection = localStorage.getItem("bookCollection");
  const currentBooksInCollectionJson =
    currentBooksInCollection !== null
      ? JSON.parse(currentBooksInCollection)
      : [];

  return currentBooksInCollectionJson;
};

const bookCollectionSlice = createSlice({
  name: "bookCollection",
  initialState,
  reducers: {
    addBooks: (state, action) => {
      const storedBooksJson: any[] = getStoredBooksJson();
      if (storedBooksJson.some((book) => book.key === action.payload.key)) {
        console.log("Already in collection");
      } else {
        storedBooksJson.push(action.payload);
        state.myBooks = storedBooksJson;
        localStorage.setItem("bookCollection", JSON.stringify(state.myBooks));
      }
    },
    deleteBooks: (state, action) => {
      const keyToBeDeleted = action.payload;
      const storedBooksJson = getStoredBooksJson();
      const booksWithoutKey = storedBooksJson.filter(
        (myBook: any) => myBook.key !== keyToBeDeleted
      );
      state.myBooks = booksWithoutKey;
      localStorage.setItem("bookCollection", JSON.stringify(state.myBooks));
    },
  },
});

export const { addBooks, deleteBooks } = bookCollectionSlice.actions;

export default bookCollectionSlice.reducer;
