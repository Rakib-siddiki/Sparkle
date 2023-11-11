import { useDispatch, useSelector } from "react-redux";
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
import { userLogInfo } from "../../slices/userSlice";
const Home = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
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

        dispatch(userLogInfo(user));
        localStorage.setItem("userData", JSON.stringify(user));
      });
    }
  }, [auth, data, dispatch, navigate]);

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
        <section className="h-screen md:max-h-screen  pt-16 p-2.5 md:p-3 xl:p-5 md:grid grid-cols-9 gap-10 lg:landscape:gap-5 xl:landscape:gap-10">
          <div className="col-span-1">
            <Sidebar />
          </div>
          {/* <div className="md:h-full col-span-1 fixed md:static w-full left-0 bottom-0 z-[70]">
                     <Sidebar />
                  </div> */}

          <div className="w-full h-full md:col-span-8 flex flex-wrap justify-between md:content-between xl:content-around">
            {/* Group List */}
            <div className="w-full md:w-[32%] h-full md:h-[290px] lg:h-[305px] 2xl:h-[360px]">
              <div className="h-full flex flex-col justify-between">
                <SearchBox />
                <GroupList />
              </div>
            </div>

            <div className="w-full md:w-[32%] h-full md:h-[290px] lg:h-[305px] 2xl:h-[360px]">
              <Friends />
            </div>
            <div className="w-full md:w-[32%] h-full md:h-[290px] lg:h-[305px] 2xl:h-[360px]">
              <UserList />
            </div>
            <div className="w-full md:w-[32%] h-full md:h-[290px] lg:h-[305px] 2xl:h-[360px]">
              <FriendRequest />
            </div>
            <div className="w-full md:w-[32%] h-full md:h-[290px] lg:h-[305px] 2xl:h-[360px]">
              <MyGroups />
            </div>
            <div className="w-full md:w-[32%] h-full md:h-[290px] lg:h-[305px] 2xl:h-[360px] ">
              <BlockedUsers />
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="h-screen bg-primary flex flex-col justify-center items-center">
            <h1 className="font-nunito text-[85px] text-white font-bold mb-5">
              Please Verify Your Email
            </h1>
            <button
              onClick={()=>(navigate('/login'))}
              className="py-5 px-7 font-nunito text-xl text-black font-semibold text-center bg-white rounded-[9px] hover:text-white hover:bg-[#FF9A00] duration-300"
              type="button"
            >
              Go Back to Login
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
