import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../loading/LoadingSpinner";
import NoData from "../noDataToShow/NoData";
import { filteredBlockUsers } from "../reUseAble/Searching";
import PropTypes from "prop-types"; // Import PropTypes
import BlockListItemItem from "../reUseAble/listItems/BlockListItemItem";
const BlockedUsers = ({searchQuery}) => {
  const data = useSelector((state) => state.userInfo.userValue);
  const [loading, setLoading] = useState(true);
  const db = getDatabase();
  const [blocklist, setBlockList] = useState([]);
  useEffect(() => {
    const blocklistRef = ref(db, "blockedUsers/");
    onValue(blocklistRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // console.log("🚀 > file: BlockList.jsx:23 > snapshot.forEach > item:", item.val())
        const blockedById =
          data.uid == item.val().blockedById && item.val().blockedById;
        const blockedUserId =
          data.uid == item.val().blockedById
            ? item.val().blockedUserId
            : item.val().blockedUserId;
        const UserName =
          data.uid == item.val().blockedById
            ? item.val().blockedUserName
            : item.val().blockedBy;
        const profile =
          data.uid == item.val().blockedById
            ? item.val().blockedUserProfile
            : item.val().blockedByProfile;
        if (
          data.uid == item.val().blockedById ||
          data.uid == item.val().blockedUserId
        ) {
          arr.push({
            blockedUserId: blockedUserId,
            blockedById: blockedById,
            UserName: UserName,
            profile: profile,
            id: item.key,
          });
        }
      });
      setBlockList(arr);
      setLoading(false);
    });
  }, [data.uid, db]);
  const unblockUser = (item) => {
    console.log("🚀 > file: BlockList.jsx:49 > unblockUser > item:", item);
    set(push(ref(db, "accepted/")), {
      recevierProfile_picture: item.profile,
      receiverId: item.blockedUserId,
      recevierName: item.UserName,
      senderProfile_picture: data.photoURL,
      senderId: data.uid,
      senderName: data.displayName,
      userId: item.id,
    }).then(() => {
      remove(ref(db, "blockedUsers/" + item.id));
    });
  };
  // search method for blockUsers
  const filteredBlockUsersList = filteredBlockUsers(blocklist, searchQuery);

  return (
    <>
      <div className="w-full h-full pt-5 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-5">
          <h3 className="font-popstext-xl font-semibold">Block List</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>
        <ul className=" h-[86%] overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : blocklist.length === 0 ? (
            <NoData />
          ) : searchQuery ? (
            filteredBlockUsersList.length > 0 ? (
              filteredBlockUsersList.map((item, i) => (
                <BlockListItemItem
                  key={i}
                  item={item}
                  unblockUser={unblockUser}
                />
              ))
            ) : (
              <NoData />
            )
          ) : (
            blocklist.map((item, i) => (
              <BlockListItemItem
                key={i}
                item={item}
                unblockUser={unblockUser}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
};
BlockedUsers.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
export default BlockedUsers;
