import groupImg1 from "../../assets/home/groupLists/groupImg1.png";
import { useEffect, useState } from "react";
import PopUp from "./PopUp";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const GroupList = () => {
  const data = useSelector((state) => state.userInfo.userValue); // getting value from store

  const db = getDatabase();
  const [grouplist, setGrouplist] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const handleShow = () => {
    setShowPopUp((prev) => !prev);
  };
// get user lists
  useEffect(() => {
    const starCountRef = ref(db, "grouplist/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        {
          console.log(item.val());
          if (data.uid !== item.val().adminId) {
            arr.push({ ...item.val(), id: item.key });
          }
        }
      });
      setGrouplist(arr);
    });
  }, [data.uid, db]);
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
          {grouplist.map((item, i) => (
            <li
              key={i}
              className="py-3 pr-3 flex justify-between items-center border-b-[1px] border-solid border-[#00000040]"
            >
              <div className="flex items-center">
                <div className="">
                  <img
                    className="mr-3.5 w-[70px] h-[70px] rounded-full object-cover"
                    src={groupImg1}
                    alt="groupImg1"
                  />
                </div>
                <div className="">
                  <h5 className="font-pops text-[18px] font-semibold">
                    {item.groupName}
                  </h5>
                  <p className="font-pops text-base font-medium text-[#4D4D4DBF]">
                    {item.groupTitle}
                  </p>
                </div>
              </div>
              <div className="">
                <button  className=" active:scale-90 font-pops text-xl font-semibold text-white px-[22px] py-0.5 bg-primary rounded-md border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300">
                  Join
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GroupList;
