import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { useDispatch, useSelector } from 'react-redux';
import { submitQuiz } from '../Redux/actions';

const Timer = () => {
  const { questions } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + questions.length * 60);

  const { seconds, minutes, start} = useTimer({
    expiryTimestamp,
    onExpire: () => dispatch(submitQuiz()), 
  });

  useEffect(() => {
    start();
  }, [questions]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', border: '2px solid black', borderRadius: '5px', padding: '5px', width: 'fit-content', margin: '0 auto' }}>
      <div>
        <span>{minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
    </div>
  );
};

export default Timer;
