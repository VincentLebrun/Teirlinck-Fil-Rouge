import { Button, Row, Col, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const bcrypt = require("bcryptjs");
const saltRounds = 10;

const NewPassword = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const resetPass1 = router.query.id;

  console.log(encodeURIComponent(resetPass1));
  const onFinish = async (values) => {
    const pass = values.password;
    const testCrypt = await bcrypt.hash(pass, saltRounds);
    const resetPass = {
      token: resetPass1,
      password: testCrypt,
    };

    await fetch(process.env.NEXT_PUBLIC_API_RESET_PASSWORD, {
      method: "PUT",
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
              <i className="fi-rr-spinner-alt"></i>
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
                  className="formInputStyle"
                  label="Nouveau mot de passe"
                  name="password"
                  hasFeedback
                  rules={[
                    {
                      message:
                        "Le mot de passe doit contenir au minimum 8 caractères une majuscule et un numéro",
                      pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/,
                      required: true,
                    },
                  ]}
                >
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
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button className="button" htmlType="submit">
                    Changement de mot de passe
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

export default NewPassword;
// async function getId(resetToken) {
//   const res = await fetch(
//     process.env.NEXT_PUBLIC_API_RESET_PASSWORD + "/" + resetToken
//   ).then((res) => res.json());
//   return res;
// }
// export async function getServerSideProps({ params }) {
//   const token = await getId(params.id);

//   return {
//     props: {
//       token,
//     },
//   };
// }
