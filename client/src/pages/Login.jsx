import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import AuthContext from "../context/auth/AuthContext";
import { login } from "../context/auth/AuthActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { dispatch, user, isLoading, isSuccess, isError, message } =
    useContext(AuthContext);
  const initialState = { userDetail: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const { userDetail, password } = formData;
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_PENDING" });
    try {
      const loginData = await login(formData);
      dispatch({ type: "LOGIN_FULFILLED", payload: loginData });
      setFormData(initialState);
    } catch (error) {
      dispatch({
        type: "LOGIN_REJECTED",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  useEffect(() => {
    if (user) {
      navigate(`/`);
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
        <div className="my-5 text-center">Prijavite se</div>
        <div className="d-flex row align-items-center">
          <div className="col-12 mb-2 mb-md-0 text-center col-md-3 text-md-start">
            <label className="">Email/Korisničko ime</label>
          </div>
          <div className="col">
            <input
              value={userDetail}
              required
              onChange={handleChange}
              name="userDetail"
              type="text"
              className="d-block w-100 rounded p-2 mb-2 border"
              placeholder="Unesite korisničko ime ili email"
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

        <button className=" d-block mx-auto btn btn-light rounded p-2 mt-3">
          Prijavi se
        </button>
      </form>
    </div>
  );
};

export default Login;
