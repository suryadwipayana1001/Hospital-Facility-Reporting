import React, { useState,useEffect } from 'react';
import Header from '../../Layouts/Header';
import Sidebar from '../../Layouts/Sidebar';
import Footer from '../../Layouts/Footer';
import { Inertia } from '@inertiajs/inertia';

export default function ReportIndex({ auth, reports, totalReports, filters }) {
    const [startDate, setStartDate] = useState(filters?.start_date || '');
    const [endDate, setEndDate] = useState(filters?.end_date || '');

    const handleFilter = (e) => {
        e.preventDefault();
        Inertia.get('/reports-file', { start_date: startDate, end_date: endDate });
    };

    const handleExport = () => {
        window.open(`/reports-file/export?start_date=${startDate}&end_date=${endDate}`, '_blank');
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
    }, [auth.user.level]);

    return (
        <>
            <Header user={auth.user} level={auth.user.level}/>
            <Sidebar active="reports-file" level={auth.user.level} />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <h1>Laporan</h1>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <form onSubmit={handleFilter} className="mb-3 row">
                            <div className="col-auto">
                                <input 
                                    type="date" 
                                    className="form-control"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)} 
                                />
                            </div>
                            <div className="col-auto">
                                <input 
                                    type="date" 
                                    className="form-control"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)} 
                                />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary">Filter</button>
                            </div>
                            <div className="col-auto">
                                <button type="button" className="btn btn-danger" onClick={handleExport}>
                                    Export PDF
                                </button>
                            </div>
                        </form>

                        <div className="card">
                            <div className="card-body">
                                <p>Total Laporan: <b>{totalReports}</b></p>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nama</th>
                                            <th>Ruangan</th>
                                            <th>Fasilitas</th>
                                            <th>Status</th>
                                            <th>Tanggal</th>
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
                                                    <td>{new Date(r.created_at).toLocaleDateString()}</td>
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
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
