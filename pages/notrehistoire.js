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
                            <p>La boucherie Teirlinck, située au 30 rue de Condé à Lille, est tenue par Alexandre Teirlinck et existe depuis 3 générations (1930).</p> 
                            <p>Toutes nos charcuteries sont confectionnées avec les recettes du grand-père d'Alexandre, et nos viandes sont issues d'animaux élevés dans notre région, dans le respect des normes et de la qualité.</p>
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
                        <Col className="valueItem" xl={10}>
                            <h2>Tradition.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercit ationem odit possimus repellendus.</p>
                            <span className="iconCart"><img src="/img/flaticons/ecologism.svg" alt="" /></span>
                        </Col>
                        <Col className="valueItem" xl={10}>
                            <h2>Qualité.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercit ationem odit possimus repellendus.</p>
                            <span className="iconCart"><img src="/img/flaticons/quality.svg" alt="" /></span>
                        </Col>
                    </Row>
                    <Row className="ourValues" justify="space-around">
                        <Col className="valueItem" xl={10}>
                            <h2>Produits locaux.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercit ationem odit possimus repellendus.</p>
                            <span className="iconCart"><img src="/img/flaticons/tool.svg" alt="" /></span>
                        </Col>
                        <Col className="valueItem" xl={10}>
                            <h2>Bien-être animal.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore, exercit ationem odit possimus repellendus.</p>
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