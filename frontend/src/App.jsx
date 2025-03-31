import React from "react";
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

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
