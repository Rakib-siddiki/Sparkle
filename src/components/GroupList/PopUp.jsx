// Import necessary dependencies from React, Firebase, and other libraries
import { createRef, useState } from "react";
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import defaultImg from "../../assets/user.png";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";
import {
  getDownloadURL,
  getStorage,
  ref as imageRef,
  uploadString,
} from "firebase/storage";
import PropTypes from "prop-types";
import LoadingSpinner from "../loading/LoadingSpinner";
// Define the functional component PopUp
const PopUp = ({ handleShow }) => {
  // Access user information from the Redux store
  const data = useSelector((state) => state.userInfo.userValue);

  // Initialize Firebase storage and database
  const storage = getStorage();
  const db = getDatabase();

  // State variables to manage group information and errors
  const [groupName, setGroupName] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const [nameError, setNameError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();

  // Handle input changes for group name
  const handleNameChange = (e) => {
    setGroupName(e.target.value);
    setNameError("");
  };

  // Handle input changes for group title
  const handleTitleChange = (e) => {
    setGroupTitle(e.target.value);
    setTitleError("");
  };

  // Validate input data and initiate the cropping process
  const sendGroupData = () => {
    if (!groupName) {
      setNameError("Enter your Group Name");
    }
    if (!groupTitle) {
      setTitleError("Enter your Group Title");
    }
    getCropData(); // Function to extract crop data from the image
  };

  // Handle Enter key press for quick submission
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendGroupData();
    }
  };

  // Handle image upload and set it for cropping
  const handleUpload = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setCropData(""); // Clear previous cropping data when a new image is selected
  };

  // Extract crop data from the selected image and upload it to Firebase storage
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      // Get cropped canvas data and convert it to a data URL
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      // Set up storage reference for the cropped image
      const storageRef = imageRef(
        storage,
        `groupProfile/${push(ref(db, "grouplist/")).key}`,
      );

      // Upload the cropped image data to Firebase storage
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      // eslint-disable-next-line no-unused-vars

      setLoading(true); // Set loading to true before starting the operation

      // eslint-disable-next-line no-unused-vars
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        // Upload completed successfully, get the download URL
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);

          // If group name and title are not empty, set group data in the database
          if (groupName.trim() && groupTitle.trim()) {
            set(push(ref(db, "grouplist/")), {
              groupName: groupName,
              groupTitle: groupTitle,
              adminId: data.uid,
              admin: data.displayName,
              profilePicture: downloadURL,
            }).then(() => {
              // Set loading to false after the operation is completed
              setLoading(false);
              handleShow();
            });
          }
        });
      });
    }
  };
  return (
    <>
      <section>
        <div className="absolute top-0 left-0 w-full h-screen bg-black/10 z-50 backdrop-blur-sm flex justify-center items-center ">
          <div className=" capitalize  bg-slate-100 rounded-md overflow-hidden">
            <div className="flex justify-between items-center bg-lime-100 p-3">
              <h2 className="w-full text-xl font-pops font-semibold text-blue-600">
                create Your Group
              </h2>
              <button
                onClick={handleShow}
                className=" active:scale-90 font-pops text-sm font-semibold text-white px-[22px] py-1 bg-blue-600 rounded-tl-full rounded-br-full border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300"
              >
                Back
              </button>
            </div>
            <div className="px-5 pb-7 pt-5 flex flex-col">
              <div className="mx-auto w-24 h-24 drop-shadow-iconDropShadow mb-3 rounded-full overflow-hidden">
                {image ? (
                  <div className="img-preview w-full h-full overflow-hidden"></div>
                ) : (
                  <img
                    className="inline-block w-20 rounded-full "
                    src={defaultImg}
                    alt="Image Description"
                  />
                )}
              </div>
              <label htmlFor="groupName" className="font-pops font-semibold">
                Group Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Group Name"
                className={`p-3 rounded-sm w-96 my-3 outline-none text-reg-seconadry border ${
                  nameError ? ` border-red-500` : ` border-reg-seconadry`
                }`}
                value={groupName}
                onKeyDown={handleKeyPress}
                onChange={(e) => handleNameChange(e)}
              />
              {nameError && (
                <div className="relative">
                  <p className="py-1 px-2 w-60 sm:w-full  lg:w-96 relative font-nunito font-semibold text-sm md:text-base text-white bg-red-500 rounded capitalize">
                    {nameError}
                  </p>
                  <span className=" absolute -top-12 -left-14 xl:-top-[55px] xl:-left-16 triangle-up scale-[0.1] "></span>
                </div>
              )}
              <label htmlFor="Group Title" className="font-pops font-semibold">
                Group Title
              </label>
              <input
                type="text"
                placeholder="Enter Your Group Title"
                className={`p-3 rounded-sm w-96 my-3 outline-none text-reg-seconadry border ${
                  titleError ? ` border-red-500` : ` border-reg-seconadry`
                }`}
                onChange={(e) => handleTitleChange(e)}
                onKeyDown={handleKeyPress}
                value={groupTitle}
              />
              <label
                htmlFor="chosse profile"
                className="font-pops font-semibold"
              >
                Choose Proile Picture
              </label>
              {image && (
                <Cropper
                  ref={cropperRef}
                  style={{ height: 200, width: "100%" }}
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  aspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />
              )}
              <input type="file" onChange={handleUpload} />
              {titleError && (
                <div className="relative">
                  <p className="py-1 px-2 w-60 sm:w-full  lg:w-96 relative font-nunito font-semibold text-sm md:text-base text-white bg-red-500 rounded capitalize">
                    {titleError}
                  </p>
                  <span className=" absolute -top-12 -left-14 xl:-top-[55px] xl:-left-16 triangle-up scale-[0.1] "></span>
                </div>
              )}
              <button
                onClick={sendGroupData}
                className="active:scale-90 font-pops text-sm font-semibold text-white px-[22px] py-2 bg-blue-600 rounded-bl-full rounded-tr-full border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300 mt-5"
              >
                {loading ? <LoadingSpinner /> : "Create"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
PopUp.propTypes = {
  handleShow: PropTypes.func.isRequired,
};
export default PopUp;
