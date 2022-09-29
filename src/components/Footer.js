import React from "react";

const Footer=()=>{
    return(
        <div style={{height:"13%",maxHeight:"13%", background: "linear-gradient(to bottom, #c31432, #240b36)"}} className="text-center py-1 text-white footerdiv">
            <div className="my-2">
                <h5>Follow US</h5>
                
                <div className="my-3">
                    <span><i className="fa-brands fa-facebook mx-4 fs-2"></i></span>
                    <span><i className="fa-brands fa-instagram mx-4 fs-2"></i></span>
                    <span><i className="fa-brands fa-twitter mx-4 fs-2"></i></span>
                    <span><i className="fa-brands fa-youtube mx-4 fs-2"></i></span>
                </div>
            </div>
            <h6>Made with by <i className="fa-solid fa-heart text-danger"></i> A{"&"}B HAN Tutorials</h6>
        </div>
    )
}

export default Footer