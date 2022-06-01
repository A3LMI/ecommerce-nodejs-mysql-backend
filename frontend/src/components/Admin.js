
import { RiDashboardFill } from 'react-icons/ri';
import { MdOutlineFastfood } from 'react-icons/md';
import { RiRestaurantLine } from 'react-icons/ri';
import { BiLogOut } from 'react-icons/bi';
import { BsFillPersonFill, BsFillBookmarksFill } from 'react-icons/bs';
import { BiTask } from 'react-icons/bi';


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
                    <div><RiRestaurantLine size={50} /></div>
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
                        <div><Link className='link' to="/admin/gerer-les-clients"><div>Gérer les clients</div></Link></div>
                    </div>

                    <div className='admin-icons'>
                        <div><MdOutlineFastfood size={27} /></div>
                        <div><Link className='link' to="/admin/gerer-les-produits"><div>Gérer les produits</div></Link></div>
                    </div>

                    <div className='admin-icons'>
                        <div><BsFillBookmarksFill size={27} /></div>
                        <div><Link className='link' to="/admin/gerer-les-categories"><div>Gérer les catégories</div></Link></div>
                    </div>                

                    <div className='admin-icons'>
                        <div><BiLogOut size={27} /></div>
                        <div>Se déconnecter</div>
                    </div>
                </section>

                <section className='outlet'>
                    <Outlet />
                </section>
            </main>
        </section>
    );
}