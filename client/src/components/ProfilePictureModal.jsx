import React, { useState, useRef, useContext, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";
import { dataURLtoFile } from "../utils/dataURLtoFile";
import AuthContext from "../context/auth/AuthContext";
import { updateUserAvatar } from "../context/auth/AuthActions";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ProfilePictureModal = () => {
  const { dispatch, user, isLoading, isError, message, isSuccess } =
    useContext(AuthContext);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const inputRef = useRef();
  const params = useParams();

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onUploadAvatar = async (e) => {
    e.preventDefault();
    const croppedImage = await getCroppedImg(image, croppedArea);
    const file = dataURLtoFile(croppedImage, "avatar");

    dispatch({ type: "UPDATE_USER_AVATAR_PENDING" });
    try {
      const updatedUser = await updateUserAvatar(params.id, file);
      dispatch({ type: "UPDATE_USER_AVATAR_FULFILLED", payload: updatedUser });
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_AVATAR_REJECTED",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  useEffect(() => {
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

    dispatch({ type: "RESET_USER" });
  }, [isError, isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div
          className="modal-content "
          style={image ? { height: "500px" } : { height: "250px" }}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Ucitaj sliku
            </h5>
            <button
              onClick={(e) => {
                setImage(null);
                setZoom(1);
              }}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {image ? (
              <>
                <div style={{ position: "relative", height: "80%" }}>
                  <Cropper
                    classes={{ containerClassName: "cropper" }}
                    image={image}
                    cropShape="round"
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
                <div className="slider">
                  <input
                    type="range"
                    className="form-range"
                    min="1"
                    max="3"
                    value={zoom}
                    step="0.1"
                    onChange={(e) => setZoom(e.target.value)}
                  ></input>
                </div>
              </>
            ) : (
              <input
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                ref={inputRef}
                onChange={onSelectFile}
              />
            )}
          </div>
          <div className="modal-footer">
            {!image ? (
              <button
                onClick={(e) => {
                  setImage(null);
                  setZoom(1);
                }}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Izadji
              </button>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    setImage(null);
                    setZoom(1);
                  }}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Izadji
                </button>
                <button
                  onClick={onUploadAvatar}
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Sacuvaj profilnu sliku
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureModal;
