import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { getQuiz } from "../api/quizApi";
import { getUserDetails } from "../api/userApi";
import { data } from "../data.json";
import AllQuiz from "../components/AllQuiz";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const [quizData, setQuizData] = useState({});
  const [userData, setUserData] = useState({});
  const [selectedQuizData, setSelectedQuizData] = useState({});
  const [answerCount, setAnswerCount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Logout User
  const handleStartAgain = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Get User Data from DB
  const getQuizData = async () => {
    setIsLoading(true);
    const quizData = await getQuiz();
    const userData = await getUserDetails();
    setQuizData(quizData?.userQuiz || {});
    setUserData(userData);
    setIsLoading(false);
  };

  // Count total number of answered Questions
  const handleAnsweredCount = () => {
    const isSubmitted = quizData?.isSubmitted;

    if (!isSubmitted) {
      // console.log("No submitted data available.");
      return;
    }

    const trueCount = Object.values(isSubmitted).filter(
      (value) => value === true
    ).length;

    setAnswerCount(trueCount);
  };

  // Count Total Correct Answer
  const handleCorrectAnswer = () => {
    if (!quizData?.submittedAnswers) {
      // console.log("No submitted answers available.");
      return;
    }

    if (!Array.isArray(selectedQuizData)) {
      // console.log("selectedQuizData is not an array!");
      return;
    }

    const result = selectedQuizData.filter((val) =>
      Object.keys(quizData.submittedAnswers).includes(String(val.id))
    );

    const correctAnswer = result.map((value) => {
      return value.correctAnswer === quizData.submittedAnswers[value.id];
    });

    const correctCount = correctAnswer.filter(Boolean).length;

    setCorrectAnswer(correctAnswer);
    setCorrectAnswerCount(correctCount);
  };

  useEffect(() => {
    getQuizData();
  }, []);

  useEffect(() => {
    handleAnsweredCount();
    handleCorrectAnswer();
  }, [quizData]);

  useEffect(() => {
    if (userData.selectedQuiz) {
      const quizArray = data[userData.selectedQuiz.toLowerCase()];

      setSelectedQuizData(Array.isArray(quizArray) ? quizArray : []);
    }
  }, [userData]);

  useEffect(() => {
    if (selectedQuizData.length > 0) {
      handleCorrectAnswer();
    }
  }, [selectedQuizData]);

  return (
    <>
      <div className="container-fluid px-3 px-sm-4">
        {isLoading ? (
          <div className="text-center mt-5">
            <h4>Fetching Your Results.. Please wait</h4>
            <span class="spinner-border text-success" role="status"></span>
          </div>
        ) : (
          <div className="resultTable">
            <div className="resultBox">
              <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                <div className="userDetails_result d-flex flex-column flex-md-row justify-content-md-between align-items-center gap-2 w-75">
                  <h4 className="mb-0">
                    Username:&nbsp;
                    <span className="text-success">
                      {userData?.userName?.charAt(0).toUpperCase() +
                        userData?.userName?.slice(1)}
                    </span>
                  </h4>
                  <h4 className="mb-0">
                    Selected Quiz:&nbsp;
                    <span className="text-success">
                      {userData?.selectedQuiz}
                    </span>
                  </h4>
                </div>

                <div className="tableBox d-flex justify-content-center w-100">
                  <div className="table-responsive w-100 w-md-75">
                    <table className="table table-bordered border-dark text-center color-white mt-2 w-75 mx-auto">
                      <thead>
                        <tr className="fs-5">
                          <th>Total Questions</th>
                          <th>Answered</th>
                          <th>Correct</th>
                          <th>Wrong</th>
                          <th>Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="fs-5 fw-medium">
                          <td>20</td>
                          <td>{answerCount}</td>
                          <td>{correctAnswerCount}</td>
                          <td>{answerCount - correctAnswerCount}</td>
                          <td>{correctAnswerCount * 5}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="scoreCard d-flex flex-column align-items-center mt-2">
                  <div className="badge text-bg-success w-auto h-50 d-flex align-items-center justify-content-center p-4 fs-5">
                    You Scored&nbsp;&nbsp;
                    <span>
                      <h3>{correctAnswerCount * 5}</h3>
                    </span>
                    &nbsp;&nbsp;out of&nbsp;&nbsp;
                    <span>
                      <h3>100</h3>
                    </span>
                    &nbsp;&nbsp;points
                  </div>
                  <button
                    type="button"
                    className="btn btn-success mt-3"
                    onClick={handleStartAgain}
                  >
                    Start Again
                  </button>
                </div>
              </div>
            </div>
            <div className="allAnswers">
              <div className="mt-5 d-flex flex-column align-items-center justify-content-center">
                <div className="attempted d-flex flex-wrap align-items-center justify-content-center mb-4 gap-4">
                  <span className="d-flex align-items-center gap-2">
                    <GoDotFill color="green" size={24} />
                    <b>Correct</b>
                  </span>

                  <span className="d-flex align-items-center gap-2">
                    <GoDotFill color="red" size={24} />
                    <b>Incorrect</b>
                  </span>

                  <span className="d-flex align-items-center gap-2">
                    <GoDotFill color="yellow" size={24} />
                    <b>Unanswered</b>
                  </span>
                </div>

                <div className="w-100">
                  <AllQuiz
                    selectedQuizData={selectedQuizData}
                    quizData={quizData}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultPage;
