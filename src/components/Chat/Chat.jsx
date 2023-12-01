// Importing necessary components and libraries
import { HiDotsVertical } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { BsFillEmojiLaughingFill, BsFillCameraFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import defaultImg from "../../assets/user.png";

import EmojiPicker from "emoji-picker-react";
import {
  getDownloadURL,
  getStorage,
  ref as imageRef,
  uploadBytes,
} from "firebase/storage";
import ChatBox from "../reUseAble/listItems/chatBox";
const Chat = () => {
  // Redux state hooks
  const activeData = useSelector((state) => state.activeChat.activeValue);
  const data = useSelector((state) => state.userInfo.userValue);

  // Firebase database and storage initialization
  const db = getDatabase();
  const storage = getStorage();

  // State for handling messages and input
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState([]);
  // state for emoji picker
  const [showEmoji, setShowEmoji] = useState(false);
  // Function to handle sending messages
  const handleMessageSend = () => {
    const onlyWhiteSpace = message.trim();
    if (activeData.type == "single" && onlyWhiteSpace !== "") {
      set(push(ref(db, "singleMessages/")), {
        message: message,
        senderId: data.uid,
        senderName: data.displayName,
        senderProfilePic: data.photoURL,
        reciverId: activeData.userId,
        receiverName: activeData.name,
        receiverProfilePic: activeData.profilePic,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
      }).then(() => {
        setMessage("");
      });
    } else if (activeData.type == "group" && onlyWhiteSpace !== "") {
      console.log("group");
      set(push(ref(db, "groupMessages/")), {
        groupId:activeData.groupId,
        message: message,
        senderId: data.uid,
        senderName: data.displayName,
        senderProfilePic: data.photoURL,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
      }).then(() => {
        setMessage("");
      });
    }
  };

  // Feaching data from Single Messages
    useEffect(() => {
      const singleMessages = ref(db, "singleMessages/");
      onValue(singleMessages, (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {
          if (
            (data.uid === item.val().reciverId ||
              item.val().reciverId === activeData.userId) &&
            (data.uid === item.val().senderId ||
              item.val().senderId === activeData.userId)
          ) {
            arr.push(item.val());
          }
        });
        setShowMessage(arr);
      });
    }, [activeData?.userId, data.uid, db,activeData]);
  // Feaching data from group Messages
  useEffect(() => {
    const groupMessages = ref(db, "groupMessages/");
    onValue(groupMessages, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
          if (
          item.val().groupId === activeData.groupId &&
          ((data.uid && activeData.adminId) ||
            (data.uid && activeData.othersId))
        ) {
          arr.push(item.val());
        }

      });
      setShowMessage(arr);
    });
  }, [activeData?.adminId, activeData?.groupId, activeData?.othersId, data.uid, db]);

  // Function to handle keydown event in input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
  };

  // Function to handle image upload
  const handeleImageUpload = (e) => {
    const onlyWhiteSpace = message.trim();
    const file = e.target.files[0];
    const storageRef = imageRef(storage, file.name);
    // eslint-disable-next-line no-unused-vars
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        if (activeData.type == "single" && onlyWhiteSpace !== "") {
          set(push(ref(db, "singleMessages/")), {
            image: downloadURL,
            senderId: data.uid,
            senderName: data.displayName,
            reciverId: activeData.userId,
            receiverName: activeData.name,
            senderProfilePic: data.photoURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
          });
        } else {
          set(push(ref(db, "groupMessages/")), {
            groupId: activeData.groupId,
            image: downloadURL,
            senderId: data.uid,
            senderName: data.displayName,
            senderProfilePic: data.photoURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
          });
        }
      });
    });
  };
  // Emoji picker click event handler
  const handaleEmojiClick = (e) => {
    const emoji = e.emoji;
    setMessage((prevMessage) => prevMessage + emoji); // Append emoji to the message
  };
  const stickBottom = useRef(null);
  useEffect(() => {
    if (stickBottom.current) {
      stickBottom.current.scrollTop = stickBottom.current.scrollHeight;
    }
  }, [message]);
  return (
    <>
      {/* Chat container */}
      <div className="w-full h-full rounded-custom shadow-homeCardShadow pl-12 pr-7 grid grid-rows-13">
        {/* Header */}
        <div className="row-span-2 flex items-center justify-between border-b-[1px] border-solid border-[#00000040]">
          <div className="flex items-center">
            {/* User avatar */}
            <div className=" inline-block relative mr-3.5 after:drop-shadow-iconDropShadow">
              <img
                className="w-[75px] h-[75px] rounded-full object-cover drop-shadow-iconDropShadow"
                src={activeData?.profilePic?activeData.profilePic:defaultImg}
                alt="user.png"
              />
            </div>
            {/* User details */}
            <div className="">
              <h2 className="font-pops text-xl font-semibold">
                {activeData?.name?activeData.name:"User"}
              </h2>
              <p className="font-pops text-sm text-[#000000D9]">Online</p>
            </div>
          </div>
          {/* Vertical dots icon */}
          <div className="text-3xl cursor-pointer text-primary">
            <HiDotsVertical />
          </div>
        </div>

        {/* Messages container */}
        <div className="row-span-9 py-4">
          <div
            ref={stickBottom}
            className=" h-[480px] min-h-full max-h-full overflow-y-scroll"
          >
            {showMessage.map((item, i) => (
              <ChatBox key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Input and send button */}
        <div className="row-span-2 flex items-center border-t-[1px] border-solid border-[#00000040]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            action=""
            className="flex w-full"
          >
            {/* Input for typing messages */}
            <div className="relative w-full">
              <input
                value={message}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setMessage(e.target.value), setShowEmoji(false);
                }}
                className="w-full focus:outline-none rounded-10px h-[60px] py-4 pl-4 pr-24 bg-[#F1F1F1] font-pops text-lg resize-none"
                placeholder="Message"
              ></input>
              {/* Icons for emoji and camera */}
              <div className="flex items-center absolute top-1/2 right-5 -translate-y-1/2 text-[#00000080]">
                {showEmoji ? (
                  <div className="absolute bottom-20 right-0">
                    <EmojiPicker onEmojiClick={handaleEmojiClick} />
                  </div>
                ) : null}
                <BsFillEmojiLaughingFill
                  onClick={() => setShowEmoji((prev) => !prev)}
                  className="text-[22px] mr-4 cursor-pointer"
                />

                <label>
                  <input
                    type="file"
                    onChange={handeleImageUpload}
                    className="hidden"
                  />
                  <BsFillCameraFill className="text-2xl cursor-pointer" />
                </label>
              </div>
            </div>
            {/* Send button */}
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
