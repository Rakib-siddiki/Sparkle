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

const BlockedUsers = () => {
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
  return (
    <>
      <div className="w-full h-full pt-5 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-5">
          <h3 className="font-popstext-xl font-semibold">Block List</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>
        <ul className="eraseBorder h-[86%] overflow-y-auto">
          {loading ? (
            <LoadingSpinner/>
          ) : blocklist.length === 0 ? (
            <NoData/>
          ) : (blocklist.map((item, i) => (
            <li
              key={i}
              className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
            >
              <div className="flex items-center">
                <div className="mr-3.5">
                  <img
                    className="w-[54px] h-[54px] rounded-full object-cover"
                    src={item.profile}
                    alt="friendsImg1"
                  />
                </div>
                <div className="">
                  <h5 className="font-pops text-sm font-semibold">
                    {item.UserName}
                  </h5>
                  <h5 className="font-pops text-[10px] font-medium text-[#00000080] mt-1">
                    Today, 8:56pm
                  </h5>
                </div>
                {console.log(
                  "🚀 > file: BlockList.jsx:67 > BlockedUsers > item:",
                  item
                )}
              </div>
              <div className="mr-9">
                {item.blockedById && (
                  <button
                    onClick={() => unblockUser(item)}
                    className=" active:scale-90 font-pops text-xl font-semibold text-white px-1.5 py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300"
                  >
                    Unblock
                  </button>
                )}
              </div>
            </li>
          )))}
        </ul>
      </div>
    </>
  );
};

export default BlockedUsers;
