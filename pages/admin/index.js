import React, { useState, useEffect } from 'react'
import AdminLayout from "../../components/AdminLayout"
import { Tag, Space, Button, Popconfirm, Table, Input, notification } from 'antd';
import Link from "next/link";
import { admin } from "../../middleware/admin"
import { useRouter } from 'next/router'


const index = ({ token }) => {
    const router = useRouter();

    const [data, setData] = useState();
    const [products, setProducts] = useState();

    const { Search } = Input;


    async function getProducts() {
        await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS)
            .then(response => response.json()).then(json => { setProducts(json), setData(json) });

    }

    useEffect(() => {
        if (!admin(token)){
            router.push("/")
        }
        getProducts();
    }, [])


    async function deleteProduct(id) {
       const res = await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: id })
        }).catch(error => console.log(error));


        if (res.status && res.status === 200) {
            const allProducts = [...products];
            const index = allProducts.findIndex((item) => item._id === id);
    
            allProducts.splice(index, 1);
            console.log(allProducts);
            setProducts(allProducts);
        } else {
            notification['error']({
                message: "OUPS",
                description: "Une erreur s'est produite, votre produit n'a pas été supprimé, veuillez réessayer",
                placement: "topRight",
                duration: 0,
                style: {
                    width: 500,
                }
            })
        }
        

    };

    const onSearch = (value) => {
        value = value.toLowerCase();
        const filteredProducts = data.filter((item) => item.name.toLowerCase().includes(value));
        setProducts(filteredProducts);
    }

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
                        <img src={process.env.NEXT_PUBLIC_URL + item.image} alt="" />
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
        <AdminLayout selectedKey="1">
            <Search className="search-input" placeholder="Chercher un produit" onSearch={onSearch} style={{ width: 200 }}></Search>
            <Table columns={columns} dataSource={products} rowKey="id" />
        </AdminLayout>
    )

}


export default index



