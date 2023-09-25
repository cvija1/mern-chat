import React, { useContext, useEffect } from "react";
import Spinner from "../components/Spinner";
import AuthContext from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate(`/login`);
    }
  }, [user]);
  return (
    <>
      <section className="bg-dark flex-grow-1">
        <div class=" container py-2">
          <div class="row ">
            <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 d-flex flex-column ">
              <h5 class="font-weight-bold mt-2 mb-3 text-center text-lg-start">
                Prijatelji
              </h5>

              <div
                class="card flex-grow-1 overflow-auto"
                style={{ maxHeight: "565px" }}
              >
                <div class="card-body bg-primary  ">
                  <ul class="list-unstyled mb-0 ">
                    <li class="p-2 border-bottom">
                      <a
                        href="#!"
                        class="d-flex justify-content-between text-decoration-none"
                      >
                        <div class="d-flex flex-row">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
                            alt="avatar"
                            class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width="60"
                          />
                          <div class="pt-1">
                            <p class="fw-bold mb-0">Danny Smith</p>
                            <p class="small text-muted">
                              Lorem ipsum dolor sit.
                            </p>
                          </div>
                        </div>
                        <div class="pt-1">
                          <p class="small text-muted mb-1">5 mins ago</p>
                        </div>
                      </a>
                    </li>

                    <li class="p-2 border-bottom">
                      <a href="#!" class="d-flex justify-content-between">
                        <div class="d-flex flex-row">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
                            alt="avatar"
                            class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width="60"
                          />
                          <div class="pt-1">
                            <p class="fw-bold mb-0">Alex Steward</p>
                            <p class="small text-muted">
                              Lorem ipsum dolor sit.
                            </p>
                          </div>
                        </div>
                        <div class="pt-1">
                          <p class="small text-muted mb-1">Yesterday</p>
                        </div>
                      </a>
                    </li>
                    <li class="p-2 border-bottom">
                      <a href="#!" class="d-flex justify-content-between">
                        <div class="d-flex flex-row">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
                            alt="avatar"
                            class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width="60"
                          />
                          <div class="pt-1">
                            <p class="fw-bold mb-0">Alex Steward</p>
                            <p class="small text-muted">
                              Lorem ipsum dolor sit.
                            </p>
                          </div>
                        </div>
                        <div class="pt-1">
                          <p class="small text-muted mb-1">Yesterday</p>
                        </div>
                      </a>
                    </li>
                    <li class="p-2 border-bottom">
                      <a href="#!" class="d-flex justify-content-between">
                        <div class="d-flex flex-row">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp"
                            alt="avatar"
                            class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width="60"
                          />
                          <div class="pt-1">
                            <p class="fw-bold mb-0">Ashley Olsen</p>
                            <p class="small text-muted">
                              Lorem ipsum dolor sit.
                            </p>
                          </div>
                        </div>
                        <div class="pt-1">
                          <p class="small text-muted mb-1">Yesterday</p>
                        </div>
                      </a>
                    </li>
                    <li class="p-2 border-bottom">
                      <a href="#!" class="d-flex justify-content-between">
                        <div class="d-flex flex-row">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
                            alt="avatar"
                            class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width="60"
                          />
                          <div class="pt-1">
                            <p class="fw-bold mb-0">Kate Moss</p>
                            <p class="small text-muted">
                              Lorem ipsum dolor sit.
                            </p>
                          </div>
                        </div>
                        <div class="pt-1">
                          <p class="small text-muted mb-1">Yesterday</p>
                        </div>
                      </a>
                    </li>
                    <li class="p-2 border-bottom">
                      <a href="#!" class="d-flex justify-content-between">
                        <div class="d-flex flex-row">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
                            alt="avatar"
                            class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width="60"
                          />
                          <div class="pt-1">
                            <p class="fw-bold mb-0">Kate Moss</p>
                            <p class="small text-muted">
                              Lorem ipsum dolor sit.
                            </p>
                          </div>
                        </div>
                        <div class="pt-1">
                          <p class="small text-muted mb-1">Yesterday</p>
                        </div>
                      </a>
                    </li>
                    <li class="p-2 border-bottom">
                      <a href="#!" class="d-flex justify-content-between">
                        <div class="d-flex flex-row">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
                            alt="avatar"
                            class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width="60"
                          />
                          <div class="pt-1">
                            <p class="fw-bold mb-0">Kate Moss</p>
                            <p class="small text-muted">
                              Lorem ipsum dolor sit.
                            </p>
                          </div>
                        </div>
                        <div class="pt-1">
                          <p class="small text-muted mb-1">Yesterday</p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-7 col-xl-8 mt-5 ">
              <ul
                class="list-unstyled overflow-auto"
                style={{ maxHeight: "480px" }}
              >
                <li class="d-flex justify-content-between mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width="60"
                  />
                  <div class="card">
                    <div class="card-header d-flex justify-content-between p-3">
                      <p class="fw-bold mb-0">Brad Pitt</p>
                      <p class="text-muted small mb-0">
                        <i class="far fa-clock"></i> 12 mins ago
                      </p>
                    </div>
                    <div class="card-body">
                      <p class="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                </li>
                <li class="d-flex justify-content-between mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width="60"
                  />
                  <div class="card">
                    <div class="card-header d-flex justify-content-between p-3">
                      <p class="fw-bold mb-0">Brad Pitt</p>
                      <p class="text-muted small mb-0">
                        <i class="far fa-clock"></i> 12 mins ago
                      </p>
                    </div>
                    <div class="card-body">
                      <p class="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                </li>
                <li class="d-flex justify-content-between mb-4">
                  <div class="card w-100">
                    <div class="card-header d-flex justify-content-between p-3">
                      <p class="fw-bold mb-0">Lara Croft</p>
                      <p class="text-muted small mb-0">
                        <i class="far fa-clock"></i> 13 mins ago
                      </p>
                    </div>
                    <div class="card-body">
                      <p class="mb-0">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium.
                      </p>
                    </div>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                    alt="avatar"
                    class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                    width="60"
                  />
                </li>
                <li class="d-flex justify-content-between mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width="60"
                  />
                  <div class="card">
                    <div class="card-header d-flex justify-content-between p-3">
                      <p class="fw-bold mb-0">Brad Pitt</p>
                      <p class="text-muted small mb-0">
                        <i class="far fa-clock"></i> 10 mins ago
                      </p>
                    </div>
                    <div class="card-body">
                      <p class="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="bg-white input-group mt-auto rounded-3">
                <input
                  type="text"
                  id="myInput"
                  class="form-control py-3 shadow-none "
                  placeholder="Unesite poruku.."
                  aria-label="Unesite poruku"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Pošalji
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
