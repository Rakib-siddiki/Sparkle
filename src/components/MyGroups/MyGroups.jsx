import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../noDataToShow/NoData";
import LoadingSpinner from "../loading/LoadingSpinner";
import { PropTypes } from "prop-types";
import { fillterdMyGroups } from "../reUseAble/Searching";
import MyGroupListItem from "../reUseAble/listItems/MyGroupListItem";
import { activeChat } from "../../slices/activeChatSlice";
const MyGroups = ({ searchQuery }) => {
  const [loading, setLoading] = useState(true);
  const [myGroupsList, setMyGroupsList] = useState([]);
  const [getJoinRequest, setGetJoinRequest] = useState([]);
  const data = useSelector((state) => state.userInfo.userValue); // getting value from store
  const dispatch =useDispatch()
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
        if (data.uid == item.val().othersGroupId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });

      setMyGroupsList(arr);
      setLoading(false);
    });
  }, [data.uid, db]);
  //  get groupJoinRequests
  useEffect(() => {
    const getJoinRequestRef = ref(db, "groupJoinRequest/");
    onValue(getJoinRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminId) {
          arr.push({ ...item.val(), JoinId: item.key });
        }
      });

      setGetJoinRequest(arr);
    });
  }, [data.uid, db]);
  // Acepting group request
  const acceptGroupRequest = (item) => {
    console.log("🚀 > file: MyGroups.jsx:52 > acceptGroupRequest > item:", item)
    set(ref(db, "grouplist/" + item.id), {
      admin: item.admin,
      adminId: item.senderId,
      othersGroupId: item.adminId,
      groupName: item.groupName,
      groupTitle: item.groupTitle,
      id: item.id,
    }).then(() => remove(ref(db, "groupJoinRequest/" + item.JoinId)));
  };
  const cancleGroupRequest = (item) => {
    remove(ref(db, "groupJoinRequest/" + item.JoinId));
  };

  // search method filltering
  const fillterdMyGroupsList = fillterdMyGroups(myGroupsList, searchQuery);
  // going To Chat 
  const goingToChat =(item)=> {
    console.log("🚀 > file: MyGroups.jsx:69 > goingToChat > item:", item)
    const users={
      name:item.groupName,
      type:"group",
      adminId:item.adminId,
      othersId:item.othersGroupId
    }
   if (users.type ==="group") {
     dispatch(activeChat(users));
     localStorage.setItem("activeUser", JSON.stringify(users));
   }
  }
  return (
    <>
      <div className="w-full  h-full  pt-5 pb-1.5 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-2">
          <h3 className="font-popstext-xl font-semibold">My Groups</h3>
          <div className="text-2xl cursor-pointer text-primary">
            <BsThreeDotsVertical />
          </div>
        </div>

        <ul className=" h-[86%] overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : myGroupsList.length === 0 ? (
            <NoData />
          ) : searchQuery ? (
            fillterdMyGroupsList.length > 0 ? (
              fillterdMyGroupsList.map((item, i) => (
                <MyGroupListItem type="myGroupList" key={i} item={item} goingToChat={goingToChat}/>
              ))
            ) : (
              <NoData />
            )
          ) : (
            myGroupsList.map((item, i) => (
              <MyGroupListItem type="myGroupList" key={i} item={item} goingToChat={goingToChat}/>
            ))
          )}
          {getJoinRequest.map((item, i) => (
            <MyGroupListItem
              type="joinRequestlist"
              key={i}
              item={item}
              acceptGroupRequest={acceptGroupRequest}
              cancleGroupRequest={cancleGroupRequest}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
MyGroups.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
export default MyGroups;
