import React, { useState } from "react";
import { Button, Row, Col, Form, Input } from "antd";

const bcrypt = require("bcrypt");
const saltRounds = 10;

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const pass = values.password;
    const testCrypt = bcrypt.hash(pass, saltRounds);
    console.log(testCrypt);
  };

  return (
    <main>
      <Row justify="center" align="middle" className="container1">
        <Col xl={16}>
          <Row className="black-container" justify="center" align="middle">
            <Col span={24}>
              <img src="/logo.svg" alt="" />
            </Col>
            <Col xl={16}>
              <hr />
              <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
              >
                <Row className="contain" justify="space-around" xl={24}>
                  <Form.Item
                    className="formInputStyle"
                    label="Prénom"
                    name="fisrtName"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez entrer votre prénom",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Nom"
                    className="formInputStyle"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez entrez votre nom",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Row>
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
                  <Input />
                </Form.Item>
                <Form.Item
                  label="E-mail"
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
                  <Input />
                </Form.Item>
                <Form.Item
                  className="formInputStyle"
                  label="Mot de passe"
                  name="password"
                  hasFeedback
                  rules={[
                    {
                      message:
                        "Le mot de passe doit contenir au minimum 6 caractères et une majuscule",
                      pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/,
                      required: true,
                    },
                  ]}
                >
                  {/* <label>Mot de passe"</label> */}
                  <Input.Password />
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
                          new Error("Les 2 mot de passe ne correspondent pas ")
                        );
                      },
                    }),
                  ]}
                >
                  {/* <label>Confirmez le mot de passe</label> */}
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button className="button" htmlType="submit">
                    Créer un compte
                  </Button>
                </Form.Item>
                <hr />
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default RegistrationForm;
