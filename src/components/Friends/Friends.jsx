import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
} from "firebase/database";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Friends = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userInfo.userValue);
  const [friendList,setFriendList]=useState([])
  useEffect(() => {
    const friendListRef = ref(db, "accepted/");
    onValue(friendListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().receiverId || data.uid == item.val().senderId) {
          arr.push({ ...item.val(),userId:item.key });
        }
      });
      setFriendList(arr)
    });
  }, [data.uid, db]);
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
          {friendList.map((item, i) => (
            <li
              key={i}
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
              <button className=" active:scale-90 font-pops text-xl font-semibold text-white px-1.5 py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300 capitalize">
                Block
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Friends;
