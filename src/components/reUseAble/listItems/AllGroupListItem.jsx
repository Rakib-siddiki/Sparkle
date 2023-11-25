import PropTypes from "prop-types";
const AllGroupListItem = ({ item, groupJoinRequest, data, handleJoin }) => {
  return (
    <>
      <li className="py-3 pr-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
        <div className="flex items-center">
          <div className="">
            <img
              className="mr-3.5 w-[70px] h-[70px] rounded-full object-cover"
              src={item.profilePicture}
              alt="groupImg1"
            />
          </div>
          <div className="">
            <h5 className="font-pops text-[18px] font-semibold">
              {item.groupName}
            </h5>
            <p className="font-pops text-base font-medium text-[#4D4D4DBF]">
              {item.groupTitle}
            </p>
          </div>
        </div>
        <div className="">
          {groupJoinRequest.includes(data.uid + item.id) ||
          groupJoinRequest.includes(item.id + data.uid) ? (
            <div className="inline-block p-1.5 bg-primary font-semibold rounded-[5px] text-xl text-white cursor-pointer border-[1px] border-solid border-primary duration-300 hover:text-primary hover:bg-white">
              Pending
            </div>
          ) : (
            <button
              onClick={() => handleJoin(item)}
              className=" active:scale-90 font-pops text-xl font-semibold text-white px-[22px] py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300"
            >
              Join
            </button>
          )}
        </div>
      </li>
    </>
  );
};
AllGroupListItem.propTypes = {
  item: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  groupJoinRequest: PropTypes.array.isRequired,
  handleJoin: PropTypes.func.isRequired,
};
export default AllGroupListItem;
