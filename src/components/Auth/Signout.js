import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; 
import { Button } from '@mui/material';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Button variant='contained' onClick={handleSignOut}>Sign Out</Button>
  );
};

export default SignOut;
