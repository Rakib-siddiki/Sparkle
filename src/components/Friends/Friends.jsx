// Importing necessary components and libraries
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NoData from "../noDataToShow/NoData";
import PropTypes from "prop-types";
import { fillterdFriend } from "../reUseAble/Searching";
import LoadingSpinner from "../loading/LoadingSpinner";
import FriendListItem from "../reUseAble/listItems/FriendListItem";
import { activeChat } from "../../slices/activeChatSlice";

// Functional component 'Friends' with props 'active' and 'searchQuery'
const Friends = ({ active, searchQuery }) => {
  // Initializing Firebase database
  const db = getDatabase();
  // Fetching user data from Redux state
  const data = useSelector((state) => state.userInfo.userValue);
  // Initializing Redux dispatcher
  const dispatch = useDispatch();
  // State variables for loading status and friend list
  const [loading, setLoading] = useState(true);
  const [friendList, setFriendList] = useState([]);

  // useEffect hook to fetch and update friend list based on changes
  useEffect(() => {
    // Creating a reference to the 'accepted' node in the Firebase database
    const friendListRef = ref(db, "accepted/");

    // Event listener for changes in the 'accepted' node
    onValue(friendListRef, (snapshot) => {
      let arr = [];
      // Iterating through the snapshot data and filtering friend list
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().receiverId ||
          data.uid == item.val().senderId
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      // Updating the friend list and setting loading status to false
      setFriendList(arr);
      setLoading(false);
    });
  }, [data.uid, db]);

  // Method to handle blocking users
  const blockedUsers = (item) => {
    // Extracting relevant information for blocked user
    const blockedUserId =
      data.uid == item.senderId ? item.receiverId : item.senderId;
    const blockedById =
      data.uid == item.senderId ? item.senderId : item.receiverId;
    const blockedUserName =
      data.uid == item.senderId ? item.recevierName : item.senderName;
    const blockedBy =
      data.uid == item.senderId ? item.senderName : item.recevierName;
    const blockedUserProfile =
      data.uid == item.senderId
        ? item.recevierProfile_picture
        : item.senderProfile_picture;
    const blockedByProfile =
      data.uid == item.senderId
        ? item.senderProfile_picture
        : item.recevierProfile_picture;

    // Adding blocked user to 'blockedUsers' node and removing from 'accepted' node
    set(push(ref(db, "blockedUsers/")), {
      blockedUserId: blockedUserId,
      blockedById: blockedById,
      blockedUserName: blockedUserName,
      blockedBy: blockedBy,
      blockedUserProfile: blockedUserProfile,
      blockedByProfile: blockedByProfile,
    }).then(() => remove(ref(db, "accepted/" + item.id)));
  };

  // Search method for filtering friend list
  const fillterdFriendList = fillterdFriend(friendList, searchQuery, data.uid);

  // Method to navigate to chat with a friend
  const goingToChat = (item) => {
    // Creating user data object for active chat
    const userData = {
      type: "single",
      name: data.uid === item.receiverId ? item.senderName : item.recevierName,
      userId: data.uid === item.receiverId ? item.senderId : item.receiverId,
      profilePic:
        data.uid === item.receiverId
          ? item.senderProfile_picture
          : item.recevierProfile_picture,
    };

    // Dispatching action to set active chat and storing in local storage
    if (userData.type === "single") {
      dispatch(activeChat(userData));
      localStorage.setItem("activeUser", JSON.stringify(userData));
    }
  };
  return (
    <>
      <div className="w-full  h-full  pt-5 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-5">
          <h3 className="font-popstext-xl font-semibold">Friends</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>
        <ul className=" h-[86%] overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : friendList.length === 0 ? (
            <NoData />
          ) : searchQuery ? (
            fillterdFriendList.length > 0 ? (
              fillterdFriendList.map((item, i) => (
                <FriendListItem
                  key={i}
                  item={item}
                  data={data}
                  blockedUsers={blockedUsers}
                  active={active}
                  goinToChat={goingToChat}
                />
              ))
            ) : (
              <NoData />
            )
          ) : (
            friendList.map((item, i) => (
              <FriendListItem
                key={i}
                item={item}
                data={data}
                blockedUsers={blockedUsers}
                active={active}
                goinToChat={goingToChat}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
};
Friends.propTypes = {
  active: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
export default Friends;
