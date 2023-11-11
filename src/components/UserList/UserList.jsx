import { BsThreeDotsVertical } from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoData from "../GroupList/noDataToShow/NoData";

// for userList
const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [friendRequestData, setFriendRequestData] = useState([]);
  const [isAccepted, setIsAccepted] = useState([]);
  const [ifBlocked, setIfBlocked] = useState([]);
  const db = getDatabase();
  const data = useSelector((state) => state.userInfo.userValue);
  useEffect(() => {
    const userLists = ref(db, "users/");
    onValue(userLists, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          arr.push({ ...item.val(), userId: item.key });
        }
      });
      setUserData(arr);
    });
  }, [data.uid, db]);

  const sendRequest = (item) => {
    set(push(ref(db, "friendRequest/")), {
      senderName: data.displayName,
      senderId: data.uid,
      senderProfile_picture: data.photoURL,
      recevierName: item.username,
      receiverId: item.userId,
      recevierProfile_picture: item.profile_picture,
    });
  };

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest/");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().senderId + item.val().receiverId);
      });
      setFriendRequestData(arr);
    });
  }, [db]);

  useEffect(() => {
    const isAcceptedRef = ref(db, "accepted/");
    let arr = [];
    onValue(isAcceptedRef, (snapshot) => {
      snapshot.forEach((item) => {
        arr.push(item.val().senderId + item.val().receiverId);
      });
      setIsAccepted(arr);
    });
  }, [db]);
  useEffect(() => {
    const ifBlockedRef = ref(db, "blockedUsers/");
    onValue(ifBlockedRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // console.log("🚀 > file: UserList.jsx:64 > snapshot.forEach > item:", item.val())
        arr.push(item.val().blockById + item.val().blockId);
      });
      setIfBlocked(arr);
    });
  }, [db]);
  return (
    <>
      <div className=" w-[32%] h-[355px] xxl:h-[490px] pt-5 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-5">
          <h3 className="font-pops text-xl font-semibold">User List</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>
        <ul className=" h-[86%] overflow-y-auto">
          {userData.length === 0 ? (
            <NoData />
          ) : (
            userData.map((item, i) => (
              <li
                key={i}
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
                    <h5 className="font-pops text-sm font-semibold">
                      {item.username}
                    </h5>
                    <h5 className="font-pops text-[10px] font-medium text-[#00000080] mt-1">
                      Today, 8:56pm
                    </h5>
                  </div>
                </div>
                {console.log(item)}
                {ifBlocked.includes(data.uid + item.userId) ||
                ifBlocked.includes(item.userId + data.uid) ? (
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
                  <div className="inline-block active:scale-90 p-1.5 bg-primary rounded-[5px] text-base text-white cursor-pointer border-[1px] border-solid border-primary duration-300 hover:text-primary hover:bg-white mr-14">
                    Pending
                  </div>
                ) : (
                  <div
                    onClick={() => sendRequest(item)}
                    className="inline-block active:scale-90 p-1.5 bg-primary rounded-[5px] text-base text-white cursor-pointer border-[1px] border-solid border-primary duration-300 hover:text-primary hover:bg-white mr-14"
                  >
                    <BiPlusMedical className="" />
                  </div>
                )}
                {/* {} */}
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default UserList;
