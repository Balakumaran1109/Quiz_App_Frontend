import axios from "axios";
import { toast } from "react-toastify";

// Start Quiz
export const startQuiz = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "/quiz/startquiz",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    // console.log(data);
  } catch (error) {
    {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  }
};

// Save Quiz
export const saveQuiz = async (quizData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "/quiz/savequiz",
      { quizData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    // console.log(data);
  } catch (error) {
    {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  }
};

// Get Quiz Details
export const getQuiz = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("/quiz/getquiz", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  }
};
