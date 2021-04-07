import React from "react";
import { Col, Row } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
const Footer = () => {
  return (
    <footer>
      <Row justify="center" align="middle">
        <Col  xl={16}>
          <Row justify="space-between" align="middle">
            <Col align="middle" xs={20} xl={3} className="image">
              <img src="/logo.svg" alt="" />
            </Col>

            <Col align="middle">
              <p>
                <i className="fi-rr-calendar"> </i>Horaires
              </p>
              <p>Lundi: 09h00 - 13h00, 16h00 - 18h45</p>
              <p>Mardi: 09h00 - 14h00, 16h00 - 18h45</p>
              <p>Mercredi: Fermé</p>
              <p>Jeudi: 09h00 - 14h00, 16h00 - 18h45</p>
              <p>Vendredi: 09h00 - 14h00, 16h00 - 18h45</p>
              <p>Samedi: 08h30 - 15h00</p>
              <p>Dimanche: Fermé</p>
            </Col>
            <Col >
              <Link href="https://www.facebook.com/boucherie.teirlinck">
                <FacebookOutlined style={{ fontSize: "3rem" }} />
              </Link>
              <Link href="/api/hello">
                <InstagramOutlined style={{ fontSize: "3rem" }} />
              </Link>
              <Link href="/api/hello">
                <i></i>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
