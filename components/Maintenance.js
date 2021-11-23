import { Row, Col } from "antd";
import Link from 'next/link'


const ConnexionForm = ({ manager }) => {


    return (
        <main>
            <Row justify="center" align="middle" className="container1">
                <Col xs={22} xl={16}>
                    <Row className="black-container" justify="center" align="middle">
                        <Col span={24}>
                            <Link href="/"><img src="/logo.svg" alt="" /></Link>
                        </Col>
                        <Col xl={16}>
                            <hr />
                            <p>Ce site n'est pour le moment pas encore accessible, vous pouvez néanmoins nous retrouver en boucherie au 30 Rue de Condé, 59000 Lille.:</p>
                            <hr />
                            <p>Nos horaires:</p>
                            <p>Lundi: {manager?.lundi}</p>
                            <p>Mardi: {manager?.mardi}</p>
                            <p>Mercredi: {manager?.mercredi}</p>
                            <p>Jeudi: {manager?.jeudi}</p>
                            <p>Vendredi: {manager?.vendredi}</p>
                            <p>Samedi: {manager?.samedi}</p>
                            <p>Dimanche et jours feriés: {manager?.dimanche}</p>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </main>
    );
};

export default ConnexionForm;
