import React, { useEffect, useState } from 'react';
import Header from '../../Layouts/Header';
import Sidebar from '../../Layouts/Sidebar';
import Footer from '../../Layouts/Footer';
import { Inertia } from '@inertiajs/inertia';
import ModalDelete from '../../Component/ModalDelete';

export default function AuthIndex({ auth, users }) {
    const [showModal, setShowModal] = useState(false);
    const [idUser, setIdUser] = useState(null);
    const [nama, setNama] = useState(null);

    const handleShowModal = (id, nama) => {
        setIdUser(id);
        setNama(nama);
        setShowModal(true);
    };

    const handleEdit=(id)=>{
        Inertia.get(`/user/${id}/edit`);
    }

    const deleteUser = async (id) => {
        Inertia.delete(`/user/${id}`);
        console.log("test" + id);
        setShowModal(false); 
    };

    useEffect(() => {
        const channel = window.Echo.channel("reports")
        .listen(".ReportCreated", (e) => {
            console.log("Event Report Created diterima:", e);

            if (auth.user.level === "teknisi") {
                console.log("dindong");
                const audio = new Audio("/dist/sound/dingdong.mp3");
                audio.play().catch(err => console.error("Gagal play sound:", err));
            }
        });
        if (window.$) {
            $(function () {
                $("#example1").DataTable({
                    "responsive": true,
                    "lengthChange": false,
                    "autoWidth": false,
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
                $('#example2').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": false,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false,
                    "responsive": true,
                });
            });
        } else {
            console.error("jQuery belum dimuat, pastikan Anda telah memuatnya sebelum menambahkan kode ini.");
        }
    }, [auth.user.level]);

    return (
        <>
            <ModalDelete title="Hapus Akun" showModal={showModal} close={() => setShowModal(false)} submit={() => deleteUser(idUser)} nama={nama} />
            <Header user={auth.user} />
            <Sidebar active="user" level={auth.user.level} />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Akun</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <a href="/register" className="btn btn-green btn-md mb-3">Daftar Akun</a>
                                        <table id="example1" className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Nama Unit</th>
                                                    <th>Username</th>
                                                    <th>Level</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user, index) => (
                                                    <tr key={user.id}>
                                                        <td>{user.name}</td>
                                                        <td>{user.username}</td>
                                                        <td>{user.level}</td>
                                                            <td>
                                                                 <button onClick={() => handleEdit(user.id)} className="btn btn-sm btn-dark-blue">Edit</button>
                                                                 <button onClick={() => handleShowModal(user.id, user.name)} className="btn btn-sm btn-red ml-2">Hapus</button> 
                                                            </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
