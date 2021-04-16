import React from 'react'
import { Row, Col } from 'antd';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Footer from "../components/Footer";
import team from "../team";

export const OurStory = () => {

    // const [cart, setCart] = useState();
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     setCart(JSON.parse(localStorage.getItem('cart')));
    //     setLoading(false);
    // }, []);

    // if (loading) {
    //     return (
    //         <p>Chargement en cours !</p>
    //     )
    // }

    const renderTeam = () => {
        const listTeam = team.map((item) => {
            return (
                <Row key={item.id} className="team" justify="space-around" align="middle">
                    <Col className="teamScreen" xs={24} xl={8}>
                        <div className="element">
                            <img src={`/img/${item.image}`} alt="" />
                            <div className="element-absolute">
                                <div className="element-inside"></div>
                            </div>
                        </div>
                    </Col>
                    <Col className="teamDescription" xs={24} xl={12}>
                        <h2>{item.firstname}.</h2>
                        <p>{item.description}.</p>
                    </Col>
                </Row>
            )
        });

        return (
            <div>
                {listTeam}
            </div>
        );
    }

    return (
        <div className="ourstory">
            {/* <Header
                panier_length={cart.items.length}
            /> */}
            <Hero
                title="Notre histoire"
                image="accueil.webp"
            />
            <Row justify="center">
                <Col span={16}>
                    <Row justify="center">
                        <Section
                            title="Notre histoire"
                            icon="fi-rr-document"
                        />

                        <Col className="ourstoryText" span={21}>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor pariatur recusandae ab accusantium, deserunt ipsam cum quia beatae! Repellat nesciunt sequi, quos labore cum suscipit ullam fugit tempore natus numquam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos necessitatibus placeat doloremque distinctio cum, est repellendus repudiandae hic ab vel facere nobis nam magnam animi ratione harum architecto at minima.</p>
                            <p>Praesentium esse reprehenderit nesciunt dolorem, sunt, minus deleniti aut ipsum voluptas, harum sint sapiente autem tenetur quis voluptatum voluptates commodi. Rerum est exercitationem modi facere quibusdam sequi excepturi vero non!
                            Porro ipsum doloremque soluta quaerat assumenda accusantium, ipsa tempora iste non incidunt exercitationem nulla sint. Quam eos blanditiis, rem soluta porro consequuntur, ad asperiores odit incidunt non nostrum voluptates expedita.</p>
                            <p>Molestias reprehenderit consequatur porro nulla similique, maiores accusantium magnam neque! Repellat officia explicabo, nesciunt tenetur maiores sit quod officiis qui minima veniam! Rem iure, consequatur ex aspernatur aliquid aperiam sit.
                            Laboriosam dignissimos suscipit quam cupiditate dolor fugiat voluptatum, officia fugit, vero nostrum expedita, atque perspiciatis ullam? Veniam earum harum voluptas dignissimos porro aut perspiciatis quia animi mollitia illo, rem itaque!</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem aperiam facilis quisquam repudiandae totam laboriosam architecto eaque illum. Aut vero expedita eos distinctio quod modi sit dolor deleniti. Sit, ad!
                            Quos doloribus temporibus quasi sunt sit nisi quod beatae? A deserunt sint ut eius optio, natus iste, numquam amet aut, explicabo eveniet sapiente assumenda et? Harum asperiores velit quis quas!
                            Vero possimus minus praesentium error iure deleniti, quasi dignissimos repudiandae quos distinctio quaerat non ex, natus atque, ullam vitae aut a accusamus magnam voluptatibus? Ea at consectetur libero cum eius?</p>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi animi, labore eius modi praesentium commodi architecto incidunt explicabo expedita minima vero vitae culpa natus? Tenetur suscipit cum ea expedita aliquid!
                            Consequatur, maxime expedita? Magni, assumenda corporis at fugiat ullam aspernatur a voluptatibus accusamus excepturi nostrum ducimus dolore fuga magnam aliquam quasi impedit ex expedita perspiciatis quas soluta nulla voluptas. Amet!
                            Ad ipsum, minima ea in totam est magnam officia. Animi at iste voluptas minima cumque molestias esse vitae necessitatibus, a illum consequatur omnis velit voluptate provident laboriosam accusamus veniam blanditiis.
                            Quisquam saepe eos fugiat libero nihil praesentium facere, tempora soluta similique odit architecto autem, ad in. Nam, facilis, nisi laborum id et ullam sapiente voluptate harum ea iste, consequuntur iusto.</p>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Section
                            title="Notre équipe"
                            icon="fi-rr-document"
                        />
                    </Row>
                    {renderTeam()}
                    <Row justify="center">
                        <Section
                            title="Nos valeurs"
                            icon="fi-rr-document"
                        />
                    </Row>
                    <Row className="ourValues" justify="space-around">
                        <Col className="valueItem" xs={24} xl={10}>
                            <h2>Tradition.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercitationem odit possimus repellendus nam veniam tempora ad ut, dignissimos officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercitationem odit possimus repellendus nam veniam tempora ad ut, dignissimos officiis!</p>
                            <span className="iconCart"><img src="/img/flaticons/ecologism.svg" alt="" /></span>
                        </Col>
                        <Col className="valueItem" xs={24} xl={10}>
                            <h2>Qualité.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercitationem odit possimus repellendus nam veniam tempora ad ut, dignissimos officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercitationem odit possimus repellendus nam veniam tempora ad ut, dignissimos officiis!</p>
                            <span className="iconCart"><img src="/img/flaticons/quality.svg" alt="" /></span>
                        </Col>
                    </Row>
                    <Row className="ourValues" justify="space-around">
                        <Col className="valueItem" xs={24} xl={10}>
                            <h2>Produits locaux.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercitationem odit possimus repellendus nam veniam tempora ad ut, dignissimos officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercitationem odit possimus repellendus nam veniam tempora ad ut, dignissimos officiis!</p>
                            <span className="iconCart"><img src="/img/flaticons/tool.svg" alt="" /></span>
                        </Col>
                        <Col className="valueItem" xs={24} xl={10}>
                            <h2>Bien-être animal.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercitationem odit possimus repellendus nam veniam tempora ad ut, dignissimos officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercitationem odit possimus repellendus nam veniam tempora ad ut, dignissimos officiis!</p>
                            <span className="iconCart"><img src="/img/flaticons/cow.svg" alt="" /></span>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Footer />
        </div>
    )
}

export default OurStory;