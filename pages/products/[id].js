import React, { useEffect, useState} from 'react'
import Hero from '../../components/Hero';
import Header from "../../components/Header"
import Footer from "../../components/Footer";
import products from "../../product";

const Product = ({ product }) => {

    // const [produits, setProduits] = useState(products);
    // const [id, setId] = useState(router.query.id);
    // const product = produits.find((product) => product.id == id);
    // const [produit, setProduit] = useState(product);

    // pour le moment on utilise le tableau de produits pour récupérer le produit, après on récupèrera directement le produit dans la base avec un appel à l'API via un getServerSideProps( { params })

    return (
        <div className="productDetails">
            <Header />
            <Hero
                title={product.name}
                image="ourproducts.webp"
            />
            <Footer />
        </div>
    )
}

export default Product;

// getServerSideProps

export async function getServerSideProps({ params }) {
    const product = products.find((product) => product.id == params.id)

    return {
        props : {
            product
        }
    }
}