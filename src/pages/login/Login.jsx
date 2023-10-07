import { useState } from "react";
import google from "../../assets/login/Google.svg";
import LoginImg from "../../assets/login/login_img.jpg";
import { GiBullseye, GiBurningEye } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLogInfo } from "../../slices/userSlice";

const Login = () => {
  //from redux-tool-kit
  const dispach = useDispatch();

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //for errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // for Email
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  // for password
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const [visible, setVisible] = useState(false);
  const handleEye = () => {
    setVisible(!visible);
  };
  // handle submit
  const handleSubmit = async () => {
    if (!email) {
      setEmailError("Please Enter Your Email");
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid Email Format");
    }
    if (!password) {
      setPasswordError("Plese Enter Your password");
    }
    if (email && password) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          const userData = user.user;
          dispach(userLogInfo(userData));
          localStorage.setItem("userData", JSON.stringify(user));
          navigate("/");
          toast.error("Please verify your email before signing in.");
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          toast.error("Incorrect Information");
        });
    }
  };
  // handle submit
  //for Google Login
  const handleGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
      });
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
      <section className="bg-login-img sm:bg-none h-screen sm:h-full  bg-no-repeat bg-center bg-cover">
        {/* overlay  */}
        <div className="bg-[rgba(0,0,0,.4)] sm:bg-transparent h-screen">
          <div className="flex md:h-screen">
            {/* left part */}
            <div className="sm:w-2/4 w-full sm:px-5 ">
              <div className="flex justify-end  xl:mr-16">
                <div className="block pt-20 lg:pt-40 md:portrait:pt-40 sm:pt-10 mx-auto">
                  {/* title  */}
                  <h2 className=" bg-gradient-to-r from-cyan-500 to-blue-400 font-extrabold text-transparent bg-clip-text  font-open sm:font-semibold sm:text-login-primary  text-2xl md:text-3xl lg:text-4xl">
                    Login to your account!
                  </h2>
                  <div
                    onClick={handleGoogle}
                    className=" cursor-pointer w-48 py-3 px-4 md:w-60 md:py-5 md:px-[30px] my-8 flex items-center rounded-lg border border:bg-reg-seconadry"
                  >
                    <img src={google} alt="logo" />
                    <p className="ml-3 font-semibold text-sm md:text-base text-white sm:text-login-primary">
                      Login with Google
                    </p>
                  </div>
                  {/* title  */}
                  {/* form  */}
                  <form>
                    {/* input 1 */}
                    <div className="relative mb-14 ">
                      <input
                        className="relative bg-transparent border-b-2 sm:bg-white pr-10 md:pr-12 py-3 xl:py-4 w-full lg:w-96 sm:border-b border-solid border-login-secondry sm:border-reg-seconadry focus:outline-none sm:text-login-primary text-white xl:text-xl font-semibold "
                        type="email"
                        required
                        onChange={handleEmail}
                      />
                      <p className="absolute top-[-18px] left-0 bg-transparent text-white sm:text-reg-seconadry sm:bg-white">
                        Email Address
                      </p>

                      {emailError && (
                        <div className="absolute top-[62px] xl:top-[72px] left-0">
                          <p className="z-10 py-1 px-2 w-60 sm:w-full  lg:w-96 relative font-nunito font-semibold text-sm md:text-base text-white bg-red-500 rounded capitalize">
                            {emailError}
                          </p>
                          <span className=" absolute -top-12 -left-14 xl:-top-[49px] xl:-left-14 triangle-up scale-[0.2]"></span>
                        </div>
                      )}
                    </div>
                    {/* input 1 */}
                    {/* input 2 */}
                    <div className="relative">
                      <input
                        className="relative bg-transparent border-b-2 sm:bg-white pr-10 md:pr-12 py-3 xl:py-4 mb-12 xl:mb-10 w-full lg:w-96 sm:border-b border-solid border-login-secondry sm:border-reg-seconadry focus:outline-none sm:text-login-primary text-white xl:text-xl font-semibold"
                        type={visible ? "text" : "password"}
                        onChange={handlePassword}
                      />
                      <p className="absolute top-[-18px] left-0 bg-transparent text-white sm:text-reg-seconadry sm:bg-white">
                        Password
                      </p>
                      {/* eye btn  */}
                      <span
                        onClick={handleEye}
                        className="absolute top-4 right-4 sm:top-4 sm:right-2 xl:top-7 lg:top-4 lg:right-12 xl:right-4  text-[#E25822]  lg:text-lg xl:text-xl "
                      >
                        {visible ? <GiBullseye /> : <GiBurningEye />}
                      </span>
                      {/* eye btn  */}
                      {passwordError && (
                        <div className="absolute top-[62px] xl:top-[72px] left-0">
                          <p className="z-10 py-1 px-2 w-60 sm:w-full  lg:w-96 relative font-nunito font-semibold text-sm md:text-base text-white bg-red-500 rounded capitalize">
                            {passwordError}
                          </p>
                          <span className=" absolute -top-12 -left-14 xl:-top-[49px] xl:-left-14 triangle-up scale-[0.2]"></span>
                        </div>
                      )}
                    </div>
                    {/* input 2 */}
                  </form>
                  {/* form  */}
                  <div>
                    <button
                      onClick={handleSubmit}
                      className="active:scale-95 w-full  lg:w-96 bg-[#5F35F5] xl:py-5 py-2.5 sm:py-3 md:py-4 rounded-sm sm:rounded-[86px] md:mt-2 mb-5 font-nunito font-semibold text-base sm:text-xl text-white"
                    >
                      Login to Continue
                    </button>
                    <h5 className=" w-full lg:w-96 sm:text-center text-[13px] text-white sm:text-[#03014C] sm:pb-5 md:pb-0">
                      Already have an account ?
                      <Link to="/registration" className="text-[#ffaa60] ml-1">
                        Sign up
                      </Link>
                    </h5>
                    <div className=" w-full lg:w-96 sm:text-center text-[13px] text-white sm:text-primary sm:font-bold text-md sm:pb-5 md:pb-0 cursor-pointer">
                      <Link to="/forgetPassword">Forget Password</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* left part */}

            {/* right part */}
            <div className="sm:w-2/4 bg-login-img bg-no-repeat bg-center bg-cover ">
              <img
                className="hidden sm:block h-full md:hidden"
                src={LoginImg}
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

export default Login;
