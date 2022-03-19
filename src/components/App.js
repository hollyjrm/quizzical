import React from "react";
import "../styles.css";
import Quiz from "./Quiz";

export default function App() {
  const [quiz, setQuiz] = React.useState(false);

  function startQuiz() {
    setQuiz(true);
  }

  return (
    <div className="container">
      <div className="top-blob"></div>
      {!quiz && (
        <div className="start-page">
          <h1 className="quiz-title">Quizzical</h1>
          <p className="quiz-description">
            Test your knowledge of random trivia around the world. Click below
            to start the quiz.
          </p>
          <button onClick={startQuiz} className="start-button">
            Start Quiz
          </button>
        </div>
      )}
      {quiz && (
        <div>
          <ol className="list-wrapper">
            <Quiz />
          </ol>
        </div>
      )}
      <div className="bottom-blob"></div>
    </div>
  );
}
