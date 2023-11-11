import { HiDotsVertical } from "react-icons/hi";

const ChatFriends = () => {
  return (
    <>
      <div className="w-full h-full pt-5 pb-3 pl-5 pr-[22px] rounded-custom shadow-homeCardShadow">
        <div className="flex justify-between mb-5">
          <h3 className="font-popstext-xl font-semibold">Friends</h3>
          <div className="text-2xl cursor-pointer text-Primary">
            <HiDotsVertical />
          </div>
        </div>
        <ul className="eraseBorder h-[86%] overflow-y-auto">
          <li className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
            <div className="flex items-center">
              <div className="relative mr-3.5 after:content-[''] after:h-[15px] after:w-[15px] after:bg-[#00FF75] after:absolute after:bottom-0 after:right-0 after:rounded-full after:border-solid after:border-white after:border-2 after:drop-shadow-iconDropShadow">
                <img
                  className="w-[54px] h-[54px] rounded-full object-cover"
                  src="images/friends/Ellipse2.png"
                  alt="Ellipse2.png"
                />
              </div>
              <div className="">
                <h5 className="font-popstext-sm font-semibold">Raghav</h5>
                <p className="font-popstext-xs font-medium text-[#4D4D4DBF] mt-0.5">
                  Hi Guys, Wassup!
                </p>
              </div>
            </div>
            <h5 className="font-popstext-[10px] font-medium text-[#00000080]">
              Today, 8:56pm
            </h5>
          </li>
          <li className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
            <div className="flex items-center">
              <div className="relative mr-3.5 after:content-[''] after:h-[15px] after:w-[15px] after:bg-[#00FF75]">
                <img
                  className="w-[54px] h-[54px] rounded-full object-cover"
                  src="images/friends/Ellipse3.png"
                  alt="Ellipse3.png"
                />
              </div>
              <div className="">
                <h5 className="font-popstext-sm font-semibold">Swathi</h5>
                <p className="font-popstext-xs font-medium text-[#4D4D4DBF] mt-0.5">
                  Sure!
                </p>
              </div>
            </div>
            <h5 className="font-popstext-[10px] font-medium text-[#00000080]">
              Today, 2:31pm
            </h5>
          </li>
          <li className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
            <div className="flex items-center">
              <div className="relative mr-3.5 after:content-[''] after:h-[15px] after:w-[15px] after:bg-[#00FF75]">
                <img
                  className="w-[54px] h-[54px] rounded-full object-cover"
                  src="images/friends/Ellipse4.png"
                  alt="Ellipse4.png"
                />
              </div>
              <div className="">
                <h5 className="font-popstext-sm font-semibold">Kiran</h5>
                <p className="font-popstext-xs font-medium text-[#4D4D4DBF] mt-0.5">
                  Hi.....
                </p>
              </div>
            </div>
            <h5 className="font-popstext-[10px] font-medium text-[#00000080]">
              Yesterday, 6:22pm
            </h5>
          </li>
          <li className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
            <div className="flex items-center">
              <div className="relative mr-3.5 after:content-[''] after:h-[15px] after:w-[15px] after:bg-[#00FF75]">
                <img
                  className="w-[54px] h-[54px] rounded-full object-cover"
                  src="images/friends/Ellipse5.png"
                  alt="Ellipse5.png"
                />
              </div>
              <div className="">
                <h5 className="font-popstext-sm font-semibold">Tejeshwini C</h5>
                <p className="font-popstext-xs font-medium text-[#4D4D4DBF] mt-0.5">
                  I will call him today.
                </p>
              </div>
            </div>
            <h5 className="font-popstext-[10px] font-medium text-[#00000080]">
              Today, 12:22pm
            </h5>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ChatFriends;
