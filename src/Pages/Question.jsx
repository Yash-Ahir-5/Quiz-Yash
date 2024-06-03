import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer } from '../Redux/actions';

const Question = ({ question }) => {
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.quiz.answers[question.id]);

  const handleChange = (e) => {
    dispatch(setAnswer(question.id, e.target.value));
  };

  const handleCBChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // If checkbox is checked, add the option to the answer array
      dispatch(setAnswer(question.id, [...(answer || []), value]));
    } else {
      // If checkbox is unchecked, remove the option from the answer array
      dispatch(setAnswer(question.id, (answer || []).filter((option) => option !== value)));
    }
  };
  const renderOptions = () => {
    switch (question.type) {
      case 'multiple':
        return question.options.map((option) => (
          <div key={option}>
            <input
              type="radio"
              value={option}
              checked={answer === option}
              onChange={handleChange}
              aria-label={option}
            />
            {option}
          </div>
        ));
      case 'dropdown':
        return question.options.map((option) => (
          <div key={option}>
            <input
              type="checkbox"
              value={option}
              checked={answer && answer.includes(option)}
              onChange={handleCBChange}
              aria-label={option}
            />
            {option}
          </div>
        ));
      case 'text':
        return (
          <input
            type="text"
            value={answer || ''}
            onChange={handleChange}
            aria-label="Enter your answer"
          />
        );
      default:
        return <p>Unknown question type</p>;
    }
  };

  return (
    <div>
      <p>{question.text}</p>
      {renderOptions()}
    </div>
  );
};

export default Question;
