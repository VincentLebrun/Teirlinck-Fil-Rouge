import React from "react";
import { Col, Row } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
const Footer = ({ manager }) => {
  return (
    <footer>
      <Row justify="center" align="middle" >
        <Col md={16} xs={24} >
          <Row className="bodyFooter" justify="space-between" align="middle">
            <Col md={5} sm={8} xs={16} align="middle" className="image">
              <img src="/logo.svg" alt="" />
            </Col>

            <Col md={16} xs={22} align="middle">
              <p className="pCalendar">
                <i className="fi-rr-calendar"> </i>Horaires
              </p>
              <p>Lundi: {manager?.lundi}</p>
              <p>Mardi: {manager?.mardi}</p>
              <p>Mercredi: {manager?.mercredi}</p>
              <p>Jeudi: {manager?.jeudi}</p>
              <p>Vendredi: {manager?.vendredi}</p>
              <p>Samedi: {manager?.samedi}</p>
              <p>Dimanche et jours feriés: {manager?.dimanche}</p>
            </Col>

            <Col className="iconFooter" md={3} xs={7} >

              <Link href="https://www.facebook.com/boucherie.teirlinck">
                <FacebookOutlined style={{ fontSize: "3rem" }} />
              </Link>

              <Link href="/api/hello">
                <InstagramOutlined style={{ fontSize: "3rem" }} />
              </Link>


            </Col>
          </Row>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
