import React from "react";
import Header from "../components/Header";
import KitapListesi from "../components/KitapListesi";
import Footer from "../components/Footer";

const Home=()=>{
    return(
        <div style={{height:"100vh"}}>
            <Header/>
            <KitapListesi/>
            <Footer/>
        </div>
        
    )
}
export default Home;