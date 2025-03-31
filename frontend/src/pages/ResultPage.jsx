import React, { useEffect, useState } from "react";
import { GoDot, GoDotFill } from "react-icons/go";
import QuizBox from "../components/QuizBox";
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

  const navigate = useNavigate()

  const handleStartAgain = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const getQuizData = async () => {
    const quizData = await getQuiz();
    const userData = await getUserDetails();
    setQuizData(quizData?.userQuiz || {});
    setUserData(userData);
  };

  const handleAnsweredCount = () => {
    const isSubmitted = quizData?.isSubmitted;

    if (!isSubmitted) {
      console.log("No submitted data available.");
      return;
    }

    const trueCount = Object.values(isSubmitted).filter(
      (value) => value === true
    ).length;

    setAnswerCount(trueCount);
  };

  const handleCorrectAnswer = () => {
    if (!quizData?.submittedAnswers) {
      console.log("No submitted answers available.");
      return;
    }

    if (!Array.isArray(selectedQuizData)) {
      console.log("selectedQuizData is not an array!");
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

  // Fetch data from DB
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

  useEffect(() => {
    document.body.style.overflow = "auto";
  
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="resultTable">
          <div className=" d-flex flex-column align-items-center justify-content-center mt-5">
            <div className=" d-flex align-items-center justify-content-between w-75 mx-5">
              <h4>Username : {userData?.userName}</h4>
              <h4>Selected Quiz : {userData?.selectedQuiz}</h4>
            </div>
            <table class="table table-bordered border-dark text-center color-white mt-2 w-75">
              <thead>
                <tr>
                  <th scope="col">Total Questions</th>
                  <th scope="col">Answered Questions</th>
                  <th scope="col">Correct Answer</th>
                  <th scope="col">Wrong Answer</th>
                  <th scope="col">Points Scored</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>20</td>
                  <td>{answerCount}</td>
                  <td>{correctAnswerCount}</td>
                  <td>{Number(answerCount - correctAnswerCount)}</td>
                  <td>{correctAnswerCount * 5}</td>
                </tr>
              </tbody>
            </table>
            <h1 className="badge text-bg-success w-auto h-50 d-flex align-items-center justify-content-center p-4">
              You Scored &nbsp;
              <span>
                <h1>{correctAnswerCount * 5}</h1>
              </span>
              &nbsp; out of &nbsp;
              <span>
                <h1>100</h1>
              </span>
              &nbsp; points
            </h1>
            <button
                type="button"
                class="btn btn-success mt-3"
                onClick={() => handleStartAgain()}
              >
                Start Again
              </button>
          </div>
        </div>
        <div className="allAnswers">
          <div className="mt-5 d-flex flex-column align-items-center justify-content-center">
            <div className="attempted d-flex align-items-center justify-content-start mb-4 gap-3">
              <span>
                <GoDotFill color="green" size={40} />
                <b>Correct</b>
              </span>

              <span>
                <GoDotFill color="red" size={40} />
                <b>Incorrect</b>
              </span>

              <span>
                <GoDotFill color="yellow" size={40} />
                <b>Unanswered</b>
              </span>
            </div>
            <div className="w-75">
              {" "}
              {
                <AllQuiz
                  selectedQuizData={selectedQuizData}
                  quizData={quizData}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
