import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref,set } from "firebase/database";

import regImg from "../../assets/reg/reg_Img.png";
import { GiBullseye, GiBurningEye } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Reg = () => {
  // firebase authentication
  const auth = getAuth();
  const db = getDatabase();

  // firebase authentication
  // for redirect
  const navigate = useNavigate();

  // for redirect

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameError(""); // Reset email error when input changes
  };

  const upperCase = /^(?=.*[A-Z])/; //At least one uppercase letter.
  const lowerCase = /^(?=.*[a-z])/; // At least one lowercase letter.
  const digit = /^(?=.*\d)/; //At least one digit.
  const symbol = /^(?=.*[@#$%^&+=!])/; //At least one special character (you can add or remove special
  const noSpace = /^(?!.*\s)/; //No whitespace allowed.
  const lentgh = /^.{8,}/; // Minimum length of 8 characters (you can adjust this as well).

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");

    // I changed the if-else statements to check for the negation of the regex conditions
    if (!lowerCase.test(e.target.value)) {
      setPasswordError("At least one lowercase letter");
    } else if (!upperCase.test(e.target.value)) {
      setPasswordError("At least one uppercase letter");
    } else if (!digit.test(e.target.value)) {
      setPasswordError("At least one digit");
    } else if (!symbol.test(e.target.value)) {
      setPasswordError("At least one special character");
    } else if (!noSpace.test(e.target.value)) {
      setPasswordError("No whitespace allowed");
    } else if (!lentgh.test(e.target.value)) {
      setPasswordError("Minimum length of 8 characters");
    }
  };
  const [visible, setVisible] = useState(false);
  const handleEye = () => {
    setVisible(!visible);
  };
  const handleSubmit = () => {
    if (!email) {
      setEmailError("Please Enter Your Email");
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid Email Format");
    }
    if (!fullName) {
      setFullNameError("Plese Enter Your Name");
    }
    if (!password) {
      setPasswordError("Plese Enter Your password");
    }
    if (email && fullName.trim() && password && isValidEmail) {
      // firbase

      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: "./src/assets/user.png",
          })
            .then(() => {
              toast.success("Registration successful Verify your email");
              setEmail("");
              setFullName("");
              setPassword("");
              sendEmailVerification(auth.currentUser);
              setTimeout(() => {
                navigate("/login");
              }, 2500);
            })
            .then(() => {
              const userId = user.user.uid
              const userName = user.user.displayName
              const userEmail = user.user.email
              const photoURL = user.user.photoURL
              console.log("🚀 > file: Reg.jsx:113 > .then > photoURL:", photoURL)
              set(ref(db, "users/" + userId), {
                username: userName,
                email: userEmail,
                profile_picture: photoURL,
              });
              console.log(db)
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            setEmailError("this email already exists");
          }
        });
      // firbase
    }
  };

  return (
    <>
      <ToastContainer
        className={`w-10`}
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <section className="bg-reg-img sm:bg-none h-screen sm:h-full  bg-no-repeat bg-center bg-cover">
        {/* overlay  */}
        <div className="bg-[rgba(0,0,0,.4)] sm:bg-transparent h-screen">
          <div className="flex md:h-screen px-5">
            {/* left part */}
            <div className="sm:w-2/4 w-full sm:px-5 ">
              <div className="flex justify-end  xl:mr-16">
                <div className="block pt-20 lg:pt-24 md:portrait:pt-40 sm:pt-10 mx-auto">
                  {/* title  */}
                  <h2 className="bg-gradient-to-r from-cyan-500 to-blue-400 sm:text-reg-primary font-extrabold text-transparent bg-clip-text  font-nunito sm:font-semibold sm:text-reg-pripamry  text-2xl sm:text-3xl">
                    Get started with easily register
                  </h2>
                  <p className="font-nunito text-base sm:text-reg-seconadry text-white md:mt-3 md:mb-14 mb-7 sm:mb-10">
                    Free register and you can enjoy it
                  </p>
                  {/* title  */}
                  {/* form  */}
                  <form>
                    {/* input 1 */}
                    <div className="relative">
                      <input
                        className="relative sm:text-reg-primary bg-transparent border-b-2 sm:bg-white pr-10 portrait:pr-5 sm:landscape:pr-8  py-3 xl:py-6 sm:pl-5 sm:pr-10  md:portrait:pr-8 xl:pl-10 sm:rounded-lg w-60 sm:w-full lg:w-96 sm:border border-solid border-login-secondry sm:border-reg-seconadry focus:outline-none sm:text-reg-pripamry text-white xl:text-base font-semibold"
                        type="email"
                        required
                        value={email}
                        placeholder="Enter you email"
                        onChange={handleEmail}
                      />
                      <p className="absolute top-[-20px] left-0 sm:left-3 xl:left-7 bg-transparent text-xl text-white sm:text-reg-seconadry sm:bg-white xl:px-3 sm:px-2">
                        Email Address
                      </p>
                      {emailError && (
                        <div className="absolute top-16 xl:top-[86px] left-0">
                          <p className="z-10 py-1 px-2 w-60 sm:w-full  lg:w-96 relative font-nunito font-semibold text-sm md:text-base text-white bg-red-500 rounded capitalize">
                            {emailError}
                          </p>
                          <span className=" absolute -top-12 -left-14 xl:-top-[49px] xl:-left-14 triangle-up scale-[0.2]"></span>
                        </div>
                      )}
                    </div>
                    {/* input 1 */}

                    {/* input 2 */}
                    <div className="relative my-14 md:my-16 lg:my-16    ">
                      <input
                        className="relative sm:text-reg-primary bg-transparent border-b-2 sm:bg-white pr-10 portrait:pr-5 sm:landscape:pr-8  py-3 xl:py-6 sm:pl-5 sm:pr-10  md:portrait:pr-8 xl:pl-10 sm:rounded-lg w-60 sm:w-full lg:w-96 sm:border border-solid border-login-secondry sm:border-reg-seconadry focus:outline-none sm:text-reg-pripamry text-white xl:text-base font-semibold"
                        type="text"
                        value={fullName}
                        placeholder="Enter your Surname"
                        onChange={handleFullName}
                      />
                      <p className="absolute top-[-20px] left-0 sm:left-3 xl:left-7 bg-transparent text-xl text-white sm:text-reg-seconadry sm:bg-white xl:px-3 sm:px-2">
                        Surname
                      </p>
                      {fullNameError && (
                        <div className="absolute top-16 xl:top-[86px] left-0">
                          <p className="z-10 py-1 px-2 w-60 sm:w-full  lg:w-96 relative font-nunito font-semibold text-sm md:text-base text-white bg-red-500 rounded capitalize">
                            {fullNameError}
                          </p>
                          <span className=" absolute -top-12 -left-14 xl:-top-[49px] xl:-left-14 triangle-up scale-[0.2]"></span>
                        </div>
                      )}
                    </div>
                    {/* input 2 */}

                    {/* input 3 */}
                    <div className="relative">
                      <input
                        className="relative sm:text-reg-primary bg-transparent border-b-2 sm:bg-white pr-10 portrait:pr-5 sm:landscape:pr-8  py-3 xl:py-6 sm:pl-5 sm:pr-10  md:portrait:pr-8 xl:pl-10 sm:rounded-lg w-60 sm:w-full lg:w-96 sm:border border-solid border-login-secondry sm:border-reg-seconadry focus:outline-none sm:text-reg-pripamry text-white xl:text-base font-semibold"
                        type={visible ? "text" : "password"}
                        value={password}
                        placeholder="Create your password"
                        onChange={handlePassword}
                      />
                      <p className="absolute top-[-20px] left-0 sm:left-3 xl:left-7 bg-transparent text-xl  text-white sm:text-reg-seconadry sm:bg-white xl:px-3 sm:px-2">
                        Password
                      </p>
                      {/* eye btn  */}
                      <span
                        onClick={handleEye}
                        className="absolute top-4 right-28 sm:top-4 sm:right-2 xl:top-7 lg:top-4 lg:right-12 xl:right-14  text-[#E25822] lg:text-lg xl:text-xl cursor-pointer "
                      >
                        {visible ? <GiBullseye /> : <GiBurningEye />}
                      </span>
                      {/* eye btn  */}
                      {passwordError && (
                        <div className="absolute top-16 xl:top-[86px] left-0">
                          <p className="z-10 py-1 px-2 w-60 sm:w-full  lg:w-96 relative font-nunito font-semibold text-sm md:text-base text-white bg-red-500 rounded capitalize">
                            {passwordError}
                          </p>
                          <span className=" absolute -top-12 -left-14 xl:-top-[49px] xl:-left-14 triangle-up scale-[0.2]"></span>
                        </div>
                      )}
                    </div>
                    {/* input 3 */}
                  </form>
                  {/* form  */}
                  <div>
                    <button
                      onClick={handleSubmit}
                      className="active:scale-95 sm:w-full w-32 lg:w-96 bg-[#5F35F5] xl:py-5 py-2.5 sm:py-3 md:py-4  rounded-sm sm:rounded-[86px] xl:mt-[50px] md:mt-10 sm:mt-8 mt-12 mb-5 font-nunito font-semibold text-base sm:text-xl text-white"
                    >
                      Sign up
                    </button>
                    <h5 className=" w-full lg:w-96 sm:text-center text-[13px] text-white sm:text-[#03014C] sm:pb-5 md:pb-0">
                      Already have an account ?
                      <Link to="/" className="text-[#EA6C00] ml-2">
                        Sign In
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            {/* left part */}

            {/* right part */}
            <div className="sm:w-2/4 bg-reg-img bg-no-repeat bg-center bg-cover ">
              <img
                className="hidden sm:block h-full md:hidden"
                src={regImg}
                alt="img"
              />
            </div>
            {/* right part */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Reg;
