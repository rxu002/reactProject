import { Button, Card, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addBooks, deleteBooks } from "../slices/bookCollectionSlice";
import { useEffect, useState } from "react";

type SearchBookCardProp = {
  book: any;
};

const noCoverLink = "/images/nocover-227x300.jpg";

const handleNoCover = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.target as HTMLImageElement;
  img.src = noCoverLink;
};

export const SearchBookCard: React.FC<SearchBookCardProp> = ({ book }) => {
  const [inBookCollection, setInBookCollection] = useState(false);
  const [addedToCollection, setAddedToCollection] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const bookCollection = localStorage.getItem("bookCollection");
    const bookCollectionArray: any[] = bookCollection
      ? JSON.parse(bookCollection)
      : [];
    const checkBookInCollection = () => {
      if (
        bookCollectionArray.some((bookStored) => bookStored.key === book.key)
      ) {
        setInBookCollection(true);
      } else {
        setInBookCollection(false);
      }
    };
    checkBookInCollection();
  }, [addedToCollection]);

  let bookCover;
  if (book.oclc && Array.isArray(book.oclc) && book.oclc.length > 0) {
    bookCover = (
      <img
        src={`https://covers.openlibrary.org/b/oclc/${book.oclc[0]}-L.jpg?default=false`}
        onError={handleNoCover}
        width="120px"
        height="150px"
      />
    );
  } else if (book.oclc && !Array.isArray(book.oclc)) {
    bookCover = (
      <img
        src={`https://covers.openlibrary.org/b/oclc/${book.oclc}-L.jpg?default=false`}
        onError={handleNoCover}
        width="120px"
        height="150px"
      />
    );
  } else {
    bookCover = <img src={noCoverLink} width="120px" height="150px" />;
  }

  return (
    <div>
      {
        <Card className="searchResultCard">
          {bookCover}
          <section className="cardDetails">
            <Typography className="bookName" variant="body1">
              {book.title}
            </Typography>
            <Typography className="bookAuthor" variant="body2">
              {book.author_name
                ? `By ${book.author_name.join(", ")}`
                : "Unknown author"}
            </Typography>
            <Typography variant="body2">
              Published in {book.first_publish_year}
            </Typography>
            <Button
              sx={{ display: inBookCollection ? "none" : "inline" }}
              className="addButton"
              onClick={() => {
                dispatch(addBooks(book));
                setAddedToCollection(true);
              }}
            >
              Add book to collection
            </Button>
            <Button
              sx={{ display: inBookCollection ? "inline" : "none" }}
              className="deleteButton"
              onClick={() => {
                dispatch(deleteBooks(book.key));
                setAddedToCollection(false);
              }}
            >
              Remove from collection
            </Button>
          </section>
        </Card>
      }
    </div>
  );
};
