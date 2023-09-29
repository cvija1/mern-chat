import React from "react";

const Message = ({ message, own }) => {
  console.log(message);
  return (
    <ul class="list-unstyled overflow-auto" style={{ maxHeight: "480px" }}>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Message;
