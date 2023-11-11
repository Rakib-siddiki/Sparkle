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
import NoData from "../GroupList/noDataToShow/NoData";

const BlockedUsers = () => {
  const data = useSelector((state) => state.userInfo.userValue);
  console.log(
    "🚀 > file: BlockList.jsx:15 > BlockedUsers > data:",
    data.PhotoURL
  );

  const db = getDatabase();
  const [blocklist, setBlockList] = useState([]);
  useEffect(() => {
    const blockListRef = ref(db, "blockedUsers/");
    onValue(blockListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(
          "🚀 > file: BlockList.jsx:16 > onValue > item:",
          item.val()
        );
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
          {blocklist.length === 0 ? (
            <NoData />
          ) : (
            blocklist.map((item, i) => (
              <li
                key={i}
                className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
              >
                <div className="flex items-center">
                  <div className="mr-3.5">
                    <img
                      className="w-[54px] h-[54px] rounded-full object-cover"
                      src={item.profile_Picture}
                      alt="friendsImg1"
                    />
                  </div>
                  <div className="">
                    <h5 className="font-pops text-sm font-semibold">
                      {item.block}
                    </h5>
                    <h5 className="font-pops text-[10px] font-medium text-[#00000080] mt-1">
                      Today, 8:56pm
                    </h5>
                  </div>
                </div>
                <div className="mr-9">
                  {!item.blockById && (
                    <button
                      onClick={() => unblockUser(item)}
                      className=" active:scale-90 font-pops text-xl font-semibold text-white px-1.5 py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300"
                    >
                      Unblock
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

export default BlockedUsers;
