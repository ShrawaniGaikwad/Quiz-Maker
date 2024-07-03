import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Quiz.css';
import { Button } from '@mui/material';
import axios from 'axios';

const Quiz = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        console.log(`Fetching quiz data for quiz ID: ${quizId}`);
        const response = await axios.get(`https://quizserver-xtp3.onrender.com/quiz/${quizId}`);
        console.log('Quiz data fetched:', response.data);
        setQuizData(response.data);
        initializeAnswers(response.data.questions.length);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setIsLoading(false);
      }
    };

    if (quizId) {
      fetchQuizData();
    } else {
      console.log("quiz Id does not exist");
    }
  }, [quizId]);

  const initializeAnswers = (numQuestions) => {
    const initialAnswers = new Array(numQuestions).fill('');
    setAnswers(initialAnswers);
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedOption;
    setAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    let totalScore = 0;
    quizData.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        totalScore++;
      }
    });
    setScore(totalScore);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!quizData) {
    return <div>Error fetching quiz data.</div>;
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'center'}}>
          <div className='outer1'>
          <div className='wrapper1'>
      <h2>{quizData.title}</h2>
      {quizData.questions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="radio"
                id={`option-${optionIndex}`}
                name={`question-${index}`}
                value={option}
                onChange={() => handleAnswerChange(index, option)}
                checked={answers[index] === option}
              />
              <label htmlFor={`option-${optionIndex}`}>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <br />
      <Button variant='contained' onClick={handleSubmitQuiz}>Submit Quiz</Button>
      {score !== null && <h3>Score: {score}</h3>}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Quiz;