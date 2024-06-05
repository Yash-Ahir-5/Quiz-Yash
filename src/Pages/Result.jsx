import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Result = () => {
  const { score, questions, answers } = useSelector((state) => state.quiz);

  const attemptedQuestions = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const skippedQuestions = totalQuestions - attemptedQuestions;

  const percentage = (score / totalQuestions) * 100;
  const isPass = percentage > 50;
  const confettiInstance = useRef(null);

  useEffect(() => {
    if (isPass && confettiInstance.current) {
      confettiInstance.current({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isPass]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Quiz Result</h2>
      <p>Your Score: {score} / {totalQuestions}</p>
      <p>Percentage: {percentage}%</p>
      <h3>Questions Attempted:</h3>
      <p>{attemptedQuestions} / {totalQuestions}</p>
      <h3>Questions Skipped:</h3>
      <p>{skippedQuestions}</p> 
      {isPass ? (
        <div>
          <h3 style={{ color: 'blue' }}>PASS - Congratulations</h3>
        </div>
      ) : (
        <div>
          <h3 style={{ color: 'red' }}>FAIL - Better Luck next Time</h3>
        </div>
      )}
    </div>
  );
};

export default Result;