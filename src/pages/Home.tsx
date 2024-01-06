import { useSelector } from "react-redux";
import { PageHeader } from "../components/Header";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { CollectionBookCard } from "../components/CollectionBookCard";

export const Home = () => {
  const bookCollection = useSelector(
    (state: RootState) => state.bookCollection.myBooks
  );
  const [myBooks, setMyBooks] = useState<any[]>([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem("bookCollection");
    const storedBooksJson: any[] =
      storedBooks !== null ? JSON.parse(storedBooks) : [];
    const sortedCollection = storedBooksJson.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    if (sortedCollection.length > 1) {
      let readingStatus = "Unread";
      const booksWithStatus = sortedCollection.map((book) => {
        const localStorageKeys = Object.keys(localStorage);
        if (localStorageKeys) {
          const foundKey = localStorageKeys.find(
            (key) => key === `${book.key}-ReadingStatus`
          );
          if (foundKey) {
            const statusItem = localStorage.getItem(foundKey);
            readingStatus = statusItem ? JSON.parse(statusItem) : "Unread";
          } else {
            readingStatus = "Unread";
          }
        }
        return { ...book, status: readingStatus };
      });
      setMyBooks(booksWithStatus);
    }
  }, [bookCollection]);

  // add filter component
  // get title, author and rating given from filter component

  return (
    <div>
      <PageHeader pageName="My Collection" />
      <section className="myCollectionSection">
        {myBooks.map((mybook) => {
          return <CollectionBookCard key={mybook.key} book={mybook} />;
        })}
      </section>
    </div>
  );
};
