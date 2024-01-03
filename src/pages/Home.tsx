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
    setMyBooks(sortedCollection);
  }, [bookCollection]);

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
