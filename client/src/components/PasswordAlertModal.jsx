import React, { useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../context/auth/AuthContext";
import { updateUser } from "../context/auth/AuthActions";
import { useParams } from "react-router-dom";

const PasswordAlertModal = ({ userData }) => {
  const { dispatch } = useContext(AuthContext);
  const params = useParams();
  const { password, password1 } = userData;
  const onClick = async (e) => {
    if (password !== password1) {
      e.preventDefault();
      toast.error("Lozinke se ne podudaraju", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } else {
      e.preventDefault();
      dispatch({ type: "UPDATE_USER_PENDING" });
      try {
        const updatedUser = await updateUser(params.id, { password });
        dispatch({ type: "UPDATE_USER_FULFILLED", payload: updatedUser });
      } catch (error) {
        dispatch({
          type: "UPDATE_USER_REJECTED",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
  return (
    <div
      className="modal fade"
      id="exampleModalToggle2"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel"></h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Da li ste sigurni da želite da izmijenite lozinku?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-target="#exampleModal2"
              data-bs-toggle="modal"
            >
              Vrati se nazad
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={onClick}
            >
              Izmijeni
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordAlertModal;
