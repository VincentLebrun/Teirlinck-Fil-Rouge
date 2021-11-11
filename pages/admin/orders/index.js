import React, { useState, useEffect } from 'react'
import Link from 'next/link';

import AdminLayout from "../../../components/AdminLayout"
import { Tag, Switch, Space, Button, Popconfirm, Select, notification, Table, Input } from 'antd';
import { useRouter } from 'next/router'
import { admin } from "../../../middleware/admin"

const index = ({ token }) => {
    const router = useRouter();

    const { Option } = Select;

    const { Search } = Input;

    const [data, setData] = useState();
    const [orders, setOrders] = useState();

    async function getOrders() {
        await fetch(process.env.NEXT_PUBLIC_API_ORDERS, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json()).then(json => { setOrders(json.reverse()), setData(json.reverse()) });

    }

    useEffect(() => {
        if (!admin(token)) {
            router.push("/")
        }
        getOrders();
    }, [])

    function handleChange(value) {

        if (value === "readyNotDelivered") {
            const filteredOrders = data.filter((item) => item.ready && !item.delivered);
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
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
        const result = date.toLocaleDateString('fr-FR', options);
        return result;
    }

    const onSearch = (value) => {
        //value = value.toLowerCase();
        const filteredOrders = data.filter((item) => item.user_lastname === value || item.user_firstname === value);
        setOrders(filteredOrders);
    }

    async function deleteOrder(id) {
        const res = await fetch(process.env.NEXT_PUBLIC_API_ORDERS, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: id })
        }).catch(error => console.log(error));

        if (res.status == 200) {
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

        } else {
            notification['error']({
                message: "Attention !",
                description: "Un problème est survenu, veuillez réessayer ultérieusement.",
                placement: "topRight"
            });
        }



    };

    async function changeDeliveryStatus(id) {
        const allOrders = [...orders];
        const index = allOrders.findIndex((item) => item._id === id);

        if (allOrders[index].delivered) {
            allOrders[index].delivered = false;
        } else {
            allOrders[index].delivered = true;
        }

        const order = {
            ...allOrders[index],
            delivered: allOrders[index].delivered
        }

        const res = await fetch(process.env.NEXT_PUBLIC_API_ORDERS, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)

        }).catch(error => console.log(error));

        if (res.status == 200) {
            setOrders(allOrders);
        } else {
            notification['error']({
                message: "Attention !",
                description: "Un problème est survenu, veuillez réessayer ultérieusement.",
                placement: "topRight"
            });
        }
    }

    async function changeReadyStatus(id) {
        // const allOrders = [...orders];
        const index = orders.findIndex((item) => item._id === id);

        if (index === -1) {
            return;
        }

        const allOrders = orders.map(item => {
            if (item._id === id) {
                item.ready = !item.ready;
            }

            return item;
        })

        // if (allOrders[index].ready) {
        //     allOrders[index].ready = false;
        // } else {
        //     allOrders[index].ready = true;
        // }

        // const order = {
        //     ...allOrders[index],
        //     ready: allOrders[index].ready
        // }


        const res = await fetch(process.env.NEXT_PUBLIC_API_ORDERS, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(allOrders[index])

        }).catch(error => console.log(error));

        if (res.status == 200) {
            setOrders(allOrders);
        } else {
            notification['error']({
                message: "Attention !",
                description: "Un problème est survenu, veuillez réessayer ultérieusement.",
                placement: "topRight"
            });
        }
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
                <Table columns={columns} dataSource={orders} rowKey={order => order.numero} />
            </AdminLayout>

        </div>

    )
}

export default index


