import PropTypes from "prop-types";
import groupImg1 from "../../../assets/home/groupLists/groupImg1.png";
import { BiMinus, BiPlusMedical } from "react-icons/bi";
const MyGroupListItem = ({
  type,
  item,
  acceptGroupRequest,
  cancleGroupRequest,
}) => {
  switch (type) {
    case "myGroupList":
      return (
        <>
          <li className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
            <div className="flex items-center">
              <div className="relative mr-3.5">
                <img
                  className="w-[54px] h-[54px] rounded-full object-cover"
                  src={groupImg1}
                  alt="friendsImg1"
                />
              </div>
              <div className="">
                <h5 className="font-pops text-sm font-semibold">
                  {item.groupName}
                </h5>
                <p className="font-pops text-xs font-medium text-[#4D4D4DBF] mt-0.5">
                  {item.groupTitle}
                </p>
              </div>
            </div>
            <h5 className="font-pops text-[10px] font-medium text-[#00000080]">
              Today, 8:56pm
            </h5>
          </li>
        </>
      );
    case "joinRequestlist":
      return (
        <li className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
          <div className="flex items-center">
            <div className="relative mr-3.5">
              <img
                className="w-[54px] h-[54px] rounded-full object-cover"
                src={groupImg1}
                alt="friendsImg1"
              />
            </div>
            <div className="">
              <h5 className="font-pops text-sm font-semibold">
                {item.senderName}
              </h5>
              <p className="font-pops text-xs font-medium text-[#4D4D4DBF] mt-0.5 ">
                {item.senderName} wants to join at <span>{">"}</span>
                <span className="text-blue-500"> {item.groupName}</span>
              </p>
            </div>
          </div>
          <div className="pl-2 flex gap-2">
            <button
              onClick={() => acceptGroupRequest(item)}
              className=" active:scale-90 font-pops text-xl font-semibold text-white px-1.5 py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300"
            >
              <BiPlusMedical />
            </button>
            <button
              onClick={() => cancleGroupRequest(item)}
              className=" active:scale-90 font-pops text-xl font-semibold text-white px-1.5 py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300"
            >
              <BiMinus />
            </button>
          </div>
        </li>
      );

    default:
      return null;
  }
};
MyGroupListItem.propTypes = {
  type: PropTypes.oneOf(["joinRequestList", "myGroupList"]).isRequired,
  item: PropTypes.object.isRequired,
  acceptGroupRequest:PropTypes.func.isRequired,
  cancleGroupRequest:PropTypes.func.isRequired,
};
export default MyGroupListItem;
