import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import GroupList from "../../components/GroupList/GroupList";
import Friends from "../../components/Friends/Friends";
import UserList from "../../components/UserList/UserList";
import FriendRequest from "../../components/FriendRequest/FriendRequest";
import MyGroups from "../../components/MyGroups/MyGroups";
import BlockedUsers from "../../components/BlockList/BlockList";
import SearchBox from "../../components/SearchBox/SearchBox";
import { ColorRing } from "react-loader-spinner";
const Home = () => {
  const auth = getAuth();
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state.userInfo.userValue); // getting value from store
  const navigate = useNavigate();
  useEffect(() => {
    if (!data) {
      navigate("/login");
      setLoading(false);
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
      ) : verify && data ? (
        <section className="h-screen px-5 py-5 grid grid-cols-1 md:grid-cols-9 gap-5 xl:gap-10">
          <div className="h-full col-span-1 ">
            <Sidebar></Sidebar>
          </div>
          <div className="w-full col-span-8 flex flex-col">
            <div className="flex flex-col md:flex-row justify-between">
              {/* Group List */}
              <div className=" w-full md:w-[32%] h-[355px] flex flex-col justify-between">
                <SearchBox/>
                <GroupList />
              </div>

              {/* Friends */}
              <Friends />

              {/* User List */}
              <UserList />
            </div>

            <div className="flex flex-col md:flex-row justify-between  ">
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
          <div className="flex flex-col justify-center items-center h-screen bg-primary gap-5">
            <h1 className=" font-semibold text-white text-5xl ">
              Please Verify Your account Before Expolore😉
            </h1>
            <button
              onClick={() => navigate("/login")}
              className="bg-white p-4 rounded-md "
            >
              {" "}
              back to login
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
