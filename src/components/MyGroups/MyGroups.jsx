import { BsThreeDotsVertical } from "react-icons/bs";

import friendsImg1 from "../../assets/home/friends/friendsImg1.png";
import friendsImg2 from "../../assets/home/friends/friendsImg2.png";
import friendsImg3 from "../../assets/home/friends/friendsImg3.png";
import friendsImg4 from "../../assets/home/friends/friendsImg4.png";
import friendsImg5 from "../../assets/home/friends/friendsImg5.png";

const MyGroups = () => {
  return (
    <>
      <div className="w-full md:w-[32%] h-full md:h-[290px] lg:h-[305px] 2xl:h-[360px] pt-5 pb-1.5 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-2">
          <h3 className="font-poppins text-xl font-semibold">My Groups</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>

        <ul className="eraseBorder h-[86%] overflow-y-auto">
          <li className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
            <div className="flex items-center">
              <div className="relative mr-3.5 after:content-[''] after:h-[15px] after:w-[15px] after:bg-[#00FF75] after:absolute after:bottom-0 after:right-0 after:rounded-full after:border-solid after:border-white after:border-2 after:drop-shadow-navIconDropShadow">
                <img
                  className="w-[54px] h-[54px] rounded-full object-cover"
                  src={friendsImg1}
                  alt="Ellipse2.png"
                />
              </div>
              <div className="">
                <h5 className="font-poppins text-sm font-semibold">Raghav</h5>
                <p className="font-poppins text-xs font-medium text-[#4D4D4DBF] mt-0.5">
                  Hi Guys, Wassup!
                </p>
              </div>
            </div>
            <h5 className="font-poppins text-[10px] font-medium text-[#00000080]">
              Today, 8:56pm
            </h5>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MyGroups;
