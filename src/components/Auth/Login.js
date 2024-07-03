import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.css'
import { Link } from 'react-router-dom';
import SignOut from './../Auth/Signout';
import Lock from './../../assets/lock.png'


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Logged in user:', user.uid); 
      navigate('/create-quiz'); 
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        navigate('/signup');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/quiz-list">Play</Link></li>
        <li><Link to="/create-quiz">Create</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><SignOut /></li>
      </ul>
    </nav>
    <div style={{display:'flex',justifyContent:'center',gap:150,flexWrap:'wrap'}}>
    <div className='outer'>
      <div className='wrapper'>
      <h2 style={{color:'black'}}>Login</h2>
      <form onSubmit={handleLogin}>
        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br></br>
        <br></br>
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br></br>
        <br></br>
        <Button type="submit" className='btn' variant='contained'>Login</Button>
        <br></br>
        <br></br>
        <Link to='/signup' style={{color:'black'}}>Not SignedUp Yet ??</Link>
      </form>
      {error && <p>{error}</p>}
      </div>
    </div>
    <img src={Lock}></img>
    </div>
    </div>
  );
};

export default Login;
