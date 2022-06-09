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
        first_name: "",
        last_name: "",
        email: "",
        client_id: "",
        password: "",
        address: "",
        phone_number: ""
    }
    
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
            setShowUpdateForm(false);   
            setSelectedToUpdate(_selectedToUpdate);
        }
        if (showDeleteForm === true) {
            setShowDeleteForm(false)
        }
    };

    const handleAddClient = (data) => {

        let client = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            client_id: data.client_id,
            password: data.password,
            address: data.address,
            phone_number: data.phone_number
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
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            address: data.address,
            phone_number: data.phone_number
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

    const loadValue = (id, value) => {
        document.getElementById(id).setAttribute("value", value);
    }



    const onShowUpdate = (client) => {
        handleShowUpdateForm();
        setSelectedToUpdate(client);
        console.log(selectedToUpdate);
    }

    const searchClient = (value) => {

        if (value.length != 0) {
            AdminService.getClientByName(value)
            .then(response => {
                setAllClients(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
        else if (value.length == 0) {
            AdminService.getAllClients()
            .then(response => {
                getAllClients();
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

        return (
            <>
            <section className="gerer-clients">
                <div className="gerer-comm admin-title">
                    <div>Gérer les clients<span className='puce'>•</span></div>
                    <div>
                        <input type={'text'} id={'client-name'} onChange={() => {searchClient(document.getElementById('client-name').value)}} className={'p-n product-name'} placeholder={'Nom ou prénom du client'} />                        
                    </div>
                </div>
                
                <div class="table-and-btn-course">
                    <table>
                        <thead>
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
                        </thead>

                        <tbody>
                            {clients && clients.map((client) => (
                            <>
                                <tr>
                                    <td>{client.id}</td>
                                    <td>{client.first_name}</td>
                                    <td>{client.last_name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.password}</td>
                                    <td>{client.address}</td>
                                    <td>{client.phone_number}</td>
                                    <td class="update">
                                            <div>
                                                <button onClick={() => {selectedToUpdate = client; console.log(selectedToUpdate); handleShowUpdateForm();}} class="update-btn">
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
                        </tbody>
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
                                            placeholder='Prénom' {...register("first_name")} />
                                        <span></span>
                                        <label className='email-label'>Prénom</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Nom' {...register("last_name")} />
                                        <span></span>
                                        <label className='email-label'>Nom</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Adresse e-mail' {...register("email")} />
                                        <span></span>
                                        <label className='email-label'>Adresse e-mail</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Mot de passe' {...register("password")} />
                                        <span></span>
                                        <label className='email-label'>Mot de passe</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Adresse' {...register("address")} />
                                        <span></span>
                                        <label className='email-label'>Adresse</label>
                                    </div>

                                    <div className='field'>
                                        <input type={"text"}
                                            className='email'
                                            placeholder='Numéro de téléphone' {...register("phone_number")} />
                                        <span></span>
                                        <label className='email-label'>Numéro de téléphone</label>
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

                            <Modal.Body className='update-client add-reservation-form'>
                                <form onSubmit={handleSubmit(handleUpdateClient)} className='addForm'>
                                    <div className='field-container'>
                                        <div className='field'>
                                            <input type={"text"}
                                                id='first_name'
                                                value={selectedToUpdate.first_name}
                                                className='email'
                                                placeholder='Prénom' {...register("first_name")}/>
                                            <span></span>
                                            <label className='email-label'>Prénom</label>
                                        </div>
                                        
                                        <div className='field'>
                                            <input type={"text"}
                                                className='email'
                                                value={selectedToUpdate.last_name}
                                                placeholder='Nom' {...register("last_name")} />
                                            <span></span>
                                            <label className='email-label'>Nom</label>
                                        </div>
                                    </div>

                                    <div className='field-container'>
                                        <div className='field'>
                                            <input type={"text"}
                                                className='email'
                                                value={selectedToUpdate.email}
                                                placeholder='Adresse e-mail' {...register("email")} />
                                            <span></span>
                                            <label className='email-label'>Adresse e-mail</label>
                                        </div>

                                        <div className='field'>
                                            <input type={"text"}
                                                className='email'
                                                value={selectedToUpdate.password}
                                                placeholder='Mot de passe' {...register("password")} />
                                            <span></span>
                                            <label className='email-label'>Mot de passe</label>
                                        </div>
                                    </div>

                                    <div className='field-container'>
                                        <div className='field'>
                                            <input type={"text"}
                                                className='email'
                                                value={selectedToUpdate.address}
                                                placeholder='Adresse' {...register("address")} />
                                            <span></span>
                                            <label className='email-label'>Adresse</label>
                                        </div>

                                        <div className='field'>
                                            <input type={"text"}
                                                className='email'
                                                value={selectedToUpdate.phone_number}
                                                placeholder='Numéro de téléphone' {...register("phone_number")} />
                                            <span></span>
                                            <label className='email-label'>Numéro de téléphone</label>
                                        </div>
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
                                <div className='etes-vous-surs'>Êtes-vous sûrs de vouloir supprimer ce client?</div>
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