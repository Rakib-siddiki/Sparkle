import { BsThreeDotsVertical } from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";
import { getDatabase, ref, onValue } from "firebase/database";

import friendsImg1 from "../../assets/home/friends/friendsImg1.png";
import { useEffect, useState } from "react";

const UserList = () => {
  const [userData,setUserData] = useState([])
  const db =getDatabase();
  useEffect(()=>{
    const userLists = ref(db, "users/");
    onValue(userLists, (snapshot) => {
      let arr =[];
      snapshot.forEach(item=>{
        const userInfo = item.val()
        arr.push(userInfo)
        console.log(arr);
      })
      setUserData(arr)
    });
  },[db])
  
  return (
    <>
      <div className=" w-[32%] h-[355px] xxl:h-[490px] pt-5 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-5">
          <h3 className="font-pops text-xl font-semibold">User List</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>
        <ul className=" h-[86%] overflow-y-auto">
          {userData.map((item,i) => (
            <li key={i} className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]">
              <div className="flex items-center">
                <div className="mr-3.5">
                  <img
                    className="w-[54px] h-[54px] rounded-full object-cover"
                    src={friendsImg1}
                    alt="friendsImg1"
                  />
                </div>
                <div>
                  <h5 className="font-pops text-sm font-semibold">{item.username}</h5>
                  <h5 className="font-pops text-[10px] font-medium text-[#00000080] mt-1">
                    Today, 8:56pm
                  </h5>
                </div>
              </div>
              <div className="inline-block active:scale-90 p-1.5 bg-primary rounded-[5px] text-base text-white cursor-pointer border-[1px] border-solid border-primary duration-300 hover:text-primary hover:bg-white mr-14">
                <BiPlusMedical className="" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserList;
