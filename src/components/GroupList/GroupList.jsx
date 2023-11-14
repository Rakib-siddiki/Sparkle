import groupImg1 from "../../assets/home/groupLists/groupImg1.png";
import { useEffect, useState } from "react";
import PopUp from "./PopUp";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import NoData from "../noDataToShow/NoData";
import LoadingSpinner from "../handleloading/LoadingSpinner";
import PropTypes from "prop-types"; // Import PropTypes
import { filteredGroups} from "../reUseAble/Searching";
const GroupList = ({ searchQuery }) => {
  GroupList.propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  const data = useSelector((state) => state.userInfo.userValue); // getting value from store

  const db = getDatabase();
  const [loading, setLoading] = useState(true);
  const [grouplist, setGrouplist] = useState([]);
  const [groupJoinRequest, setGroupJoinRequest] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const handleShow = () => {
    setShowPopUp((prev) => !prev);
  };
  // get user lists
  useEffect(() => {
    const groupListRef = ref(db, "grouplist/");
    onValue(groupListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        {
          if (
            data.uid !== item.val().adminId &&
            data.uid !== item.val().othersGroupId
          ) {
            arr.push({ ...item.val(), id: item.key });
          }
        }
      });
      setGrouplist(arr);
      setLoading(false);
    });
  }, [data.uid, db]);

  const handleJoin = (item) => {
    set(push(ref(db, "groupJoinRequest/")), {
      ...item,
      senderId: data.uid,
      senderName: data.displayName,
    });
  };
  // get group join request
  useEffect(() => {
    const groupJoinRequestRef = ref(db, "groupJoinRequest/");

    onValue(groupJoinRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        {
          arr.push(item.val().senderId + item.val().id);
        }
      });
      setGroupJoinRequest(arr);
    });
  }, [data.uid, db]);


  // search method filltering
  const filteredGroupsList = filteredGroups(grouplist,searchQuery)
  return (
    <>
      <div className="h-[77%] xxl:h-[338px] pt-3 xxl:mt-10 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-1">
          <h3 className="font-pops text-xl font-semibold">Groups List</h3>
          <div>
            <p
              onClick={handleShow}
              className="text-md cursor-pointer font-semibold font-pops capitalize text-primary"
            >
              Create Group
            </p>
            {showPopUp && <PopUp handleShow={handleShow} />}
          </div>
        </div>
        <ul className=" h-[88%] overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : grouplist.length === 0 ? (
            <NoData />
          ) : searchQuery ? (
            filteredGroupsList.length > 0 ? (
              // Render user information here based on the filtered group data
              filteredGroupsList.map((item, i) => (
                // Render user information based on the filtered group data
                <li
                  key={i}
                  className="py-3 pr-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
                >
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
                      <div className="inline-block p-1.5 bg-primary rounded-[5px] text-base text-white cursor-pointer border-[1px] border-solid border-primary duration-300 hover:text-primary hover:bg-white">
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
              ))
            ) : (
              <NoData />
            )
          ) : (
            grouplist.map((item, i) => (
              <li
                key={i}
                className="py-3 pr-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
              >
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
                    <div className="inline-block p-1.5 bg-primary rounded-[5px] text-base text-white cursor-pointer border-[1px] border-solid border-primary duration-300 hover:text-primary hover:bg-white">
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
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default GroupList;
