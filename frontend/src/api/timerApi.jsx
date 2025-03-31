import axios from "axios";
import { toast } from "react-toastify";

// Save Timer
export const startTimer = async (userData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "/timer/starttimer",
      { userData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
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

// Get Timer
export const getTimer = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`/timer/gettimer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    // console.log(data);

    return data.remainingTime;
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

// Update Timer
export const updateTimer = async (remainingTime) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `/timer/updatetimer`,
      { remainingTime },
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
