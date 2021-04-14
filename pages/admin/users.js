import React, { useEffect } from 'react'
import AdminLayout from "../../components/AdminLayout"
import {Tag, Space, Button, Switch } from 'antd';

const users = ({ data }) => {
    useEffect(() => {
        getUsers();
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
            title: 'Nom',
            key: 'name',
            render: (text, item) => (
                <Space size="middle">
                    <div>
                        <h1>{item.lastname} {item.firstname}</h1>
                    </div>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'E-mail',
            key: 'mail',
            render: (text, item) => (
                <Space size="middle">
                    <div>
                        <h1>{item.mail}</h1>
                    </div>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Numéro',
            key: 'phone',
            render: (text, item) => (
                <Space size="middle">
                    <div>
                        <h1>{item.phone}</h1>
                    </div>
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Administrateur',
            key: 'admin',
            render: (text, item) => (
                <Space size="middle">

                    <Switch checkedChildren="Admin" unCheckedChildren="Client" checked={item.admin}/>

                    
                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, item) => (
                <Space size="middle">

                    <Button type="primary" disabled={item.validated}>Valider le client</Button>

                    <Button danger onClick={() => this.delete(item._id)}>Supprimer</Button>
                </Space>
            ),
            align: 'right'
        },

    ];

    return (
        <AdminLayout
        columns={columns}
        data={data}
        />
    )
}

export default users

async function getUsers() {
    const res = await fetch("http://localhost:4000/users")
        .then(response => response.json())

    return res;

}

export async function getServerSideProps() {
    const data = await getUsers();

    return {
        props: {
            data
        }
    }
}
