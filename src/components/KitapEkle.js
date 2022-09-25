import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import {Link} from "react-router-dom"
import Loading from "./Loading";

const KitapEkle = () => {
  const navigate = useNavigate();
  const [kategori, setKategori] = useState(null);
  const [kitapAdı, setKitapAdı] = useState("");
  const [yazarAdı, setYazarAdı] = useState("");
  const [isbn, setIsbn] = useState("");
  const [secilenKategori, setSecilenKategori] = useState("");
  const [showModal, setShowModal] = useState(false);
  const[kitapSayisi,setKitapSayisi]=useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        setKategori(res.data);
        axios.get("http://localhost:3004/books")
        .then((res)=>{
          
          let booklength=res.data.length;
          console.log(booklength);
          setKitapSayisi(booklength)

        })
      })
      .catch((err) => console.log(err));
  }, []);

  if (kategori === null) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height:"100vh", fontSize:""}}>
        <div>
            <Loading/>
        </div>
      </div>
    );
  }

  const Kaydet = (event) => {
    event.preventDefault();
    setShowModal(true)
    
  };

  const KitapEkleFonk=()=>{
    if (kitapAdı === "" || yazarAdı === "" || secilenKategori === "") {
      alert("boş geçemezsiniz");
      return;
    }

    const yeniKitap = {
      id: new Date().getTime(),
      name: kitapAdı,
      author: yazarAdı,
      categoryId: secilenKategori,
      isbn: isbn,
      booklength:kitapSayisi+1,
    };
    axios.post("http://localhost:3004/books", yeniKitap).then((res) => {
      console.log("gönderildi");
    });
    console.log(yeniKitap);
    console.log("tiklandı");

    navigate("/");
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
        <select
          value={secilenKategori}
          onChange={(event) => setSecilenKategori(event.target.value)}
          className="form-select"
          aria-label="Default select example"
        >
          <option>Kategori Seçiniz</option>

          {kategori.map((kat) => {
            return (
              <option key={kat.id} value={kat.id}>
                {kat.name}
              </option>
            );
          })}
        </select>
        <div className="my-5 text-center">
          <button type="submit" className="btn btn-outline-success mx-2">
            Save
          </button>
          <Link to="/"  className="btn btn-outline-warning mx-2">
            Cancel
          </Link>
        </div>
      </form>
      {showModal === true && <Modal title={kitapAdı} question={`${kitapAdı} will be save, are you sure?`} onConfirm={()=>KitapEkleFonk()} onCancel={()=>setShowModal(false)}/>}
    </div>
  );
};

export default KitapEkle;
