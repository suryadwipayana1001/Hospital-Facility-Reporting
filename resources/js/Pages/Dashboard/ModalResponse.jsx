import React from "react";
import Modal from "react-bootstrap/Modal";

function ModalResponse({ show, close, report }) {
    if (!report) return null; 

    return (
        <Modal show={show} size="lg" onHide={close}>
            <Modal.Header className="header-modal">
                <Modal.Title>Informasi Response</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th style={{ width: "250px" }}>Nomor Laporan</th>
                            <td>{report.custom_id}</td>
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
                            <td> {report.process_image ? (
                                <img
                                    src={`/storage/${report.process_image}`}
                                    alt="Process"
                                    style={{ maxHeight: "200px" }}
                                />
                            ) : (
                                "-"
                            )}</td>
                        </tr>
                        <tr>
                            <th>Oleh</th>
                            <td>{report.status === "Sedang diajukan"
                                ? "-" : report.updater?.username || "-"}</td>
                        </tr>
                        <tr>
                            <th>Tanggal Response</th>
                            <td> {report.status === "Sedang diajukan"
                                ? "-"
                                : new Date(report.updated_at).toLocaleString('id-ID', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </td>
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

export default ModalResponse;
