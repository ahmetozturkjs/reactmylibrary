import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Loading from "./Loading";

const KitapDuzenle = (id) => {
  const params = useParams();
  const navigate = useNavigate();

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
    axios
      .get(`http://localhost:3004/books/${params.kitapID}`)
      .then((res) => {
        setKitapAdı(res.data.name);
        setYazarAdı(res.data.author);
        setIsbn(res.data.isbn);
        setSecilenKategori(res.data.categoryId);
        setBookLength(res.data.booklength);
        setBookImage(res.data.bookImg)
        console.log(res.data.categoryId);
        axios
          .get("http://localhost:3004/categories")
          .then((res) => {
            setKategori(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
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

    const uptateBook = {
      id: params.kitapID,
      name: kitapAdı,
      author: yazarAdı,
      categoryId: secilenKategori,
      isbn: isbn,
      booklength: bookLength,
      bookImg: bookImage
    };
    axios
      .put(`http://localhost:3004/books/${params.kitapID}`, uptateBook)
      .then((res) => {
        console.log("gönderildi");
        setShowModal(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  if (kategori === null) {
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

          {kategori.map((kat) => {
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
