import { Button, Row, Col, Form, Input } from "antd";
import Link from "next/link";

const ResetPassword = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const resetPass = {
      mail: values.email,
    };

    await fetch("reset-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetPass),
    }).catch((error) => console.log(error));
  };

  return (
    <main>
      <Row justify="center" align="middle" className="container1">
        <Col xs={22} xl={16}>
          <Row className="black-container" justify="center" align="middle">
            <Col span={24}>
              <Link href="/">
                <img src="/logo.svg" alt="" />
              </Link>
            </Col>
            <div className="pastille-login">
              <i class="fi-rr-spinner-alt"></i>
            </div>
            <Col xl={16}>
              <hr />
              <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
              >
                <Row className="contain" justify="space-around" xl={24}></Row>
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

                <Form.Item>
                  <Button className="button" htmlType="submit">
                    Envoi de mail
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default ResetPassword;
