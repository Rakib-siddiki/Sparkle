
import PropTypes from "prop-types"
const FriendReqListItem = ({item,acceptRequest}) => {
    return (
      <>
        <li
          className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
        >
          <div className="flex items-center">
            <div className="mr-3.5">
              <img
                className="w-[70px] h-[70px] rounded-full object-cover"
                src={item.senderProfile_picture}
                alt="profile_picture"
              />
            </div>
            <div className="">
              <h5 className="font-pops text-lg font-semibold">
                {item.senderName}
              </h5>
              <p className="font-pops text-sm font-medium text-[#4D4D4DBF] mt-0.5">
                Dinner?
              </p>
            </div>
          </div>
          <div className="mr-9">
            <button
              onClick={() => acceptRequest(item)}
              className=" active:scale-90 font-pops text-xl font-semibold text-white px-1.5 py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300"
            >
              Accept
            </button>
          </div>
        </li>
      </>
    );
};
FriendReqListItem.propTypes={
    item:PropTypes.object.isRequired,
    acceptRequest:PropTypes.func.isRequired
}
export default FriendReqListItem;