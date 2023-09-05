import regImg from "../../assets/reg/reg_Img.png";

const Reg = () => {
  return (
    <>
      <section className="bg-reg-img sm:bg-none h-screen sm:h-full  bg-no-repeat bg-center bg-cover">
        {/* overlay  */}
        <div className="bg-[rgba(0,0,0,.4)] sm:bg-transparent h-screen pb-5">
          <div className="flex h-screen">
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
                      />
                      <p className="absolute top-[-13px] left-3 xl:left-7 bg-transparent text-white sm:text-reg-seconadry sm:bg-white xl:px-3 px-2">
                        Email Address
                      </p>
                    </div>
                    {/* input 1 */}

                    {/* input 2 */}
                    <div className="relative xl:my-14 my-10">
                      <input
                        className="relative bg-transparent border-2 sm:bg-white py-3 xl:py-6 px-5 xl:pl-10 rounded-lg  sm:w-full lg:w-96 sm:border border-solid border-reg-seconadry focus:outline-none sm:text-reg-pripamry text-white xl:text-base font-semibold"
                        type="text"
                      />
                      <p className="absolute top-[-13px] left-3 xl:left-7 bg-transparent text-white sm:text-reg-seconadry sm:bg-white xl:px-3 px-2">
                        Full Name
                      </p>
                    </div>
                    {/* input 2 */}

                    {/* input 3 */}
                    <div className="relative">
                      <input
                        className="relative bg-transparent border-2 sm:bg-white py-3 xl:py-6 px-5 xl:pl-10 rounded-lg  sm:w-full lg:w-96 sm:border border-solid border-reg-seconadry focus:outline-none sm:text-reg-pripamry text-white xl:text-base font-semibold"
                        type="password"
                      />
                      <p className="absolute top-[-13px] left-3 xl:left-7 bg-transparent text-white sm:text-reg-seconadry sm:bg-white xl:px-3 px-2">
                        Password
                      </p>
                    </div>
                    {/* input 3 */}
                  </form>
                  {/* form  */}
                  <div>
                    <button className=" sm:w-full w-32  lg:w-96 bg-[#5F35F5] xl:py-5 py-2.5 sm:py-3 md:py-4 rounded-sm sm:rounded-[86px] xl:mt-[50px] md:mt-10 sm:mt-8 mt-5 mb-5 font-nunito font-semibold text-base sm:text-xl text-white">
                      Sign up
                    </button>
                    <h5 className=" w-full lg:w-96 sm:text-center text-[13px] text-white sm:text-[#03014C]">
                      Already have an account ?
                      <span className="text-[#EA6C00]"> Sign In</span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            {/* left part */}

            {/* right part */}
            <div className="sm:w-2/4 bg-reg-img bg-no-repeat bg-center bg-cover ">
              <img
                className="hidden sm:block md:hidden"
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
