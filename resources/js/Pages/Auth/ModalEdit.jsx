import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Modal from "react-bootstrap/Modal";

function ModalEditRegister(props) {
    const data = props.data;
    const { errors } = usePage().props;

    const [name, setName] = useState(data.name);
    const [username, setUsername] = useState(data.username);
    const [level, setLevel] = useState(data.level ?? "pelapor");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // error local state
    const [localErrors, setLocalErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault(); 

        let validationErrors = {};

        if (!name.trim()) {
            validationErrors.name = "nama tidak boleh kosong !";
        }
        if (!username.trim()) {
            validationErrors.username = "username tidak boleh kosong !";
        }
        if (password && password.length < 8) {
            validationErrors.password = "password minimal 8 karakter !";
        }
        if (password !== passwordConfirmation) {
            validationErrors.passwordConfirmation = "konfirmasi password tidak sama !";
        }

        if (Object.keys(validationErrors).length > 0) {
            setLocalErrors(validationErrors);
            return;
        }
        try {
            setLocalErrors({});
            Inertia.put(`/user/${data.id}`, {
                name: name,
                username: username,
                level: level,
                password: password,
                password_confirmation: passwordConfirmation,
            });
            props.close();
        } catch (error) {
            console.log("console",error);
        }
      
        
    };

    return (
        <>
            <Modal show={props.show} size="md">
                <Modal.Header className="header-modal">
                    <Modal.Title>Ubah Profile</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="card-body">
                        {level === "teknisi" && (
                            <div className="form-group">
                                <label>Nama Unit</label>
                                <input
                                    type="text"
                                    value={name}
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nama Lengkap"
                                />
                                {localErrors.name && (
                                    <div className="text-danger">{localErrors.name}</div>
                                )}
                            </div>
                            )}
                            {level === "teknisi" && (
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    className="form-control"
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                />
                                {localErrors.username && (
                                    <div className="text-danger">{localErrors.username}</div>
                                )}
                            </div>
                            )}
                            {level=== "teknisi" && (
                            <div className="form-group">
                                <label>Level</label>
                                <select
                                    className="form-control"
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                >
                                    <option value="pelapor">Pelapor</option>
                                    <option value="teknisi">Teknisi</option>
                                </select>
                                {errors.level && (
                                    <div className="text-danger">{errors.level}</div>
                                )}
                            </div>
                            )}
                            <div className="form-group">
                                <label>Password Baru</label>
                                <div className="d-flex align-items-center">
                                    <input
                                        value={password}
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                    <span
                                        className={
                                            showPassword
                                                ? "far fa-eye-slash nav-icon ml-2"
                                                : "far fa-eye nav-icon ml-2"
                                        }
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ cursor: "pointer" }}
                                    ></span>
                                </div>
                                {localErrors.password && (
                                    <div className="text-danger">{localErrors.password}</div>
                                )}
                                {errors.password && (
                                    <div className="text-danger">{errors.password}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Konfirmasi Password Baru</label>
                                <div className="d-flex align-items-center">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="form-control"
                                        onChange={(e) =>
                                            setPasswordConfirmation(e.target.value)
                                        }
                                        placeholder="Konfirmasi Password"
                                    />
                                    <span
                                        className={
                                            showConfirmPassword
                                                ? "far fa-eye-slash nav-icon ml-2"
                                                : "far fa-eye nav-icon ml-2"
                                        }
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        style={{ cursor: "pointer" }}
                                    ></span>
                                </div>
                                {localErrors.passwordConfirmation && (
                                    <div className="text-danger">
                                        {localErrors.passwordConfirmation}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="button"
                            className="btn btn-red"
                            onClick={props.close}
                        >
                            Batal
                        </button>
                        <button className="btn btn-dark-blue" type="submit">
                            Simpan
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default ModalEditRegister;
