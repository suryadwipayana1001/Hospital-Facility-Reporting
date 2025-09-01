import Modal from "react-bootstrap/Modal";
import React from "react";

export default function Delete(props) {
    return (
        <Modal show={props.showModal} size="md" centered>
            <Modal.Header className="header-modal">
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Apakah kamu yakin menghapus: <strong>{props.nama}</strong> ?
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-dark-blue" onClick={props.close} disabled={props.loading}>
                    Tidak
                </button>
                <button
                    className="btn btn-red"
                    onClick={props.submit}
                    disabled={props.loading}
                >
                    {props.loading ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm mr-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                            Menghapus...
                        </>
                    ) : (
                        "Ya"
                    )}
                </button>
            </Modal.Footer>
        </Modal>
    );
}
