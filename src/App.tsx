import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
//Layout
import { RootLayout } from "./layouts/RootLayout";
//Pages
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { BookDetails } from "./components/BookDetails";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="book/works/:var" element={<BookDetails />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
