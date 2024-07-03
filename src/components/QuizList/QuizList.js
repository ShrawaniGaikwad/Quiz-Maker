import React, { useState, useRef, useEffect } from 'react';
import './QuizList.css';
import girl from '../../assets/thumbsup.webp';
import { Link } from 'react-router-dom';
import SignOut from '../Auth/Signout';
import { Button } from '@mui/material';
import './QuizList.css'

const quizData = {
  "General Knowledge": [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: "Paris" },
    { question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Mark Twain"], correctAnswer: "William Shakespeare" },
    { question: "What is the smallest planet in our solar system?", options: ["Earth", "Mars", "Mercury", "Venus"], correctAnswer: "Mercury" },
    { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correctAnswer: "Leonardo da Vinci" },
    { question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Silver", "Hydrogen"], correctAnswer: "Oxygen" }
  ],
  "Science": [
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"], correctAnswer: "Mitochondria" },
    { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars" },
    { question: "What is the chemical formula for water?", options: ["H2O", "CO2", "O2", "NaCl"], correctAnswer: "H2O" },
    { question: "Who proposed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"], correctAnswer: "Albert Einstein" },
    { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correctAnswer: "300,000 km/s" }
  ],
  "History": [
    { question: "Who was the first president of the United States?", options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"], correctAnswer: "George Washington" },
    { question: "In which year did the Titanic sink?", options: ["1910", "1912", "1914", "1916"], correctAnswer: "1912" },
    { question: "Who was known as the 'Iron Lady'?", options: ["Indira Gandhi", "Margaret Thatcher", "Golda Meir", "Angela Merkel"], correctAnswer: "Margaret Thatcher" },
    { question: "What was the name of the ship that brought the Pilgrims to America in 1620?", options: ["Mayflower", "Santa Maria", "Titanic", "Nina"], correctAnswer: "Mayflower" },
    { question: "Which ancient civilization built the pyramids?", options: ["Romans", "Greeks", "Egyptians", "Incas"], correctAnswer: "Egyptians" }
  ],
  "Geography": [
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], correctAnswer: "Pacific Ocean" },
    { question: "Which country has the most population?", options: ["India", "USA", "China", "Russia"], correctAnswer: "China" },
    { question: "What is the longest river in the world?", options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], correctAnswer: "Nile River" },
    { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "South Korea", "Thailand"], correctAnswer: "Japan" },
    { question: "What is the capital city of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correctAnswer: "Canberra" }
  ],
  "Literature": [
    { question: "Who wrote '1984'?", options: ["George Orwell", "Aldous Huxley", "J.R.R. Tolkien", "F. Scott Fitzgerald"], correctAnswer: "George Orwell" },
    { question: "In which novel would you find the character 'Atticus Finch'?", options: ["To Kill a Mockingbird", "The Catcher in the Rye", "The Great Gatsby", "Moby Dick"], correctAnswer: "To Kill a Mockingbird" },
    { question: "Who is the author of 'Pride and Prejudice'?", options: ["Charlotte Brontë", "Emily Brontë", "Jane Austen", "Mary Shelley"], correctAnswer: "Jane Austen" },
    { question: "What is the first book in the Harry Potter series?", options: ["Harry Potter and the Chamber of Secrets", "Harry Potter and the Prisoner of Azkaban", "Harry Potter and the Philosopher's Stone", "Harry Potter and the Goblet of Fire"], correctAnswer: "Harry Potter and the Philosopher's Stone" },
    { question: "Who wrote 'The Odyssey'?", options: ["Homer", "Virgil", "Sophocles", "Plato"], correctAnswer: "Homer" }
  ]
};

const QuizList = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const quizRef = useRef(null);

  const handleQuizSelect = (quizTitle) => {
    setSelectedQuiz(quizTitle);
    setUserAnswers({});
    setScore(null);
  };

  const handleAnswerChange = (questionIndex, option) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: option,
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quizData[selectedQuiz].forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
  };

  useEffect(() => {
    if (selectedQuiz && quizRef.current) {
      quizRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedQuiz]);

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
      <h1 style={{marginTop:100}}>Quiz List</h1>
      <h2>Choose A Quiz To Play</h2>
      <div style={{display: 'flex',flexWrap:'wrap',justifyContent:'center'}}>
      <img src={girl}  alt="Quiz Illustration" />
        <div className='container1'>
          {Object.keys(quizData).map((quizTitle) => (
            <div className='mycard' key={quizTitle} onClick={() => handleQuizSelect(quizTitle)}>
              <h1>{quizTitle}</h1>
            </div>
          ))}
        </div>
      </div>
      {selectedQuiz && (
        <div ref={quizRef}>
          <div style={{display:'flex',justifyContent:'center'}}>
          <div className='outer1'>
          <div className='wrapper1'>
          <h1>{selectedQuiz}</h1>
          {quizData[selectedQuiz].map((questionObj, index) => (
            <div key={index}>
              <h3>{questionObj.question}</h3>
              <ul>
                {questionObj.options.map((option, idx) => (
                  <li key={idx} style={{listStyle:'none'}}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={userAnswers[index] === option}
                        onChange={() => handleAnswerChange(index, option)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Button onClick={handleSubmitQuiz}  variant='contained' style={{backgroundColor:'darkblue'}}>Submit Quiz</Button>
          {score !== null && (
            <div>
              <h3>Your Score: {score} / {quizData[selectedQuiz].length}</h3>
            </div>
          )}
          </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizList;
