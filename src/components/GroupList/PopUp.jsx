import React from 'react';

const PopUp = ({ handleShow }) => {
    
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
            <div className="p-3 flex flex-col">
              <label htmlFor="groupName" className="font-pops font-semibold">
                Group Name{" "}
              </label>
              <input
                type="text"
                placeholder="Enter Your Group Name"
                className="p-3 rounded-sm w-96 my-3 outline-none text-reg-seconadry"
              />
              <label htmlFor="Group Title" className="font-pops font-semibold">
                Group Title{" "}
              </label>
              <input
                type="text"
                placeholder="Enter Your Group Title"
                className="p-3 rounded-sm w-96 my-3 text-reg-seconadry"
              />
              <button
                onClick={handleShow}
                className="active:scale-90 font-pops text-sm font-semibold text-white px-[22px] py-2 bg-blue-600 rounded-bl-full rounded-tr-full border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300 mt-3"
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