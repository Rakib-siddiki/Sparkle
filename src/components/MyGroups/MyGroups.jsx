import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue } from "firebase/database";

import friendsImg1 from "../../assets/home/friends/friendsImg1.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const MyGroups = () => {
  const [myGroups, setMyGroups] = useState([]);
  const data = useSelector((state) => state.userInfo.userValue); // getting value from store

  console.log("🚀 > file: MyGroups.jsx:8 > MyGroups > myGroups:", myGroups);
  const db = getDatabase();
  // my own group
  useEffect(() => {
    const myGroupsRef = ref(db, "grouplist/");
    onValue(myGroupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });

      setMyGroups(arr);
    });
  }, [data.uid, db]);
  //
  return (
    <>
      <div className="w-[32%] h-[355px] pt-5 pb-1.5 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-2">
          <h3 className="font-pops text-xl font-semibold">My Groups</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>

        <ul className=" h-[86%] overflow-y-auto">
          {myGroups.map((item, i) => (
            <li
              key={i}
              className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
            >
              <div className="flex items-center">
                <div className="relative mr-3.5">
                  <img
                    className="w-[54px] h-[54px] rounded-full object-cover"
                    src={friendsImg1}
                    alt="friendsImg1"
                  />
                </div>
                <div className="">
                  <h5 className="font-pops text-sm font-semibold">
                    {item.groupName}
                  </h5>
                  <p className="font-pops text-xs font-medium text-[#4D4D4DBF] mt-0.5">
                    {item.groupTitle}
                  </p>
                </div>
              </div>
              <h5 className="font-pops text-[10px] font-medium text-[#00000080]">
                Today, 8:56pm
              </h5>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MyGroups;
