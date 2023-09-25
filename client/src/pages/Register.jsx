import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import AuthContext from "../context/auth/AuthContext";
import { register } from "../context/auth/AuthActions";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { dispatch, user, isLoading, isSuccess, isError, message } =
    useContext(AuthContext);
  const initialState = { username: "", password: "", password2: "", email: "" };
  const [formData, setFormData] = useState(initialState);
  const { email, username, password, password2 } = formData;
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Lozinke se ne poklapaju", {
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
      const userData = {
        email,
        username,
        password,
      };
      dispatch({ type: "REGISTER_PENDING" });
      try {
        const registerData = await register(userData);
        dispatch({ type: "REGISTER_FULFILLED", payload: registerData });
        setFormData(initialState);
      } catch (error) {
        dispatch({
          type: "REGISTER_REJECTED",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (isError) {
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
    }
    if (isSuccess) {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }

    dispatch({ type: "RESET_USER" });
  }, [isError, isSuccess, user, message, dispatch]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className=" flex-grow-1 d-flex align-items-center">
      <form
        onSubmit={handleSubmit}
        className="w-75 w-md-50 mx-auto pt-0 mb-12 border p-5 rounded"
      >
        <div className="my-4 text-center">
          Ukoliko želite postati član pričaonice, molimo Vas da se registrujete.
        </div>
        <div className="d-flex row align-items-center">
          <div className="col-12 text-center mb-2 mb-md-0 col-md-3 text-md-start">
            <label className="">Email</label>
          </div>
          <div className="col">
            <input
              value={email}
              required
              onChange={handleChange}
              name="email"
              type="email"
              className="d-block w-100 rounded p-2 mb-2 border"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="d-flex row align-items-center">
          <div className="col-12 text-center mb-2 mb-md-0 col-md-3 text-md-start">
            <label className="">Korisničko ime</label>
          </div>
          <div className="col">
            <input
              value={username}
              required
              onChange={handleChange}
              name="username"
              type="text"
              className="d-block w-100 rounded p-2 mb-2 border"
              placeholder="Korisnicko ime"
            />
          </div>
        </div>
        <div className="d-flex row align-items-center">
          <div className="col-12 text-center mb-2 mb-md-0 col-md-3 text-md-start">
            <label className="">Lozinka</label>
          </div>
          <div className="col">
            <input
              value={password}
              required
              onChange={handleChange}
              name="password"
              type="password"
              className="d-block w-100 rounded p-2 mb-2 border"
              placeholder="Lozinka"
            />
          </div>
        </div>

        <div className="d-flex row align-items-center">
          <div className="col-12 text-center mb-2 mb-md-0 col-md-3 text-md-start">
            <label className="">Ponovi lozinku</label>
          </div>
          <div className="col">
            <input
              value={password2}
              required
              onChange={handleChange}
              name="password2"
              type="password"
              className="d-block w-100 rounded p-2 mb-2 border"
              placeholder="Ponovo unesi lozinku"
            />
          </div>
        </div>
        <button className=" d-block mx-auto btn btn-light rounded p-2 mt-3">
          Registruj se
        </button>
      </form>
    </div>
  );
};

export default Register;
