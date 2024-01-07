import { useSelector } from "react-redux";
import { PageHeader } from "../components/Header";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { CollectionBookCard } from "../components/CollectionBookCard";
import { Filter } from "../components/Filter";

export const Home = () => {
  const bookCollection = useSelector(
    (state: RootState) => state.bookCollection.myBooks
  );
  const [myBooks, setMyBooks] = useState<any[]>([]);
  const [filterValues, setFilterValues] = useState({
    title: "",
    author: "",
    readingStatus: "",
  });

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

      console.log(filterValues);

      //filter items
      const filteredResult = booksWithStatus.filter(
        (book) =>
          book.title.toLowerCase().includes(filterValues.title.toLowerCase()) &&
          book.author_name
            .join(", ")
            .toLowerCase()
            .includes(filterValues.author.toLowerCase()) &&
          book.status
            .toLowerCase()
            .includes(filterValues.readingStatus.toLowerCase())
      );
      console.log(filteredResult);
      setMyBooks(filteredResult);
    }
  }, [bookCollection, filterValues]);

  return (
    <div>
      <PageHeader pageName="My Collection" />
      <Filter filterValues={filterValues} setFilterValues={setFilterValues} />
      <section className="myCollectionSection">
        {myBooks.map((mybook) => {
          return <CollectionBookCard key={mybook.key} book={mybook} />;
        })}
      </section>
    </div>
  );
};
