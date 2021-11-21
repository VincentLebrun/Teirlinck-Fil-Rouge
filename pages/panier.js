import React, { useState } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { Row, Col, notification, Checkbox, Modal, Input, DatePicker, Select } from 'antd';
import Link from 'next/link'
import jwt from "jsonwebtoken";
import 'moment/locale/fr';
import locale from 'antd/lib/date-picker/locale/fr_FR';


const panier = ({ cart, setCart, token, manager }) => {

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

    const [modal, setModal] = useState(false);
    const [commandDate, setCommandDate] = useState();
    const [commandComment, setCommandComment] = useState("");
    const [commandPeriod, setCommandPeriod] = useState("matin");


    const { TextArea } = Input;
    const { Option } = Select;
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


    function verifyCommand() {
        if (manager?.validCommands) {
            if (cart.items.length === 0) {
                notification['warning']({
                    message: "Attention !",
                    description: "Vous devez remplir votre panier d'au moins un article avant de confirmer votre commande.",
                    placement: "topRight"
                });
            } else if (!token) {
                notification['warning']({
                    message: "Attention !",
                    description: "Vous devez vous connecter avant de passer commande.",
                    placement: "topRight"
                });
            } else {

                // fonction de décryptage du token 
                const decryptedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);

                if (decryptedToken.userValidated) {
                    setModal(true);

                } else {
                    notification['warning']({
                        message: "Attention !",
                        description: "Vous devez attendre que votre compte soit validé avant de pouvoir passer commande sur notre site.",
                        placement: "topRight"
                    });
                }

            }
        } else {
            notification['warning']({
                message: "Attention !",
                description: "Les commandes sont actuellement désactivées sur le site veuillez réessayer ultérieurement",
                placement: "topRight"
            });
        }

    }


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


    async function addCommand() {
        if (cart.items.length === 0) {
            notification['warning']({
                message: "Attention !",
                description: "Vous devez remplir votre panier d'au moins un article avant de confirmer votre commande.",
                placement: "topRight"
            });
        } else if (!token) {
            notification['warning']({
                message: "Attention !",
                description: "Vous devez vous connecter avant de passer commande.",
                placement: "topRight"
            });
        } else if (!commandDate) {
            notification['warning']({
                message: "Attention !",
                description: "Vous devez remplir une date de récupération de votre commande.",
                placement: "topRight"
            });
        } else if (!commandPeriod) {
            notification['warning']({
                message: "Attention !",
                description: "Vous devez choisir de récupérer votre commande le matin ou l'après midi",
                placement: "topRight"
            });
        }
        else {

            // fonction de décryptage du token 
            const decryptedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);


            if (decryptedToken.userValidated) {
                const order = {
                    numero: Date.now(),
                    products: cart.items,
                    total: cart.total,
                    date: Date.now(),
                    commandDate: commandDate,
                    commandPeriod: commandPeriod,
                    commandComment: commandComment,
                    user_id: decryptedToken.userId,
                    user_firstname: decryptedToken.userFirstName,
                    user_lastname: decryptedToken.userLastname,
                    user_phone: decryptedToken.userPhone,
                    delivered: false,
                    ready: false
                }

                const res = await fetch(process.env.NEXT_PUBLIC_API_ORDERS, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order)
                }).catch(error => console.log(error));

                if (res.status == 200) {
                    notification['info']({
                        message: `Votre commande n°${order.numero} a bien été prise en compte !`,
                        description: "Merci pour votre commande, celle-ci a bien été enregistrée, vous pourrez la récupérer à la date indiquée.",
                        placement: "topRight",
                        duration: 0
                    });

                    let newPanier = cart;
                    newPanier = { items: [], total: 0 };
                    setCart({
                        items: [...newPanier.items],
                        total: 0
                    })
                    setModal(false);
                } else {
                    notification['error']({
                        message: "Attention !",
                        description: "Un problème est survenu, veuillez réessayer ultérieusement.",
                        placement: "topRight"
                    });
                }

            } else {
                notification['warning']({
                    message: "Attention !",
                    description: "Vous attendre que votre compte soit validé avant de pouvoir passer commande sur notre site.",
                    placement: "topRight"
                });
            }

        }
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
        const newQuantity = Math.abs(e.target.value);
        if (newQuantity > 0) {
            // setNewQuantity(e.target.value);
            // console.log(newQuantity);
            const cart_item = cart.items.find((item) => item.name == name);
            const previous_price = itemPrice(price, quantity, price_type);
            cart_item.quantity = newQuantity;
            const new_price = itemPrice(price, cart_item.quantity, price_type);
            let items = cart.items;
            const index_item = items.indexOf(name);
            items[index_item] = cart_item;

            setCart({
                items: items,
                total: Number((cart.total - previous_price + new_price).toFixed(2))
            });
        } else {
            alert("Veuillez saisir une quantité valide pour ce produit");
        }
    }

    const updateVacuum = (e, id) => {

        const newCart = cart.items.map(item => {
            if (item.id === id) {
                item.vacuum = e.target.checked
            }
            return item;
        })

        setCart({
            ...cart,
            items: newCart
        })
    }

    let testTotal = 0;
    const listPanier = cart.items.map(item => {

        testTotal += itemPrice(item.price, item.quantity, item.price_type);


        return (
            <div key={item.id}>

                <hr className="top-hr" />

                <Row justify="space-between">
                    <Col xs={15} sm={12}>
                        <Row justify="space-between">
                            <Col xs={12} sm={10}>

                                <Link href={`/products/${item.id}`}>

                                    <div className="element">
                                        <img src={process.env.NEXT_PUBLIC_URL + item.image} alt="" />
                                        <div className="element-absolute">
                                            <div className="element-inside"></div>
                                        </div>
                                    </div>

                                </Link>

                            </Col>

                            <Col className="nameAndPrice" xs={9} sm={10}>
                                <h2>{item.name}</h2>

                                <div className="input-weight">
                                    <input onChange={(e) => updateQuantity(e, item.price, item.price_type, item.name, item.quantity)} type="number" placeholder={item.quantity} step={item.price_type === "/kg" ? "25" : "1"} min={item.price_type === "/kg" ? "25" : "1"} value={item.quantity} />
                                    <p>{priceType(item.price_type)}</p>
                                </div>
                                <div>
                                    Sous vide
                                    <Checkbox onChange={(e) => updateVacuum(e, item.id)} checked={item.vacuum} />
                                </div>

                            </Col>
                        </Row>

                    </Col>

                    <Col className="price-suppr" xs={24} sm={8}>

                        <h2>~{itemPrice(item.price, item.quantity, item.price_type)}€</h2>
                        <div className="store-button">
                            <button onClick={() => deleteCart(item.id)}>Supprimer de votre panier</button>
                        </div>

                    </Col>


                </Row>
            </div>

        )
    })

    return (
        <div>
            <Modal
                title="Quelque chose à rajouter?"
                centered
                visible={modal}
                onOk={() => addCommand()}
                onCancel={() => setModal(false)}
                okText="Valider la commande"
                cancelText="Annuler"
            >
                <TextArea
                    onChange={(e) => setCommandComment(e.target.value)}
                    value={commandComment}
                    placeholder="Rentrez ici votre commentaire, exemple `Tranches épaisses de jambon` "
                    autoSize={{ minRows: 4, maxRows: 14 }}
                    maxLength={500}
                />

                <p> A quel moment souhaitez vous venir récupérer votre commande? </p>
                <p> Nous préparons les commandes uniquement le mardi et le jeudi.</p>

                <DatePicker
                    format={dateFormatList}
                    onChange={(e) => setCommandDate(e ? e._d : null)}
                    showToday={false}
                    locale={locale}
                    disabledDate={(date) => {
                        if (date != null) {
                            const today = new Date();
                            let yesterday = new Date(date._d);
                            yesterday.setDate(yesterday.getDate() - 1);

                            if (date._d < new Date()) return true;
                            if (today.getHours() > 18 && yesterday.getDate() == today.getDate() && yesterday.getMonth() == today.getMonth()) return true;
                            if (date._d.getDay() === 2 || date._d.getDay() === 4) {
                                return false;
                            } else {
                                return true;
                            };
                        };
                    }}
                />

                <Select value={commandPeriod} onChange={(e) => setCommandPeriod(e)}>
                    <Option value="matin">Matin</Option>
                    <Option value="apres-midi">Après-Midi</Option>
                </Select>
            </Modal>
            {/* <Header
                panier_length={cart.items.length}
            /> */}
            <Hero

                title="Votre panier"
                image="panier.webp"
            />

            <Col className="section-container" xs={21} sm={20} md={16}>
                <Row justify="space-between">
                    <Col className="store-item-container" xs={24} sm={24} xl={15}>
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

                    <Col xs={24} sm={24} xl={8} className="total-store">
                        <div className="info">
                            <i class="fi-rr-exclamation"></i> <p>Le prix peut être légèrement différent au moment du règlement en boucherie dû à la pesée.</p>
                        </div>

                        <h1>Total ({cart.items.length} produits): ~{Number(testTotal.toFixed(2))}€</h1>

                        <button onClick={() => verifyCommand()} >Valider la commande</button>

                    </Col>
                </Row>
            </Col>

            <Footer manager={manager} />
        </div >
    )
}


export default panier
