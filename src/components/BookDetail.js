import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";

const BookDetail = (id) => {
  const params=useParams();
  const [bookName,setBookName] = useState("");
  const [authorName,setAuthorName] = useState("");
  const [isbn,setIsbn] = useState("");
  const [pageNumber,setPageNumber]=useState("");
  const [categories,setCategories]=useState(null);
  const[bookcategory,setBookCategory]=useState("");
  const[bookImage,setBookImage]=useState("")

  useEffect(()=>{
    axios
    .get(`http://localhost:3004/books/${params.kitapID}`)
    .then(res=>{
      setBookName(res.data.name);
      setAuthorName(res.data.author);
      setIsbn(res.data.isbn);
      setBookCategory(res.data.categoryId)
      setBookImage(res.data.bookImg)
      axios
      .get("http://localhost:3004/categories")
      .then((res)=>{
        setCategories(res.data)
      })
      .catch((err)=>console.log("BOOKDETAIL CATEGOIES ERROR",err))
    })
    .catch(res=>console.log("BOOKDETAIL ERROR",res))
  },[])

  if(categories===null){
    return(
      <div className="d-flex justify-content-center align-items-center" style={{height:"100vh", fontSize:""}}>
        <div>
            <Loading/>
        </div>
      </div>
    )
  }

  return (
    <div style={{width:"50%",overflowY:"hidden"}} className=" container   componentbackground">
      <table className="table table-hover table-bordered ">
        <thead>
         
        </thead>
        <tbody>
          <tr>
            <th className="text-dark-50" scope="row">Book Name</th>
            <td className="text-center fw-bold">{bookName}</td>
          </tr>
          <tr>
            <th scope="row">Author Name</th>
            <td className="text-center fw-bold">{authorName}</td>
          </tr>
          <tr>
            <th scope="row">Publisher Name</th>
            <td className="text-center fw-bold">@twitter</td>
          </tr>
          <tr>
            <th scope="row">ISBN</th>
            <td className="text-center fw-bold">{isbn}</td>
          </tr>
          <tr>
            <th scope="row">Number of Page</th>
            <td className="text-center fw-bold">{isbn}</td>
          </tr>
          <tr>
            <th scope="row">Type of Book</th>
            
            {
              categories.map((cat)=>{
                if(cat.id===bookcategory){
                  return(
                    <td className="text-center fw-bold" key={cat.id}>{cat.name}</td>
                  )
                }
              })              
            }

          </tr>
          <tr>            
            <th colSpan={"2"}  className="text-center fw-bold"><img src={bookImage} alt="" srcSet="" /></th>
          </tr>
        </tbody>
        <tr>
          <th colSpan={"2"}>
          <div  className="  text-center  ">
        <Link to="/" className="btn fs-2 btn-outline-primary">Cancel</Link>
      </div>
          </th>        
        </tr>
        
      </table>
      
    </div>
  );
};
export default BookDetail;
