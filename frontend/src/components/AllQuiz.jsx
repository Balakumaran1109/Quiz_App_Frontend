import React from "react";

const AllQuiz = ({ selectedQuizData, quizData }) => {
  if (!Array.isArray(selectedQuizData) || selectedQuizData.length === 0) {
    return <p>No quiz selected</p>;
  }

  return (
    <div className="allQuizBox border mb-5 p-4 mx-auto">
      {selectedQuizData.map((quiz, index) => {
        const submittedAnswer = quizData?.submittedAnswers?.[quiz.id];
        const isCorrect = submittedAnswer === quiz.correctAnswer;
        const isUnanswered = submittedAnswer === undefined;

        return (
          <div key={quiz.id}>
            <h3>
              {index + 1}. {quiz.question}
            </h3>

            <div className="answers mb-5">
              <div className="d-grid gap-3 mt-5 allQuizButtons">
                {quiz.options.map((option, i) => {
                  let btnClass = "btn btn-outline-dark text-start quiz-option";

                  if (submittedAnswer === option) {
                    btnClass += isCorrect
                      ? " btn-success text-white"
                      : " btn-danger text-white";
                  } else if (option === quiz.correctAnswer) {
                    btnClass += " btn-success text-white";
                  } else if (isUnanswered) {
                    btnClass += " btn-warning text-dark";
                  }

                  return (
                    <button className={btnClass} type="button" key={i}>
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllQuiz;
