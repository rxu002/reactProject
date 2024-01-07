import { useParams } from "react-router-dom";
import {
  useGetSearchedBooksQuery,
  useGetWorksByKeyQuery,
} from "../slices/bookApiSlice";
import { Button, CircularProgress, Rating, Typography } from "@mui/material";
import { PageHeader } from "./Header";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBooks } from "../slices/bookCollectionSlice";
import { ReadingStatusSelect } from "./ReadingStatusSelect";
import { NoteBox } from "./NoteBox";

export const BookDetails = () => {
  const [rating, setRating] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(true);

  let oclc;
  let title;
  let author;
  let description;
  let firstPublishedYear;

  const dispatch = useDispatch();
  const { var: bookKey } = useParams();
  const actualKey = `/works/${bookKey}`;

  const localStorageKey: string = `${actualKey}-Rating`;
  useEffect(() => {
    const initialRating = Number(localStorage.getItem(localStorageKey));
    setRating(initialRating);
  }, []);

  const { data: allFoundBooks, isSuccess: isFoundBooksSuccess } =
    useGetSearchedBooksQuery(actualKey);
  if (isFoundBooksSuccess) {
    const allBooks: any[] = allFoundBooks.docs;
    const bookWithKey = allBooks.find((doc) => doc.key === actualKey);
    oclc = bookWithKey.oclc[0];
    author = bookWithKey.author_name.join(", ");
    firstPublishedYear = bookWithKey.first_publish_year;
  }

  const { data: foundWork, isSuccess: isFoundWorkSuccess } =
    useGetWorksByKeyQuery(bookKey);
  if (isFoundWorkSuccess) {
    title = foundWork.title;
    description = foundWork.description;
  }

  return (
    <div>
      <PageHeader pageName="Details" />
      <main className="detailsSection">
        <section>
          {isFoundBooksSuccess ? (
            <img
              src={`https://covers.openlibrary.org/b/oclc/${oclc}-L.jpg?default=false`}
              width="185px"
              height="260px"
            />
          ) : (
            <CircularProgress />
          )}
          <Rating
            name="simple-controlled"
            sx={{ mt: "3vh", display: "flex", justifyContent: "center" }}
            size="large"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);

              localStorage.setItem(localStorageKey, JSON.stringify(newValue));
            }}
          />
          {isVisible ? (
            <Button
              className="deleteButton2"
              onClick={() => {
                dispatch(deleteBooks(actualKey));
                setIsVisible(false);
              }}
            >
              Remove from collection
            </Button>
          ) : null}
        </section>
        <section className="textSection">
          <Typography sx={{ fontWeight: 700, fontSize: "1.3rem", mb: "1vh" }}>
            {title}
          </Typography>
          <Typography sx={{ fontStyle: "italic", mb: "1vh" }}>
            By {author}
          </Typography>
          <Typography sx={{ mb: "1vh" }}>
            First published in {firstPublishedYear}
          </Typography>
          <Typography sx={{ mt: "3vh", mb: "3vh" }}>{description}</Typography>
          <ReadingStatusSelect bookFullKey={actualKey} />
          <NoteBox bookFullKey={actualKey} />
        </section>
      </main>
    </div>
  );
};
