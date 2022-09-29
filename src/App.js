import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import KitapEkleSayfa from "./Pages/KitapEkleSayfa";
import KitapDuzenleSayfa from "./Pages/KitapDuzenleSayfa";
import BookDetailPage from "./Pages/BookDetailPage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES_START" });
    axios
      .get("http://localhost:3004/categories")

      .then((res) => {
        dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: res.data });
        dispatch({ type: "FETCH_BOOKS_START" });
        axios
          .get("http://localhost:3004/books")
          .then((res) => {
            dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: res.data });
          })
          .catch((res) => {
            dispatch({
              type: "FETCH_BOOKS_ERROR",
              payload: "BOOKS ÇEKİLİRKEN HATA OLUŞTU",
            });
          });
      })
      .catch((res) => {
        dispatch({
          type: "FETCH_CATEGORIES_SUCCESS",
          payload: "Kategori Çekiminde Hata oluştu",
        });
      });
  }, []);

  return (
    <div className="appdiv">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kitapekle" element={<KitapEkleSayfa />} />
        <Route path="/kitapduzenle/:kitapID" element={<KitapDuzenleSayfa />} />
        <Route path="/bookdetail/:kitapID" element={<BookDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
