import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmBox = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

    navigate("/result");
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-success mt-4 mb-2"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Submit Quiz
      </button>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Confirm Quiz Submission
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-center">
              Do you want to end the quiz and submit your answers?
            </div>
            <div class="modal-footer d-flex align-items-center justify-content-center gap-5">
              <button
                type="button"
                class="btn btn-white border border-dark"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                class="btn btn-success"
                onClick={() => handleConfirm()}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmBox;
