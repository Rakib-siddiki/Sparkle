import PropTypes  from "prop-types";
const FriendListItem = ({item,data,blockedUsers,active}) => {
    return (
      <>
        <li className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
          <div className="flex items-center">
            <div className="relative mr-3.5 ">
              <img
                className="w-[54px] h-[54px] rounded-full object-cover"
                src={
                  data.uid == item.senderId
                    ? item.recevierProfile_picture
                    : item.senderProfile_picture
                }
                alt="friendsImg1"
              />
            </div>
            <div>
              <h5 className="font-pops text-sm font-semibold">
                {data.uid == item.senderId
                  ? item.recevierName
                  : item.senderName}
              </h5>
              <p className="font-pops text-xs font-medium text-[#4D4D4DBF] mt-0.5">
                Dinner ?
              </p>
            </div>
          </div>
          <button
            onClick={() => blockedUsers(item)}
            className={`active:scale-90 font-pops text-xl font-semibold text-white px-1.5 py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300 capitalize ${
              active == "message" ? `hidden` : `block`
            }`}
          >
            Block
          </button>
        </li>
      </>
    );
};

FriendListItem.propTypes={
    item:PropTypes.object.isRequired,
    data:PropTypes.object.isRequired,
    blockedUsers:PropTypes.func.isRequired,
    active:PropTypes.deafult
}

export default FriendListItem;