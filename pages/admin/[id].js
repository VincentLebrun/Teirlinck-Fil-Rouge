import React, { useEffect, useState } from 'react'
import AdminLayout from "../../components/AdminLayout"
import { Tag, Space, Button, Popconfirm, Form, Input, Select, InputNumber, Switch, Table } from 'antd';

const ProductAdmin = ({ product }) => {


    const [useProduct, setUseProduct] = useState(product);
    const productArray = [useProduct];

    const [form] = Form.useForm();


    function updatePromotion() {

        const newPromotion = useProduct;

        if (newPromotion.promotion) {
            newPromotion.promotion = false;
        } else {
            newPromotion.promotion = true;
        }

        setUseProduct(newPromotion);


    };

    function updateHighlighted() {
        const newHighlighted = useProduct;

        if (newHighlighted.highlighted) {
            newHighlighted.highlighted = false;
        } else {
            newHighlighted.highlighted = true;
        }

        setUseProduct(newHighlighted);

    };

    function updateAvailable() {
        const newAvailable = useProduct;

        if (newAvailable.available) {
            newAvailable.available = false;
        } else {
            newAvailable.available = true;
        }

        setUseProduct(newAvailable);




    };

    const onFinish = async (values) => {

        const newProduct = {
            ...useProduct,
            name: values.name,
            description: values.description,
            image: values.image,
            price_type: values.price_type,
            price: values.price,
            promotion: useProduct.promotion,
            available: useProduct.available,
            categories: values.categories,
            allergenes: values.allergenes,
            highlighted: useProduct.highlighted
        }

        console.log(newProduct);

        await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        }).catch(error => console.log(error));

        setUseProduct(newProduct);
    };


    const options_categories = [
        { value: "charcuterie", label: "Charcuterie" },
        { value: "volaille", label: "Volaille" },
        { value: "viande", label: "Viande" },
        { value: "porc", label: "Porc" },
        { value: "agneau", label: "Agneau" },
        { value: "boeuf", label: "Boeuf" },
        { value: "traiteur", label: "Traiteur" },
        { value: "barbecue", label: "Barbecue" },

    ]

    const options_allergenes = [
        { value: "céréales", label: "Céréales" },
        { value: "oeuf", label: "Oeuf" },
        { value: "céleri", label: "Céléri" },
        { value: "moutarde", label: "Moutarde" },
        { value: "lait", label: "Lait" },


    ]

    const options_price_type = [
        { value: "/kg", label: "/kg" },
        { value: "/pc", label: "/pc" },
    ]

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
            title: 'Allergènes',
            key: 'tags',
            render: (text, items) => (
                <Space size="middle">
                    {items.allergenes.map(item => (
                        <Tag color="blue" key={item}>{item}</Tag>
                    ))}
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Promotion',
            key: 'tags',
            render: (text, item) => (
                <Space size="middle">

                    <h1>{item.promotion ? "OUI" : "NON"}</h1>

                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Mis en avant',
            key: 'tags',
            render: (text, item) => (
                <Space size="middle">
                    <h1>{item.highlighted ? "OUI" : "NON"}</h1>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Disponible',
            key: 'tags',
            render: (text, item) => (
                <Space size="middle">
                    <h1>{item.available ? "OUI" : "NON"}</h1>
                </Space>
            ),
            align: 'left'
        },

    ];


    return (
        <AdminLayout>
            <Table columns={columns} dataSource={productArray} rowKey="id" />
            <Form
                form={form}
                name="modify"
                onFinish={onFinish}
            >


                <Form.Item
                    name="name"
                    initialValue={useProduct.name}
                    label="Nom du produit"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="description" label="Description" initialValue={useProduct.description}>
                    <Input.TextArea />
                </Form.Item>

                <Form.Item name="image" label="Url de l'image" initialValue={useProduct.image}>
                    <Input />
                </Form.Item>


                <Form.Item name="price" label="Prix (€)" initialValue={useProduct.price} >
                    <Input type="number" value={useProduct.price} step="0.01" min="0" />
                </Form.Item>

                <Form.Item label="Type de prix" initialValue={useProduct.price_type} name="price_type" >
                    <Select options={options_price_type}>

                    </Select>
                </Form.Item>

                <Form.Item
                    name="categories"
                    initialValue={useProduct.categories}
                    label="Catégories"
                    rules={[
                        {
                            type: 'array',
                        },
                    ]}
                >
                    <Select mode="multiple" options={options_categories} placeholder="Sélectionnez votre/vos catégorie(s)">

                    </Select>
                </Form.Item>


                <Form.Item
                    name="allergenes"
                    initialValue={useProduct.allergenes}
                    label="Allergènes"
                    rules={[
                        {
                            type: 'array',
                        },
                    ]}
                >
                    <Select options={options_allergenes} mode="multiple" placeholder="Sélectionnez votre/vos allergène(s)">

                    </Select>
                </Form.Item>


                <Form.Item name="promotion">
                    <Switch defaultChecked={useProduct.promotion} onClick={() => updatePromotion()} checkedChildren="Promo" unCheckedChildren="Pas de promo" />
                </Form.Item>
                <Form.Item name="highlighted">
                    <Switch checkedChildren="Mis en avant" onClick={() => updateHighlighted()} unCheckedChildren="Pas mis en avant" defaultChecked={useProduct.highlighted} /></Form.Item>

                <Form.Item name="available">
                    <Switch checkedChildren="Disponible" onClick={() => updateAvailable()} unCheckedChildren="Pas disponible" defaultChecked={useProduct.available} />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Modifier ce produit
                    </Button>

                </Form.Item>


            </Form>

        </AdminLayout >
    )
}

export default ProductAdmin


async function getProduct(id) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS + "/" + id)
        .then(response => response.json())

    return res;

}


export async function getServerSideProps({ params }) {

    const product = await getProduct(params.id);


    return {
        props: {
            product,
        },
    };
}
