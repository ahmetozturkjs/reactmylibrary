import React from "react";
import {Link} from "react-router-dom";
import {Dna} from "react-loader-spinner";

const Header = () => {
  return (
    <nav style={{height:"6vh",maxHeight:"6vh",background: "linear-gradient(to bottom, #c31432, #240b36)"}} className="navbar navbar-expand-lg bg-light ">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" href="#">
        <Dna
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link to="/" className="nav-link btn btn-info text-white mx-2 fw-bold" href="#">
                Home
              </Link>
            </li>
           
            <li className="nav-item ">
              <Link to="/kitapekle" className="nav-link btn btn-info text-white mx-2 fw-bold" href="#">
                Add Book
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
