import React, { useEffect, useState } from 'react';
import Header from '../../Layouts/Header';
import Sidebar from '../../Layouts/Sidebar';
import Footer from '../../Layouts/Footer';
import { Inertia } from '@inertiajs/inertia';
import ModalDelete from '../../Component/ModalDelete';
import Dropdown from 'react-bootstrap/Dropdown';

export default function ReportIndex({ auth, reports: initialReports }) {
    const [reports, setReports] = useState(initialReports);
    const [showModal, setShowModal] = useState(false);
    const [idReport, setIdReport] = useState(null);
    const [nama, setNama] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const formatDateTime = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).replace(/\./g, ':');
    };

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

    const handleResponse = (id) => {
        Inertia.get(`/reports/${id}/response`);
    };

    const deleteReport = (id) => {
        setLoadingDelete(true);
        Inertia.delete(`/reports/${id}`, {
            onSuccess: () => {
                setReports(prev => prev.filter(r => r.id !== id));
                setShowModal(false);
            },
            onFinish: () => {
                setLoadingDelete(false);
            }
        });
    };


    useEffect(() => {
        const channel = window.Echo.channel("reports")
            .listen(".ReportCreated", (e) => {
                console.log("Event Report Created diterima:", e);
                setReports(prev => [e.report, ...prev]);

                if (auth.user.level === "teknisi") {
                    console.log("dindong");
                    const audio = new Audio("/dist/sound/dingdong.mp3");
                    audio.play().catch(err => console.error("Gagal play sound:", err));
                }
            });
        if (window.$) {
            $(function () {
                $("#example1").DataTable({
                    responsive: true,
                    lengthChange: false,
                    autoWidth: false,
                    order: [],
                    stateSave: true
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
            });
        } else {
            console.error("jQuery belum dimuat, pastikan sudah dimuat sebelum inisialisasi DataTable.");
        }
        return () => {
            channel.stopListening(".ReportCreated");
        };
    }, [auth.user.level]);


    return (
        <>
            <ModalDelete
                title="Hapus Pengajuan"
                showModal={showModal}
                close={() => setShowModal(false)}
                submit={() => deleteReport(idReport)}
                nama={nama}
                loading={loadingDelete}
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
                                                    <th>No Pengaduan</th>
                                                    <th>Nama Pelapor</th>
                                                    <th>Kategori</th>
                                                    <th>Fasilitas</th>
                                                    <th>Ruangan</th>
                                                    <th>Progress Waktu</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reports.map((report) => (
                                                    <tr key={report.id}>
                                                        <td>{report.custom_id}</td>
                                                        <td>{report.name}</td><td><span className="badge text-white" style={{ backgroundColor: report.category === 'IT' ? '#3498db' : '#e67e22', fontSize: '11px', padding: '5px 8px', borderRadius: '4px' }}>{report.category || '-'}</span></td>
                                                        <td>{report.facility}</td>
                                                        <td>{report.room}</td>
                                                        <td>
                                                             <div style={{ fontSize: '12px', minWidth: '150px', lineHeight: '1.4' }}>
                                                                 <div className="text-muted" style={{ marginBottom: '2px' }}>
                                                                     <i className="far fa-clock text-primary mr-1" style={{ width: '14px' }}></i>
                                                                     <strong>Buat:</strong> {formatDateTime(report.created_at)}
                                                                 </div>
                                                                 {report.processed_at && (
                                                                     <div className="text-muted" style={{ marginBottom: '2px' }}>
                                                                         <i className="fas fa-spinner text-info mr-1" style={{ width: '14px' }}></i>
                                                                         <strong>Proses:</strong> {formatDateTime(report.processed_at)}
                                                                     </div>
                                                                 )}
                                                                 {report.completed_at && (
                                                                     <div className="text-success">
                                                                         <i className="fas fa-check-circle text-success mr-1" style={{ width: '14px' }}></i>
                                                                         <strong>Selesai:</strong> {formatDateTime(report.completed_at)}
                                                                     </div>
                                                                 )}
                                                             </div>
                                                         </td>
                                                        <td>
                                                            <span className={`badge 
                                                                ${report.status === "Sedang diajukan" ? "badge-warning" :
                                                                    report.status === "Sedang diproses" ? "badge-info" :
                                                                        "badge-success"}`}>
                                                                {report.status}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <style>{`
                                                                .no-caret::after {
                                                                    display: none !important;
                                                                }
                                                                .dropdown-item:hover {
                                                                    background-color: #f8f9fc !important;
                                                                }
                                                            `}</style>
                                                            <Dropdown align="end">
                                                                <Dropdown.Toggle 
                                                                    variant="link" 
                                                                    id={`dropdown-${report.id}`} 
                                                                    className="p-0 text-muted no-caret" 
                                                                    style={{ textDecoration: 'none', boxShadow: 'none' }}
                                                                >
                                                                    <i className="fas fa-ellipsis-v" style={{ fontSize: '15px', padding: '8px 12px', cursor: 'pointer', color: '#6c757d' }}></i>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu style={{ margin: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #e3e6f0', borderRadius: '6px' }}>
                                                                    <Dropdown.Item onClick={() => handleDetail(report.id)} className="py-2">
                                                                        <i className="fas fa-eye text-info mr-2" style={{ width: '20px' }}></i> Detail
                                                                    </Dropdown.Item>
                                                                    
                                                                    {auth.user.level === "teknisi" && (
                                                                        <Dropdown.Item onClick={() => handleResponse(report.id)} className="py-2">
                                                                            <i className="fas fa-reply text-secondary mr-2" style={{ width: '20px' }}></i> Response
                                                                        </Dropdown.Item>
                                                                    )}
                                                                    
                                                                    {auth.user.level === "teknisi" && (
                                                                        <Dropdown.Item onClick={() => handleEdit(report.id)} className="py-2">
                                                                            <i className="fas fa-edit text-primary mr-2" style={{ width: '20px' }}></i> Edit
                                                                        </Dropdown.Item>
                                                                    )}
                                                                    
                                                                    {auth.user.level === "teknisi" && (
                                                                        <Dropdown.Item onClick={() => handleShowModal(report.id, report.custom_id)} className="py-2 text-danger">
                                                                            <i className="fas fa-trash text-danger mr-2" style={{ width: '20px' }}></i> Hapus
                                                                        </Dropdown.Item>
                                                                    )}
                                                                </Dropdown.Menu>
                                                            </Dropdown>
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
