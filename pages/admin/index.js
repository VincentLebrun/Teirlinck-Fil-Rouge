import React, { useEffect } from 'react'

import AdminLayout from "../../components/AdminLayout"
import {Tag, Space, Button } from 'antd';

const index = ({ data }) => {

    useEffect(() => {
        getProducts();
    }, [])

    const columns = [
        {
            title: 'id',
            key: 'id',
            render: (text, item) => (
                <Space size="middle">
                    <h1>{item.id}</h1>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Image',
            key: 'img',
            render: (text, item) => (
                <Space size="middle">
                    <div className="product-img">
                        <img src={item.image} alt="" />
                    </div>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Nom',
            key: 'name',
            render: (text, item) => (
                <Space size="middle">
                    <h1>{item.name}</h1>
                </Space>
            ),
            align: 'left'
        },

        {
            title: 'Prix',
            key: 'price',
            render: (text, item) => (
                <Space size="middle">
                    <h1>{item.price}€{item.price_type}</h1>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Catégories',
            key: 'tags',
            render: (text, items) => (
                <Space size="middle">
                    {items.categories.map(item => (
                        <Tag color="blue" key={item}>{item}</Tag>
                    ))}
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, item) => (
                <Space size="middle">

                    <Button type="primary">Modifier</Button>

                    <Button danger onClick={() => this.delete(item._id)}>Supprimer</Button>
                </Space>
            ),
            align: 'right'
        },

    ];


    // const listProducts = data.map(item => {
    //     return (
    //         <div>
    //             <img src={item.image} alt="" />
    //             <p>{item.name}</p>
    //         </div>
    //     )
    // })


    return (
        <AdminLayout
            columns={columns}
            data={data}
        />
    )
}

export default index

async function supprimer(id) {
    await fetch("http://localhost:4000/cars", {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    });

}


async function getProducts() {
    const res = await fetch("http://localhost:4000/products")
        .then(response => response.json())

    return res;

}

export async function getServerSideProps() {
    const data = await getProducts();

    return {
        props: {
            data
        }
    }
}

