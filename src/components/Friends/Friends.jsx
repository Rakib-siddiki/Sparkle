import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NoData from "../noDataToShow/NoData";
import LoadingSppiner from "../handleloading/LoadingSpinner";
import PropTypes from "prop-types";
import { fillterdFriend } from "../reUseAble/Searching";
import FriendListItem from "../reUseAble/listItems/FriendListItem";
const Friends = ({ searchQuery }) => {
  const [loading, setLoading] = useState(true);

  const db = getDatabase();
  const data = useSelector((state) => state.userInfo.userValue);
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
    console.log(item);
    if (data.uid === item.senderId) {
      set(push(ref(db, "blockedUsers/")), {
        block: item.recevierName,
        blockId: item.receiverId,
        blockProfile: item.recevierProfile_picture,
        blockBy: item.senderName,
        blockById: item.senderId,
        blockByProfile: item.senderProfile_picture,
      }).then(() => remove(ref(db, "accepted/" + item.id)));
    } else {
      set(push(ref(db, "blockedUsers/")), {
        block: item.senderName,
        blockId: item.senderId,
        blockProfile: item.senderProfile_picture,
        blockBy: item.recevierName,
        blockById: item.receiverId,
        blockByProfile: item.recevierProfile_picture,
      }).then(() => remove(ref(db, "accepted/" + item.id)));
    }
  };

  // search method filltering
  const fillterdFriendList = fillterdFriend(friendList, searchQuery, data.uid);
  return (
    <>
      <div className=" w-[32%] h-[355px] xxl:h-[489px] pt-5 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-5">
          <h3 className="font-pops text-xl font-semibold">Friends</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>
        <ul className=" h-[86%] overflow-y-auto">
          {loading ? (
            <LoadingSppiner />
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
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
};
Friends.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
export default Friends;
