import React, { useState } from 'react'
import AdminLayout from "../../components/AdminLayout"
import { Tag, Space, Button, Popconfirm } from 'antd';
import Link from "next/link";

const index = ({ data }) => {

    const [products, setProducts] = useState(data);

    async function deleteProduct(id) {
        console.log("ok");
        await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: id })
        }).catch(error => console.log(error));

        const allProducts = [...products];
        const index = allProducts.findIndex((item) => item._id === id);

        allProducts.splice(index, 1);
        console.log(allProducts);
        setProducts(allProducts);

    };



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

                    <Link href={`/admin/${item._id}`}><Button type="primary">Modifier</Button></Link>

                    <Popconfirm title="Etes vous sur?" okText="Oui" cancelText="Annuler" onConfirm={() => deleteProduct(item._id)} ><Button danger>Supprimer le produit</Button></Popconfirm>
                </Space>
            ),
            align: 'right'
        },

    ];


    return (
        <AdminLayout
            columns={columns}
            data={products}
        />
    )
}

export default index



async function getProducts() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS)
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


