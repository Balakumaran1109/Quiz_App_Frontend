import React, { useEffect, useState } from "react";
import { data } from "../data.json";
import { getQuiz, saveQuiz } from "../api/quizApi";

const QuizBox = ({ topic, number, sendDataToParent }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizData, setQuizData] = useState({
    submittedAnswers: {},
    isSubmitted: {},
  });

  const arrayLength = selectedQuiz?.length || 0;

  //Get Quiz Data from DB
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizDataFromDB = await getQuiz();
        if (quizDataFromDB?.userQuiz) {
          setQuizData({
            submittedAnswers: quizDataFromDB.userQuiz.submittedAnswers || {},
            isSubmitted: quizDataFromDB.userQuiz.isSubmitted || {},
          });

          console.log("Fetched Quiz Data:", quizDataFromDB);
          sendDataToParent({
            submittedQuiz: quizDataFromDB.userQuiz.isSubmitted,
          });
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);

  // Get Quiz data and update
  const handleAnswerSelect = (option) => {
    const questionId = selectedQuiz[index]?.id;

    setSelectedAnswer((prev) => (prev === option ? "" : option));

    setQuizData((prevData) => {
      const updatedAnswers = {
        ...prevData.submittedAnswers,
        [questionId]:
          prevData.submittedAnswers[questionId] === option ? undefined : option,
      };

      const updatedSubmission = {
        ...prevData.isSubmitted,
        [questionId]: prevData.isSubmitted[questionId] ? undefined : true,
      };

      const updatedQuizData = {
        submittedAnswers: updatedAnswers,
        isSubmitted: updatedSubmission,
      };

      sendDataToParent({ submittedQuiz: updatedSubmission });
      sendDataToDb(updatedQuizData);

      return updatedQuizData;
    });
  };

  const sendDataToDb = async (quizData) => {
    console.log("Sending updated quizData to DB:", quizData);
    try {
      await saveQuiz(quizData);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  //  Handle Quiz Navigation
  const handleIndexChange = (toggle) => {
    setIndex((prevIndex) => {
      const newIndex =
        toggle === "next"
          ? prevIndex < arrayLength - 1
            ? prevIndex + 1
            : 0
          : prevIndex > 0
          ? prevIndex - 1
          : arrayLength - 1;

      setSelectedAnswer(
        quizData.submittedAnswers[selectedQuiz[newIndex]?.id] || null
      );
      return newIndex;
    });
  };

  useEffect(() => {
    if (topic) {
      setSelectedQuiz(data[topic.toLowerCase()] || []);
    }
  }, [topic]);

  useEffect(() => {
    if (number) {
      setIndex(number - 1);
    }
  }, [number]);

  return (
    <>
      {selectedQuiz && selectedQuiz.length > 0 ? (
        <div className="quizBox border p-5 mb-5">
          <h3>
            {index + 1}. {selectedQuiz[index]?.question}
          </h3>

          <div className="answers mb-5">
            <div className="d-grid gap-3 mt-5">
              {selectedQuiz[index]?.options?.map((option, i) => (
                <button
                  className={`btn btn-outline-dark text-start quiz-option ${
                    quizData.submittedAnswers[selectedQuiz[index]?.id] ===
                    option
                      ? "btn-success text-white"
                      : ""
                  }`}
                  type="button"
                  key={i}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="buttons d-flex align-items-center justify-content-around">
            <button
              type="button"
              className="btn btn-success mt-2 mb-2"
              onClick={() => handleIndexChange("prev")}
            >
              Prev Question
            </button>

            <button
              type="button"
              className="btn btn-success mt-2 mb-2"
              onClick={() => handleIndexChange("next")}
            >
              Next Question
            </button>
          </div>
        </div>
      ) : (
        <p>No quiz selected</p>
      )}
    </>
  );
};

export default QuizBox;
