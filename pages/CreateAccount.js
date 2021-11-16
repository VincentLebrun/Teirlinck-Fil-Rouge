import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Input, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { isLogin } from "../middleware/isLogin";
//Exemple d'utilisation com!parative de mot de passe
//
// (async ()=> {
//   const bcrypt = require("bcryptjs");
//   try {
//     const text = "Okay"
//      const salt= await bcrypt.genSalt(10)
//      const hash = await bcrypt.hash(text, salt)

//      console.log(hash)
//      const compare = await bcrypt(text, hash)
//      console.log(compare)
//   } catch (error) {
//     console.log(error.message)
//   }
// })()
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const RegistrationForm = ({ token }) => {
  useEffect(() => {
    if (isLogin(token)) {
      router.push("/");
    }
  }, []);
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const pass = values.password;
    const testCrypt = await bcrypt.hash(pass, saltRounds);
    const sendAccount = {
      id: Date.now(),
      firstname: values.firstname,
      lastname: values.lastname,
      mail: values.email,
      password: testCrypt,
      phone: values.phone,
      admin: false,
      validated: false,
    };

    const res = await fetch(process.env.NEXT_PUBLIC_API_USERS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendAccount),
    }).catch((error) => console.log(error));

    if (res.status && res.status === 200) {
      notification["success"]({
        message: "BRAVO",
        description:
          "BRAVO, vous venez de créer votre compte sur boucherie-teirlinck.fr, vous pouvez maintenant vous connecter. Il ne vous reste plus qu'à vous rendre en boucherie pour faire valider votre compte avant de pouvoir passer commande ! ",
        placement: "topRight",
        duration: 0,
        style: {
          width: 500,
          // fontSize: "larger"
        },
      });
      router.push("/connexion");
    } else if (res.status && res.status === 409) {
      notification["warning"]({
        message: "Erreur",
        description:
          "L'adresse e-mail que vous avez saisie est utilisée pour un compte déjà existant",
        placement: "topRight",
        duration: 0,
        style: {
          width: 500,
          // fontSize: "larger"
        },
      });
    } else {
      notification["error"]({
        message: "OUPS",
        description:
          "Une erreur s'est produite, votre compte n'a pas pu être créé, veuillez réessayer",
        placement: "topRight",
        duration: 0,
        style: {
          width: 500,
          // fontSize: "larger"
        },
      });
    }
  };

  return (
    <main>
      <Row justify="center" align="middle" className="container1">
        <Col xl={16} xs={22}>
          <Row className="black-container" justify="center" align="middle">
            <Col span={24}>
              <Link href="/">
                <img src="/logo.svg" alt="" />
              </Link>
            </Col>
            <div className="pastille-login">
              <i
                onClick={() => router.push("/")}
                className="fi-rr-cross-small"
              ></i>
            </div>
            <Col xl={16}>
              <hr />
              <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
              >
                {/* <Row className="contain" justify="space-around" xs={16} xl={5}> */}
                <div className="input75">
                  <Form.Item
                    className="formInputStyle"
                    label="Prénom"
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez entrer votre prénom",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input maxLength="90" />
                  </Form.Item>

                  <Form.Item
                    label="Nom"
                    className="formInputStyle"
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez entrez votre nom",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input maxLength="90" />
                  </Form.Item>

                  <Form.Item
                    label="Numéro de téléphone"
                    className="formInputStyle"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez saisir un numéro de téléphone",
                      },
                    ]}
                  >
                    <Input maxLength="90" />
                  </Form.Item>
                  <Form.Item
                    label="Adresse mail"
                    className="formInputStyle"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "L'e-mail n'est pas valide",
                      },
                      {
                        required: true,
                        message: "Veuillez taper un e-mail",
                      },
                    ]}
                  >
                    <Input maxLength="90" />
                  </Form.Item>

                  <Form.Item
                    className="formInputStyle"
                    label="Mot de passe"
                    name="password"
                    hasFeedback
                    rules={[
                      {
                        message:
                          "Le mot de passe doit contenir au minimum 8 caractères, une majuscule un chiffre et un caractère spécial ex ^*$ etc",
                        pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/,
                        required: true,
                      },
                    ]}
                  >
                    {/* <label>Mot de passe"</label> */}
                    <Input.Password maxLength="90" />
                  </Form.Item>

                  <Form.Item
                    className="formInputStyle"
                    label="Confirmez le mot de passe"
                    name="confirm"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Confirmez votre mot de passe",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "Les 2 mot de passe ne correspondent pas "
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    {/* <label>Confirmez le mot de passe</label> */}
                    <Input.Password maxLength="90" />
                  </Form.Item>
                </div>
                <Form.Item>
                  <Button className="button" htmlType="submit">
                    Créer votre compte
                  </Button>
                </Form.Item>
                <p>
                  <i className="fi-rr-info"></i>Avant de pouvoir passer commande
                  sur notre site, il faudra au préalable valider votre compte en
                  boucherie.
                </p>
                <hr />
              </Form>
              <h2>Vous avez déjà un compte?</h2>
              <Link href="/connexion">
                <Button className="button" htmlType="submit">
                  Se connecter
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default RegistrationForm;
