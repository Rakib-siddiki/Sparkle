import { HiDotsVertical } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { BsFillEmojiLaughingFill, BsFillCameraFill } from "react-icons/bs";
import groupImg1 from "../../assets/home/groupLists/groupImg1.png";
import img from "../../assets/login/login_img.jpg";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getDatabase, push, ref, set } from "firebase/database";

const Chat = () => {
  const activeData = useSelector((state) => state.activeChat.activeValue);
  console.log(activeData.Name);
  const db = getDatabase();
  const [message, setMessage] = useState("");
  const handleMessageSend = () => {
    if (activeData.status == "single") {
      set(push(ref(db, "chatting/")), {
        status: "single",
        message: message,
      });
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.target.key === "Enter") {
      handleMessageSend();
    }
  };
  return (
    <>
      <div className="w-full h-full rounded-custom shadow-homeCardShadow pl-12 pr-7 grid grid-rows-13">
        <div className="row-span-2 flex items-center justify-between border-b-[1px] border-solid border-[#00000040]">
          <div className="flex items-center">
            <div className=" inline-block relative mr-3.5 after:content-[''] after:h-[17px] after:w-[17px] after:bg-[#00FF75] after:absolute after:bottom-0.5 after:right-0.5 after:rounded-full after:border-solid after:border-white after:border-2 after:drop-shadow-iconDropShadow">
              <img
                className="w-[75px] h-[75px] rounded-full object-cover drop-shadow-iconDropShadow"
                src={groupImg1}
                alt="Ellipse2.png"
              />
            </div>
            <div className="ml-8">
              <h2 className="font-popstext-2xl font-semibold">
                {activeData.Name}
              </h2>
              <p className="font-popstext-sm text-[#000000D9]">Online</p>
            </div>
          </div>
          <div className="text-3xl cursor-pointer text-primary">
            <HiDotsVertical />
          </div>
        </div>
        <div className="row-span-9 py-4">
          <div className=" h-[480px] min-h-full max-h-full overflow-y-scroll">
            {/* reacivier msg  */}
            <div className="mt-8">
              <h4 className=" inline-block max-w-[85%] py-[13px] px-[27px] rounded-e-10px rounded-t-10px bg-[#F1F1F1] font-popstext-base font-medium tracking-wide ml-6 relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:-translate-x-1/2 before:rounded-[5px] before:border-solid before:border-t-22 before:border-r-22 before:border-b-20 before:border-l-28 before:border-t-transparent before:border-r-transparent before:border-b-[#F1F1F1] before:border-l-transparent">
                Hello...
              </h4>
              <p className="font-pops text-xs font-medium text-[#00000040] mt-2">
                Today, 2:13pm
              </p>
            </div>
            {/* Reciver img  */}
            <div className="w-52 mt-2 rounded-sm overflow-hidden">
              <ModalImage small={img} large={img} alt="image" />
              <p className="font-pops text-xs font-medium text-[#00000040] mt-2">
                Today, 2:13pm
              </p>
            </div>

            {/* sender img  */}
            <div className="flex flex-col items-end">
              <div className="w-52 mt-2 rounded-sm overflow-hidden text-right">
                <ModalImage small={img} large={img} alt="image" />
                <p className="font-pops text-xs font-medium text-[#00000040] mt-2">
                  Today, 2:13pm
                </p>
              </div>
            </div>
            {/* senderMsg */}

            <div className="mt-4 flex flex-col items-end">
              <h4 className="inline-block max-w-[85%] py-[13px] px-[27px] rounded-e-10px rounded-10px bg-primary font-popstext-base font-medium text-white tracking-wide mr-6 relative before:content-[''] before:absolute before:right-0 before:bottom-0 before:translate-x-[20px] before:rounded-[5px] before:border-solid before:border-t-22 before:border-r-22 before:border-b-20 before:border-l-28 before:border-t-transparent before:border-r-transparent before:border-b-primary before:border-l-transparent">
                Hello...
              </h4>
              <h3 className="font-pops text-xs font-medium text-[#00000040] mt-2">
                Today, 2:13pm
              </h3>
            </div>
          </div>
        </div>
        <div className="row-span-2 flex items-center border-t-[1px] border-solid border-[#00000040]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            action=""
            className="flex w-full"
          >
            <div className="relative w-full">
              <input
                value={message}
                onKeyDown={handleKeyDown}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full focus:outline-none rounded-10px h-[60px] py-4 pl-4 pr-24 bg-[#F1F1F1] font-popstext-lg resize-none"
                placeholder="Message"
              ></input>
              <div className="flex items-center absolute top-1/2 right-5 -translate-y-1/2 text-[#00000080]">
                <BsFillEmojiLaughingFill className="text-[22px] mr-4 cursor-pointer" />
                <BsFillCameraFill className="text-2xl cursor-pointer" />
              </div>
            </div>
            <button
              type="button"
              onClick={handleMessageSend}
              className="text-lg bg-primary text-white w-[60px] h-[60px] flex items-center justify-center rounded-10px ml-5"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
