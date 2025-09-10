import { AppHeader } from "./cmps/AppHeader.jsx";
import { Home } from "./pages/Home.jsx";
import { AboutUs } from "./pages/About.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";
import { BookDetails } from "./pages/BookDetails.jsx";
import { BookEdit } from "./pages/BookEdit.jsx";
import { UserMsg } from "./cmps/UserMsg.jsx";
const Router = ReactRouterDOM.HashRouter;
const { Routes, Route, Navigate } = ReactRouter;

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
            <Route path='/book/edit/:bookId' element={<BookEdit />} />
          </Routes>
        </main>
        <UserMsg duration={1000}></UserMsg>
      </section>
    </Router>
  );
}
