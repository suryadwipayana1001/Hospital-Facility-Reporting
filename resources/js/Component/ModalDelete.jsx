import Modal from "react-bootstrap/Modal";
import React from 'react';

export default function Delete(props) {
    return (
        <>
            <Modal show={props.showModal} size="md">
                <Modal.Header className="header-modal">
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Apakah kamu yakin menghapus : {props.nama} ?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-dark-blue" onClick={props.close}>
                        Tidak
                    </button>
                    <button className="btn btn-red " onClick={props.submit}>
                        Ya
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
