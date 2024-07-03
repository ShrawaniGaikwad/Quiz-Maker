import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import './CreateQuiz.css';
import image from './../../assets/createquiz.webp';
import { Link } from 'react-router-dom';
import SignOut from '../Auth/Signout';
import { useAuth } from '../../hooks/useAuth';

const CreateQuiz = () => {
  const { currentUser } = useAuth();
  const [quizData, setQuizData] = useState({
    title: '',
    questions: [{ question: '', options: ['', '', '', ''], correctAnswer: '' }],
  });
  const [quizLink, setQuizLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuizData((prevQuizData) => ({
      ...prevQuizData,
      questions: [
        ...prevQuizData.questions,
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
      ],
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][field] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleSaveQuiz = async () => {
    if (!currentUser) {
      alert("You need to be logged in to create a quiz.");
      return;
    }

    setLoading(true); 

    const uniqueId = uuidv4();
    const quizPayload = {
      title: quizData.title,
      questions: quizData.questions.map((q) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
      })),
      id: uniqueId,
      createdBy: currentUser.uid, 
    };

    try {
      const response = await axios.post('https://quizserver-xtp3.onrender.com/createquiz', quizPayload);
      if (response.data.newQuiz) {
        const link = `${window.location.origin}/quiz/${uniqueId}`;
        setQuizLink(link);
      }
    } catch (error) {
      console.error('Error saving quiz data:', error);
    } finally {
      setLoading(false); 
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
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 120 }}>
        <div className='mycontainer'>
          <div className='card4'>
            <h2>Create New Quiz</h2>
            <TextField
              className='textfield'
              type="text"
              value={quizData.title}
              onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
              placeholder="Quiz Title"
              required
              InputProps={{
                style: {
                  color: 'white', 
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', 
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', 
                  },
                },
              }}
            />
            <br /><br />
            {quizData.questions.map((question, qIndex) => (
              <div key={qIndex}>
                <TextField
                  className='textfield'
                  type="text"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                  placeholder={`Question ${qIndex + 1}`}
                  required
                  InputProps={{
                    style: {
                      color: 'white', 
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white', 
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                    },
                  }}
                />
                <br /><br />
                {question.options.map((option, oIndex) => (
                  <div key={oIndex}>
                    <TextField
                      className='textfield'
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      placeholder={`Option ${oIndex + 1}`}
                      required
                      InputProps={{
                        style: {
                          color: 'white', 
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'white', 
                          },
                          '&:hover fieldset': {
                            borderColor: 'white', 
                          },
                        },
                      }}
                    />
                    <br /><br />
                  </div>
                ))}
                <TextField
                  className='textfield'
                  type="text"
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                  placeholder="Correct Answer"
                  required
                  InputProps={{
                    style: {
                      color: 'white',
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                    },
                  }}
                />
                <br /><br />
              </div>
            ))}
            <Button variant='contained' onClick={handleAddQuestion}>Add Question</Button>
            <br /><br />
            <Button variant='contained' onClick={handleSaveQuiz}>Save Quiz</Button>
            {loading ? (
              <div>Saving...</div>
            ) : quizLink ? (
              <div>
                <p>Your quiz has been created! Share this link:</p>
                <a href={quizLink} style={{ color: 'white' }}>{quizLink}</a>
              </div>
            ) : null}
          </div>
        </div>
        <img src={image} className='myimage' alt="Quiz" />
      </div>
    </div>
  );
};

export default CreateQuiz;
