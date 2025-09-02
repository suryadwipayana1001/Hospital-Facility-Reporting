import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import Header from '../../Layouts/Header';
import Sidebar from '../../Layouts/Sidebar';
import Footer from '../../Layouts/Footer';
import { Inertia } from '@inertiajs/inertia';

function ShowReport({ auth, report }) {
    const { errors } = usePage().props;
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
            <Header user={auth.user}/>
            <Sidebar active="reports"  level={auth.user.level}/>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Detail Pengaduan</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Informasi Pengaduan</h3>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: "250px" }}>Nomor Laporan</th>
                                                <td>{report.custom_id}</td>
                                            </tr>
                                            <tr>
                                                <th>Nama Pelapor</th>
                                                <td>{report.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Posisi</th>
                                                <td>{report.positions}</td>
                                            </tr>
                                            <tr>
                                                <th>Ruangan</th>
                                                <td>{report.room}</td>
                                            </tr>
                                            <tr>
                                                <th>Fasilitas</th>
                                                <td>{report.facility}</td>
                                            </tr>
                                            <tr>
                                                <th>Deskripsi</th>
                                                <td>{report.description}</td>
                                            </tr>
                                            <tr>
                                                <th>Status</th>
                                                <td>
                                                    <span className={`badge 
                                                        ${report.status === "Sedang diajukan" ? "badge-warning" : 
                                                          report.status === "Sedang diproses" ? "badge-info" : 
                                                          "badge-success"}`}>
                                                        {report.status}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Catatan</th>
                                                <td>{report.note || "-"}</td>
                                            </tr>
                                            <tr>
                                                <th>Gambar</th>
                                                <td>{report.image ? (
                                                    <img
                                                    src={`/storage/${report.image}`}
                                                    alt="Report"
                                                    style={{ maxHeight: "200px" }}
                                                    />
                                                ) : (
                                                    "-"
                                                )}</td>
                                            </tr>
                                            <tr>
                                                <th>Dibuat oleh</th>
                                                <td>{report.creator?.name || "-"}</td>
                                            </tr>
                                            <tr>
                                                <th>Terakhir diupdate oleh</th>
                                                <td>{report.updater?.username || "-"}</td>
                                            </tr>
                                            <tr>
                                                <th>Tanggal Dibuat</th>
                                                <td>{new Date(report.created_at).toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <th>Terakhir Diperbarui</th>
                                                <td>{new Date(report.updated_at).toLocaleString()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col d-flex justify-content-end mb-3">
                                <button 
                                    onClick={() => Inertia.get("/reports", {}, { preserveState: false })} 
                                    className="btn btn-red mr-2"
                                    >
                                    Kembali
                                </button>
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

export default ShowReport;
