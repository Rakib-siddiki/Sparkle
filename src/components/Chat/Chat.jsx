// Importing necessary components and libraries
import { HiDotsVertical } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { BsFillEmojiLaughingFill, BsFillCameraFill } from "react-icons/bs";
import groupImg1 from "../../assets/home/groupLists/groupImg1.png";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import EmojiPicker from "emoji-picker-react";
import moment from "moment/moment";
import {
  getDownloadURL,
  getStorage,
  ref as imageRef,
  uploadBytes,
} from "firebase/storage";

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
  // eslint-disable-next-line no-unused-vars
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  // Function to handle sending messages
  const handleMessageSend = () => {
    if (activeData.type == "single") {
      set(push(ref(db, "singleMessages/")), {
        message: message,
        senderId: data.uid,
        senderName: data.displayName,
        reciverId: activeData.userId,
        receiverName: activeData.Name,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
      });
      setMessage("");
    }
  };

  // Effect to listen for changes in messages
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
  }, [activeData.userId, data.uid, db]);

  // Function to handle keydown event in input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
  };

  // Function to handle image upload
  const handeleImageUpload = (e) => {
    const file = e.target.files[0];
    const storageRef = imageRef(storage, file.name);

    // eslint-disable-next-line no-unused-vars
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "singleMessages/")), {
          image: downloadURL,
          senderId: data.uid,
          senderName: data.displayName,
          reciverId: activeData.userId,
          receiverName: activeData.Name,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
        });
      });
    });
  };

  // Emoji picker click event handler
  const handaleEmojiClick =(e)=> {
    const emoji = e.emoji;
    setSelectedEmoji(emoji);
    setMessage((prevMessage) => prevMessage + emoji); // Append emoji to the message
  }
  return (
    <>
      {/* Chat container */}
      <div className="w-full h-full rounded-custom shadow-homeCardShadow pl-12 pr-7 grid grid-rows-13">
        {/* Header */}
        <div className="row-span-2 flex items-center justify-between border-b-[1px] border-solid border-[#00000040]">
          <div className="flex items-center">
            {/* User avatar */}
            <div className=" inline-block relative mr-3.5 after:content-[''] after:h-[17px] after:w-[17px] after:bg-[#00FF75] after:absolute after:bottom-0.5 after:right-0.5 after:rounded-full after:border-solid after:border-white after:border-2 after:drop-shadow-iconDropShadow">
              <img
                className="w-[75px] h-[75px] rounded-full object-cover drop-shadow-iconDropShadow"
                src={groupImg1}
                alt="Ellipse2.png"
              />
            </div>
            {/* User details */}
            <div className="">
              <h2 className="font-pops text-xl font-semibold">
                {activeData?.Name}
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
          <div className=" h-[480px] min-h-full max-h-full overflow-y-scroll">
            {showMessage.map((item, i) =>
              data.uid === item.senderId ? (
                item.message ? (
                  // Sender message
                  <div key={i} className="mt-4 flex flex-col items-end">
                    <h4 className="inline-block max-w-[85%] py-[13px] px-[27px] rounded-e-10px rounded-10px bg-primary font-pops text-base font-medium text-white tracking-wide mr-6 relative before:content-[''] before:absolute before:right-0 before:bottom-0 before:translate-x-[15px] before:rounded-[5px] before:border-solid before:border-t-22 before:border-r-22 before:border-b-20 before:border-l-28 before:border-t-transparent before:border-r-transparent before:border-b-primary before:border-l-transparent">
                      {item.message}
                    </h4>
                    <h3 className="font-pops text-xs font-medium text-[#00000040] mt-2">
                      {moment(item.date, "YYYYMMDD h:mm:ss a").fromNow()}
                    </h3>
                  </div>
                ) : (
                  // Sender image
                  <div className="flex flex-col items-end">
                    <div className="w-52 mt-2 rounded-sm overflow-hidden text-right">
                      <ModalImage
                        small={item.image}
                        large={item.image}
                        alt="image"
                      />
                      <p className="font-pops text-xs font-medium text-[#00000040] mt-2">
                        {moment(item.date, "YYYYMMDD h:mm:ss a").fromNow()}
                      </p>
                    </div>
                  </div>
                )
              ) : item.message ? (
                // Receiver message
                <div key={i} className="mt-8">
                  <h4 className=" inline-block max-w-[85%] py-[13px] px-[27px] rounded-e-10px rounded-t-10px bg-[#F1F1F1] font-pops text-base font-medium tracking-wide ml-6 relative before:content-[''] before:absolute before:left-2 before:bottom-0 before:-translate-x-1/2 before:rounded-[5px] before:border-solid before:border-t-22 before:border-r-22 before:border-b-20 before:border-l-28 before:border-t-transparent before:border-r-transparent before:border-b-[#F1F1F1] before:border-l-transparent">
                    {item.message}
                  </h4>
                  <p className="font-pops text-xs font-medium text-[#00000040] mt-2">
                    {moment(item.date, "YYYYMMDD h:mm:ss a").fromNow()}
                  </p>
                </div>
              ) : (
                // Receiver image
                <div className="w-52 mt-2 rounded-sm overflow-hidden">
                  <ModalImage
                    small={item.image}
                    large={item.image}
                    alt="image"
                  />
                  <p className="font-pops text-xs font-medium text-[#00000040] mt-2">
                    {moment(item.date, "YYYYMMDD h:mm:ss a").fromNow()}
                  </p>
                </div>
              )
            )}
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
                onChange={(e) => {setMessage(e.target.value),setShowEmoji(false)}}
                className="w-full focus:outline-none rounded-10px h-[60px] py-4 pl-4 pr-24 bg-[#F1F1F1] font-pops text-lg resize-none"
                placeholder="Message"
              ></input>
              {/* Icons for emoji and camera */}
              <div className="flex items-center absolute top-1/2 right-5 -translate-y-1/2 text-[#00000080]">
                {showEmoji ? (
                  <div className="absolute bottom-20 right-0">
                    <EmojiPicker onEmojiClick={handaleEmojiClick}/>
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
