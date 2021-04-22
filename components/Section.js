import React from 'react'
import { Row, Col } from "antd";

const Section = ({ title, icon }) => {
    return (
        <Row justify="center">
            <Col>
                <div className="section">
                    <div className="insection">
                        <i className={icon}></i>
                    </div>
                    <h2>{title}</h2>

                </div>
            </Col>
        </Row>

    )
}

export default Section
