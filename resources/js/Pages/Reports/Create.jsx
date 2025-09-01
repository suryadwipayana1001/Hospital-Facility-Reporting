import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Header from '../../Layouts/Header';
import Sidebar from '../../Layouts/Sidebar';
import Footer from '../../Layouts/Footer';

function CreateReport({ auth }) {
    const { errors } = usePage().props;
    const [name, setName] = useState('');
    const [positions, setPositions] = useState('');
    const [room, setRoom] = useState('');
    const [facility, setFacility] = useState('');
    const [description, setDescription] = useState('');

    const storeReport = (e) => {
        e.preventDefault();
        Inertia.post('/reports', {
            name,
            positions,
            room,
            facility,
            description,
        });
    };

    return (
        <>
            <Header user={auth.user} />
            <Sidebar active="reports" level={auth.user.level}/>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Ajukan Pengaduan</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Form Pengaduan Laporan</h3>
                                </div>
                                <form onSubmit={storeReport}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Nama Pelapor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Masukkan Nama"
                                            />
                                            {errors.name && <div className="text-danger">{errors.name}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Posisi / Jabatan</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={positions}
                                                onChange={(e) => setPositions(e.target.value)}
                                                placeholder="Masukkan Jabatan"
                                            />
                                            {errors.positions && <div className="text-danger">{errors.positions}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Ruangan</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={room}
                                                onChange={(e) => setRoom(e.target.value)}
                                                placeholder="Masukkan Nama Ruangan"
                                            />
                                            {errors.room && <div className="text-danger">{errors.room}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Nama Barang</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={facility}
                                                onChange={(e) => setFacility(e.target.value)}
                                                placeholder="Masukkan Nama Barang"
                                            />
                                            {errors.facility && <div className="text-danger">{errors.facility}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Keterangan</label>
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Masukan keterangan seperti kerusakan yang terjadi"
                                            ></textarea>
                                            {errors.description && (
                                                <div className="text-danger">{errors.description}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-end">
                                        <button 
                                            onClick={() => Inertia.get("/reports", {}, { preserveState: false })} 
                                            className="btn btn-red mr-2"
                                            >
                                            Kembali
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Ajukan
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default CreateReport;
