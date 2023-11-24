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
import LoadingSpinner from "../loading/LoadingSpinner";
import NoData from "../noDataToShow/NoData";
import { filteredFriendRequest } from "../reUseAble/Searching";
import { PropTypes } from "prop-types";
import FriendReqListItem from "../reUseAble/listItems/FriendReqListItem";

const FriendRequest = ({searchQuery}) => {
  const db = getDatabase();
  const data = useSelector((state) => state.userInfo.userValue);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    });
  }, [data.uid, db]);

  const acceptRequest = (item) => {
    set(push(ref(db, "accepted/")), {
      ...item,
    }).then(() => remove(ref(db, "friendRequest/" + item.userId)));
  };

  // Search method filltering
  const filteredFriendReq = filteredFriendRequest(requestList, searchQuery);

  return (
    <>
      <div className="w-full  h-full  pt-5 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-2">
          <h3 className="font-popstext-xl font-semibold">Friend Request</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>

        <ul className=" h-[88%] overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : requestList.length === 0 ? (
            <NoData />
          ) : searchQuery ? (
            filteredFriendReq.length > 0 ? (
              filteredFriendReq.map((item, i) => (
                <FriendReqListItem
                  key={i}
                  item={item}
                  acceptRequest={acceptRequest}
                />
              ))
            ) : (
              <NoData />
            )
          ) : (
            requestList.map((item, i) => (
              <FriendReqListItem
                key={i}
                item={item}
                acceptRequest={acceptRequest}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
};
FriendRequest.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
export default FriendRequest;
