import { SET_QUESTIONS, SUBMIT_QUIZ, SET_ANSWER } from './actions';

const initialState = {
  questions: [],
  answers: {},
  isSubmitted: false,
  score: 0,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        answers: {},
        isSubmitted: false,
        score: 0,
      };
    case SET_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    case SUBMIT_QUIZ:
      const correctAnswers = state.questions.filter(
        (q) => q.correctAnswer === state.answers[q.id]
      ).length;
      return {
        ...state,
        isSubmitted: true,
        score: correctAnswers,
      };
    default:
      return state;
  }
};

export default quizReducer;