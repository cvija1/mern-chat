import React from "react";

const Conversation = () => {
  return (
    <li class="p-2 border-bottom">
      <a href="#!" class="d-flex justify-content-between text-decoration-none">
        <div class="d-flex flex-row">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
            alt="avatar"
            class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
            width="60"
          />
          <div class="pt-1">
            <p class="fw-bold mb-0">Danny Smith</p>
            <p class="small text-muted">Lorem ipsum dolor sit.</p>
          </div>
        </div>
        <div class="pt-1">
          <p class="small text-muted mb-1">5 mins ago</p>
        </div>
      </a>
    </li>
  );
};

export default Conversation;
