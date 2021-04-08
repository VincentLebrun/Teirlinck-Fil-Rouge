import React from 'react';
import { Row, Col } from 'antd';

const Hero = ({ title, image }) => {
    return (
        <div className="hero">
            <div className="heroImage">
                <img src={`/img/${image}`} alt=""/>
                <Row>
                    <Col xs={16} xl={16} className="heroTitle">
                        <p>{title}</p>
                    </Col> 
                </Row>
            </div>
        </div>
    )
}

export default Hero
