import { createRef, useState } from "react";
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import img from "../../assets/home/groupLists/groupImg2.png";
// react copper
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";
import {
  getDownloadURL,
  getStorage,
  ref as imageRef,
  uploadString,
} from "firebase/storage";
// import "./Demo.css";
// eslint-disable-next-line react/prop-types
const PopUp = ({ handleShow }) => {
  const data = useSelector((state) => state.userInfo.userValue); // getting value from store
  const storage = getStorage();
  const db = getDatabase();
  const [groupName, setGroupName] = useState("");
  console.log("🚀 > file: PopUp.jsx:6 > PopUp > groupName:", groupName);
  const [groupTitle, setGroupTitle] = useState("");
  console.log("🚀 > file: PopUp.jsx:7 > PopUp > groupTitle:", groupTitle);
  const [nameError, setNameError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  console.log("🚀 > file: PopUp.jsx:8 > PopUp > error:", nameError);
  const grpdata = useSelector((state) => state);
  console.log("🚀 > file: PopUp.jsx:33 > PopUp > grpdata:", grpdata);

  const handleNameChange = (e) => {
    setGroupName(e.target.value);
    setNameError("");
  };
  const handleTitleChange = (e) => {
    setGroupTitle(e.target.value);
    setTitleError("");
  };
  const sendGroupData = () => {
    if (!groupName) {
      setNameError("Enter your Group Name");
    }
    if (!groupTitle) {
      setTitleError("Enter your Group Title");
    }
    getCropData();
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendGroupData();
    }
  };

  // react copper functions

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
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storageRef = imageRef(storage, "groupProfile");

      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      // eslint-disable-next-line no-unused-vars
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          if (groupName.trim() && groupTitle.trim()) {
            set(push(ref(db, "grouplist/")), {
              groupName: groupName,
              groupTitle: groupTitle,
              adminId: data.uid,
              admin: data.displayName,
              profilePicture: downloadURL,
            }).then(() => handleShow());
          }
        });
      });
      console.log(cropData);
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
                    src={img}
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
                Create
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PopUp;
