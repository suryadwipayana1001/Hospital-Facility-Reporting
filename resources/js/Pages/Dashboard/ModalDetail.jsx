import React from "react";
import Modal from "react-bootstrap/Modal";

function ModalDetailReport({ show, close, report }) {
    if (!report) return null; 

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
