import React, { useState, useEffect } from 'react';
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
    const [image, setImage] = useState(null); // ⬅️ tambah state image
    const [isLoading, setIsLoading] = useState(false);

    const storeReport = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('positions', positions);
        formData.append('room', room);
        formData.append('facility', facility);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        Inertia.post('/reports', formData, {
            forceFormData: true, // penting supaya inertia kirim multipart/form-data
            onFinish: () => setIsLoading(false),
        });
    };

    useEffect(() => {
        const channel = window.Echo.channel("reports")
            .listen(".ReportCreated", (e) => {
                console.log("Event Report Created diterima:", e);

                if (auth.user.level === "teknisi") {
                    const audio = new Audio("/dist/sound/dingdong.mp3");
                    audio.play().catch(err => console.error("Gagal play sound:", err));
                }
            });
    }, [auth.user.level]);

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
                                <form onSubmit={storeReport} encType="multipart/form-data">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Nama Pelapor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Masukkan Nama"
                                                disabled={isLoading}
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
                                                disabled={isLoading}
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
                                                disabled={isLoading}
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
                                                disabled={isLoading}
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
                                                disabled={isLoading}
                                            ></textarea>
                                            {errors.description && (
                                                <div className="text-danger">{errors.description}</div>
                                            )}
                                        </div>
                                        {/* Tambah upload file */}
                                        <div className="form-group">
                                            <label>Upload Gambar (opsional)</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={(e) => setImage(e.target.files[0])}
                                                disabled={isLoading}
                                            />
                                            {errors.image && <div className="text-danger">{errors.image}</div>}
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-end">
                                        <button 
                                            type="button"
                                            onClick={() => Inertia.get("/reports", {}, { preserveState: false })} 
                                            className="btn btn-danger mr-2"
                                            disabled={isLoading}
                                        >
                                            Kembali
                                        </button>
                                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                            {isLoading ? "Mengajukan..." : "Ajukan"}
                                        </button>
                                    </div>
                                </form>
                                {isLoading && (
                                    <div className="overlay d-flex justify-content-center align-items-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                )}
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
