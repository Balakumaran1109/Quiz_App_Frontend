import React from "react";
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import axios from "axios";

axios.defaults.baseURL = "https://quiz-app-backend-9r3f.onrender.com";

const App = () => {
  return (
    <UserProvider>
      <ToastContainer />

      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/quiz" element={<QuizPage />}>
            {" "}
          </Route>
          <Route path="/result" element={<ResultPage />}>
            {" "}
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
