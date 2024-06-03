import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/store';  
import Quiz from './Pages/QuizPage';

function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600)
  return (
    <Provider store={store}>
      <div className="App">
        <div>
          <Quiz/>
        </div>
      </div>
    </Provider>
  );
}

export default App;
