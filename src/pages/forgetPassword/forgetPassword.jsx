import { Link } from "react-router-dom";
import img from "../../assets/forgetPassword/forgetPassword.png";
import smdevice from "../../assets/forgetPassword/smdeviceReset.png";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
const ForgetPassword = () => {
  // firebase
  const auth = getAuth();
  //for email
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  //for  error
  const [emailError, setEmailError] = useState("");
   
  const isValidEmail = (email) => {
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
     return emailRegex.test(email);
   };

  // for submmit
  const handleSubmit = async () => {
    if (!email) {
      setEmailError("Enter Your Email Address");
    }else if (!isValidEmail(email)){
      setEmailError("Invalid Email Format");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode == "auth/invalid-email") {
          setEmailError("user not found");
        }
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

      {/* =============================  */}
      <section className="h-screen sm:h-auto md:h-screen flex ">
        <div className="w-full sm:w-[40%] tablet:w-[50%] md:w-[45%] h-auto tablet:h-screen md:h-auto hidden sm:flex justify-center xl:justify-end items-start md:items-center">
          <img
            className="w-[40%] md:w-10/12 fixed top-1/2 translate-y-[-50%] md:translate-y-0 md:static"
            src={img}
            alt="forgetPassword.png"
          />
        </div>
        <div className="w-full sm:w-[60%] tablet:w-[50%] md:w-[55%] h-full tablet:h-auto flex items-center sm:py-8 md:p-0">
          <div className="xl:ml-16 px-3 md:px-5 lg:px-0">
            <img
              className="sm:hidden w-8/12 mx-auto mb-7"
              src={smdevice}
              alt="..."
            />
            <h2 className="font-openSans md:w-full text-3xl md:text-[34px] font-bold text-reg-primary mx-auto md:mx-0">
              Did you Forgot your Password?
            </h2>
            <p className="font-nunito text-base md:text-xl lg:text-start font-regular text-black opacity-50 mb-2 md:mb-0  mt-2 md:mt-[13px]">
              Please Enter your E-mail to Search your Account
            </p>
            <form className="w-full lg:w-[398px]">
              <div className="relative">
                <div>
                  {/* forgetPassword error  */}
                  {emailError && (
                    <div className="absolute top-16 xl:top-[76px] left-0">
                      <p className="z-10 py-1 px-2 w-60 sm:w-full  lg:w-96 relative font-nunito font-semibold text-sm md:text-base text-white bg-red-500 rounded capitalize">
                        {emailError}
                      </p>
                      <span className=" absolute -top-12 -left-14 xl:-top-[49px] xl:-left-14 triangle-up scale-[0.2]"></span>
                    </div>
                  )}
                </div>
                <div className="relative mt-2 md:mt-10">
                  <input
                    className="relative bg-transparent border-b-2 sm:bg-white pr-10 md:pr-12 py-3 xl:py-4 w-full lg:w-96 sm:border-b border-solid border-login-secondry sm:border-reg-seconadry focus:outline-none text-forgetPass_text xl:text-xl font-semibold "
                    type="email"
                    onChange={handleEmail}
                    placeholder="Enter Your Email"
                    required
                    value={email}
                  />
                </div>
              </div>

              <button
                className="py-5 w-full font-nunito text-xl text-forgetPass_text bg-[#27DEBF] active:scale-95  font-bold text-center border-0 border-solid  rounded-[9px]  mt-10 md:mt-14 mb-5"
                type="button"
                onClick={handleSubmit}
              >
                Search Your Account
              </button>
              <div>
                <p className="font-openSans text-sm font-regular text-[#03014C] text-center">
                  Already have an account ?{" "}
                  <Link to="/" className="font-bold text-[#EA6C00]" href="#">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
