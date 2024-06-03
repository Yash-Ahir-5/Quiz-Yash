export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SUBMIT_QUIZ = 'SUBMIT_QUIZ';
export const SET_ANSWER = 'SET_ANSWER';

export const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  payload: questions,
});

export const submitQuiz = () => ({
  type: SUBMIT_QUIZ,
});

export const setAnswer = (questionId, answer) => ({
  type: SET_ANSWER,
  payload: { questionId, answer },
});