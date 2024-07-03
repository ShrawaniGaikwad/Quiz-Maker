import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import TextField from '@mui/material/TextField';
import Lock from './../../assets/lock.png'
import { Button } from '@mui/material';
import './Signup.css'


const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: displayName });
      navigate('/'); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{display:'flex',justifyContent:'center',gap:150,flexWrap:'wrap'}}>
    <div className='outer'>
    <div className='wrapper'>
      <h2 style={{color:'black'}}>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <TextField type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Name" required />
        <br></br>
        <br></br>
        <TextField type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <br></br>
        <br></br>
        <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create Password" required />
        <br></br>
        <br></br>
        <Button type='submit' variant='contained'>Sign Up</Button>
      </form>
      {error && <p>{error}</p>}
    </div>
    </div>
    <img src={Lock}></img>
</div>
  );
};

export default Signup;