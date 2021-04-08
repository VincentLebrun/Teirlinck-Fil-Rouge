import React, { useState } from "react";
import { Row, Col } from "antd";

const CreateAccount = ({action}) => {
  const [text, setText] = useState("");
  return (
    <main>
      <Row justify="center" align="middle">
        <Col xs={16} xl={10}>
          <Row justify="center" align="middle">
            <Col
              justify="center"
              align="middle"
              xs={16}
              xl={10}
              className="image"
            >
              <img src="/logo.svg" alt="" />
            </Col>
          </Row>
          <hr />

          <Row>
            <h2>Prénom</h2>
            <input
              type="text"
              className="name"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <h2>Nom</h2>
            <input
              type="text"
              className="name"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </Row>
          <Col>
            <h2>Adresse mail</h2>
            <input
              type="text"
              className="name"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <h2>Mot de passe</h2>
            <input
              type="text"
              className="name"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <h2>Retapez votre mot de passe</h2>
            <input
              type="text"
              className="name"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button class="button" onClick={action}><span>Créer votre compte</span></button>
            <i></i><p> Avant de pouvoir passer votre commande il faudra faire valider votre compte en boucherie</p>
            <hr/>
          </Col>
        </Col>
      </Row>
    </main>
  );
};

export default CreateAccount;
