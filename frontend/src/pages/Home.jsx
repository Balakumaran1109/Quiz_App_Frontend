import React, { useState } from "react";
import { MdDoubleArrow } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi";
import { startQuiz } from "../api/quizApi";
import { startTimer } from "../api/timerApi";

const Home = () => {
  const [selectedQuiz, setSelectedQuiz] = useState("Javascript");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRadioButtonInput = (event) => {
    setSelectedQuiz(event.target.value);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  // Register User and start Quiz
  const handleUserData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = { userName, selectedQuiz };
    await registerUser(userData);
    navigate("/quiz");
    setIsLoading(false);
    await startQuiz();
    await startTimer(900);
  };

  return (
    <>
      <div id="home" className="container border border-success rounded mt-4">
        <div className="d-flex align-items-center justify-content-center w-100">
          <h1 className="badge text-bg-success h-50 d-flex align-items-center justify-content-center w-100">
            Welcome to the Quiz App
          </h1>
        </div>
        <div className="chooseBox container border w-75 d-flex align-items-center justify-content-center flex-column p-3">
          <h4>Choose One Quiz</h4>
          <div className="pt-3 w-75 d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2">
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

        <div className="inputBox d-flex align-items-center justify-content-center flex-column mb-2 border border-success m-auto p-2 text-center mb-4">
          <b>Please enter your username to start the Quiz</b>
          <br />
          <form
            onSubmit={handleUserData}
            className="d-flex align-items-center justify-content-center flex-column"
          >
            <div class="input-group flex-nowrap">
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
                <div className="w-75 m-auto text-center my-1">
                  <b>Please hold on a moment, your quiz is getting ready</b>
                </div>
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
