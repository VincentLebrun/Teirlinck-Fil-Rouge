import React from "react";
import { Col, Row } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
const Footer = () => {
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
              <p>Lundi: 09h00 - 13h00, 16h00 - 19h30</p>
              <p>Mardi: 09h00 - 13h00, 16h00 - 19h30</p>
              <p>Mercredi: Fermé</p>
              <p>Jeudi: 09h00 - 13h00, 16h00 - 19h30</p>
              <p>Vendredi: 09h00 - 13h00, 16h00 - 19h30</p>
              <p>Samedi: 08h30 - 14h30</p>
              <p>Dimanche et jours feriés :  Fermé</p>
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
