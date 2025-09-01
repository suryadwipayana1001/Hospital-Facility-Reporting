import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Header from "../../Layouts/Header";
import Sidebar from "../../Layouts/Sidebar";
import Footer from "../../Layouts/Footer";

function EditReport({ auth, report }) {
    const { errors } = usePage().props;

    const [name, setName] = useState(report.name);
    const [positions, setPositions] = useState(report.positions);
    const [room, setRoom] = useState(report.room);
    const [facility, setFacility] = useState(report.facility);
    const [description, setDescription] = useState(report.description);
    const [status, setStatus] = useState(report.status ?? "Sedang diajukan");
    const [note, setNote] = useState(report.note ?? "");

    const handleSubmit = () => {
        Inertia.put(`/reports/${report.id}`, {
            name,
            positions,
            room,
            facility,
            description,
            status,
            note,
        });
    };

    return (
        <>
            <Header user={auth.user}/>
            <Sidebar active="reports"  level={auth.user.level}/>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Edit Report</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Form Ubah Laporan</h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label>Nama Pelapor</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        {errors.name && (
                                            <div className="alert alert-danger">{errors.name}</div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>Jabatan</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={positions}
                                            onChange={(e) => setPositions(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Ruangan</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={room}
                                            onChange={(e) => setRoom(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Fasilitas</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={facility}
                                            onChange={(e) => setFacility(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Deskripsi</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            className="form-control"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Sedang diajukan">Sedang diajukan</option>
                                            <option value="Sedang diproses">Sedang diproses</option>
                                            <option value="Selesai diproses">Selesai diproses</option>
                                        </select>
                                        {errors.status && (
                                            <div className="alert alert-danger">{errors.status}</div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>Catatan</label>
                                        <textarea
                                            className="form-control"
                                            rows="2"
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col d-flex justify-content-end">
                                        <button 
                                            onClick={() => Inertia.get("/reports", {}, { preserveState: false })} 
                                            className="btn btn-red mr-2"
                                            >
                                            Kembali
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className="btn btn-dark-blue mr-3"
                                        >
                                            Simpan
                                        </button>
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

export default EditReport;
