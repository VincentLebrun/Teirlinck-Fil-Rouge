import React, { useState } from "react";
import { Button, Row, Col, Form, Input, Select } from "antd";
import Link from 'next/link'
const { Option } = Select;
import cookieCutter from 'cookie-cutter'
import { Router, useRouter } from 'next/router'



const ConnexionForm = ({ setToken }) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="+33">+33</Option>
            </Select>
        </Form.Item>
    );
    const onFinish = async (values) => {
       
        const res = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),

        }).then(res => res.json())
            .catch((err) => {
                console.log(err);
            });

        if (res.token) {
            cookieCutter.set('token', res.token);
            setToken(res.token);
            router.push("/");
            
        }
            


    };

    return (
        <main>
            <Row justify="center" align="middle" className="container1">
                <Col xs={22} xl={16}>
                    <Row className="black-container" justify="center" align="middle">
                        <Col span={24}>
                            <Link href="/"><img src="/logo.svg" alt="" /></Link>
                        </Col>
                        <div className="pastille-login"><i className="fi-rr-spinner-alt"></i></div>
                        <Col xl={16}>
                            <hr />
                            <Form
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                initialValues={{
                                    prefix: "+33",
                                }}
                                scrollToFirstError
                            >
                                <Row className="contain" justify="space-around" xl={24}>

                                </Row>
                                <Form.Item
                                    label="E-mail"
                                    className="formInputStyle"
                                    name="mail"
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

                                <Form.Item>
                                    <Button className="button" htmlType="submit">
                                        Connexion
                  </Button>
                                </Form.Item>

                            </Form>
                            <hr />
                            <h2>Vous n'avez pas encore de compte?</h2>
                            <Link href="/CreateAccount"><Button className="button" htmlType="submit">
                                Créer un compte
                  </Button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </main>
    );
};

export default ConnexionForm;
