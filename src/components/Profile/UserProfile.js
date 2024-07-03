import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import profile from './../../assets/profile.webp';
import SignOut from '../Auth/Signout';
import './UserProfile.css'

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [userQuizzes, setUserQuizzes] = useState([]);

  useEffect(() => {
    const fetchUserQuizzes = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(`https://quizserver-xtp3.onrender.com/quizzes/user/${currentUser.uid}`);
          setUserQuizzes(response.data);
        } catch (error) {
          console.error('Error fetching user quizzes:', error);
        }
      }
    };

    fetchUserQuizzes();
  }, [currentUser]);

  if (!currentUser) {
    return <div>Login In to See Your Profile</div>; 
  }

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
      <h1>Profile</h1>
      <img src={profile} style={{height:200}}></img>
      <h3>Name: {currentUser.displayName || 'No Name'}</h3>
      <h3>Email: {currentUser.email || 'No Email'}</h3>
      
      <div style={{display:'flex',justifyContent:'center'}}>
      <div className='outer4'>
      <h3>My Quizzes:</h3>
      <h2>Click On the Quizzes to Access It</h2>
      <ul>
        {userQuizzes.map((quiz) => (
          <div>
          <li key={quiz._id} style={{listStyle:'none',color:'white'}}>
            <Link to={`/quiz/${quiz.id}`} style={{color:'#d3e3fd',fontSize:20}}><h4>{quiz.title}</h4></Link>
          </li>
          </div>
        ))}
      </ul>
    </div>
    </div>
    </div>
  );
};

export default UserProfile;