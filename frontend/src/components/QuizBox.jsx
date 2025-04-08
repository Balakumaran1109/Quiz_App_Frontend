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

  // Fetch Quiz Data from DB on Mount
  useEffect(() => {
    if (!selectedQuiz) return;

    const fetchQuizData = async () => {
      try {
        const quizDataFromDB = await getQuiz();
        if (quizDataFromDB?.userQuiz) {
          const savedQuizData = {
            submittedAnswers: quizDataFromDB.userQuiz.submittedAnswers || {},
            isSubmitted: quizDataFromDB.userQuiz.isSubmitted || {},
          };

          setQuizData(savedQuizData);

          const currentQuestionId = selectedQuiz[index]?.id;
          setSelectedAnswer(
            savedQuizData.submittedAnswers[currentQuestionId] || null
          );

          // console.log("Fetched Quiz Data:", savedQuizData);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [selectedQuiz, index]);

  // Handle Answer Selection
  const handleAnswerSelect = (option) => {
    const questionId = selectedQuiz[index]?.id;

    setQuizData((prevData) => {
      const currentAnswer = prevData.submittedAnswers[questionId];

      // Toggle selection: If the same option is clicked, deselect it
      const newSelectedAnswer = currentAnswer === option ? undefined : option;

      const updatedAnswers = {
        ...prevData.submittedAnswers,
        [questionId]: newSelectedAnswer,
      };

      const updatedSubmission = {
        ...prevData.isSubmitted,
        [questionId]: newSelectedAnswer !== undefined,
      };

      const updatedQuizData = {
        submittedAnswers: updatedAnswers,
        isSubmitted: updatedSubmission,
      };

      sendDataToDb(updatedQuizData);
      return updatedQuizData;
    });

    setSelectedAnswer((prev) => (prev === option ? null : option));
  };

  // Save current data in DB
  const sendDataToDb = async (quizData) => {
    try {
      sendDataToParent(quizData);
      await saveQuiz(quizData);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  // Handle Quiz Navigation
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

      const currentQuestionId = selectedQuiz[newIndex]?.id;
      setSelectedAnswer(quizData.submittedAnswers[currentQuestionId] || null);

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
        <div className="quizBox border mb-5">
          <div>
            <h3>
              {index + 1}. {selectedQuiz[index]?.question}
            </h3>
          </div>

          <div className="answers mb-5">
            <div className="d-grid gap-3 mt-5">
              {selectedQuiz[index]?.options?.map((option, i) => (
                <button
                  className={`btn btn-outline-dark text-start quiz-option ${
                    selectedAnswer === option ? "btn-success text-white" : ""
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

          <div className="buttons d-flex align-items-center justify-content-between">
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
