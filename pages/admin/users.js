import React, { useEffect, useState } from 'react'
import AdminLayout from "../../components/AdminLayout"
import { Space, Button, Switch, Popconfirm, Table, Input } from 'antd';
import { admin } from "../../middleware/admin"
import { useRouter } from 'next/router'


const users = ({ token }) => {
    const router = useRouter();
    console.log(token);
    const [users, setUsers] = useState();

    const { Search } = Input;


    async function getUsers() {
        await fetch(process.env.NEXT_PUBLIC_API_USERS,{
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json()).then(json => { setUsers(json) });

    }

    useEffect(() => {
        if (!admin(token)){
            router.push("/")
        }
       getUsers();
    }, [])

    const onSearch = (value) => { 
        value = value.toLowerCase();
        const filteredUsers = data.filter((item) => item.firstname.toLowerCase().includes(value) || item.lastname.toLowerCase().includes(value));
        setUsers(filteredUsers);
    }

    async function deleteUser(id) {
        console.log("ok");
        await fetch(process.env.NEXT_PUBLIC_API_USERS, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: id })
        }).catch(error => console.log(error));

        const allUsers = [...users];
        const index = allUsers.findIndex((item) => item._id === id);

        allUsers.splice(index, 1);
        setUsers(allUsers);

    };

    async function updateValidated(id) {
        const allUsers = [...users];
        const index = allUsers.findIndex((item) => item._id === id);

        if (allUsers[index].validated) {
            allUsers[index].validated = false
        } else {
            allUsers[index].validated = true
        }
        setUsers(allUsers);

        const user = {
            ...allUsers[index],
            validated: allUsers[index].validated
        }

        console.log(user);


        await fetch(process.env.NEXT_PUBLIC_API_USERS, {
            method: 'PUT',
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).catch(error => console.log(error));

        

    };

    async function updateRole(id) {
        const allUsers = [...users];
        const index = allUsers.findIndex((item) => item._id === id);

        if (allUsers[index].admin) {
            allUsers[index].admin = false
        } else {
            allUsers[index].admin = true
        }

        setUsers(allUsers);

        const user = {
            ...allUsers[index],
            admin: allUsers[index].admin
        }
        

        await fetch(process.env.NEXT_PUBLIC_API_USERS, {
            method: 'PUT',
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).catch(error => console.log(error));

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
            title: 'Nom Prénom',
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


                    <Popconfirm title="Etes vous sur?" okText="Oui" cancelText="Annuler" onConfirm={() => updateRole(item._id)} ><Switch checkedChildren="Admin" unCheckedChildren="Client" checked={item.admin} /></Popconfirm>

                </Space>
            ),
            align: 'left'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, item) => (
                <Space size="middle">

                    <Button type="primary" onClick={() => updateValidated(item._id)} disabled={item.validated}>{item.validated ? "Client validé" : "Valider le client"}  </Button>

                    <Popconfirm title="Supprimer ce compte?" onConfirm={() => deleteUser(item._id)} okText="Oui" cancelText="Annuler"><Button danger >Supprimer le compte client</Button></Popconfirm>
                </Space>
            ),
            align: 'right'
        },

    ];

    return (
        <AdminLayout selectedKeu="3">
            <Search className="search-input" placeholder="Chercher un utilisateur" onSearch={onSearch} style={{ width: 200 }}></Search>
            <Table columns={columns} dataSource={users} rowKey="id" />
        </AdminLayout>
    )
}

export default users


async function getUsers() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_USERS, {
        method: 'GET',
        headers: {
            
        }
    })
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
