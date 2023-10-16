import { BsThreeDotsVertical } from "react-icons/bs";

import groupImg1 from "../../assets/home/groupLists/groupImg1.png";
import groupImg2 from "../../assets/home/groupLists/groupImg2.png";
import groupImg3 from "../../assets/home/groupLists/groupImg3.png";

const GroupList = () => {
  return (
    <>
      <div className="h-[77%] xxl:h-[338px] pt-3 xxl:mt-10 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-1">
          <h3 className="font-pops text-xl font-semibold">Groups List</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>
        <ul className=" h-[88%] overflow-y-auto">
          <li className="py-3 pr-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
            <div className="flex items-center">
              <div className="">
                <img
                  className="mr-3.5 w-[70px] h-[70px] rounded-full object-cover"
                  src={groupImg1}
                  alt="groupImg1"
                />
              </div>
              <div className="">
                <h5 className="font-pops text-[18px] font-semibold">
                  Friends Reunion
                </h5>
                <p className="font-pops text-base font-medium text-[#4D4D4DBF]">
                  Hi Guys, Wassup!
                </p>
              </div>
            </div>
            <div className="">
              <button className=" active:scale-90 font-pops text-xl font-semibold text-white px-[22px] py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300">
                Join
              </button>
            </div>
          </li>
          <li className="py-3 pr-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
            <div className="flex items-center">
              <div className="">
                <img
                  className="mr-3.5 w-[70px] h-[70px] rounded-full object-cover"
                  src={groupImg2}
                  alt="groupImg2"
                />
              </div>
              <div className="">
                <h5 className="font-pops text-[18px] font-semibold">
                  Friends Forever
                </h5>
                <p className="font-pops text-base font-medium text-[#4D4D4DBF]">
                  Good to see you.
                </p>
              </div>
            </div>
            <div className="">
              <button className=" active:scale-90 font-pops text-xl font-semibold text-white px-[22px] py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300">
                Join
              </button>
            </div>
          </li>
          <li className="py-3 pr-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
            <div className="flex items-center">
              <div className="">
                <img
                  className="mr-3.5 w-[70px] h-[70px] rounded-full object-cover"
                  src={groupImg3}
                  alt="groupImg3"
                />
              </div>
              <div className="">
                <h5 className="font-pops text-[18px] font-semibold">
                  Crazy Cousins
                </h5>
                <p className="font-pops text-base font-medium text-[#4D4D4DBF]">
                  What plans today?
                </p>
              </div>
            </div>
            <div className="">
              <button className=" active:scale-90 font-pops text-xl font-semibold text-white px-[22px] py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300">
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
