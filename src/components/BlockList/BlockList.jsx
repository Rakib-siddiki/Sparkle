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

const BlockedUsers = () => {
  const data = useSelector((state) => state.userInfo.userValue);

  const db = getDatabase();
  const [blocklist, setBlockList] = useState([]);
  useEffect(() => {
    const blockListRef = ref(db, "blockedUsers/");
    onValue(blockListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setBlockList(arr);
    });
  }, [db]);
  const unblockUser = (item) => {
    console.log(item);
    set(push(ref(db, "accepted/")), {
      ...item,
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
          {blocklist.map((item, i) => (
            <li
              key={i}
              className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
            >
              <div className="flex items-center">
                <div className="mr-3.5">
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
                <div className="">
                  <h5 className="font-pops text-sm font-semibold">
                    {" "}
                    {data.uid == item.senderId
                      ? item.recevierName
                      : item.senderName}
                  </h5>
                  <h5 className="font-pops text-[10px] font-medium text-[#00000080] mt-1">
                    Today, 8:56pm
                  </h5>
                </div>
              </div>
              <div className="mr-9">
                <button
                  onClick={() => unblockUser(item)}
                  className=" active:scale-90 font-pops text-xl font-semibold text-white px-1.5 py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300"
                >
                  Unblock
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BlockedUsers;
