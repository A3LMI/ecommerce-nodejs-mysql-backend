
import { CgGym } from 'react-icons/cg';
import { RiDashboardFill } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { AiOutlineStock } from 'react-icons/ai';
import { MdLocalOffer } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';

import { BrowserRouter, Outlet, Link } from 'react-router-dom';

import { useState } from 'react';

import { AdminDashboard } from './AdminDashboard';

export const Admin = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <section className='admin'>
            <div className='admin-header'>
                <div className='admin-logo'>
                    <div><CgGym size={50} /></div>
                    <div>Bienvenue</div>
                </div>

                <div className='admin-panel'>
                    <div>Panneau d'administration</div>
                </div>
            </div>

            <main className='admin-main'>
                <section className='admin-sidebar'>
                    <div className='admin-icons'>
                        <div><RiDashboardFill size={27} /></div>
                        <div><Link className='link' to="/admin/tableau-de-bord"><div>Tableau de bord</div></Link></div>
                    </div>

                    <div className='admin-icons'>
                        <div><BsFillPersonFill size={27} /></div>
                        <div><Link className='link' to="/admin/gerer-les-produits"><div>Gérer les produits</div></Link></div>
                    </div>

                    <div className='admin-icons'>
                        <div><BiLogOut size={27} /></div>
                        <div>Se déconnecter</div>
                    </div>
                </section>

                <section className='outlet'>
                    <div>
                        
                    </div>
                    <Outlet />
                </section>
            </main>
        </section>
    );
}