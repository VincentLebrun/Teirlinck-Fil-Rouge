import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { Row, Col } from 'antd';
import Link from 'next/link'

const panier = ( { cart, setCart }) => {

    // const [panier, setPanier] = useState();
    // const [loading, setLoading] = useState(true);
    // // const [newQuantity, setNewQuantity] = useState();

    // useEffect(() => {
    //     setPanier(JSON.parse(localStorage.getItem('cart')));
    //     setLoading(false);
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem('cart', JSON.stringify(panier));

    // }, [panier]);

    const itemPrice = (price, quantity, type) => {

        if (type == "/kg") {
            const pricekg = Number(((price * quantity) / 1000).toFixed(2));
            return pricekg;
        } else {
            const pricepc = Number(((price * quantity)).toFixed(2));
            return pricepc;
        }

    }

    const deleteCart = (id) => {
        const deleteItem = cart.items.findIndex((item) => item.id == id);
        let newPanier = cart;
        newPanier.items.splice(deleteItem, 1);

        setCart(
            {
                items: [...newPanier.items],
                total: 0
            });
    }

    const addCommand = () => {
        let newPanier = cart;
        newPanier = {items : [], total : 0};
        setCart({
            items: [...newPanier.items],
            total:0
        }
        )
    }

    const priceType = (type) => {
        if (type == "/kg") {
            return "g";
        }
        else {
            // console.log(type);
            return "pc";
        }
    }

    const updateQuantity = (e, price, price_type, name, quantity) => {
        const newQuantity = e.target.value;
        // setNewQuantity(e.target.value);
        // console.log(newQuantity);
        const cart_item = cart.items.find((item) => item.name == name);
        const previous_price = itemPrice(price, quantity, price_type);
        cart_item.quantity = newQuantity;
        const new_price = itemPrice(price, cart_item.quantity, price_type);
        console.log(new_price);
        let items = cart.items;
        const index_item = items.indexOf(name);
        items[index_item] = cart_item;
        
        setCart({ 
            items:items, 
            total: Number((cart.total - previous_price + new_price).toFixed(2))
        }); 
    }



    // if (loading) {
    //     return (
    //         <p>Chargement en cours !</p>
    //     )
    // }

    let testTotal = 0;
    const listPanier = cart.items.map(item => {

        testTotal += itemPrice(item.price, item.quantity, item.price_type);


        return (
            <div key={item.id}>
                <hr className="top-hr" />

                <Row justify="space-between">
                    <Col xs={24} sm={12}>
                        <Row justify="space-between">
                            <Col xs={24} sm={12}>

                                <Link href={`/products/1`}>

                                    <div className="element">
                                        <img src={item.image} alt="" />
                                        <div className="element-absolute">
                                            <div className="element-inside"></div>
                                        </div>
                                    </div>

                                </Link>

                            </Col>

                            <Col xs={24} sm={8}>
                                <h2>{item.name}</h2>
                                <div className="input-weight">
                                    <input onChange={(e) => updateQuantity(e, item.price, item.price_type, item.name, item.quantity)} type="number" placeholder={item.quantity} step={item.price_type === "/kg" ? "25" : "1"} min="0" value={item.quantity}/>
                                    <p>{priceType(item.price_type)}</p>
                                </div>
                            </Col>
                        </Row>

                    </Col>

                    <Col className="price-suppr" xs={24} sm={8}>

                        <h2>~{itemPrice(item.price, item.quantity, item.price_type)}€</h2>
                        <div className="store-button">
                            <button onClick={() => deleteCart(item.id)} >Supprimer de votre panier</button>
                        </div>

                    </Col>


                </Row>
            </div>

        )
    })

    return (
        <div>
            {/* <Header
                panier_length={cart.items.length}
            /> */}
            <Hero

                title="Votre panier"
                image="panier.webp"
            />

            <Col className="section-container" xs={21} sm={16}>
                <Row justify="space-between">
                    <Col className="store-item-container" sm={15}>
                        <Row justify="space-between">
                            <Col>
                                <h2>Vos produits</h2>
                            </Col>

                            <Col>
                                <h2>Prix</h2>
                            </Col>
                        </Row>

                        {/* Composant panier --------------------------------- */}
                        {listPanier}
                        {/* Composant panier------------------------------------ */}


                        <hr />

                        <Row justify="end">
                            <h3>Total( {cart.items.length} produits): ~{Number(testTotal.toFixed(2))}€</h3>
                        </Row>
                    </Col>

                    <Col sm={7} className="total-store">
                        <div className="info">
                            <i class="fi-rr-exclamation"></i> <p>Le prix peut être légèrement différent au moment du règlement en boucherie dû à la pesée.</p>
                        </div>

                        <h1>Total ({cart.items.length} produits): ~{Number(testTotal.toFixed(2))}€</h1>

                        <button onClick={() => addCommand()} >Passer la commande</button>
                    </Col>

                </Row>

            </Col>

            <Footer />
        </div>
    )
}


export default panier
