import React, { useState } from 'react'
import AdminLayout from "../../components/AdminLayout"
import { Tag, Space, Button, Popconfirm, Form, Input, Select, InputNumber, Switch } from 'antd';

const ProductAdmin = ({ product }) => {

    const productArray = [product];
    const [useProduct, setUseProduct] = useState(product);


    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log(values);
    };


const options_categories = [
    {value: "charcuterie", label:"charcuterie"},
    { value: "vollaile", label:"Volaille" },
    { value: "viande", label:"Viande" },
    { value: "porc", label:"Porc" },
    { value: "agneau", label:"Agneau" },
    { value: "boeuf", label:"Boeuf" },
    { value: "traiteur", label:"Tratieur" },
    { value: "barbecue", label:"Barbecue" },

]

const options_allergenes = [
    { value: "cereales", label: "Céréales" },
    { value: "oeuf" , label: "Oeuf"},
    { value: "celeri", label: "Céléri" },
    { value: "moutarde", label: "Moutarde" },

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

    ];


    return (
        <AdminLayout
            columns={columns}
            data={productArray}
        >
            <Form
                form={form}
                name="modify"
                onFinish={onFinish}
                >


                <Form.Item
                    name={['user', 'name']}
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
                    <Input type="number" value={useProduct.price} step="0.1" min="0" />
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



                <Switch name="" checkedChildren="Promo" unCheckedChildren="Pas de promo" checked={useProduct.promotion} />

                <Switch checkedChildren="Mis en avant" unCheckedChildren="Pas mis en avant" checked={useProduct.highlighted} />

                <Switch checkedChildren="Disponible" unCheckedChildren="Pas disponible" checked={useProduct.available} />

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
