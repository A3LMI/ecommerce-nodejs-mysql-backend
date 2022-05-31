import { RiAddFill } from 'react-icons/ri';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';

import AdminService from "../services/AdminService";

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const GererCategories = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {    
        getAllCategories();
    }, [])

    let _categories = [{

    }];

    let [categories, setAllCategories] = useState(_categories);

    const getAllCategories = () => {
        AdminService.getAllCategories()
        .then(response => {
            setAllCategories(response.data);
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

    const handleAddCategory = (data) => {

        let category = {
            title: data.title,
            description: data.description,
            image: data.image
        }
        
        AdminService.addCategory(category)
            .then(response => {
                setShowAddForm(false);
                getAllCategories();
            })
            .catch(e => {
                console.log(e);
        });
    }

    const handleUpdateCategory = (data) => {

        let category = {
            title: data.title,
            description: data.description,
            image: data.image
        }

        AdminService.updateCategory(selectedToUpdate.id, category)
            .then(response => {
                setShowUpdateForm(false);
                getAllCategories();
            })
            .catch(e => {
                console.log(e);
        });
    }

    const selectToDelete = (category) => {
        setSelectedToDelete(category);
    }

    const selectToUpdate = (category) => {
        setSelectedToDelete(category);
    }

    const deleteCategory = () => {
        AdminService.deleteCategory(selectedToDelete.id)
        .then(response => {
            setShowDeleteForm(false)
            getAllCategories();
        })
        .catch(e => {
            console.log(e);
        });
    }

        return (
            <>
            <section className="gerer-clients">
                <div class="admin-title">Gérer les catégories</div>
                
                <div class="table-and-btn-course">
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>

                        {categories && categories.map((category, index) => (
                        <>
                            <tr>
                                <td key={index}>{category.id}</td>
                                <td key={index}>{category.title}</td>
                                <td key={index}>{category.description}</td>
                                <td key={index}>{category.image}</td>
                                <td class="update">
                                        <div>
                                            <button onClick={() => {handleShowUpdateForm(); setSelectedToUpdate(category)}} class="update-btn">
                                                <div><MdModeEdit size={30} /></div>
                                            </button>
                                        </div>
                                    </td>

                                    <td class="delete">
                                        <div>
                                            <button onClick={() => {handleShowDeleteForm(); setSelectedToDelete(category)}} class="delete-btn">
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
                                <form onSubmit={handleSubmit(handleAddCategory)} className='addForm'>

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
                                <Modal.Title><div className='modal-t'>Modifier une category</div></Modal.Title>
                            </Modal.Header>

                            <Modal.Body className='add-reservation-form'>
                                <form onSubmit={handleSubmit(handleUpdateCategory)} className='addForm'>

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
                                            placeholder='Image' {...register("image")} />
                                        <span></span>
                                        <label className='email-label'>Image</label>
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
                                <div className='delete-r-btn' onClick={() =>{ deleteCategory()}}>Supprimer</div>
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