/* eslint-disable react/prop-types */
import userImg from "../../assets/home/user.png";

// for image croping
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useRef, useState } from "react";

// for  alret
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
// firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const UploadSettings = ({ cancleUpload }) => {
  // firebase storage
  const storage = getStorage();
  const auth = getAuth();
  //for image
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = useRef();

  const [loading, setLoading] = useState(false);
  // for croping function
  const handleImgChange = (e) => {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer : e.target.files;
    console.log(files);
    if (files.length === 0) {
      // Handle no files selected
      setImage(false);
      console.log("No files selected.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    toast.success("Updating Your profile");
    setLoading(true);
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const userId = auth.currentUser.uid;
      const storageRef = ref(storage, userId);
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        console.log("Uploaded a data_url string!");
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setLoading(false);
            cancleUpload();
          });
        });
      });
    }
  };

  // for cancellation
  const handleCancle = () => {
    console.log("ok");
    Swal.fire({
      title: "Are sure you want to exit?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        cancleUpload();
      }
    });
  };

  return (
    <>
      <ToastContainer
        // className={`w-10`}
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <div className=" absolute top-0 left-0 z-50 w-full h-screen backdrop-blur-sm bg-black/20 flex flex-col justify-center items-center">
        <div>
          <h2 className=" font-pops bg-slate-100 font-semibold text-xl text-gray-700 px-5 py-3 capitalize">
            Upload your image
          </h2>
          <div className="p-5 bg-white flex flex-col gap-3 relative">
            <div className="flex justify-around items-center">
              {/* left  */}
              <div>
                <div className="w-96">
                  <label
                    className="text-xl text-gray-700  font-pops font-medium capitalize"
                    htmlFor="upload"
                  >
                    Uplode your File
                  </label>
                  <input
                    onChange={handleImgChange}
                    className="my-3 text-gray-700 "
                    type="file"
                    accept=".jpeg,.jpg,.png"
                  />
                  {image && (
                    <Cropper
                      className="bg-center"
                      ref={cropperRef}
                      style={{ height: 200, width: "100%" }}
                      zoomTo={0.5}
                      initialAspectRatio={1} // Set the aspect ratio as needed
                      aspectRatio={1} // Set the same aspect ratio as initialAspectRatio
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false}
                      guides={true}
                    />
                  )}
                  <p className="text-gray-700  font-pops font-semibold text-sm capitalize py-4">
                    Drag frame to adujust protrait
                  </p>
                </div>
              </div>
              {/* right  */}
              <div className="flex flex-col items-center gap-6 border-l-2 ">
                <h3 className="font-pops font-medium text-gray-700  text-xl capitalize">
                  Your profile Protrait
                </h3>
                <div className="group w-28 h-28 mx-auto rounded-full  overflow-hidden relative ">
                  {image ? (
                    <div className="img-preview w-full h-full overflow-hidden"></div>
                  ) : (
                    <img src={userImg} alt="userImage" />
                  )}
                </div>
                <div>
                  {loading ? (
                    <ColorRing
                      visible={true}
                      height="60"
                      width="60"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={[
                        "#b8c480",
                        "#B2A3B5",
                        "#F4442E",
                        "#51E5FF",
                        "#FFCD4B",
                      ]}
                    />
                  ) : (
                    <>
                      <button
                        onClick={getCropData}
                        className="px-3 py-2 active:scale-95 bg-primary text-white rounded-md font-nunito"
                      >
                        Upload
                      </button>
                      <button
                        onClick={handleCancle}
                        className="px-3 py-2 active:scale-95 bg-red-500 text-white rounded-md font-nunito ml-4"
                      >
                        Cancle
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadSettings;
