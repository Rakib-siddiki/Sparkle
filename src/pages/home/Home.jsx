import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ColorRing } from "react-loader-spinner";

import SearchBox from "../../components/searchBox/SearchBox";
import GroupList from "../../components/GroupList/GroupList";
import Friends from "../../components/Friends/Friends";
import UserList from "../../components/UserList/UserList";
import FriendRequest from "../../components/FriendRequest/FriendRequest";
import MyGroups from "../../components/MyGroups/MyGroups";
import BlockedUsers from "../../components/BlockList/BlockList";
const Home = () => {
  const auth = getAuth();
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state.userInfo.userValue); // getting value from store
  const navigate = useNavigate();
  useEffect(() => {
    if (!data) {
      navigate("/login");
    } else {
      onAuthStateChanged(auth, (user) => {
        (user.emailVerified && setVerify(true)) || setLoading(false);
      });
    }
  }, [auth, data, navigate]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ColorRing
            visible={true}
            height="120"
            width="120"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#FFCD4B"]}
          />
        </div>
      ) : verify ? (
        <section className="h-screen px-5 py-5 grid grid-cols-9 gap-10">
          <div className="h-full col-span-1 ">
            <Sidebar></Sidebar>
          </div>
          <div className="w-full col-span-8 flex flex-col">
            <div className="flex justify-between">
              {/* Group List */}
              <div className=" w-[32%] h-[355px] flex flex-col justify-between">
                <SearchBox />
                <GroupList />
              </div>

              {/* Friends */}
              <Friends />

              {/* User List */}
              <UserList />
            </div>

            <div className="flex justify-between  ">
              {/* Friend Request */}
              <FriendRequest />

              {/* My Groups */}
              <MyGroups />

              {/* Blocked Users */}
              <BlockedUsers />
            </div>
          </div>
        </section>
      ) : (
        <>
          <div>
            <h1 className="h-screen bg-primary font-semibold text-white text-5xl flex justify-center items-center ">
              Please Verify Your account Before Expolore😉
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
