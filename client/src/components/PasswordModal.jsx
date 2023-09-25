import React, { useEffect, useState } from "react";
import PasswordAlertModal from "./PasswordAlertModal";
import { toast } from "react-toastify";

const PasswordModal = () => {
  const [userData, setUserData] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [message, setMessage] = useState("");

  const { password, password1 } = userData;

  const onChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (password === "" || password1 === "") {
      setPasswordMatch(false);
      setMessage("Lozinka ne moze da bude prazna");
    }
    if (password !== password1) {
      setPasswordMatch(false);
      setMessage("Lozinke se ne poklapaju");
    }
    if (password === password1 && password !== "" && password1 !== "") {
      setPasswordMatch(true);
    }
  }, [password, password1]);
  const onSubmit = () => {
    if (!passwordMatch) {
      toast.error(message, {
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
      setMessage("");
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Izmijeni lozinku
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="col-md-12">
                <label className="labels mb-2">Unesi lozinku</label>
                <input
                  onChange={onChange}
                  name="password"
                  type="password"
                  className="form-control bg-primary text-white"
                  placeholder="Unesite lozinku"
                  value={password}
                  required
                />
              </div>
              <div className="col-md-12 mt-4">
                <label className="labels mb-2">Unesi lozinku ponovo</label>
                <input
                  onChange={onChange}
                  name="password1"
                  type="password"
                  className="form-control bg-primary text-white"
                  placeholder="Unesite lozinku ponovo"
                  value={password1}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Izadji
              </button>
              <button
                onClick={onSubmit}
                type="button"
                className="btn btn-primary "
                data-bs-target={passwordMatch ? "#exampleModalToggle2" : null}
                data-bs-toggle={passwordMatch ? "modal" : null}
              >
                Izmijeni
              </button>
            </div>
          </div>
        </div>
      </div>

      <PasswordAlertModal userData={userData} />
    </>
  );
};

export default PasswordModal;
