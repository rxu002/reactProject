import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://openlibrary.org" }),
  endpoints: (builder) => ({
    getSearchedBooks: builder.query({
      query: (searchString) => `/search.json?q=${searchString}`,
    }),
    getWorksByKey: builder.query({
      query: (bookKey) => `/works/${bookKey}.json`,
    }),
  }),
});

export const { useGetSearchedBooksQuery, useGetWorksByKeyQuery } = bookApi;
