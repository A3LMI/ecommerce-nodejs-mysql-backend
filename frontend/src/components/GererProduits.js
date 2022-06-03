import { RiAddFill } from 'react-icons/ri';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';

import AdminService from "../services/AdminService";

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const GererProduits = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {    
        getAllProducts();
        getAllCategories();
    }, [])

    let _products = [{

    }];

    let [products, setAllProducts] = useState(_products);

    let _categories = [{

    }];

    let [categories, setAllCategories] = useState(_categories);

    const getAllProducts = () => {
        AdminService.getAllProductsMore()
        .then(response => {
            setAllProducts(response.data);
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

    const getAllCategories = () => {
        AdminService.getAllCategories()
            .then(response => {
                setAllCategories(response.data);
            })
            .catch(e => {
                console.log(e);
        });

    }

    const handleAddProduct = (data) => {

        let product = {
            title: data.title,
            description: data.description,
            price: data.price,
            category_id: data.category_id,
            image: data.image,
            rating: data.rating,
            quantity: data.quantity
        }
        
        AdminService.addProduct(product)
            .then(response => {
                setShowAddForm(false);
                getAllProducts();
            })
            .catch(e => {
                console.log(e);
        });
    }

    const handleUpdateProduct = (data) => {

        let product = {
            title: data.title,
            description: data.description,
            price: data.price,
            category_id: data.category_id,
            image: data.image,
            rating: data.rating,
            quantity: data.quantity
        }

        AdminService.updateProduct(selectedToUpdate.id, product)
            .then(response => {
                setShowUpdateForm(false);
                getAllProducts();
            })
            .catch(e => {
                console.log(e);
        });
    }

    const selectToDelete = (product) => {
        setSelectedToDelete(product);
    }

    const selectToUpdate = (product) => {
        setSelectedToDelete(product);
    }

    const deleteProduct = () => {
        AdminService.deleteProduct(selectedToDelete.id)
        .then(response => {
            setShowDeleteForm(false)
            getAllProducts();
        })
        .catch(e => {
            console.log(e);
        });
    }

        return (
            <>
            <section className="gerer-clients">
                <div className="gerer-comm admin-title">
                    <div>Gérer les produits<span className='puce'>•</span></div>
                    <div>
                        
                        <select>
                            <option value={""} disabled>Category</option>
                            {categories.map((category) => {
                                <option value={category.id}>{category.title}</option>
                            })}
                        </select>
                        
                    </div>
                </div>
                
                <div class="table-and-btn-course">
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Prix</th>
                            <th>Catégorie</th>
                            <th>Note</th>
                            <th>Image</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>

                        {products && products.map((product, index) => (
                        <>
                            <tr>
                                <td key={index}>{product.id}</td>
                                <td >{product.title}</td>
                                <td >{product.description}</td>
                                <td >{product.price}</td>
                                <td >{product.category_title}</td>
                                <td >{product.rating}</td>
                                <td >{product.image}</td>
                                <td class="update">
                                        <div>
                                            <button onClick={() => {handleShowUpdateForm(); getAllCategories(); setSelectedToUpdate(product)}} class="update-btn">
                                                <div><MdModeEdit size={30} /></div>
                                            </button>
                                        </div>
                                    </td>

                                    <td class="delete">
                                        <div>
                                            <button onClick={() => {handleShowDeleteForm(); setSelectedToDelete(product)}} class="delete-btn">
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
                                <Modal.Title><div className='modal-t'>Modifier une product</div></Modal.Title>
                            </Modal.Header>

                            <Modal.Body className='add-reservation-form'>
                                <form onSubmit={handleSubmit(handleUpdateProduct)} className='addForm'>

                                    <div className='field-container'>
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
                                    </div>

                                    <div className='field-container'>
                                        <div className='field'>
                                            <input type={"text"}
                                                className='email'
                                                placeholder='Prix' {...register("price")} />
                                            <span></span>
                                            <label className='email-label'>Prix</label>
                                        </div>

                                        <div className='field'>
                                            <select className='client-genre-add select-genre' {...register("category")}>
                                                <option value={""} disabled>Category</option>
                                                {categories.map((category) => {
                                                    console.log("category : " + category.id + " " + category.title);
                                                    <option value={""}>{category.title}</option>
                                                })}   
                                            </select>
                                            <span></span>
                                            <label className='email-label'>Catégorie</label>
                                        </div>
                                    </div>

                                    <div className='field-container'>
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

            </section>
            </>
        );
}