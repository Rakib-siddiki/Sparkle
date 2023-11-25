import { useState } from "react";
import Chat from "../../components/Chat/Chat";
import ChatFriends from "../../components/Friends/Friends";
import SearchBox from "../../components/SearchBox/SearchBox";
import Sidebar from "../../components/sidebar/Sidebar";
import MyGroups from "../../components/MyGroups/MyGroups";

const Message = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <section className="h-screen pt-16 p-2.5 md:p-3 xl:p-5 md:grid grid-cols-9 gap-10 lg:landscape:gap-5 xl:landscape:gap-10">
        <div className="col-span-1">
          <Sidebar active="message" />
        </div>

        <div className="w-full h-full  md:col-span-8 grid grid-cols-12 gap-7">
          <div className="col-span-4 flex flex-wrap content-around">
            <div className="w-full h-full md:h-[290px] lg:h-[305px] 2xl:h-[360px] ">
              <div className="h-full flex flex-col justify-between">
                <SearchBox onSearch={(query) => setSearchQuery(query)} />
                <MyGroups searchQuery={searchQuery} />
              </div>
            </div>
            <div className="w-full h-full md:h-[290px] lg:h-[305px] 2xl:h-[360px] ">
              <ChatFriends active={"message"} searchQuery={searchQuery} />
            </div>
          </div>
          <div className="col-span-8 ">
            <Chat />
          </div>
        </div>
      </section>
    </>
  );
};

export default Message;
