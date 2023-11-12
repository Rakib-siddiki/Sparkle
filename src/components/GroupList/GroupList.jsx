import groupImg1 from "../../assets/home/groupLists/groupImg1.png";
import { useSelector } from "react-redux";
import CreatePopUp from "./CreatePopUp";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import NoData from "../noDataToShow/NoData";
import LoadingSpinner from "../loading/LoadingSpinner";
const GroupList = () => {
  const data = useSelector((state) => state.userInfo.userValue); // getting value from store
  const [loading, setLoading] = useState(true);
  const [groupList, setGroupList] = useState([]);
  const db = getDatabase();
  const [showPopUp, setShowPopUp] = useState(false);
  const [groupJoinRequest, setGroupJoinRequest] = useState([]);
  
  const handleShow = () => {
    setShowPopUp((prev) => !prev);
  };
  // get group lists
  useEffect(() => {
    const groupListRef = ref(db, "groupList/");
    onValue(groupListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          data.uid !== item.val().adminId &&
          data.uid !== item.val().newJoinId
        ) {
          arr.push({ ...item.val(), listId: item.key });
        }
      });
      setGroupList(arr);
      setLoading(false);
    });
  }, [data.uid, db]);
  // sending Join requests
  const sendJoinRequest = (item) => {
    set(push(ref(db, "groupJoinRequest/")), {
      ...item,
      senderId: data.uid,
      senderName: data.displayName,
    });
  };
  //get group join request
  useEffect(() => {
    const groupJoinRequestRef = ref(db, "groupJoinRequest");
    onValue(groupJoinRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {       
          arr.push(item.val().adminId+item.val().senderId);        
      });
      setGroupJoinRequest(arr);
    });
  }, [data.uid, db]);
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
            {showPopUp && <CreatePopUp handleShow={handleShow} />}
          </div>
        </div>
        <ul className="eraseBorder h-[88%] overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : groupList.length === 0 ? (
            <NoData />
          ) : (
            groupList.map((item, i) => (
              <li
                key={i}
                className="py-3 md:pr-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
              >
                <div className="flex items-center">
                  <img
                    className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] rounded-full mr-2 md:mr-3.5"
                    src={groupImg1}
                    alt="g1.png"
                  />
                  <div className="">
                    <h5 className="font-pops text-base md:text-lg font-semibold">
                      {item.groupName}
                    </h5>
                    <p className="font-pops text-xs md:text-base font-medium text-[#4D4D4DBF]">
                      {item.groupTitle}
                    </p>
                  </div>
                </div>
                <div className="">
                  {console.log(item)}
                  {groupJoinRequest.includes(data.uid + item.adminId) ||
                  groupJoinRequest.includes(item.adminId + data.uid) ? (
                    <div className="inline-block p-1.5 bg-primary rounded-[5px] text-base text-white cursor-pointer border-[1px] border-solid border-primary duration-300 hover:text-primary hover:bg-white ">
                      Pending
                    </div>
                  ) : (
                    <button
                      onClick={() => sendJoinRequest(item)}
                      className=" active:scale-90 font-pops text-sm md:text-lg font-semibold text-white py-1 md:py-0.5 px-3.5 md:px-4.5  bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300 capitalize"
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
