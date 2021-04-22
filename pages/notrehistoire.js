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
                    <Col className="teamScreen" xl={10}>
                        <div className="element">
                            <img src={`/img/${item.image}`} alt="" />
                            <div className="element-absolute">
                                <div className="element-inside"></div>
                            </div>
                        </div>
                    </Col>
                    <Col className="teamDescription" xl={12}>
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
                    <Row className="oustory" justify="center">
                        <Section
                            title="Notre histoire"
                            icon="fi-rr-document"
                        />

                        <Col className="ourstoryText" span={22}>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor pariatur recusandae  elit pariatur deserunt ab accusantium, deserunt ipsam cum quia nesciunt beatae! Repellat nesciunt sequi, quos labore cum suscipit ullam fugit tempore natus numquam?</p>
                            <p>Lorem ipsum dolor sit amet, facere consequatur consectetur adipisicing elit. Quos necessitatibus placeat tenetur  maiores doloremque distinctio cum, facere est repellendus repudiandae hic ab vel facere nobis nam magnam animi ratione harum architecto at minima.</p>
                            <p>Molestias reprehenderit consequatur porro nulla similique, minima maiores accusantium quos magnam neque! Repellat officia explicabo, nesciunt tenetur maiores sit quod officiis qui minima veniam! Rem iure, consequatur ex aspernatur aliquid aperiam sit.</p>
                            <p>Laboriosam dignissimos suscipit quam cupiditate dolor fugiat voluptatum, officia fugit, vero nostrum expedita harum, atque perspiciatis ullam? Veniam earum harum voluptas dignissimos porro aut perspiciatis quia animi mollitia illo, rem itaque!</p>
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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercitationem odit possimus repellendus nam veniam tempora ad ut, dignissimos officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <span className="iconCart"><img src="/img/flaticons/ecologism.svg" alt="" /></span>
                        </Col>
                        <Col className="valueItem" xs={24} xl={10}>
                            <h2>Qualité.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercitationem odit possimus repellendus nam veniam tempora ad ut, dignissimos officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <span className="iconCart"><img src="/img/flaticons/quality.svg" alt="" /></span>
                        </Col>
                    </Row>
                    <Row className="ourValues" justify="space-around">
                        <Col className="valueItem" xs={24} xl={10}>
                            <h2>Produits locaux.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercitationem odit possimus repellendus nam veniam tempora ad ut, dignissimos officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <span className="iconCart"><img src="/img/flaticons/tool.svg" alt="" /></span>
                        </Col>
                        <Col className="valueItem" xs={24} xl={10}>
                            <h2>Bien-être animal.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercitationem odit possimus repellendus nam veniam tempora ad ut, dignissimos officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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