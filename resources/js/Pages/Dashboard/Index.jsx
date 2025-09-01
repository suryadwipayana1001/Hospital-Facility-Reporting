import React, { useState } from 'react';
import Header from "../../Layouts/Header";
import Sidebar from "../../Layouts/Sidebar";
import Footer from "../../Layouts/Footer";
import { Inertia } from '@inertiajs/inertia';
import ModalDetailReport from "./ModalDetail"; 

function Dashboard({ auth, reports, filters }) {
    const [name, setName] = useState(filters?.name || '');
    const [loading, setLoading] = useState(false);
    const [localError, setLocalError] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setLocalError("nama tidak boleh kosong !");
            return;
        }

        setLocalError(""); 
        setLoading(true);
        Inertia.post('/dashboard', { name }, { 
            preserveState: true,
            onFinish: () => setLoading(false) 
        });
    };

    const handlePageChange = (url) => {
        if (url) {
            setLoading(true);
            Inertia.post(url, { name: filters?.name }, { 
                preserveState: true,
                onFinish: () => setLoading(false)
            });
        }
    };
    
    const handleDetail = (report) => {
        setSelectedReport(report);
        setShowModal(true);
    };

    return (
        <>
            <Header user={auth.user} />
            <Sidebar active="dashboard" level={auth.user.level}/>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h6 className="mt-3">INSTALASI PEMELIHARAAN SARANA DAN PRASARANA</h6>
                                <h1 className="mt-3">SISTEM PELAPORAN KERUSAKAN SARANA DAN PRASARANA</h1>
                                <h6 className="mt-3">Silahkan Check Laporan Anda dibawah!</h6>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="mb-3 col-8">
                                            <input 
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)} 
                                                placeholder="Masukan Nama Anda" 
                                            />
                                            {localError && (
                                                <div className="text-danger">{localError}</div>
                                            )}
                                        </div>
                                        <div className="mb-3 col-auto">
                                            <button 
                                                type="submit" 
                                                className="btn btn-success"
                                                disabled={loading}
                                            >
                                                {loading ? "Mencari..." : "Check"}
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <h6 className="mt-2">Silahkan ajukan pengajuan Anda Dibawah ini</h6>
                                <a href="/reports/create" className="btn btn-dark-blue btn-md mb-3">
                                    Disini
                                </a>
                                <div className="mt-2">
                                    {filters?.submitted && (
                                        <>
                                            <h5>Daftar Pengaduan:</h5>
                                            {loading ? (
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            ) : reports.data && reports.data.length > 0 ? (
                                                <>
                                                    <ul className="list-group">
                                                        {reports.data.map((report) => (
                                                         <li key={report.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                             <span>
                                                                <b>{report.custom_id}</b> - {report.name}
                                                             </span>
                                                             <button 
                                                                onClick={() => handleDetail(report)} 
                                                                className="btn btn-sm btn-info"
                                                             >
                                                                Detail
                                                             </button>
                                                         </li>                                                       
                                                        ))}
                                                    </ul>
                                                    <nav className="mt-3">
                                                        <ul className="pagination">
                                                            {reports.links.map((link, index) => (
                                                                <li 
                                                                    key={index} 
                                                                    className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                                                                >
                                                                    <button
                                                                        className="page-link"
                                                                        onClick={() => handlePageChange(link.url)}
                                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                                    />
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </nav>
                                                </>
                                            ) : (
                                                <p>Tidak ada laporan ditemukan.</p>
                                            )}
                                        </>
                                    )}
                                </div>                         
                            </div>
                            <div className="col-sm-6">
                                <img 
                                    src="/dist/img/background-login.jpg" 
                                    className="img-fluid" 
                                    style={{ height: "300px", objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <ModalDetailReport 
                show={showModal} 
                close={() => setShowModal(false) } 
                report={selectedReport} 
            />

            <Footer />
        </>
    );
}

export default Dashboard;
