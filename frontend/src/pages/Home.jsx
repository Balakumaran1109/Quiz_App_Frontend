import React, { useContext, useEffect, useState } from "react";
import { MdDoubleArrow } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { registerUser } from "../api/userApi";
import { startQuiz } from "../api/quizApi";
import { startTimer } from "../api/timerApi";

const Home = () => {
  const [selectedQuiz, setSelectedQuiz] = useState("Javascript");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { passUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const handleRadioButtonInput = (event) => {
    setSelectedQuiz(event.target.value);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleUserData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = { userName, selectedQuiz };
    await registerUser(userData);
    navigate("/quiz");
    setIsLoading(false);
    await startQuiz();
    await startTimer(9);
  };

  return (
    <>
      <div className="container border border-success rounded mt-4">
        <div className="d-flex align-items-center justify-content-center">
          <h1 className="badge text-bg-success w-75 h-50 d-flex align-items-center justify-content-center">
            Welcome to the Quiz App
          </h1>
        </div>
        <div className="chooseBox container border w-75 d-flex align-items-center justify-content-center flex-column p-3">
          <h4>Choose One Quiz</h4>
          <div className="pt-3">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="Javascript"
                onChange={handleRadioButtonInput}
                checked={selectedQuiz === "Javascript"}
              />
              <label class="form-check-label" for="inlineRadio1">
                Javascript
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="React"
                onChange={handleRadioButtonInput}
                checked={selectedQuiz === "React"}
              />
              <label class="form-check-label" for="inlineRadio2">
                React JS
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="Mongo DB"
                onChange={handleRadioButtonInput}
                checked={selectedQuiz === "Mongo DB"}
              />
              <label class="form-check-label" for="inlineRadio3">
                Mongo DB
              </label>
            </div>
          </div>
        </div>

        <div className="infoBox d-flex align-items-center justify-content-center flex-column mt-5 mb-4">
          <ul>
            <li>
              <MdDoubleArrow color="green" /> &nbsp;20 questions will be asked
              and each question has 5 points.
            </li>
            <br />
            <li>
              <MdDoubleArrow color="green" /> &nbsp; Result and answers will be
              displayed after submitting the quiz.{" "}
            </li>
          </ul>
        </div>

        <div className="inputBox d-flex align-items-center justify-content-center flex-column mb-4 border border-success w-50 m-auto p-2 text-center">
          <b>Please enter the username to start quiz</b>
          <br />
          <form
            onSubmit={handleUserData}
            className="d-flex align-items-center justify-content-center flex-column"
          >
            <div class="input-group flex-nowrap w-100">
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                onChange={handleUserName}
                value={userName}
                required
              />
            </div>

            <br />

            {isLoading ? (
              <>
                <button class="btn btn-success" type="button" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  &nbsp; Loading...
                </button>
              </>
            ) : (
              <button type="submit" class="btn btn-success mb-3">
                Start Quiz
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
