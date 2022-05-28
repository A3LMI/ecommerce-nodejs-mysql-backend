import { RiAddFill } from 'react-icons/ri';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';

import AdminService from "../services/AdminService";

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const GererClients = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {    
        getAllClients();
    }, [])

    let _clients = [{

    }];

    let [clients, setAllClients] = useState(_clients);

    const getAllClients = () => {
        AdminService.getAllClients()
        .then(response => {
            setAllClients(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    let _selectedToDelete = {

    };

    let [selectedToDelete, setSelectedToDelete] = useState(_selectedToDelete);

    let _selectedToUpdate = {

    };
    
    let [selectedToUpdate, setSelectedToUpdate] = useState(_selectedToUpdate);

    const [showAddForm, setShowAddForm] = useState(false);
    const handleShowAddForm = () => setShowAddForm(true);

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const handleShowUpdateForm = () => setShowUpdateForm(true);

    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const handleShowDeleteForm = () => setShowDeleteForm(true);

    const handleClose = () => {
        if (showAddForm === true) {
            setShowAddForm(false)
        }
        if (showUpdateForm === true) {
            setShowUpdateForm(false)
        }
        if (showDeleteForm === true) {
            setShowDeleteForm(false)
        }
    };

    const handleAddClient = (data) => {

        let client = {
            title: data.title,
            description: data.description,
            price: data.price,
            client_id: data.client_id,
            image: data.image,
            rating: data.rating,
            quantity: data.quantity
        }
        
        AdminService.addClient(client)
            .then(response => {
                setShowAddForm(false);
                getAllClients();
            })
            .catch(e => {
                console.log(e);
        });
    }

    const handleUpdateClient = (data) => {

        let client = {
            title: data.title,
            description: data.description,
            image: data.image,
            parent: data.parent,
            level: data.level,
            recommendation: data.recommendation
        }

        AdminService.updateClient(selectedToUpdate.id, client)
            .then(response => {
                setShowUpdateForm(false);
                getAllClients();
            })
            .catch(e => {
                console.log(e);
        });
    }

    const selectToDelete = (client) => {
        setSelectedToDelete(client);
    }

    const selectToUpdate = (client) => {
        setSelectedToDelete(client);
    }

    const deleteClient = () => {
        AdminService.deleteClient(selectedToDelete.id)
        .then(response => {
            setShowDeleteForm(false)
            getAllClients();
        })
        .catch(e => {
            console.log(e);
        });
    }

        return (
            <>
            <section className="gerer-clients">
                <div class="admin-title">Gérer les clients</div>
                
                <div class="table-and-btn-course">
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Adresse E-mail</th>
                            <th>Mot de passe</th>
                            <th>Adresse</th>
                            <th>Numéro de téléphone</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>

                        {clients && clients.map((client, index) => (
                        <>
                            <tr>
                                <td key={index}>{client.id}</td>
                                <td key={index}>{client.first_name}</td>
                                <td key={index}>{client.last_name}</td>
                                <td key={index}>{client.email}</td>
                                <td key={index}>{client.password}</td>
                                <td key={index}>{client.address}</td>
                                <td key={index}>{client.phone_number}</td>
                                <td class="update">
                                        <div>
                                            <button onClick={() => {handleShowUpdateForm(); setSelectedToUpdate(client)}} class="update-btn">
                                                <div><MdModeEdit size={30} /></div>
                                            </button>
                                        </div>
                                    </td>

                                    <td class="delete">
                                        <div>
                                            <button onClick={() => {handleShowDeleteForm(); setSelectedToDelete(client)}} class="delete-btn">
                                                <div><MdDeleteForever size={30} /></div>
                                            </button>
                                        </div>
                                    </td>
                            </tr>
                        </>
                        ))}
                    </table>
                    {/*           
                    <div class="add">
                        <button onClick={() => {handleShowAddForm()}} class="add-btn"><RiAddFill size={30} />Ajouter un produit</button>    
                    </div>
                    */ }
                </div>

                    <div>
                        <Modal className='modal' show={showAddForm} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title><div className='modal-t'>Ajouter un produit</div></Modal.Title>
                            </Modal.Header>

                            <Modal.Body className='add-reservation-form'>
                                <form onSubmit={handleSubmit(handleAddClient)} className='addForm'>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Titre' {...register("title")} />
                                        <span></span>
                                        <label className='email-label'>Titre</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Description' {...register("description")} />
                                        <span></span>
                                        <label className='email-label'>Description</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Prix' {...register("price")} />
                                        <span></span>
                                        <label className='email-label'>Prix</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Catégorie' {...register("client")} />
                                        <span></span>
                                        <label className='email-label'>Catégorie</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Image' {...register("image")} />
                                        <span></span>
                                        <label className='email-label'>Image</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Note' {...register("rating")} />
                                        <span></span>
                                        <label className='email-label'>Note</label>
                                    </div>

                                    <div>
                                        <input className='connect-btn' type="submit" value="Ajouter" />
                                    </div>
                                </form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    <div className='modal-close-btn'>Fermer</div>
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <div>
                        <Modal className='modal' show={showUpdateForm} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title><div className='modal-t'>Modifier un client</div></Modal.Title>
                            </Modal.Header>

                            <Modal.Body className='add-reservation-form'>
                                <form onSubmit={handleSubmit(handleUpdateClient)} className='addForm'>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Titre' {...register("title")} />
                                        <span></span>
                                        <label className='email-label'>Titre</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Description' {...register("description")} />
                                        <span></span>
                                        <label className='email-label'>Description</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Prix' {...register("price")} />
                                        <span></span>
                                        <label className='email-label'>Prix</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Catégorie' {...register("client")} />
                                        <span></span>
                                        <label className='email-label'>Catégorie</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Image' {...register("image")} />
                                        <span></span>
                                        <label className='email-label'>Image</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Note' {...register("rating")} />
                                        <span></span>
                                        <label className='email-label'>Note</label>
                                    </div>

                                    <div>
                                        <input className='connect-btn' type="submit" value="Modifier" />
                                    </div>
                                </form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    <div className='modal-close-btn'>Fermer</div>
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <div>
                        <Modal className='modal' show={showDeleteForm} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title><div className='modal-t'>Supprimer</div></Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div className='etes-vous-surs'>Êtes-vous sûrs de vouloir supprimer ce produit?</div>
                                <div className='delete-r-btn' onClick={() =>{ deleteClient()}}>Supprimer</div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    <div className='modal-close-btn'>Fermer</div>
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>    
            </section>
            </>
        );
}