import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home"
import KitapEkleSayfa from "./Pages/KitapEkleSayfa"
import KitapDuzenleSayfa from "./Pages/KitapDuzenleSayfa";
import BookDetailPage from "./Pages/BookDetailPage";


function App() {
  return (
    <div className="appdiv" >     
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/kitapekle" element={<KitapEkleSayfa/>} />        
        <Route path="/kitapduzenle/:kitapID" element={<KitapDuzenleSayfa/>} />
        <Route path="/bookdetail/:kitapID" element={<BookDetailPage/>}/>        
      </Routes>
    </div>
  );
}

export default App;
