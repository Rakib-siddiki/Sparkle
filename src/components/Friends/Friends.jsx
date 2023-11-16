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
import LoadingSpinner from "../loading/LoadingSpinner";
import PropTypes from "prop-types";
import { activeChat } from "../../slices/activeChatSlice";
const Friends = ({ active }) => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userInfo.userValue);
  const [loading, setLoading] = useState(true);
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    const friendListRef = ref(db, "accepted/");
    onValue(friendListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().receiverId ||
          data.uid == item.val().senderId
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendList(arr);
      setLoading(false);
    });
  }, [data.uid, db]);
  const blockedUsers = (item) => {
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

    set(push(ref(db, "blockedUsers/")), {
      blockedUserId: blockedUserId,
      blockedById: blockedById,
      blockedUserName: blockedUserName,
      blockedBy: blockedBy,
      blockedUserProfile: blockedUserProfile,
      blockedByProfile: blockedByProfile,
    }).then(() => remove(ref(db, "accepted/" + item.id)));
  };

  // going to chat
  const goingToChat = (item) => {
    console.log("🚀 > file: Friends.jsx:56 > goingToChat > item:", item);
    if (data.uid == item.receiverId) {
      localStorage.setItem("goingToChat",JSON.stringify(dispatch(
        activeChat({
          status: "single",
          name: item.senderName,
          id: item.senderId,
        })
      )))
      
    } else {
     localStorage.setItem(
       "goingToChat",
       JSON.stringify(
         dispatch(
           activeChat({
             status: "single",
             name: item.recevierName,
             id: item.receiverId,
           })
         )
       )
     );
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
        <ul className="eraseBorder h-[86%] overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : friendList.length === 0 ? (
            <NoData />
          ) : (
            friendList.map((item, i) => (
              <li
                key={i}
                onClick={() => goingToChat(item)}
                className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
              >
                <div className="flex items-center">
                  <div className="relative mr-3.5 ">
                    <img
                      className="w-[54px] h-[54px] rounded-full object-cover"
                      src={
                        data.uid == item.senderId
                          ? item.recevierProfile_picture
                          : item.senderProfile_picture
                      }
                      alt="friendsImg1"
                    />
                  </div>
                  <div>
                    <h5 className="font-pops text-sm font-semibold">
                      {data.uid == item.senderId
                        ? item.recevierName
                        : item.senderName}
                    </h5>
                    <p className="font-pops text-xs font-medium text-[#4D4D4DBF] mt-0.5">
                      Dinner ?
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => blockedUsers(item)}
                  className={`active:scale-90 font-pops text-xl font-semibold text-white px-1.5 py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300 capitalize ${
                    active == "message" ? `hidden` : `block`
                  }`}
                >
                  Block
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};
Friends.propTypes = {
  active: PropTypes.string.isRequired,
};
export default Friends;
