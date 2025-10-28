import React, { useState, useEffect } from 'react';
import Header from '../../Layouts/Header';
import Sidebar from '../../Layouts/Sidebar';
import Footer from '../../Layouts/Footer';
import { Inertia } from '@inertiajs/inertia';

export default function ReportIndex({ auth, reports, totalReports, filters }) {
    const [startDate, setStartDate] = useState(filters?.start_date || '');
    const [endDate, setEndDate] = useState(filters?.end_date || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [loading, setLoading] = useState(false);

    const handleFilter = (e) => {
        e.preventDefault();
        setLoading(true);

        Inertia.get(
            '/reports-file',
            { 
                start_date: startDate, 
                end_date: endDate,
                status: status 
            },
            {
                onFinish: () => setLoading(false), // Matikan loading setelah request selesai
            }
        );
    };

    const handleExport = () => {
        window.open(
            `/reports-file/export?start_date=${startDate}&end_date=${endDate}&status=${status}`,
            '_blank'
        );
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
            <Header user={auth.user} level={auth.user.level} />
            <Sidebar active="reports-file" level={auth.user.level} />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <h1>Laporan</h1>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <form onSubmit={handleFilter} className="mb-3 row align-items-center">
                            <div className="col-auto">
                                <label className="form-label"><strong>Mulai Tanggal</strong></label>
                                <input 
                                    type="date" 
                                    className="form-control"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)} 
                                />
                            </div>
                            <div className="col-auto">
                                <label className="form-label"><strong>Sampai Tanggal</strong></label>
                                <input 
                                    type="date" 
                                    className="form-control"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)} 
                                />
                            </div>
                            <div className="col-auto">
                                <label className="form-label"><strong>Status</strong></label>
                                <select 
                                    className="form-control"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">Semua Status</option>
                                    <option value="Sedang diajukan">Sedang diajukan</option>
                                    <option value="Sedang diproses">Sedang diproses</option>
                                    <option value="Selesai diproses">Selesai diproses</option>
                                </select>
                            </div>

                            <div className="col-auto mt-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary d-flex align-items-center justify-content-center" 
                                    style={{ height: 50, minWidth: 120 }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Loading...
                                        </>
                                    ) : (
                                        "Filter"
                                    )}
                                </button>
                            </div>

                            <div className="col-auto mt-4">
                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    style={{height:50}} 
                                    onClick={handleExport}
                                >
                                    Export PDF
                                </button>
                            </div>
                        </form>

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status"></div>
                                <p className="mt-3">Memuat data laporan...</p>
                            </div>
                        ) : (
                            <div className="card">
                                <div className="card-body">
                                    <p>Total Laporan: <b>{totalReports}</b></p>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>No Pengaduan</th>
                                                <th>Nama</th>
                                                <th>Ruangan</th>
                                                <th>Fasilitas</th>
                                                <th>Status</th>
                                                <th>Tanggal Dibuat</th>
                                                <th>Tanggal Response</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reports.length > 0 ? (
                                                reports.map((r) => (
                                                    <tr key={r.id}>
                                                        <td>{r.custom_id}</td>
                                                        <td>{r.name}</td>
                                                        <td>{r.room}</td>
                                                        <td>{r.facility}</td>
                                                        <td>{r.status}</td>
                                                        <td>
                                                            {new Date(r.created_at).toLocaleString('id-ID', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}
                                                        </td>
                                                        <td>
                                                            {new Date(r.updated_at).toLocaleString('id-ID', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">Tidak ada laporan</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
