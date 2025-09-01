import React from "react";

const Sidebar = (props) => {
    const level = props.level; 

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <span className="logo-sidebar"></span>
            <span className="text-bold text-white">
                &nbsp; Windu Husada
            </span>
            <div className="sidebar">
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <a href="/dashboard" className={props.active === 'dashboard' ? "nav-link active" : 'nav-link'} >
                                <i className="nav-icon fas fa-home"></i>
                                <p>Beranda</p>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a href="/reports" className={props.active === 'reports' ? "nav-link active" : 'nav-link'} >
                                <i className="nav-icon fas fa-building"></i>
                                <p>Pengaduan</p>
                            </a>
                        </li>
                        {level === "teknisi" && (
                            <>
                                <li className="nav-item">
                                    <a href="/reports-file" className={props.active === 'reports-file' ? "nav-link active" : 'nav-link'}>
                                        <i className="nav-icon fas fa-file"></i>
                                        <p>Laporan</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/user" className={props.active === 'user' ? "nav-link active" : 'nav-link'}>
                                        <i className="nav-icon fas fa-users"></i>
                                        <p>Akun</p>
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
