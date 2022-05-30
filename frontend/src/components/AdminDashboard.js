
import { BsFillPersonFill, BsFillBookmarksFill, BsXCircle, BsCheckCircle } from 'react-icons/bs';
import { MdOutlineFastfood } from 'react-icons/md';
import { BiTask } from 'react-icons/bi';

import AdminService from "../services/AdminService";

import { Component } from 'react';

export default class AdminDashboard extends Component {

    constructor(props) {
        super(props);

        this.numberOfProducts();
        this.numberOfClients();
        this.numberOfCategories();
        this.numberOfOrders();
        this.numberOfDeliveredOrders();
        this.numberOfNotDeliveredOrders();

        this.state = {
            numberOfProducts: 0,
            numberOfClients: 0,
            numberOfCategories: 0,
            numberOfOrders: 0
        }
    }

    numberOfProducts() {
        AdminService.numberOfProducts()
        .then(response => {
            this.setState({
                numberOfProducts: response.data
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    numberOfClients() {
        AdminService.numberOfClients()
        .then(response => {
            this.setState({
                numberOfClients: response.data
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    numberOfCategories() {
        AdminService.numberOfCategories()
        .then(response => {
            this.setState({
                numberOfCategories: response.data
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    numberOfOrders() {
        AdminService.numberOfOrders()
        .then(response => {
            this.setState({
                numberOfOrders: response.data
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    numberOfNotDeliveredOrders() {
        AdminService.numberOfNotDeliveredOrders()
        .then(response => {
            this.setState({
                numberOfNotDeliveredOrders: response.data
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    numberOfDeliveredOrders() {
        AdminService.numberOfDeliveredOrders()
        .then(response => {
            this.setState({
                numberOfDeliveredOrders: response.data
            });
        })
        .catch(e => {
            console.log(e);
        });
    }    

    render() {
        const { numberOfProducts, numberOfClients, numberOfCategories, numberOfOrders, numberOfDeliveredOrders, numberOfNotDeliveredOrders } = this.state;

        return (
            <>        
            <section className='admin-center'>
                <div class="admin-title">Tableau de bord</div>
    
                <div className='admin-clients'>
                    <div>
                        <div class="total-clients">
                            <div class="icon"><BsFillPersonFill size={30} /></div>
        
                            <div>
                                {numberOfClients && numberOfClients.map((number, index) => (
                                    <div key={index} class="a-number">{number.count}</div>
                                ))}
                                <div class="stat">Clients</div>
                            </div>
                        </div>

                        <div class="total-clients">
                            <div class="icon"><MdOutlineFastfood size={30} /></div>
        
                            <div>
                                {numberOfProducts && numberOfProducts.map((number, index) => (
                                    <div key={index} class="a-number">{number.count}</div>
                                ))}
                                <div class="stat">Produits</div>
                            </div>
                        </div>

                        <div class="total-clients">
                            <div class="icon"><BsFillBookmarksFill size={30} /></div>
        
                            <div>
                                {numberOfCategories && numberOfCategories.map((number, index) => (
                                    <div key={index} class="a-number">{number.count}</div>
                                ))}
                                <div class="stat">Catégories</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="total-clients">
                            <div class="icon"><BiTask size={30} /></div>
        
                            <div>
                                {numberOfOrders && numberOfOrders.map((number, index) => (
                                    <div key={index} class="a-number">{number.count}</div>
                                ))}
                                <div class="stat">Commandes totales</div>
                            </div>
                        </div>
                        
                        <div class="total-clients">
                            <div class="icon"><BsXCircle size={30} /></div>
        
                            <div>
                                {numberOfNotDeliveredOrders && numberOfNotDeliveredOrders.map((number, index) => (
                                    <div key={index} class="a-number">{number.count}</div>
                                ))}
                                <div class="stat">Commandes non livrées</div>
                            </div>
                        </div>
                        
                        <div class="total-clients">
                            <div class="icon"><BsCheckCircle size={30} /></div>
        
                            <div>
                                {numberOfDeliveredOrders && numberOfDeliveredOrders.map((number, index) => (
                                    <div key={index} class="a-number">{number.count}</div>
                                ))}
                                <div class="stat">Commandes livrées</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
        );
    }
}