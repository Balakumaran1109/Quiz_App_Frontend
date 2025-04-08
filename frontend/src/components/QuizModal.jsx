import React, { useEffect } from "react";
import { getTimer } from "../api/timerApi";

const handleStartQuiz = async () => {
  await getTimer();
};

const QuizModal = () => {
  useEffect(() => {
    const modalElement = document.getElementById("quiz_guidelines");
    const modal = new window.bootstrap.Modal(modalElement);

    modal.show();
    // modal.hide();
  }, []);

  return (
    <div>
      <div
        className="modal fade"
        id="quiz_guidelines"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 mx-auto" id="staticBackdropLabel">
                Quiz Instructions
              </h1>
            </div>
            <div className="modal-body">
              <p>1. You have 15 minutes to complete the quiz.</p>
              <p>2. Submitted and unsubmitted questions will be displayed.</p>
              <p>
                3. You can submit the quiz anytime, even without answering all
                questions.
              </p>
              <p>4. Navigate through the questions using the number box.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success m-auto"
                data-bs-dismiss="modal"
                onClick={handleStartQuiz}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
