import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        // Handle registration logic here
        const userdata = {
            username,
            email,
            password
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/register/", userdata);
            console.log("Registration successful:", response.data);
            setUsername('');
            setEmail('');
            setPassword('');
            setError({});
            setSuccess(true);
        } catch (error) {
            setError(error.response.data);
            console.log("Registration error:", error);
        } finally{
            setLoading(false);
        }

    }
    return (

        <>
            <div className="container justify-content-center align-items-center vh-100">
                <div className="row justify-content-center">
                    <div className="col-md-6 p-5 bg-dark rounded justify-content-center">
                        <h3 className="text-light text-center mb-4">Create an Account</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <small>{error.username && <div className="text-danger">{error.username}</div>}</small>
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <small>{error.email && <div className="text-danger">{error.email}</div>}</small>
                            </div>
                            <div className="mb-4">

                                <input type="password" className="form-control" placeholder="Set Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <small>{error.password && <div className="text-danger">{error.password}</div>}</small>
                            </div>
                            {success && <div className="alert alert-success">Registration Successful! You can now log in.</div>}
                            {loading ? <button className="btn btn-info d-block mx-auto" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                &nbsp; Registering...
                            </button> :<button type="submit" className="btn btn-info d-block mx-auto">Register</button>}
                            
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Register
