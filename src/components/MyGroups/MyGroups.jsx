import { BsThreeDotsVertical } from "react-icons/bs";

import friendsImg1 from "../../assets/home/friends/friendsImg1.png";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoData from "../noDataToShow/NoData";
import LoadingSpinner from "../loading/LoadingSpinner";
const MyGroups = () => {
  const db = getDatabase();
  const [myGroups, setMyGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupJoinRequest, setGroupJoinRequest] = useState([]);
   const data = useSelector((state) => state.userInfo.userValue);

// getting my group
  useEffect(() => {
    const myGroupsRef = ref(db, "groupList");
    onValue(myGroupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminId ) {          
          arr.push({ ...item.val()});
        }else if (data.uid == item.val().newJoinId) {
          arr.push({ ...item.val() });
        }
      });
      setMyGroups(arr);
      setLoading(false);
    });
  }, [data.uid,db]);

  //get group join request
  useEffect(() => {
    const groupJoinRequestRef = ref(db, "groupJoinRequest");
    onValue(groupJoinRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminId ) {
          arr.push({ ...item.val(), JoinId: item.key });
        }
      });
      setGroupJoinRequest(arr);
    });
  }, [data.uid, db]);
 
  // makeing accept function
  const acceptGroupReq = (item) => {
    console.log("🚀 > file: MyGroups.jsx:44 > acceptGroupReq > item:", item)
    set(ref(db, "groupList/" + item.listId), {
      groupName: item.groupName,
      groupTitle: item.groupTitle,
      adminId: item.adminId,
      admin: item.admin,
      newJoinId: item.senderId,
    }).then(() => remove(ref(db, "groupJoinRequest/" + item.JoinId)));
  };
  return (
    <>
      <div className="w-full  h-full  pt-5 pb-1.5 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-2">
          <h3 className="font-popstext-xl font-semibold">My Groups</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>

        <ul className="eraseBorder h-[86%] overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : myGroups.length === 0 ? (
            <NoData />
          ) : (myGroups.map((item, i) => (
            <li
              key={i}
              className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
            >
              <div className="flex items-center">
                <div className="relative mr-3.5">
                  <img
                    className="w-[54px] h-[54px] rounded-full object-cover"
                    src={friendsImg1}
                    alt="Ellipse2.png"
                  />
                </div>
                <div className="">
                  <h5 className="font-popstext-sm font-semibold">
                    {item.groupName}
                  </h5>
                  <p className="font-popstext-xs font-medium text-[#4D4D4DBF] mt-0.5">
                    {item.groupTitle}
                  </p>
                </div>
              </div>
              <h5 className="font-popstext-[10px] font-medium text-[#00000080]">
                Today, 8:56pm
              </h5>
            </li>
          )))}
          {groupJoinRequest.map((item, i) => (
            <li
              key={i}
              className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
            >
              <div className="flex items-center">
                <div className="relative mr-3.5">
                  <img
                    className="w-[54px] h-[54px] rounded-full object-cover"
                    src={friendsImg1}
                    alt="Ellipse2.png"
                  />
                </div>
                <div className="">
                  <h5 className="font-popstext-sm font-semibold">
                    {item.senderName}
                  </h5>
                  <p className="font-popstext-xs font-medium text-[#4D4D4DBF] mt-0.5">
                    {item.senderName} Wants to join!
                  </p>
                </div>
              </div>
              <button 
              onClick={()=>acceptGroupReq(item)}
              className=" active:scale-90 font-pops text-xl font-semibold text-white px-1.5 py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300">
                Accept
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MyGroups;
