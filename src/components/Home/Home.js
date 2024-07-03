import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import boy from './../../assets/boy.webp';
import SignOut from './../Auth/Signout';

const Home = () => {
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
      <h1 style={{marginTop:50,fontSize:40}}>Welcome to the Quiz Platform</h1>
      <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
      <img src={boy} style={{float:'right',margin:0}}></img>
    <div className='container'>
        <div className='card'>
        <h4 style={{fontSize:100 }}>+</h4>
        <h4 style={{fontSize:20}}><li style={{listStyle:'none'}}><Link to="/create-quiz">Create New Quiz</Link></li></h4>
        </div>
        <div className='card'>
        <h4 style={{marginTop:80,fontSize:25}}><li style={{listStyle:'none'}}><Link to="/quiz-list">Play Quizzes</Link></li>
        </h4>
        </div>
        <div className='card'>
        <h4 style={{marginTop:80,fontSize:25}}><li style={{listStyle:'none'}}><Link to="/profile">View Profile</Link></li></h4>
        </div>
    </div>
    </div>
    </div>
  );
};

export default Home;
