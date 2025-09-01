import React, { useEffect, useState } from 'react';
import Header from '../../Layouts/Header';
import Sidebar from '../../Layouts/Sidebar';
import Footer from '../../Layouts/Footer';
import { Inertia } from '@inertiajs/inertia';
import ModalDelete from '../../Component/ModalDelete';

export default function ReportIndex({ auth, reports: initialReports }) {
    const [reports, setReports] = useState(initialReports);
    const [showModal, setShowModal] = useState(false);
    const [idReport, setIdReport] = useState(null);
    const [nama, setNama] = useState(null);

    const handleShowModal = (id, nama) => {
        setIdReport(id);
        setNama(nama);
        setShowModal(true);
    };

    const handleEdit = (id) => {
        Inertia.get(`/reports/${id}/edit`);
    };

    const handleDetail = (id) => {
        Inertia.get(`/reports/${id}`);
    };

    const deleteReport = (id) => {
        Inertia.delete(`/reports/${id}`, {
            onSuccess: () => {
                setReports(prev => prev.filter(r => r.id !== id));
                setShowModal(false);
            }
        });
    };
    

    useEffect(() => {
        // Listen ke event ReportCreated
        window.Echo.channel("reports")
            .listen(".ReportCreated", (e) => {
                console.log("Event Report Created diterima:", e);

                // Tambahkan report baru ke state
                setReports(prev => [e.report, ...prev]);

                // Play sound
                const audio = new Audio("/dist/sound/dingdong.mp3");
                audio.play().catch(err => console.error("Gagal play sound:", err));
            });

        // Init datatable (hanya sekali)
        if (window.$) {
            $(function () {
                $("#example1").DataTable({
                    responsive: true,
                    lengthChange: false,
                    autoWidth: false,
                    order: [[2, "desc"]] // kolom ke-2 (Tanggal) descending
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');                
            });
        } else {
            console.error("jQuery belum dimuat, pastikan sudah dimuat sebelum inisialisasi DataTable.");
        }
    }, []);

    return (
        <>
            <ModalDelete
                title="Hapus Pengajuan"
                showModal={showModal}
                close={() => setShowModal(false)}
                submit={() => deleteReport(idReport)}
                nama={nama}
            />
            <Header user={auth.user} />
            <Sidebar active="reports" level={auth.user.level} />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Daftar Pengaduan</h1>
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
                                        <a href="/reports/create" className="btn btn-green btn-md mb-3">
                                            Ajukan Pengaduan
                                        </a>
                                        <table id="example1" className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Nama Pelapor</th>
                                                    <th>Fasilitas</th>
                                                    <th>Tanggal</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reports.map((report) => (
                                                    <tr key={report.id}>
                                                        <td>{report.name}</td>
                                                        <td>{report.facility}</td>
                                                        <td>{report.created_at.split("T")[0]}</td>
                                                        <td>
                                                            <span className={`badge 
                                                                ${report.status === "Sedang diajukan" ? "badge-warning" : 
                                                                    report.status === "Sedang diproses" ? "badge-info" : 
                                                                    "badge-success"}`}>
                                                                {report.status}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <button onClick={() => handleDetail(report.id)} className="btn btn-sm btn-info">
                                                                Detail
                                                            </button>
                                                            {auth.user.level === "teknisi" && (
                                                                <button 
                                                                    onClick={() => handleEdit(report.id)} 
                                                                    className="btn btn-sm btn-dark-blue ml-2"
                                                                >
                                                                    Edit
                                                                </button>
                                                            )}
                                                             {auth.user.level === "teknisi" && (
                                                                <button
                                                                    onClick={() => handleShowModal(report.id, report.name)}
                                                                    className="btn btn-sm btn-red ml-2"
                                                                >
                                                                    Hapus
                                                                </button>
                                                             )}
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
