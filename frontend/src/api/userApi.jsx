import axios from "axios";
import { toast } from "react-toastify";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post("/users/registeruser", userData);
    const data = response.data;
    const token = data.token;
    if (token) {
      localStorage.setItem("token", token);
    }
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

// Get User Details
export const getUserDetails = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("/users/getuserdetails", {
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
