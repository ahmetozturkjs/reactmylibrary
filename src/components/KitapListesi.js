import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux"



const KitapListesi = () => {
const dispatch=useDispatch()

  const {categoriesState}=useSelector((state)=>state)
  const {booksState}=useSelector((state)=>state)

  // const [books, setBooks] = useState(null);
  // const [kategoriler, setKategoriler] = useState(null);
  const [tetikleyici, setTetikleyici] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [silinecekKitapId, setSilinecekKitapId] = useState(null);
  const [silinecekKitapIsim, setSilinecekKitapIsim] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3004/books")
  //     .then((res) => {
  //       setBooks(res.data);
  //       axios
  //         .get("http://localhost:3004/categories")
  //         .then((res) => {
  //           setKategoriler(res.data);
  //         })
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  // }, [tetikleyici]);

  const kitapSil = (id) => {
    console.log("çalıştı");
    console.log(id);
    dispatch({type:"FETCH_BOOKS_DELETE",payload:id})
    axios.delete(`http://localhost:3004/books/${id}`).then((res) => {      
      setTetikleyici(!tetikleyici);
      console.log("silindi");
      setShowModal(false);
    });
  };
  console.log("çalıştı");
  console.log(booksState,categoriesState);
  if (booksState.success !== true || categoriesState.success !== true) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", fontSize: "" }}
      >
        <div>
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="my-5 container componentbackground">
      <table className="table">
        <thead>
          <tr>
            <th className="text-center" scope="col">#</th>
            <th className="text-center" scope="col">BOOK NAME</th>
            <th className="text-center" scope="col">AUTHOR NAME</th>
            <th className="text-center" scope="col">ISBN</th>
            <th className="text-center" scope="col">TYPE OF BOOK</th>
            <th className="text-center" scope="col">DETAIL</th>
            <th className="text-center" scope="col">EDIT</th>
            <th className="text-center" scope="col">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {booksState.books.map((kitap) => {
            let kategori = categoriesState.categories.find(
              (kategori) => kategori.id === kitap.categoryId
            );
            return (
              <tr key={kitap.id}>
                <th className="text-center">{kitap.booklength}</th>
                <td className="text-center">{kitap.name}</td>
                <td className="text-center">{kitap.author}</td>
                <td className="text-center">{kitap.isbn===""?"-":kitap.isbn}</td>
                <td className="text-center">{kategori.name}</td>
                <td className="text-center">
                  <Link
                    to={`/bookdetail/${kitap.id}`}
                    className="btn btn-outline-success"
                  >
                    <i className="fa-solid fa-circle-info"></i>{" "}
                    {/* DETAIL BUTTON */}
                  </Link>
                </td>
                <td className="text-center">
                  <Link
                    to={`/kitapduzenle/${kitap.id}`}
                    className="btn btn-outline-primary"
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                    {/* EDIT BUTTON */}
                  </Link>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => {
                      setShowModal(true);
                      // kitapSil(kitap.id)
                      
                        setSilinecekKitapId(kitap.id);
                      
                      
                      setSilinecekKitapIsim(kitap.name);
                    }}
                    className="btn btn-outline-danger"
                  >
                    <i className="fa-solid fa-trash-can"></i>{" "}
                    {/* DELETE BUTTON */}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
        <div className="py-5">
          {/* SPACEDIV */}
        </div>
      {showModal && (
        <Modal
          question={"Silmek istediğinizden Emin Misniz?"}
          title={silinecekKitapIsim}
          onConfirm={() => kitapSil(silinecekKitapId)}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default KitapListesi;
