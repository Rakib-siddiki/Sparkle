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
import NoData from "../noDataToShow/NoData";
import LoadingSpinner from "../handleloading/LoadingSpinner";
import PropTypes from "prop-types"; // Import PropTypes
import { filteredBlockUsers } from "../reUseAble/Searching";
import BlockListItemItem from "../reUseAble/listItems/BlockListItemItem";

const BlockedUsers = ({searchQuery}) => {
  BlockedUsers.propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state.userInfo.userValue);
  const db = getDatabase();
  const [blocklist, setBlockList] = useState([]);
  useEffect(() => {
    const blockListRef = ref(db, "blockedUsers/");
    onValue(blockListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().blockId ||
          data.uid == item.val().blockById
        ) {
          if (data.uid == item.val().blockById) {
            arr.push({
              id: item.key,
              block: item.val().block,
              blockId: item.val().blockId,
              profile_Picture: item.val().blockProfile,
            });
          } else {
            arr.push({
              id: item.key,
              block: item.val().blockBy,
              blockById: item.val().blockById,
              profile_Picture: item.val().blockByProfile,
            });
          }
        }
      });
      setBlockList(arr);
      setLoading(false);
    });
  }, [data.uid, db]);
  const unblockUser = (item) => {
    console.log(item);
    set(push(ref(db, "accepted/")), {
      senderProfile_picture: item.profile_Picture,
      senderName: item.block,
      senderId: item.blockId,
      recevierProfile_picture: data.photoURL,
      recevierName: data.displayName,
      receiverId: data.uid,
    }).then(() => {
      remove(ref(db, "blockedUsers/" + item.id));
    });
  };

  const filteredBlockUsersList = filteredBlockUsers(blocklist,searchQuery)
  return (
    <>
      <div className=" w-[32%] h-[355px] pt-5 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-5">
          <h3 className="font-pops text-xl font-semibold">Blocked Users</h3>
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

export default BlockedUsers;
