import { Card, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteBooks } from "../slices/bookCollectionSlice";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router-dom";

type CollectionBookCardProp = {
  book: any;
};

const noCoverLink = "/images/nocover-227x300.jpg";

const handleNoCover = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.target as HTMLImageElement;
  img.src = noCoverLink;
};

export const CollectionBookCard: React.FC<CollectionBookCardProp> = ({
  book,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleTitleClick = () => {
    const bookKey = book.key.slice(1);
    navigate(`book/${bookKey}`);
  };

  const readingStatus = localStorage.getItem(`${book.key}-ReadingStatus`);
  const readingStatusJSON = readingStatus
    ? JSON.parse(readingStatus)
    : "Unread";

  return (
    <div>
      {
        <Card className="myCollectionCard">
          <RemoveCircleIcon
            sx={{
              color: "#2d3047",
              position: "relative",
              left: "8vw",
              top: "1vh",
            }}
            onClick={() => dispatch(deleteBooks(book.key))}
          />
          {book.oclc && Array.isArray(book.oclc) && book.oclc.length > 0 ? (
            <img
              src={`https://covers.openlibrary.org/b/oclc/${book.oclc[0]}-L.jpg?default=false`}
              onError={handleNoCover}
              width="120px"
              height="150px"
            />
          ) : book.oclc && !Array.isArray(book.oclc) ? (
            <img
              src={`https://covers.openlibrary.org/b/oclc/${book.oclc}-L.jpg?default=false`}
              onError={handleNoCover}
              width="120px"
              height="150px"
            />
          ) : (
            <img src={noCoverLink} width="120px" height="150px" />
          )}
          <section className="myCollectionCardDetails">
            <div onClick={handleTitleClick}>
              <Typography className="textAlignCenter textWrap bookTitleContainer">
                {book.title}
              </Typography>
            </div>
            <Typography className="bookAuthor" variant="body2">
              {book.author_name
                ? `By ${book.author_name.join(", ")}`
                : "Unknown author"}
            </Typography>
            <Typography variant="body2">Status: {readingStatusJSON}</Typography>
          </section>
        </Card>
      }
    </div>
  );
};
