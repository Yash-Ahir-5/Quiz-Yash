import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestions, submitQuiz } from '../Redux/actions';
import Question from './Question';
import Timer from './Timer';
import Result from './Result';
import { sampleQuestions } from './QuizQuestions'; // Importing the questions from QuizQuestion.js
import './QuizPage.css'; 

const Quiz = () => {
  const [numQuestions, setNumQuestions] = useState(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const dispatch = useDispatch();
  const { isSubmitted, questions } = useSelector((state) => state.quiz);

  const handleStartQuiz = () => {
    const shuffledQuestions = sampleQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, numQuestions);
    dispatch(setQuestions(selectedQuestions));
  };

  const handleSubmitQuiz = () => {
    dispatch(submitQuiz());
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } 
  };

  if (isSubmitted) {
    return <Result />;
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-container">
        
        <h2>Quiz App</h2>
        <div className="start-quiz-form">
          <label>
            Number of Questions:
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              className="num-questions-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </label>
          <br/>
          <button onClick={handleStartQuiz} className="start-quiz-button">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <Timer className="timer"/>
      <Question question={questions[currentQuestionIndex]} />
      <div className="navigation-buttons">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="navigation-button"
        >
          Previous
        </button>
        {currentQuestionIndex < questions.length - 1 && (
          <button onClick={handleSkipQuestion} className="navigation-button">
            Skip
          </button>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNextQuestion} className="navigation-button">
            Next
          </button>
        ) : (
          <button onClick={handleSubmitQuiz} className="submit-button">
            Submit
          </button>
        )}
      </div>
      <button onClick={handleSubmitQuiz} className="submit-button">
        Submit Quiz
      </button>
    </div>
  );
};

export default Quiz;
