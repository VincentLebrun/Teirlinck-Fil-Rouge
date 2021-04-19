import React, { useState, useEffect } from 'react'
import Link from 'next/link';

import AdminLayout from "../../../components/AdminLayout"
import { Tag, Switch, Space, Button, Popconfirm, Select, notification, Table, Input} from 'antd';

const index = ({ data }) => {

    const { Option } = Select;

    const { Search } = Input;

    const [orders, setOrders] = useState(data.reverse());

    function handleChange(value) {
        console.log(`selected ${value}`);
        
        if (value === "readyNotDelivered") {
            const filteredOrders = data.filter((item) => item.ready && !item.delivered);
            console.log(filteredOrders);
            setOrders(filteredOrders);
        } 
        if (value === "notReady") {
            const filteredOrders = data.filter((item) => !item.ready);
            setOrders(filteredOrders);
        } 
        if (value === "all") {
            setOrders(data)
        }
    }

    const convertToDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month:'2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
        const result = date.toLocaleDateString('fr-FR', options);
        return result;
    }

    const onSearch = (value) => { 
        value = value.toLowerCase();
        const filteredOrders = data.filter((item) => item.user_lastname.toLowerCase().includes(value) || item.user_firstname.toLowerCase().includes(value));
        setOrders(filteredOrders);
    }

    async function deleteOrder(id) {
        await fetch("http://localhost:4000/orders", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: id })
        }).catch(error => console.log(error));

        const allOrders = [...orders];
        const index = allOrders.findIndex((item) => item._id === id);

        notification['info']({
            message: `Suppression de la commande n°${allOrders[index].numero} confirmée.`,
            description: `La commande n°${allOrders[index].numero} du ${convertToDate(allOrders[index].date)} de ${allOrders[index].user_firstname} ${allOrders[index].user_lastname} a été définitivement supprimée de la base de données.`,
            placement: "topRight",
            duration: 0
        });

        allOrders.splice(index, 1);
        setOrders(allOrders);

    };

    async function changeDeliveryStatus(id) {
        const allOrders = [...orders];
        const index = allOrders.findIndex((item) => item._id === id);

        if (allOrders[index].delivered) {
            allOrders[index].delivered = false;
        } else {
            allOrders[index].delivered = true;
        }

        setOrders(allOrders);

        const order = {
            ...allOrders[index],
            delivered: allOrders[index].delivered
        }

        await fetch("http://localhost:4000/orders", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)

        }).catch(error => console.log(error));
    }

    async function changeReadyStatus(id) {
        const allOrders = [...orders];
        const index = allOrders.findIndex((item) => item._id === id);

        if (allOrders[index].ready) {
            allOrders[index].ready = false;
        } else {
            allOrders[index].ready = true;
        }

        setOrders(allOrders);

        const order = {
            ...allOrders[index],
            ready: allOrders[index].ready
        }

        await fetch("http://localhost:4000/orders", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)

        }).catch(error => console.log(error));
    }

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
            title: 'Date de la commande',
            key: 'date',
            render: (text, item) => (
                <Space size="middle">
                    <h1>{convertToDate(item.date)}</h1>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Statut de la commande',
            key: 'orderStatus',
            render: (text, item) => (
                <Space size="middle">

                    <Popconfirm title="Etes vous sur?" okText="Oui" cancelText="Annuler" onConfirm={() => changeDeliveryStatus(item._id)} ><Switch checkedChildren="Délivrée" unCheckedChildren="Non délivrée" checked={item.delivered} /></Popconfirm>

                    <Popconfirm title="Etes vous sur?" okText="Oui" cancelText="Annuler" onConfirm={() => changeReadyStatus(item._id)} ><Switch checkedChildren="Prête" unCheckedChildren="Non prête" checked={item.ready} /></Popconfirm>

                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, item) => (
                <Space size="middle">
                    <Popconfirm title="Etes vous sur?" okText="Oui" cancelText="Annuler" onConfirm={() => deleteOrder(item._id)} ><Button danger>Supprimer</Button></Popconfirm>
                    <Button type="primary"><Link href={`orders/${item._id}`}>Voir la commande</Link></Button>
                </Space>
            ),
            align: 'right'
        }

    ];

    return (
        <div>
            <AdminLayout selectedKey="4">
                <Select defaultValue="all" style={{ width: 250 }} onSelect={handleChange}>
                    <Option value="all">Toutes les commandes</Option>
                    <Option value="readyNotDelivered">Commandes prêtes non délivrées</Option>
                    <Option value="notReady">Commandes non prêtes</Option>
                </Select>
                <Search className="search-input" placeholder="Chercher un client" onSearch={onSearch} style={{ width: 200 }}></Search>
                <Table columns={columns} dataSource={orders} rowKey="id" />
            </AdminLayout>
            
        </div>

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


