import { Button, Row, Col, Form, Input, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const [form] = Form.useForm();
  // const router = useRouter();

  const onFinish = async (values) => {
    const resetPass = {
      mail: values.email,
    };

    const res = await fetch(process.env.NEXT_PUBLIC_API_RESET_PASSWORD, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetPass),
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
    } else if (res.status && res.status === 409) {
      notification["warning"]({
        message: "Erreur",
        description: "L'adresse e-mail que vous avez saisie n'existe pas",
        placement: "topRight",
        duration: 0,
        style: {
          width: 500,
        },
      });
    } else {
      notification["error"]({
        message: "OUPS",
        description:
          "Une erreur s'est produite,nous n'avons pas pu envoyer de mail à cette adresse",
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
