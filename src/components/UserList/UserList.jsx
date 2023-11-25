import { BsThreeDotsVertical } from "react-icons/bs";
// import { BiPlusMedical } from "react-icons/bi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../loading/LoadingSpinner";
import NoData from "../noDataToShow/NoData";
import { filteredUser } from "../reUseAble/Searching";
import { PropTypes } from "prop-types";
import UserListItem from "../reUseAble/listItems/UserListItem";

// for userList
const UserList = ({ searchQuery }) => {
  const [userData, setUserData] = useState([]);
  const [friendRequestData, setFriendRequestData] = useState([]);
  const [isAccepted, setIsAccepted] = useState([]);
  const [isBlocked, setIfBlocked] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
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
  //get Friend request lists data
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
  // get accepted lists data
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
  // get BlockedList data
  useEffect(() => {
    const ifBlockedRef = ref(db, "blockedUsers/");
    onValue(ifBlockedRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().blockedUserId + item.val().blockedById);
      });
      setIfBlocked(arr);
    });
  }, [db]);

  //search method for user list
  const filteredUserList = filteredUser(userData, searchQuery);

  return (
    <>
      <div className="w-full  h-full  pt-5 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-5">
          <h3 className="font-popstext-xl font-semibold">User List</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>
        <ul className=" h-[86%] overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : userData.length === 0 ? (
            <NoData />
          ) : searchQuery ? (
            filteredUserList.length > 0 ? (
              filteredUserList.map((item, i) => (
                <UserListItem
                  key={i}
                  item={item}
                  data={data}
                  isBlocked={isBlocked}
                  isAccepted={isAccepted}
                  friendRequestData={friendRequestData}
                  sendRequest={sendRequest}
                >
                  {" "}
                  <div> {console.log(item)}</div>
                </UserListItem>
              ))
            ) : (
              <NoData />
            )
          ) : (
            userData.map((item, i) => (
              <UserListItem
                key={i}
                item={item}
                data={data}
                isBlocked={isBlocked}
                isAccepted={isAccepted}
                friendRequestData={friendRequestData}
                sendRequest={sendRequest}
              ></UserListItem>
            ))
          )}
        </ul>
      </div>
    </>
  );
};
UserList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
export default UserList;
