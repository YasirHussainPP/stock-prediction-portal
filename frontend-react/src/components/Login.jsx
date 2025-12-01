import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

const Login = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const navigate = useNavigate();
   const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext);


    const handleLogin = async (e) => {
        e.preventDefault();
        const user_data={username,password};
        setLoading(true);
        console.log('Logging in with', user_data);
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', user_data);
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          navigate('/');
          console.log('Login successful:', response.data);
          setIsLoggedIn(true);
          // Optionally, redirect the user or update the UI here
        } catch (error) {
          console.error('Login failed:', error);
          setError('Invalid username or password');
        } finally { 
          setLoading(false);
        }
    }
  return (
    <>
            <div className="container justify-content-center align-items-center vh-100">
                <div className="row justify-content-center">
                    <div className="col-md-6 p-5 bg-dark rounded justify-content-center">
                        <h3 className="text-light text-center mb-4">Login to our Portal</h3>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                               
                            </div>
                          
                            <div className="mb-4">

                                <input type="password" className="form-control" placeholder="Set Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                               
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {loading ? <button className="btn btn-info d-block mx-auto" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                &nbsp; Logining...
                            </button> :<button type="submit" className="btn btn-info d-block mx-auto">Login</button>}
                            
                        </form>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Login
