import React, { useCallback, useEffect, useState } from "react";
import { GoDot } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import QuizBox from "../components/QuizBox";
import Countdown from "../components/Countdown";
import { useNavigate } from "react-router-dom";
import ConfirmBox from "../components/ConfirmBox";
import { getUserDetails } from "../api/userApi";

const QuizPage = () => {
  const generateNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 20; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const [isTimeOut, setTimeOut] = useState(false);
  const [userData, setUserData] = useState("");
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [quizData, setQuizData] = useState(null);

  const navigate = useNavigate();

  const handleTimeOut = (data) => {
    setTimeOut(data);
  };

  const handleViewResults = () => {
    navigate("/result");
  };

  const handleGetData = useCallback(async () => {
    try {
      const userData = await getUserDetails();
      setUserData((prevData) => {
        if (JSON.stringify(prevData) === JSON.stringify(userData)) {
          return prevData;
        }
        return userData;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getQuizData = (data) => {
    setQuizData(data?.submittedQuiz);
    console.log(data?.submittedQuiz);
  };

  // Fetch User data
  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  useEffect(() => {
    getQuizData();
  }, []);

  return (
    <>
      {" "}
      {isTimeOut ? (
        <div className="container-fluid vh-100">
          <div className="timeout d-flex flex-column align-items-center h-100 gap-5">
            <h1>Time’s up! Great effort, let’s see how you did!</h1>
            <button
              type="button"
              class="btn btn-success"
              onClick={() => handleViewResults()}
            >
              View Results
            </button>
          </div>
        </div>
      ) : (
        <div class="container-fluid">
          <div class="row ">
            <div className="col-12 col-md-4">
              <div className="details">
                <div className="d-flex flex-column align-items-center justify-content-center mt-3 border pt-4 pb-4">
                  <div className="timer">
                    <div className=" w-200 border border-dark d-flex flex-column align-items-center justify-content-center">
                      <div className="border border-success rounded-circle p-3 m-2">
                        <Countdown handleTimeOut={handleTimeOut} />
                      </div>
                      <p>Time Remaining</p>
                    </div>
                  </div>
                  <div className="tracking">
                    <div className="border border-dark w-100 mt-3 ">
                      <div className="attempted d-flex align-items-center justify-content-start mb-4 gap-4">
                        <span>
                          <GoDotFill color="green" size={40} />
                          <b>Answered</b>
                        </span>
                        <span>
                          <GoDot size={40} />
                          <b>Unanswered</b>
                        </span>
                      </div>
                      <ol className="d-flex flex-wrap gap-3">
                        {generateNumbers().map((number, index) => (
                          <li
                            className={`border border-success rounded-circle p-1 text-center ${
                              quizData?.[number] ? "bg-success text-white" : ""
                            }`}
                            key={index}
                            onClick={() => setSelectedNumber(number)}
                            id="number_box"
                          >
                            {number}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <ConfirmBox />
                </div>
              </div>
            </div>
            <div class="col-12 col-md-8 mt-4">
              <div className="quizPage">
                <h1 className="text-center">{userData?.selectedQuiz}</h1>
                <QuizBox
                  topic={userData?.selectedQuiz}
                  number={selectedNumber}
                  sendDataToParent={getQuizData}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizPage;
