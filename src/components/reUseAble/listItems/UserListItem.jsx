import { BiPlusMedical } from "react-icons/bi";
import  PropTypes  from "prop-types";
const UserListItem = ({
  item,
  data,
  isBlocked,
  isAccepted,
  friendRequestData,
  sendRequest,
}) => {
  return (
    <>
      <li
        
        className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
      >
        <div className="flex items-center">
          <div className="mr-3.5">
            <img
              className="w-[54px] h-[54px] rounded-full object-cover"
              src={item.profile_picture}
              alt="profile_picture"
            />
          </div>
          <div>
            <h5 className="font-pops text-sm font-semibold">{item.username}</h5>
            <h5 className="font-pops text-[10px] font-medium text-[#00000080] mt-1">
              Today, 8:56pm
            </h5>
          </div>
        </div>
        {isBlocked.includes(data.uid + item.userId) ||
        isBlocked.includes(item.userId + data.uid) ? (
          <div className="font-pops text-base font-medium text-[#4D4D4DBF] mr-5 capitalize">
            blocked
          </div>
        ) : isAccepted.includes(data.uid + item.userId) ||
          isAccepted.includes(item.userId + data.uid) ? (
          <div className="font-pops text-base font-medium text-[#4D4D4DBF] mr-5 capitalize">
            friend
          </div>
        ) : friendRequestData.includes(data.uid + item.userId) ||
          friendRequestData.includes(item.userId + data.uid) ? (
          <div className="inline-block active:scale-90 p-1.5 bg-primary rounded-[5px] text-base text-white cursor-pointer border-[1px] border-solid border-primary duration-300 hover:text-primary hover:bg-white mr-3">
            Pending
          </div>
        ) : (
          <div
            onClick={() => sendRequest(item)}
            className="inline-block active:scale-90 p-1.5 bg-primary rounded-[5px] text-base text-white cursor-pointer border-[1px] border-solid border-primary duration-300 hover:text-primary hover:bg-white mr-3"
          >
            <BiPlusMedical className="" />
          </div>
        )}
      </li>
    </>
  );
};
UserListItem.propTypes = {
  item: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  isBlocked: PropTypes.array.isRequired,
  isAccepted: PropTypes.array.isRequired,
  friendRequestData: PropTypes.array.isRequired,
  sendRequest: PropTypes.func.isRequired,
};
export default UserListItem;
