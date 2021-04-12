import React, { useState } from "react";
import { Button, Row, Col, Form, Input } from "antd";


const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  return (
    <main>
            <Row align="center" justify="center">
              <Col justify="center" align="center" xs={14} xl={6} class="image">
                <img src="/logo.svg" alt="" />
              </Col>
            </Row>
            <hr />
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              {...formItemLayout}
              scrollToFirstError
            >
             
                <div class="input">
                  <Form.Item
                  className="contain"
                    name="fisrtName"
                    label="Prénom"
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
                </div>
                <div class="input">
                  <Form.Item
                    name="name"
                    label="Nom"
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
                </div>           
               <div class="input">
                  <Form.Item
                    class="email"
                    name="email"
                    label="E-mail"
                                   
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
                    {/* onChange={(e) => setMail(e.target.value)} */}
                    <Input />
                  </Form.Item>
                </div>
                <div class="input">
                  <Form.Item
                    name="password"
                    label="Mot de passe"
                    hasFeedback
                    
                   
                    rules={[
                      {
                        required: true,
                        message: "Veuillez entrer un mot de passe",
                      },
                    ]}
                    
                  >
                    <Input.Password />
                  </Form.Item>{" "}
                </div>

                <Form.Item
                  name="confirm"
                  label="Confirmez le mot de passe"
                  dependencies={['password']}
                 
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
                  {/* onChange={(e) => setRetypePassword(e.target.value)} */}
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
                <hr />
             
            </Form>
         
        
     
    </main>
  );
};

export default RegistrationForm;
