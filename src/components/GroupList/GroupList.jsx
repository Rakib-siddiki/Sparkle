import { BsThreeDotsVertical } from "react-icons/bs";

import groupImg1 from "../../assets/home/groupLists/groupImg1.png";
import groupImg2 from "../../assets/home/groupLists/groupImg2.png";
import groupImg3 from "../../assets/home/groupLists/groupImg3.png";

const GroupList = () => {
  return (
    <>
      <div className="h-[87%] md:h-[77%] pt-3 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-1">
          <h3 className="font-pops text-xl font-semibold">Groups List</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>
        <ul className="eraseBorder h-[88%] overflow-y-auto">
          <li className="py-3 md:pr-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
            <div className="flex items-center">
              <img
                className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] rounded-full mr-2 md:mr-3.5"
                src={groupImg1}
                alt="g1.png"
              />
              <div className="">
                <h5 className="font-pops text-base md:text-[18px] font-semibold">
                  Friends Reunion
                </h5>
                <p className="font-pops text-xs md:text-base font-medium text-[#4D4D4DBF]">
                  Hi Guys, Wassup!
                </p>
              </div>
            </div>
            <div className="">
              <button className=" active:scale-90 font-pops text-sm md:text-lg font-semibold text-white py-1 md:py-0.5 px-3.5 md:px-4.5  bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300 capitalize">
                Join
              </button>
            </div>
          </li>
          <li className="py-3 md:pr-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
            <div className="flex items-center">
              <img
                className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] rounded-full mr-2 md:mr-3.5"
                src={groupImg2}
                alt="g3.png"
              />
              <div className="">
                <h5 className="font-pops text-base md:text-[18px] font-semibold">
                  Crazy Cousins
                </h5>
                <p className="font-pops text-xs md:text-base font-medium text-[#4D4D4DBF]">
                  What plans today?
                </p>
              </div>
            </div>
            <div className="">
              <button className=" active:scale-90 font-pops text-sm md:text-lg font-semibold text-white py-1 md:py-0.5 px-3.5 md:px-4.5  bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300 capitalize">
                Join
              </button>
            </div>
          </li>
          <li className="py-3 md:pr-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
            <div className="flex items-center">
              <img
                className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] rounded-full mr-2 md:mr-3.5"
                src={groupImg3}
                alt="g1.png"
              />
              <div className="">
                <h5 className="font-pops text-base md:text-[18px] font-semibold">
                  Crazy Cousins
                </h5>
                <p className="font-pops text-xs md:text-base font-medium text-[#4D4D4DBF]">
                  What plans today?
                </p>
              </div>
            </div>
            <div className="">
              <button className=" active:scale-90 font-pops text-sm md:text-lg font-semibold text-white py-1 md:py-0.5 px-3.5 md:px-4.5  bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300 capitalize">
                Join
              </button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default GroupList;
