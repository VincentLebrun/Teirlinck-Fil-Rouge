import React from 'react';
import Hero from '../../components/Hero';
import Header from "../../components/Header"
import Footer from "../../components/Footer";

const Products = () => {
    return (
        <div>
            <Header/>
            <Hero
                title="Nos produits"
                image="nosproduits.png"
            />
            <Footer/>
        </div>
    )
}

export default Products;
