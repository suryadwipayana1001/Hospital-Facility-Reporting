import React, { useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import ModalEditRegister from "../Pages/Auth/ModalEdit";
function Header({ user}) {
    const [showEdit,setShowEdit]= useState(false);
    const handleLogout = () => {
        Inertia.post('/logout', {}, { replace: true });
    };
    
    return (
        <>
        <ModalEditRegister show={showEdit} data={user} close={()=>setShowEdit(false)}/>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto" onClick={()=>setShowEdit(true)}>
                <li className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                        Hallo {user.name}
                    </a>
                </li>
            </ul>
            <button 
                onClick={handleLogout} 
                className="nav-link" 
                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            >Logout
            </button>
        </nav>
        </>
    );
}

export default Header;
