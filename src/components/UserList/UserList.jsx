import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoData from "../noDataToShow/NoData";
import LoadingSpinner from "../handleloading/LoadingSpinner";
import { PropTypes } from "prop-types";
import { filteredUser } from "../reUseAble/Searching";
import UserListItem from "../reUseAble/listItems/UserListItem";

// for userList
const UserList = ({ searchQuery }) => {
  UserList.propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };
  const [loading, setLoading] = useState(true);

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
        arr.push(item.val().blockById + item.val().blockId);
      });
      setIfBlocked(arr);
    });
  }, [db]);

  // search method filltering

  const filteredUserList = filteredUser(userData, searchQuery);

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
                  ifBlocked={ifBlocked}
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
                ifBlocked={ifBlocked}
                isAccepted={isAccepted}
                friendRequestData={friendRequestData}
                sendRequest={sendRequest}
              >
              </UserListItem>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default UserList;
