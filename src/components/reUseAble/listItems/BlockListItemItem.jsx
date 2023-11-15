import PropTypes from 'prop-types'

const BlockListItemItem = ({item,unblockUser}) => {
    return (
      <>
        <li
          className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
        >
          <div className="flex items-center">
            <div className="mr-3.5">
              <img
                className="w-[54px] h-[54px] rounded-full object-cover"
                src={item.profile_Picture}
                alt="Image"
              />
            </div>
            <div className="">
              <h5 className="font-pops text-sm font-semibold">{item.block}</h5>
              <h5 className="font-pops text-[10px] font-medium text-[#00000080] mt-1">
                Today, 8:56pm
              </h5>
            </div>
          </div>
          <div className="mr-9">
            {!item.blockById && (
              <button
                onClick={() => unblockUser(item)}
                className=" active:scale-90 font-pops text-xl font-semibold text-white px-1.5 py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300"
              >
                Unblock
              </button>
            )}
          </div>
        </li>
      </>
    );
};

BlockListItemItem.propTypes={
    item:PropTypes.object.isRequired,
    unblockUser:PropTypes.func.isRequired,
}

export default BlockListItemItem;
