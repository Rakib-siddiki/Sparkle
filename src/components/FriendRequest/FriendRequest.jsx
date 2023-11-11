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
import LoadingSpinner from "../handleloading/LoadingSpinner";

const FriendRequest = () => {
  const [loading, setLoading] = useState(true);
  const db = getDatabase();
  const data = useSelector((state) => state.userInfo.userValue);
  const [requestList, setRequestList] = useState([]);
  useEffect(() => {
    const friendListRef = ref(db, "friendRequest/");
    onValue(friendListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid === item.val().receiverId) {
          arr.push({ ...item.val(), userId: item.key });
        }
      });
      setRequestList(arr);
      setLoading(false)
    });
  }, [data.uid, db]);

  const acceptRequest = (item) => {
    set(push(ref(db, "accepted/")), {
      ...item,
    }).then(() => remove(ref(db, "friendRequest/" + item.userId)));
  };

  return (
    <>
      <div className="w-[32%] h-[355px] pt-5 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-2">
          <h3 className="font-pops text-xl font-semibold">Friend Request</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>

        <ul className=" h-[88%] overflow-y-auto">
          {loading?<LoadingSpinner/>:requestList.length === 0 ? (
            <NoData />
          ) : (
            requestList.map((item, i) => (
              <li
                key={i}
                className="py-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
              >
                <div className="flex items-center">
                  <div className="mr-3.5">
                    <img
                      className="w-[70px] h-[70px] rounded-full object-cover"
                      src={item.senderProfile_picture}
                      alt="profile_picture"
                    />
                  </div>
                  <div className="">
                    <h5 className="font-pops text-lg font-semibold">
                      {item.senderName}
                    </h5>
                    <p className="font-pops text-sm font-medium text-[#4D4D4DBF] mt-0.5">
                      Dinner?
                    </p>
                  </div>
                </div>
                <div className="mr-9">
                  <button
                    onClick={() => acceptRequest(item)}
                    className=" active:scale-90 font-pops text-xl font-semibold text-white px-1.5 py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300"
                  >
                    Accept
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default FriendRequest;
