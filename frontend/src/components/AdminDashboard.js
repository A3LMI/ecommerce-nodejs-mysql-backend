
import { BsFillPersonFill } from 'react-icons/bs';
import { MdLocalOffer } from 'react-icons/md';
import { AiOutlineStock } from 'react-icons/ai';
import { GiWeightLiftingUp } from 'react-icons/gi';

import AdminService from "../services/AdminService";

import { Component } from 'react';

export default class AdminDashboard extends Component {

    constructor(props) {
        super(props);

        this.numberOfProducts();

        this.state = {
            numberOfProducts: 0,
        }
    }

    numberOfProducts() {
        AdminService.numberOfProducts()
        .then(response => {
            this.setState({
                numberOfProducts: response.data
            });
            
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const { numberOfProducts } = this.state;

        return (
            <>        
            <section className='admin-center'>
                <div class="admin-title">Tableau de bord</div>
    
                <div className='admin-clients'>
                    <div>
                        <div class="total-clients">
                            <div class="icon"><BsFillPersonFill size={30} /></div>
        
                            <div>
                                {numberOfProducts && numberOfProducts.map((number, index) => (
                                    <div key={index} class="a-number">{number.count}</div>
                                ))}
                                <div class="stat">Nombre de produits</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
        );
    }
}
