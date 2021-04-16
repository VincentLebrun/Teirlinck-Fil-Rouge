import React, { useState, useEffect } from 'react'

import AdminLayout from "../../../components/AdminLayout"
import {Tag, Switch, Space, Button } from 'antd';

const index = ({ data }) => {

    const [orders, setOrders]= useState(data);
    // useEffect(() => {
    //     getOrders();
    // }, [])

    async function changeDeliveryStatus(id) {
        const allOrders = [...orders];
        const index = allOrders.findIndex((item) => item._id === id);

        if(allOrders[index].delivered) {
            allOrders[index].delivered = false;
        } else {
            allOrders[index].delivered = true;
        }

        setOrders(allOrders);

        const order = {
            ...allOrders[index],
            delivered:allOrders[index].delivered
        }

        await fetch("http://localhost:4000/orders", {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(order)

        }).catch(error => console.log(error));
    }

    console.log(data);

    const columns = [
        {
            title: 'Numéro de commande',
            key: 'num',
            render: (text, item) => (
                <Space size="middle">
                    <h1>{item.numero}</h1>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Date',
            key: 'date',
            render: (text, item) => (
                <Space size="middle">
                    <h1>{item.date}</h1>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'id utilisateur',
            key: 'id',
            render: (text, item) => (
                <Space size="middle">
                    <h1>{item.user_id}</h1>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Prénom',
            key: 'firstname',
            render: (text, item) => (
                <Space size="middle">
                    <h1>{item.user_firstname}</h1>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Nom',
            key: 'lastname',
            render: (text, item) => (
                <Space size="middle">
                    <h1>{item.user_lastname}</h1>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Statut',
            key: 'lastname',
            render: (text, item) => (
                <Space size="middle">
                    <Switch onClick={() => changeDeliveryStatus(item._id)} checkedChildren="Délivrée" unCheckedChildren="Non délivrée" checked={item.delivered}/>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, item) => (
                <Space size="middle">
                    <Button danger onClick={() => supprimer(item._id)}>Supprimer</Button>
                </Space>
            ),
            align: 'right'
        }

    ];

    return (
        <AdminLayout
            columns={columns}
            data={orders}
        />
    )
}

export default index

async function getOrders() {
    const res = await fetch("http://localhost:4000/orders")
        .then(response => response.json())

    return res;

}

export async function getServerSideProps() {
    const data = await getOrders();

    return {
        props: {
            data
        }
    }
}


