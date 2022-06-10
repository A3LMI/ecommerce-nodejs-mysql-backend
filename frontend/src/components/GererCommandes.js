import { AiFillEye } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

import AdminService from "../services/AdminService";

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const GererCommandes = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    var t = new Date();

    var yyyy = t.getFullYear();
    var mm = String(t.getMonth() + 1).padStart(2, '0');
    var dd = String(t.getDate()).padStart(2, '0');

    const today = yyyy + '-' + mm + '-' + dd;

    useEffect(() => {    
        if (orderDate === "") {
            getOrderByDate(today);
        } else {
            getOrderByDate(orderDate);
        }
        _new();

        document.getElementById("input-date").defaultValue = today;
    }, [])

    let _orders = [{

    }];

    let [orders, setAllOrders] = useState(_orders);

    let _orderDate = "";

    let [orderDate, setOrderDate] = useState(_orderDate);

    let _ordersDetails = [{

    }];

    let [ordersDetails, setAllOrdersDetails] = useState(_ordersDetails);

    const getOrderByDate = (date) => {
        AdminService.getOrderByDate(date)
        .then(response => {
            setAllOrders(response.data);
            setTotal(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const getByDateViewed = (date) => {
        AdminService.getByDateViewed(date)
        .then(response => {
            setAllOrders(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const getByDateNotViewed = (date) => {
        AdminService.getByDateNotViewed(date)
        .then(response => {
            setAllOrders(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const getDelivered = (date) => {
        AdminService.getDelivered(date)
        .then(response => {
            setAllOrders(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    /*
    const getAllOrders = () => {
        AdminService.getAllOrders()
        .then(response => {
            setAllOrders(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    */

    // setInterval(() => {getAllOrders();}, 5000);


    let _selectedToDelete = {

    };

    let [selectedToDelete, setSelectedToDelete] = useState(_selectedToDelete);

    let _selectedToUpdate = {

    };
    
    let [selectedToUpdate, setSelectedToUpdate] = useState(_selectedToUpdate);

    let _selectedOrder = {

    };
    
    let [selectedOrder, setSelectedOrder] = useState(_selectedOrder);

    const getAllOrdersDetails = (id) => {
        AdminService.getOrderDetailsByOrderID(id)
        .then(response => {
            setAllOrdersDetails(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    let _total = [{

    }];
    
    let [total, setTotal] = useState(_total);

    const getTotalByOrderID = (id) => {
        AdminService.getTotalByOrderID(id)
        .then(response => {
            setTotal(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }    

    const [showAddForm, setShowAddForm] = useState(false);
    const handleShowAddForm = () => setShowAddForm(true);

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const handleShowUpdateForm = () => setShowUpdateForm(true);

    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const handleShowDeleteForm = () => setShowDeleteForm(true);

    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const handleShowOrderDetails = () => setShowOrderDetails(true);

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
        if (showOrderDetails === true) {
            setShowOrderDetails(false)
        }
    };

    const handleAddProduct = (data) => {

        let order = {

        }
        
        AdminService.addProduct(order)
            .then(response => {
                setShowAddForm(false);
                // getAllOrders(); // to change
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
                // getAllOrders(); // to change
            })
            .catch(e => {
                console.log(e);
        });
    }

    const handleChangeOrderDate = () => {
        let date = document.getElementById("input-date").value;
        setOrderDate(date);
        getOrderByDate(date);
    }

    const selectToDelete = (order) => {
        setSelectedToDelete(order);
    }

    const selectToUpdate = (order) => {
        setSelectedToDelete(order);
    }

    const selectOrder = (order) => {
        selectedOrder(order);
    }

    const deleteProduct = () => {
        AdminService.deleteProduct(selectedToDelete.id)
        .then(response => {
            setShowDeleteForm(false)
            getOrderByDate(today);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const setViewed = (id) => {
        AdminService.setViewed(id)
        .then(response => {
            if (orderDate === "") {
                getOrderByDate(today);
            } else {
                getOrderByDate(orderDate);
            }
        })
        .catch(e => {
            console.log(e);
        });       
    }

    const _new = () => {
        var i = 0;
        var new_ = "NEW";
        var check = "✓";
        var speed = 50;

        function typeWriter() {
            if (i < new_.length) {
                document.getElementById("new").innerHTML += new_.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
            if (i < check.length) {
                document.getElementById("check").innerHTML += check.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
    }

    const deliver = () => {
        let check = document.getElementById("_checkbox")

        let order = {
            delivered: 1
        }

        if (check.checked === true) {
            order.delivered = 1;
        }
        else if (check.checked === false) {
            order.delivered = 0;
        }

        setShowOrderDetails(false);

        /*
        AdminService.setDelivered(selectedOrder.id, order)
        .then(response => {
            if (orderDate === "") {
                getOrderByDate(today);
            } else {
                getOrderByDate(orderDate);
            }
        })
        .catch(e => {
            console.log(e);
        });
        */

        AdminService.setOrderDelivered(selectedOrder.id)
        .then(response => {
            if (orderDate === "") {
                getOrderByDate(today);
            } else {
                getOrderByDate(orderDate);
            }
        })
        .catch(e => {
            console.log(e);
        });

        
        setShowOrderDetails(false);
    }

    
    let _orderDetail = [{

    }];
    
    let [orderDetail, setOrderDetail] = useState(_orderDetail);

    const handleCheckbox = (id) => {

        AdminService.getOrderDetailsByID(id)
        .then(response => {
            setOrderDetail(response.data);
        })
        .catch(e => {
            console.log(e);
        });

        if (orderDetail.delivered == 1) {
            document.getElementById('_checkbox').checked = true;
        }
        else if (orderDetail.delivered == 0)  {
            document.getElementById('_checkbox').checked = false;
        }
    }

        return (
            <>
            <section className="gerer-clients">
                <div className="gerer-comm admin-title">
                    <div>Gérer les commandes<span className='puce'>•</span></div>
                    <div><input id='input-date' onChange={() => {handleChangeOrderDate()}} type={"date"}/></div>
                    <div className='input-radio'>
                        <input onChange={() => {
                            if (orderDate === "") {
                                getDelivered(String(today))
                            } else {
                                getDelivered(String(orderDate))
                            }
                            }} name={"radio"} type={"radio"}/>
                        <div>Livrées</div>
                    </div>
                    <div className='input-radio'>
                        <input onChange={() => {
                            if (orderDate === "") {
                                getOrderByDate(String(today))
                            } else {
                                getOrderByDate(String(orderDate))
                            }
                            }} name={"radio"} type={"radio"} value={""}/>
                        <div>Toutes</div>
                    </div>
                    <div className='input-radio'>
                        <input onChange={() => {
                            if (orderDate === "") {
                                getByDateNotViewed(String(today));
                            } else {
                                getByDateNotViewed(String(orderDate));
                            }
                            }} name={"radio"} type={"radio"} value={""}/>
                        <div>Nouvelles</div>
                    </div>
                </div>
                
                <div className="table-and-btn-course">
                    <table>
                        <thead>
                            
                        </thead>
                        <tr>
                            <th>ID de la commande</th>
                            <th>Date de la commande</th>
                            <th>Client</th>
                            <th>Adresse de livraison</th>
                            <th>Numéro de téléphone</th>
                            <th>Date de livraison</th>
                            <th>Message</th>
                            <th>Quantité</th>
                            <th>Total</th>
                            <th>Détails</th>
                            <th>Supprimer</th>
                        </tr>
                        
                        {orders && orders.map((order) => (
                        <>
                            <tr>
                                <td> <div className='new-td'>{order.id}<div className='new'>{order.viewed === 0 ? <div className='new-animation'>NEW</div> : true}</div></div></td>
                                <td>Le {String(order.created_at).slice(0,10)}, à {String(order.created_at).slice(11,16)}</td>
                                <td>{order.first_name} {order.last_name}</td>
                                <td>{order.address}</td>
                                <td>{order.phone_number}</td>
                                <td>Le {String(order.delivery_date).slice(0,10)}, à {String(order.delivery_date).slice(11,16)}</td>
                                <td>{order.message}</td>
                                <td className='td-center'>x{order.quantity}</td>
                                <td className='td-center'>{order.total}.00 MAD</td>
                                <td className="update">
                                    <div>
                                        <button onClick={() => {handleShowOrderDetails(); setViewed(order.id); getTotalByOrderID(order.id); setSelectedOrder(order); getAllOrdersDetails(order.id);}} className="update-btn">
                                            <div><AiFillEye size={26} /></div>
                                        </button>
                                    </div>
                                </td>
                                
                                {/*
                                <td className="update">
                                    <div>
                                        <button onClick={() => {handleShowUpdateForm(); setSelectedToUpdate(order)}} className="update-btn">
                                            <div><MdModeEdit size={30} /></div>
                                        </button>
                                    </div>
                                </td>
                                */}

                                <td className="delete">
                                    <div>
                                        <button onClick={() => {handleShowDeleteForm(); setSelectedToDelete(order)}} className="delete-btn">
                                            <div><MdDeleteForever size={30} /></div>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </>
                        ))}
                    </table>
                    {/*           
                    <div className="add">
                        <button onClick={() => {handleShowAddForm()}} className="add-btn"><RiAddFill size={30} />Ajouter un produit</button>    
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
                        <Modal className='modal' show={showOrderDetails} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title><div className='modal-t'>Détails de la commande</div></Modal.Title>
                            </Modal.Header>

                            <Modal.Body className='add-reservation-form'>
                                {
                                   
                                    total.length == 0 ? <div>Aucun produit</div> : 
                                    <>
                                    <table>
                                        <tr>
                                            <th>Produit</th>
                                            <th>Prix</th>
                                            <th>Quantité</th>
                                        </tr>
    
                                        {ordersDetails && ordersDetails.map((order) => (
                                            <tr  onLoad={() => {handleCheckbox(order.id)}}>
                                                {/*<td className='td-checkbox'>Livrée : <input id={'_checkbox'}  onChange={() => {return true}} value={order.delivered} type={"checkbox"}/></td>*/}
                                                <td>{order.title}</td>
                                                <td className='td-center'>{order.price}.00 MAD</td>
                                                <td className='td-center'>x{order.quantity}</td>
                                            </tr>
                                        ))}
                                    </table>

                                    <div>Test + {/* If total == 0 -> no orer foun */}</div>
                                    
                                    <div className='total'>Total : {total[0].total}.00 MAD</div>
                                    </>
                                }
                                
                            </Modal.Body>

                            <Modal.Footer>
                                {
                                    selectedOrder.delivered === 0 ?
                                    <Button onClick={() => {deliver()}}>
                                        <div className='modal-close-btn'>Livrée ?</div>
                                    </Button>
                                    : true
                                }

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