import { useEffect, useState } from "react";
import PopUp from "./PopUp";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import NoData from "../noDataToShow/NoData";
import LoadingSpinner from "../loading/LoadingSpinner";
import PropTypes from "prop-types";
import { filteredGroups } from "../reUseAble/Searching";
import AllGroupListItem from "../reUseAble/listItems/AllGroupListItem";

const GroupList = ({ searchQuery}) => {
  const data = useSelector((state) => state.userInfo.userValue);
  const db = getDatabase();
  const [loading, setLoading] = useState(true);
  const [grouplist, setGrouplist] = useState([]);
  const [groupJoinRequest, setGroupJoinRequest] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleShow = () => {
    setShowPopUp((prev) => !prev);
  };

  // get user lists
  useEffect(() => {
    const groupListRef = ref(db, "grouplist/");
    onValue(groupListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log("🚀 > file: GroupList.jsx:29 > snapshot.forEach > item:", item.val())
        const members = item.val().members || []; // Ensure members array is defined
        const isMember = members.includes(data.uid);
        if (
          data.uid !== item.val().adminId &&
          data.uid !== item.val().othersGroupId &&!isMember
          
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setGrouplist(arr);
      setLoading(false);
    });
  }, [data.uid, db]);

  const handleJoin = (item) => {
    const newJoinRequest = {
      ...item,
      senderId: data.uid,
      senderName: data.displayName,
    };

    // Add the join request to the groupJoinRequest node
    const newJoinRequestRef = push(ref(db, "groupJoinRequest/"));
    set(newJoinRequestRef, newJoinRequest);

    // Update the state to include the newly joined group
    setGrouplist((prevList) => [
      ...prevList,
      { ...item, id: newJoinRequestRef.key },
    ]);
   
  };

  // get group join request
  useEffect(() => {
    const groupJoinRequestRef = ref(db, "groupJoinRequest/");
    onValue(groupJoinRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().senderId + item.val().id);
      });
      setGroupJoinRequest(arr);
    });
  }, [data.uid, db]);

  // search method filtering
  const filteredGroupsList = filteredGroups(grouplist, searchQuery);

  return (
    <>
      <div className="h-[77%] xxl:h-[338px] pt-3 xxl:mt-10 pb-3 pl-5 pr-[22px] rounded-20px shadow-CardShadow">
        <div className="flex justify-between mb-1">
          <h3 className="font-pops text-xl font-semibold">Groups List</h3>
          <div>
            <p
              onClick={handleShow}
              className="text-md cursor-pointer font-semibold font-pops capitalize text-primary"
            >
              Create Group
            </p>
            {showPopUp && <PopUp handleShow={handleShow} />}
          </div>
        </div>
        <ul className=" h-[88%] overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : grouplist.length === 0 ? (
            <NoData />
          ) : searchQuery ? (
            filteredGroupsList.length > 0 ? (
              // Render user information here based on the filtered group data
              filteredGroupsList.map((item, i) => (
                <AllGroupListItem
                  key={i}
                  item={item}
                  data={data}
                  groupJoinRequest={groupJoinRequest}
                  handleJoin={handleJoin}
                />
              ))
            ) : (
              <NoData />
            )
          ) : (
            grouplist.map((item, i) => (
              <AllGroupListItem
                key={i}
                item={item}
                data={data}
                groupJoinRequest={groupJoinRequest}
                handleJoin={handleJoin}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
};

GroupList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default GroupList;
