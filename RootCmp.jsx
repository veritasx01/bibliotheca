import { AppHeader } from "./cmps/AppHeader.jsx";
import { Home } from "./pages/Home.jsx";
import { AboutUs } from "./pages/About.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";
import { BookDetails } from "./pages/BookDetails.jsx";
import { BookEdit } from "./pages/BookEdit.jsx";
const Router = ReactRouterDOM.HashRouter;
const { Routes, Route, Navigate } = ReactRouterDOM;

export function RootCmp() {
  return (
    <Router>
      <section className="app main-layout">
        <AppHeader />
        <main className="main-layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/book" element={<BookIndex />} />
            <Route path="/book/:bookId" element={<BookDetails />} />
            <Route path="/book/edit" element={<BookEdit />} />
          </Routes>
        </main>
      </section>
    </Router>
  );
}
