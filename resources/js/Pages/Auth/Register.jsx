import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Header from '../../Layouts/Header';
import Sidebar from '../../Layouts/Sidebar';
import Footer from '../../Layouts/Footer';

function Register({ auth }) {
    const { errors } = usePage().props;
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [level, setLevel] = useState('pelapor');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const storeRegister = async (e) => {
        e.preventDefault();
        Inertia.post('/register', {
            name,
            username,
            password,
            password_confirmation: passwordConfirmation,
            level, 
        });
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
            <Header user={auth.user} />
            <Sidebar active="user" level={auth.user.level}/>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Daftar Akun</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Form Daftar</h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label>Nama Unit</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Nama Unit"
                                        />
                                        {errors.name && (
                                            <div className="text-danger">{errors.name}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Username"
                                        />
                                        {errors.username && (
                                            <div className="text-danger">{errors.username}</div>
                                        )}
                                    </div>
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

                                    <div className="form-group">
                                        <label>Password</label>
                                        <div className="d-flex align-items-center">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control"
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"
                                            />
                                            <span
                                                className={
                                                    showPassword
                                                        ? 'far fa-eye-slash nav-icon ml-5'
                                                        : 'far fa-eye nav-icon ml-5'
                                                }
                                                onClick={() => setShowPassword(!showPassword)}
                                            ></span>
                                        </div>
                                        {errors.password && (
                                            <div className="text-danger">{errors.password}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Konfirmasi Password</label>
                                        <div className="d-flex align-items-center">
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                className="form-control me-2"
                                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                                placeholder="Confirm Password"
                                            />
                                            <span
                                                className={
                                                    showConfirmPassword
                                                        ? 'far fa-eye-slash nav-icon ml-5'
                                                        : 'far fa-eye nav-icon ml-5'
                                                }
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            ></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col d-flex justify-content-end">
                                        <button
                                            onClick={() => window.history.back()}
                                            className="btn btn-danger mr-3"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={storeRegister}
                                            className="btn btn-dark-blue mr-3"
                                        >
                                            Daftar
                                        </button>
                                    </div>
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

export default Register;
