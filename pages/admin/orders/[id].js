import React from 'react'
import { useState, useEffect } from 'react'
import { Layout, Row } from 'antd';
import { Input } from 'antd';
import { useRouter } from 'next/router'
import { admin } from "../../../middleware/admin"
import AdminLayout from "../../../components/AdminLayout"


const Order = ({ token }) => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [order, setOrder] = useState();

    async function getOrder(orderId) {
        await fetch(process.env.NEXT_PUBLIC_API_ORDERS + "/" + orderId, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json()).then(json => { setOrder(json) });
    }

    useEffect(() => {
        if (!admin(token)) {
            router.push("/")
        }
        const id = router.query.id
        console.log(id);
        getOrder(id);

    }, [])

    useEffect(() => {
        if (order) {
            setIsLoading(false)
        }
    }, [order])

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const convertToDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
        const result = date.toLocaleDateString('fr-FR', options);
        return result;
    }

    const convertToDateCommand = (timestamp) => {
        const date = new Date(timestamp);
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const result = date.toLocaleDateString('fr-FR', options);
        return result;
    }

    if (isLoading) {
        return <p>Chargement en cours ...</p>

    }

    const listOrderProducts = order.products.map((item) => {
        return (
            <Row key={item.id} justify="start" align="middle">
                <p>{item.name} : {item.quantity} {item.price_type === "/kg" ? "grammes" : "pièce(s)"}</p>
            </Row>
        )
    })
    return (
        <AdminLayout>

            <div className="orderDetail">
                <Row>
                    <p>Commande numéro {order.numero} passée le {convertToDate(order.date)} par {order.user_firstname} {order.user_lastname} :</p>
                </Row>
                {listOrderProducts}
                <p>Total estimé de la commande : {order.total} €</p>
                <p>Commentaire additionnel  : {order.commandComment}</p>
                <p>Numéro de téléphone du client : {order.user_phone}</p>
                <p>Commande à préparer pour le  : {convertToDateCommand(order.commandDate)} {order.commandPeriod}</p>
                <p>Statut de la commande : {order.ready ? "prête" : "non prête"} et {order.delivered ? "délivrée" : "non délivrée"}</p>
            </div>

        </AdminLayout>




    )
}

export default Order;

