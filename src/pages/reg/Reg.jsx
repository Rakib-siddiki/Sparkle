import { useState } from "react";
import regImg from "../../assets/reg/reg_Img.png";
import { GiBullseye, GiBurningEye } from "react-icons/gi";

const Reg = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const isValidEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/i;
    return emailRegex.test(email);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError('')
   
  };
  const handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameError(""); // Reset email error when input changes
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const [visible,setVisible] = useState(false);
  const handleEye =()=>{
    setVisible(!visible)
  }
  const handleSubmit = () => {
    if (!email) {
      setEmailError("Please Enter Your Email");
    }else if (!isValidEmail(email)) {
      setEmailError("Invalid Email Format");
    }
    if (!fullName) {
      setFullNameError("Plese Enter Your Name");
    }
    if (!password) {
      setPasswordError("Plese Enter Your password");
    }
  };
  return (
    <>
      <section className="bg-reg-img sm:bg-none h-screen sm:h-full  bg-no-repeat bg-center bg-cover">
        {/* overlay  */}
        <div className="bg-[rgba(0,0,0,.4)] sm:bg-transparent h-screen">
          <div className="flex md:h-screen">
            {/* left part */}
            <div className="sm:w-2/4 w-full sm:px-5 ">
              <div className="flex justify-end  xl:mr-16">
                <div className="block pt-20 lg:pt-24 md:portrait:pt-40 sm:pt-10 mx-auto">
                  {/* title  */}
                  <h2 className=" bg-gradient-to-r from-cyan-500 to-blue-400 font-extrabold text-transparent bg-clip-text  font-nunito sm:font-semibold sm:text-reg-pripamry  text-2xl sm:text-3xl">
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
                        className="relative bg-transparent border-2 sm:bg-white py-3 xl:py-6 px-5 xl:pl-10 rounded-lg  sm:w-full lg:w-96 sm:border border-solid border-reg-seconadry focus:outline-none sm:text-reg-pripamry text-white xl:text-base font-semibold"
                        type="email"
                        required
                        onChange={handleEmail}
                      />
                      <p className="absolute top-[-13px] left-3 xl:left-7 bg-transparent text-white sm:text-reg-seconadry sm:bg-white xl:px-3 px-2">
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
                        className="relative bg-transparent border-2 sm:bg-white py-3 xl:py-6 px-5 xl:pl-10 rounded-lg  sm:w-full lg:w-96 sm:border border-solid border-reg-seconadry focus:outline-none sm:text-reg-pripamry text-white xl:text-base font-semibold"
                        type="text"
                        onChange={handleFullName}
                      />
                      <p className="absolute top-[-13px] left-3 xl:left-7 bg-transparent text-white sm:text-reg-seconadry sm:bg-white xl:px-3 px-2">
                        Full Name
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
                        className="relative bg-transparent border-2 sm:bg-white py-3 xl:py-6 px-5 xl:pl-10 rounded-lg  sm:w-full lg:w-96 sm:border border-solid border-reg-seconadry focus:outline-none sm:text-reg-pripamry text-white xl:text-base font-semibold mb-6 xl:mb-0"
                        type={visible ? "text" : "password"}
                        onChange={handlePassword}
                      />
                      <p className="absolute top-[-13px] left-3 xl:left-7 bg-transparent text-white sm:text-reg-seconadry sm:bg-white xl:px-3 px-2 ">
                        Password
                      </p>
                      {/* eye btn  */}
                      <span
                        onClick={handleEye}
                        className="absolute top-4 right-32 sm:top-4 sm:right-2 xl:top-7 lg:top-4 lg:right-12 xl:right-14  text-[#E25822]  lg:text-lg xl:text-xl "
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
                      className="active:scale-95 sm:w-full w-32 lg:w-96 bg-[#5F35F5] xl:py-5 py-2.5 sm:py-3 md:py-4 rounded-sm sm:rounded-[86px] xl:mt-[50px] md:mt-10 sm:mt-8 mt-5 mb-5 font-nunito font-semibold text-base sm:text-xl text-white"
                    >
                      Sign up
                    </button>
                    <h5 className=" w-full lg:w-96 sm:text-center text-[13px] text-white sm:text-[#03014C] sm:pb-5 md:pb-0">
                      Already have an account ?
                      <a href="#" className="text-[#EA6C00]">
                        Sign In
                      </a>
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
