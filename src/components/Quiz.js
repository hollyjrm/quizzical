import React from "react";
import he from "he";
import { nanoid } from "nanoid";

import Confetti from "react-confetti";

export default function Quiz() {
  const [win, setWin] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const width = window.innerWidth;
  const height = window.innerheight;

  React.useEffect(() => {
    playagain();
  }, []);
  const fetchData = () => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results);
        setQuestions(
          res.results.map((q) => {
            const tempAnswers = [...q.incorrect_answers];
            // randomizing the array of answers so correct ans isn't in same place
            const num = Math.floor(Math.random() * tempAnswers.length);
            tempAnswers.splice(num, 0, q.correct_answer);

            return {
              id: nanoid(),
              question: q.question,
              correct_answer: q.correct_answer,
              incorrect_answers: q.incorrect_answers,
              allAnswers: tempAnswers,
              chosenAnswer: "",
            };
          })
        );
      });
  };

  function playagain() {
    document.getElementById("score-holder").innerHTML = "";
    fetchData();
    setFinished(false);
    setWin(false);
  }

  function chooseAnswer(answer, questionId) {
    console.log(answer, questionId);
    setQuestions((prevState) => {
      return prevState.map((eachQuestion) => {
        if (eachQuestion.id === questionId) {
          return { ...eachQuestion, chosenAnswer: answer };
        } else {
          return eachQuestion;
        }
      });
    });
  }

  function checkScore() {
    let counter = 0;
    questions.map((each) => {
      if (each.chosenAnswer === each.correct_answer) {
        counter += 1;
      }
    });

    const holder = document.getElementById("score-holder");
    holder.innerHTML = `You scored ${counter}/5`;
    setFinished(true);

    counter > 3 ? setWin(true) : setWin(false);
  }

  const questionElements = questions.map((question) => {
    return (
      <li key={question.id} className="list-elements">
        <h2 className="question-title">{he.decode(question.question)}</h2>
        <div className="all-answers">
          {question.allAnswers.map((ans) => {
            const styles = {
              backgroundColor: question.chosenAnswer === ans ? "#D6DBF5" : "",
              border:
                question.chosenAnswer === ans ? "none" : "solid 1px #293264",
            };
            return (
              <h3
                onClick={() => {
                  chooseAnswer(ans, question.id);
                }}
                id="choice"
                style={styles}
                key={ans}
                className={
                  finished && ans === question.correct_answer
                    ? "correct"
                    : "choice"
                }
              >
                {he.decode(ans)}
              </h3>
            );
          })}
        </div>
      </li>
    );
  });

  return (
    <div className="question-elements">
      {win && <Confetti width={width} height={height} />}
      {questionElements}
      <button
        onClick={finished ? playagain : checkScore}
        className="check-button"
      >
        {finished ? "Play again" : "Check Answers"}
      </button>
      <div className="score-holder" id="score-holder"></div>
    </div>
  );
}
