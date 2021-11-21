import React, { useState, useEffect } from 'react'
import AdminLayout from "../../components/AdminLayout"
import { Popconfirm, Input, Switch, Form, Button, notification } from 'antd';
import { admin } from "../../middleware/admin"

const index = ({ token, manager }) => {

    const [notifForm] = Form.useForm();

    const [horaire] = Form.useForm();

    const onFinishNotif = async (values) => {

        console.log("J'ai ça ", values);

        const newAdmin = {
            ...manager,
            principalMessage: values.notificationText
        }

        const res = await fetch(process.env.NEXT_PUBLIC_API_MANAGER, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAdmin),
        }).catch((err) => {
            console.log(err);
        });

        if (res.status && res.status === 200) {
            notification['success']({
                message: "BRAVO",
                description: "BRAVO, vous venez de modifier le message de notification sur le site, il s'affichera maintenant lorsque vous accédrez au site. ",
                placement: "topRight",
                duration: 0,
                style: {
                    width: 500,
                }
            })
        } else {
            notification['error']({
                message: "OUPS",
                description: "Une erreur s'est produite, votre message n'a pas été modifié, veuillez réessayer ultérieurement",
                placement: "topRight",
                duration: 0,
                style: {
                    width: 500,
                }
            })
        }


    };


    const onFinishHoraires = async (values) => {

        console.log("J'ai ça ", values);

        const newHoraires = {
            ...manager,
            lundi: values.horaireLundi,
            mardi: values.horaireMardi,
            mercredi: values.horaireMercredi,
            jeudi: values.horaireJeudi,
            vendredi: values.horaireVendredi,
            samedi: values.horaireSamedi,
            vendredi: values.horaireVendredi,
            samedi: values.horaireSamedi,
            dimanche: values.horaireDimanche
        }

        const res = await fetch(process.env.NEXT_PUBLIC_API_MANAGER, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newHoraires),
        }).catch((err) => {
            console.log(err);
        });

        if (res.status && res.status === 200) {
            notification['success']({
                message: "BRAVO",
                description: "BRAVO, vous venez de modifier les horaires, vos clients n'auront maintenant plus d'excuse.",
                placement: "topRight",
                duration: 0,
                style: {
                    width: 500,
                }
            })
        } else {
            notification['error']({
                message: "OUPS",
                description: "Une erreur s'est produite, votre message n'a pas été modifié, veuillez réessayer ultérieurement",
                placement: "topRight",
                duration: 0,
                style: {
                    width: 500,
                }
            })
        }


    };

    async function updateValidCommands() {
        const newManager = { ...manager, validCommands: !manager.validCommands };

        await fetch(process.env.NEXT_PUBLIC_API_MANAGER, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newManager)
        }).catch(error => console.log(error));

    };

    async function updateMaintenance() {
        const newManager = { ...manager, maintenance: !manager.maintenance };

        await fetch(process.env.NEXT_PUBLIC_API_MANAGER, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newManager)
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        if (!admin(token)) {
            router.push("/")
        }
    }, [])

    return (
        <AdminLayout selectedKey="5">
            <p>Commandes activées </p><Popconfirm title="Etes vous sur?" okText="Oui" cancelText="Annuler" onConfirm={() => updateValidCommands()}  ><Switch checkedChildren="Activée" unCheckedChildren="Désactivées" checked={manager?.validCommands} /></Popconfirm>
            <p>Mettre le site en maintenance</p><Popconfirm title="Etes vous sur?" okText="Oui" cancelText="Annuler" onConfirm={() => updateMaintenance()}><Switch checkedChildren="Maintenance" unCheckedChildren="Visible" checked={manager?.maintenance} /></Popconfirm>

            <p>--------------------------------------------------------------------------</p>
            <Form
                form={notifForm}
                name="notification"
                onFinish={onFinishNotif}
                scrollToFirstError>
                <Form.Item
                    name="notificationText"
                    label="Notification (cette notification sera visible par tous en accédant au site)"
                    initialValue={manager?.principalMessage}
                >

                    <Input.TextArea />

                </Form.Item>

                <Form.Item>

                    <Button className="button" htmlType="submit">
                        Valider la notification
                    </Button>

                </Form.Item>
            </Form>

            <p>--------------------------------------------------------------------------</p>

            <Form
                form={horaire}
                name="horaire"
                onFinish={onFinishHoraires}
                scrollToFirstError>

                <Form.Item
                    name="horaireLundi"
                    label="Lundi"
                    initialValue={manager?.lundi}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="horaireMardi"
                    label="Mardi"
                    initialValue={manager?.mardi}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="horaireMercredi"
                    label="Mercredi"
                    initialValue={manager?.mercredi}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="horaireJeudi"
                    label="Jeudi"
                    initialValue={manager?.jeudi}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="horaireVendredi"
                    label="Vendredi"
                    initialValue={manager?.vendredi}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="horaireSamedi"
                    label="Samedi"
                    initialValue={manager?.samedi}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="horaireDimanche"
                    label="Dimanche"
                    initialValue={manager?.dimanche}
                >
                    <Input />
                </Form.Item>

                <Form.Item>

                    <Button className="button" htmlType="submit">
                        Valider les horaires
                    </Button>

                </Form.Item>


            </Form>


        </AdminLayout>
    )

}


export default index



