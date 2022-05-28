import { RiAddFill } from 'react-icons/ri';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';

import AdminService from "../services/AdminService";

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const GererCommandes = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {    
        getAllOrders();
    }, [])

    let _orders = [{

    }];

    let [orders, setAllOrders] = useState(_orders);

    let _ordersDetails = [{

    }];

    let [ordersDetails, setAllOrdersDetails] = useState(_ordersDetails);

    const getAllOrders = () => {
        AdminService.getAllOrders()
        .then(response => {
            setAllOrders(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const getAllOrdersDetails = () => {
        AdminService.getAllOrdersDetails()
        .then(response => {
            setAllOrdersDetails(response.data);
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

    const handleAddProduct = (data) => {

        let order = {

        }
        
        AdminService.addProduct(order)
            .then(response => {
                setShowAddForm(false);
                getAllOrders();
            })
            .catch(e => {
                console.log(e);
        });
    }

    const handleUpdateProduct = (data) => {

        let order = {
            title: data.title,
            description: data.description,
            price: data.price,
            category_id: data.category_id,
            image: data.image,
            rating: data.rating,
            quantity: data.quantity
        }

        AdminService.updateProduct(selectedToUpdate.id, order)
            .then(response => {
                setShowUpdateForm(false);
                getAllOrders();
            })
            .catch(e => {
                console.log(e);
        });
    }

    const selectToDelete = (order) => {
        setSelectedToDelete(order);
    }

    const selectToUpdate = (order) => {
        setSelectedToDelete(order);
    }

    const deleteProduct = () => {
        AdminService.deleteProduct(selectedToDelete.id)
        .then(response => {
            setShowDeleteForm(false)
            getAllOrders();
        })
        .catch(e => {
            console.log(e);
        });
    }

        return (
            <>
            <section className="gerer-clients">
                <div class="admin-title">Gérer les commandes</div>
                
                <div class="table-and-btn-course">
                    <table>
                        <tr>
                            <th>ID de la commande</th>
                            <th>ID du client</th>
                            <th>Nom du client</th>
                            <th>Adresse de la livraison</th>
                            <th>Numéro de téléphone</th>
                            <th>Date de livraison</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>

                        {orders && orders.map((order, index) => (
                        <>
                            <tr>
                                <td key={index}>{order.id}</td>
                                <td key={index}>{order.client_id}</td>
                                <td key={index}>{order.client_id}</td>
                                <td key={index}>{order.address}</td>
                                <td key={index}>{order.phone_number}</td>
                                <td key={index}>Le {String(order.delivery_date).slice(0,10)}, à {String(order.delivery_date).slice(11,16)}</td>
                                <td class="update">
                                        <div>
                                            <button onClick={() => {handleShowUpdateForm(); setSelectedToUpdate(order)}} class="update-btn">
                                                <div><MdModeEdit size={30} /></div>
                                            </button>
                                        </div>
                                    </td>

                                    <td class="delete">
                                        <div>
                                            <button onClick={() => {handleShowDeleteForm(); setSelectedToDelete(order)}} class="delete-btn">
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
                                <form onSubmit={handleSubmit(handleAddProduct)} className='addForm'>

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
                                            placeholder='Catégorie' {...register("category")} />
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
                                <Modal.Title><div className='modal-t'>Modifier une order</div></Modal.Title>
                            </Modal.Header>

                            <Modal.Body className='add-reservation-form'>
                                <form onSubmit={handleSubmit(handleUpdateProduct)} className='addForm'>

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
                                            placeholder='Catégorie' {...register("category")} />
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
                                <div className='delete-r-btn' onClick={() =>{ deleteProduct()}}>Supprimer</div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    <div className='modal-close-btn'>Fermer</div>
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>    

                    
                    <div>
                        <Modal className='modal' show={showAddForm} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title><div className='modal-t'>Détails de la commande</div></Modal.Title>
                            </Modal.Header>

                            <Modal.Body className='add-reservation-form'>

                            </Modal.Body>
                                <table>
                                    <tr>
                                        <th>Produit</th>
                                        <th>Prix</th>
                                        <th>Quantité</th>
                                        <th>Modifier</th>
                                        <th>Supprimer</th>
                                    </tr>

                                    {ordersDetails && ordersDetails.map((order, index) => (
                                    <>
                                        <tr>
                                            <td key={index}>{order.produit_title}</td>
                                            <td key={index}>{order.price}</td>
                                            <td key={index}>{order.quantity}</td>
                                            <td class="update">
                                                    <div>
                                                        <button onClick={() => {handleShowUpdateForm(); setSelectedToUpdate(order)}} class="update-btn">
                                                            <div><MdModeEdit size={30} /></div>
                                                        </button>
                                                    </div>
                                                </td>

                                                <td class="delete">
                                                    <div>
                                                        <button onClick={() => {handleShowDeleteForm(); setSelectedToDelete(order)}} class="delete-btn">
                                                            <div><MdDeleteForever size={30} /></div>
                                                        </button>
                                                    </div>
                                                </td>
                                        </tr>
                                    </>
                                    ))}
                                </table>
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