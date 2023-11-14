import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";

import friendsImg1 from "../../assets/home/friends/friendsImg1.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoData from "../noDataToShow/NoData";
import LoadingSpinner from "../handleloading/LoadingSpinner";
import { PropTypes } from "prop-types";
import { fillterdMyGroups } from "../reUseAble/Searching";
const MyGroups = ({ searchQuery }) => {

  MyGroups.propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };
  

  const [loading, setLoading] = useState(true);

  const [myGroupsList, setMyGroupsList] = useState([]);
  const [getJoinRequest, setGetJoinRequest] = useState([]);
  const data = useSelector((state) => state.userInfo.userValue); // getting value from store
  const db = getDatabase();
  // my own group
  useEffect(() => {
    const myGroupsRef = ref(db, "grouplist/");
    onValue(myGroupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminId) {
          arr.push({ ...item.val(), id: item.key });
        }
        if (data.uid == item.val().othersGroupId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });

      setMyGroupsList(arr);
      setLoading(false);
    });
  }, [data.uid, db]);
  //  get groupJoinRequests
  useEffect(() => {
    const getJoinRequestRef = ref(db, "groupJoinRequest/");
    onValue(getJoinRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminId) {
          arr.push({ ...item.val(), JoinId: item.key });
        }
      });

      setGetJoinRequest(arr);
    });
  }, [data.uid, db]);
  // Acepting group request
  const acceptGroupRequest = (item) => {
    set(ref(db, "grouplist/" + item.id), {
      admin: item.admin,
      adminId: item.senderId,
      othersGroupId: item.adminId,
      groupName: item.groupName,
      groupTitle: item.groupTitle,
      id: item.id,
    }).then(() => remove(ref(db, "groupJoinRequest/" + item.JoinId)));
  };

  // search method filltering 
  const fillterdMyGroupsList = fillterdMyGroups(myGroupsList,searchQuery)
  return (
    <>
      <div className="w-[32%] h-[355px] pt-5 pb-1.5 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-2">
          <h3 className="font-pops text-xl font-semibold">My Groups</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>

        <ul className=" h-[86%] overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : myGroupsList.length === 0 ? (
            <NoData />
          ) : searchQuery ? (
            fillterdMyGroupsList.length > 0 ? (
              fillterdMyGroupsList.map((item, i) => (
                <li
                  key={i}
                  className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
                >
                  <div className="flex items-center">
                    <div className="relative mr-3.5">
                      <img
                        className="w-[54px] h-[54px] rounded-full object-cover"
                        src={friendsImg1}
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
              ))
            ) : (
              <NoData />
            )
          ) : (
            myGroupsList.map((item, i) => (
              <li
                key={i}
                className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
              >
                <div className="flex items-center">
                  <div className="relative mr-3.5">
                    <img
                      className="w-[54px] h-[54px] rounded-full object-cover"
                      src={friendsImg1}
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
            ))
          )}
          {getJoinRequest.map((item, i) => (
            <li
              key={i}
              className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
            >
              <div className="flex items-center">
                <div className="relative mr-3.5">
                  <img
                    className="w-[54px] h-[54px] rounded-full object-cover"
                    src={friendsImg1}
                    alt="friendsImg1"
                  />
                </div>
                <div className="">
                  <h5 className="font-pops text-sm font-semibold">
                    {item.senderName}
                  </h5>
                  <p className="font-pops text-xs font-medium text-[#4D4D4DBF] mt-0.5">
                    {item.senderName} wants to join
                  </p>
                </div>
              </div>
              <div className="">
                <button
                  onClick={() => acceptGroupRequest(item)}
                  className=" active:scale-90 font-pops text-xl font-semibold text-white px-1.5 py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300"
                >
                  Accept
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MyGroups;
