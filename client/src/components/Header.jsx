import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import { logout } from "../context/auth/AuthActions";

const Header = () => {
  const { dispatch, user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT_PENDING" });
    logout();
    dispatch({ type: "LOGOUT_FULFILLED" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      return;
    }

    navigate("/users", { replace: true, state: { search: search } });
    setSearch("");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to={user ? "/" : "login"}>
            Pričaonica
          </Link>{" "}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="align-items-lg-center navbar-nav mb-2 mb-lg-0 ms-auto">
              {user ? (
                <>
                  <li className="nav-item me-4 my-2 my-lg-0">
                    <form onSubmit={onSubmit}>
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control border-0 me-1"
                        type="search"
                        placeholder="Pronadji korisnika.."
                        aria-label="Search"
                      />
                    </form>
                  </li>
                  <li className="nav-item mx-2 my-2 my-lg-0">
                    <a
                      href="#"
                      data-bs-toggle="dropdown"
                      className="nav-link dropdown-toggle p-0"
                      id="iconToggle"
                    >
                      <img
                        className="rounded-circle  outer-navbar"
                        src={
                          user.avatarUrl
                            ? `http://localhost:5000/${user.avatarUrl}`
                            : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        }
                      />
                      <span className="ms-2">{user.username}</span>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end dropdown-menu-dark"
                      aria-labelledby="navbarDropdownMenuLink2"
                    >
                      <li>
                        <Link
                          className="dropdown-item ms-lg-auto"
                          to={`/profile/${user._id}`}
                        >
                          Profil
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          onClick={handleLogout}
                          to={"/"}
                        >
                          Odjavi se
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/register"
                    >
                      Registruj se
                    </Link>
                  </li>

                  <li className="nav-item me-4">
                    <Link className="nav-link" aria-current="page" to="/login">
                      Prijavi se
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
