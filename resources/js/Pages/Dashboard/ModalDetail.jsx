import React from "react";
import Modal from "react-bootstrap/Modal";
import ImageZoom from "../../Component/ImageZoom";
import HistoryTimeline from "../../Component/HistoryTimeline";

function ModalDetailReport({ show, close, report }) {
    if (!report) return null; 

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

    return (
        <Modal show={show} size="lg" onHide={close}>
            <Modal.Header className="header-modal">
                <Modal.Title>Detail Pengaduan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                            <th>Kategori</th>
                            <td>
                                <span className="badge text-white" style={{ backgroundColor: report.category === 'IT' ? '#3498db' : '#e67e22', fontSize: '11.5px', padding: '5px 8px', borderRadius: '4px' }}>
                                    {report.category || '-'}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th>Deskripsi</th>
                            <td>{report.description}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>
                                <span
                                    className={`badge 
                                        ${report.status === "Sedang diajukan"
                                            ? "badge-warning"
                                            : report.status === "Sedang diproses"
                                            ? "badge-info"
                                            : "badge-success"}`}
                                >
                                    {report.status}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th>Catatan</th>
                            <td>{report.note || "-"}</td>
                        </tr>
                        <tr>
                            <th>Foto</th>
                            <td>{report.image ? (
                                <ImageZoom
                                src={`/storage/${report.image}`}
                                alt="Foto Pengaduan"
                                style={{ maxHeight: "200px" }}
                                />
                            ) : (
                                "-"
                            )}</td>
                        </tr>
                        <tr>
                            <th>Oleh</th>
                            <td>{report.creator?.name || "-"}</td>
                        </tr>
                        <tr>
                            <th>Tanggal Buat</th>
                            <td>{formatDateTime(report.created_at)}</td>
                        </tr>
                        <tr>
                            <th>Tanggal Proses</th>
                            <td>{formatDateTime(report.processed_at)}</td>
                        </tr>
                        <tr>
                            <th>Tanggal Selesai</th>
                            <td>{formatDateTime(report.completed_at)}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Timeline Riwayat Aktivitas */}
                <HistoryTimeline histories={report.histories} />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-red" onClick={close}>
                    Tutup
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDetailReport;
