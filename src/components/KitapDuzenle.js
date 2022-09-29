import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Loading from "./Loading";
import { useSelector,useDispatch } from "react-redux";

const KitapDuzenle = (id) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const{booksState}=useSelector(state=>state)
  const {categoriesState}=useSelector(state=>state)

  const [kategori, setKategori] = useState(null);
  const [kitapAdı, setKitapAdı] = useState("");
  const [yazarAdı, setYazarAdı] = useState("");
  const [isbn, setIsbn] = useState("");
  const [secilenKategori, setSecilenKategori] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [kaydedilecekKitap, setKaydedilecekKitap] = useState(null);
  const [bookLength, setBookLength] = useState("");
  const [bookImage, setBookImage] = useState("");


  
  useEffect(() => {
    
      let editbook=booksState.books.find((book)=>book.id==params.kitapID)
      if (editbook==undefined){
        navigate("/")
      }   
      setKitapAdı(editbook.name);
        setYazarAdı(editbook.author);
        setIsbn(editbook.isbn);
        setSecilenKategori(editbook.categoryId);
        setBookLength(editbook.booklength);
        setBookImage(editbook.bookImg)
        console.log(editbook.categoryId);

        
 
  }, []);

  const Kaydet = (event) => {
    event.preventDefault();
    setShowModal(true);
    setKaydedilecekKitap(kitapAdı);
    console.log("tiklandi");
  };

  const kitapKaydet = () => {
    console.log("onayla tıklandı");
    if (kitapAdı === "" || yazarAdı === "" || secilenKategori === "") {
      alert("boş geçemezsiniz");
      return;
    }

    const updateBook = {
      id: params.kitapID,
      name: kitapAdı,
      author: yazarAdı,
      categoryId: secilenKategori,
      isbn: isbn,
      booklength: bookLength,
      bookImg: bookImage,
    };
    axios
      .put(`http://localhost:3004/books/${params.kitapID}`, updateBook)
      .then((res) => {
        dispatch({type:"FETCH_BOOKS_EDIT",payload:updateBook})
        console.log("gönderildi");
        setShowModal(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  if (categoriesState.success !== true) {
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
    <div className="container my-5 w-50">
      <form action="" onSubmit={Kaydet}>
        <div className="input-group mb-3">
          <span
            className="input-group-text px-4"
            id="inputGroup-sizing-default"
          >
            Kitap İsmi
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={kitapAdı}
            onChange={(event) => setKitapAdı(event.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span
            className="input-group-text px-4"
            id="inputGroup-sizing-default"
          >
            Kitap Yazarı
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={yazarAdı}
            onChange={(event) => setYazarAdı(event.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span
            className="input-group-text px-5"
            id="inputGroup-sizing-default"
          >
            ISBN
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={isbn}
            onChange={(event) => setIsbn(event.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span
            className="input-group-text px-4"
            id="inputGroup-sizing-default"
          >
            Image Link
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={bookImage}
            onChange={(event) => setBookImage(event.target.value)}
          />
        </div>
        <select
          value={secilenKategori}
          onChange={(event) => setSecilenKategori(event.target.value)}
          className="form-select"
          aria-label="Default select example"
        >
          <option value={""}>Kategori Seçiniz</option>

          {categoriesState.categories.map((kat) => {
            return (
              <option key={kat.id} value={kat.id}>
                {kat.name}
              </option>
            );
          })}
        </select>

        <div className="my-5 text-center">
          <button type="submit" className="btn btn-outline-success mx-3">
            Kaydet
          </button>
          <Link to="/" type="btn" className="btn btn-outline-warning mx-3">
            Vazgeç
          </Link>
        </div>
      </form>
      {showModal === true && (
        <Modal
          question={"kaydetmek istediinizden emin misniz"}
          title={kaydedilecekKitap}
          onConfirm={() => kitapKaydet()}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default KitapDuzenle;
