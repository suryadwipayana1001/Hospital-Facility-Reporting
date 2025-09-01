
import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

function Login() {
    const { errors } = usePage().props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const storeLogin = async (e) => {
        e.preventDefault();

        Inertia.post('/login', {
            username: username,
            password: password,
        });
    }

    return (
        <>
            <Head>
                <title className="logo-login">Login Account</title>
            </Head>
            <div className="background-login">
                <div className='container' >
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="card border-0 rounded-3 shadow-sm" style={{ marginTop: '100px' }}>
                                <div className="card-body">
                                    <div className="row  justify-content-center">
                                        <h5 className='text-bold'>LOGIN</h5>
                                    </div>
                                    <h6 className="text-center d-flex justify-content-center ">
                                        <span className="mt-1 logo-login"></span>
                                        <span className="ml-1">Windu Husada</span>
                                    </h6>
                                    <hr />
                                    <form onSubmit={storeLogin}>
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input className="form-control" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                                        </div>
                                        {errors.username && (
                                            <div className="alert alert-danger">
                                                {errors.username}
                                            </div>
                                        )}
                                        <div className="mb-3 ">
                                            <label className="form-label">Password</label>
                                            <div className='d-flex align-items-center'>
                                                <input type={showPassword ? "text" : "password"} className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                                <span className={showPassword ? "far fa-eye-slash nav-icon ml-5" : "far fa-eye nav-icon ml-5"} onClick={() => setShowPassword(!showPassword)}></span>
                                            </div>
                                        </div>
                                        {errors.password && (
                                            <div className="alert alert-danger">
                                                {errors.password}
                                            </div>
                                        )}
                                        <button type="submit" className="btn btn-dark-blue w-100  mb-3">LOGIN</button>
                                        {/* <a href="/register" className="btn btn-primary w-100">REGISTER</a> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Login
