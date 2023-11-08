import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
// icons
import HomeIcon from "./icons/HomeIcon";
import LogoutIcon from "./icons/LogoutIcon";
import MessageIcon from "./icons/MessageIcon";
import NotifiactionIcon from "./icons/NotifiactionIcon";
import SettingIcon from "./icons/SettingIcon";
// firebase
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userLogInfo } from "../../slices/userSlice";
// uplode settins
import UploadSettings from "./UploadSettings";

// ==================================================
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiGroup } from "react-icons/bi";
import { GiThreeFriends } from "react-icons/gi";
import { PiUserListBold } from "react-icons/pi";
import { MdOutlineBlock } from "react-icons/md";

const Sidebar = () => {
  // uplod profile picture
  const [upLoadProfilePicture, setUpLoadProfilePicture] = useState(false);
  const cancleUpload = () => {
    setUpLoadProfilePicture((prev) => !prev);
  };

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(userLogInfo(null));
        localStorage.removeItem("userData");
        navigate("/login");
        console.log("Sign-out successful");
      })
      .catch((error) => {
        // An error happened.
        console.log(error.code);
      });
  };

  const data = useSelector((state) => state.userInfo.userValue);
  // console.log(data);

  const [showMenu, setShowMenu] = useState(false);

  const HambarMenuOpen = () => {
    setShowMenu((prev) => !prev);
  };
  const HambarMenuClose = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <div className="h-full">
        <nav className="bg-primary h-fit md:h-full rounded-t-20px md:rounded-20px md:py-4 xl:py-7 px-1 xl:px-0 md:flex flex-col items-center justify-between fixed md:static w-full left-0 bottom-0 z-[70]">
          <div className="hidden md:block">
            <div
              onClick={() => setUpLoadProfilePicture(true)}
              className="w-[65px] h-[65px] xl:w-[100px] xl:h-[100px] rounded-full overflow-hidden cursor-pointer relative after:content-[''] after:absolute after:h-full after:w-full after:bg-transparent after:top-0 after:left-0 after:duration-200 hover:after:bg-[#00000069] text-[35px] text-transparent hover:text-white mx-auto"
            >
              <FaCloudUploadAlt className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] duration-200 z-10" />
              <img className="w-full h-full" src={data?.photoURL} alt="" />
            </div>
            <h2 className="xl:px-3 font-pops text-xs xl:text-xl text-white font-semibold text-center mt-3 capitalize">
              {data.displayName}
            </h2>
          </div>
          <ul className="w-full md:mb-12 flex md:block justify-between items-center px-2 md:px-0">
            <li className="hidden md:block h-12 relative mb-12 text-3xl md:text-4xl xl:text-5xl text-primary cursor-pointer before:content-[''] before:h-[70px] before:xl:h-[80px] before:w-[84%] before:bg-white before:absolute before:top-[50%] before:right-0 before:translate-y-[-50%] before:rounded-l-20px before:transition-all before:duration-300 before:ease-linear after:content-[''] after:h-[70px] after:xl:h-[80px] after:w-[8px] after:bg-primary after:absolute after:top-[50%] after:right-0 after:translate-y-[-50%] after:rounded-l-20px after:transition-all after:duration-300 after:ease-linear  hover:bg-primary">
              <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] transition-all duration-300 ease-linear">
                <HomeIcon />
              </div>
            </li>
            <li className="w-full mx-3.5 sm:landscape:mx-12 md:landscape:mx-0 md:mx-0 h-[75px] md:h-12 md:hidden relative md:mb-12 text-3xl md:text-5xl text-primary cursor-pointer before:content-[''] before:h-[80%] before:w-full before:bg-white before:absolute before:bottom-0 before:right-0 before:rounded-t-lg before:transition-all before:duration-300 before:ease-linear after:content-[''] after:h-2.5 after:w-full after:bg-primary after:absolute after:bottom-0 after:right-0 after:rounded-t-lg after:transition-all after:duration-300 after:ease-linear ">
              <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] transition-all duration-300 ease-linear">
                <HomeIcon />
              </div>
            </li>
            <li className="w-full mx-3.5 sm:landscape:mx-12 md:landscape:mx-0 md:mx-0 h-[75px] md:h-12 relative md:mb-12 text-3xl md:text-4xl xl:text-5xl text-[#BAD1FF] cursor-pointer">
              <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] transition-all duration-300 ease-linear">
                <MessageIcon />
              </div>
            </li>
            <li className="w-full mx-3.5 sm:landscape:mx-12 md:landscape:mx-0 md:mx-0 h-[75px] md:h-12 relative md:mb-12 text-3xl md:text-4xl xl:text-[60px] text-[#BAD1FF] cursor-pointer">
              <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] transition-all duration-300 ease-linear">
                <NotifiactionIcon />
              </div>
            </li>
            <li className="w-full mx-3.5 sm:landscape:mx-12 md:landscape:mx-0 md:mx-0 h-[75px] md:h-12 relative text-3xl md:text-4xl xl:text-5xl text-[#BAD1FF] cursor-pointer">
              <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] transition-all duration-300 ease-linear">
                <SettingIcon />
              </div>
            </li>
            {/* <li className="h-12 relative text-5xl text-[#BAD1FF] cursor-pointer before:content-[''] before:h-[80px] before:w-0 before:bg-white before:absolute before:top-[50%] before:right-0 before:translate-y-[-50%] before:rounded-l-20px before:transition-all before:duration-300 before:ease-linear after:content-[''] after:h-[80px] after:w-0 after:bg-primary after:absolute after:top-[50%] after:right-0 after:translate-y-[-50%] after:rounded-l-20px after:transition-all after:duration-300 after:ease-linear  hover:before:w-[84%] hover:after:w-[8px] hover:bg-primary">
                  <SlSettings className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] transition-all duration-300 ease-linear drop-shadow-navIconDropShadow' />
               </li> */}
          </ul>
          <div className="text-3xl md:text-4xl xl:text-5xl text-white drop-shadow-navIconDropShadow cursor-pointer hidden md:block">
            <LogoutIcon onClick={handleLogOut} />
          </div>
        </nav>

        {upLoadProfilePicture && <UploadSettings cancleUpload={cancleUpload} />}
      </div>
      {/* hambarger nav */}
      <div className="">
        <div className="fixed top-0 left-0 z-[80] w-full md:hidden">
          <div className="p-3 bg-white flex justify-center relative">
            <div className="absolute top-1/2 left-[12px] translate-y-[-50%]">
              <div className="w-full h-full">
                <div
                  onClick={HambarMenuOpen}
                  className="text-2xl w-[44px] h-[44px] bg-[#f3f3f3] text-primary cursor-pointer rounded-full flex items-center justify-center"
                >
                  <GiHamburgerMenu />
                </div>
              </div>
            </div>
            <h2 className="font-lobster text-3xl text-primary select-none cursor-pointer ">
              Sparkle
            </h2>
          </div>
        </div>

        <div
          className={`w-4/5 sm:w-3/5 h-full fixed top-0 left-0 z-[90] bg-white transition-all ease-linear ${
            showMenu
              ? "translate-x-0 duration-300 "
              : "translate-x-[-100%] duration-300 "
          } `}
        >
          <div className="flex items-center justify-between p-2.5 pt-5 sm:p-1.5">
            <div className="flex items-center">
              <div
                onClick={() => {setUpLoadProfilePicture(true), setShowMenu(prev=>!prev) }}
                className="w-[55px] h-[55px] rounded-full overflow-hidden cursor-pointer mr-2.5 xl:w-[100px] xl:h-[100px]  relative after:content-[''] after:absolute after:h-full after:w-full after:bg-transparent after:top-0 after:left-0 after:duration-200 hover:after:bg-[#00000069] text-[35px] text-transparent hover:text-white mx-auto"
              >
                <FaCloudUploadAlt className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] duration-200 text-xl z-10" />
                <img
                  className="w-full h-full"
                  src={data?.photoURL}
                  alt="images/profilePhoto.png"
                />
              </div>
              <h2 className="font-pops text-xl text-primary font-semibold capitalize">
                {data.displayName}
              </h2>
            </div>
          </div>
          <ul className="px-3 mt-6 sm:mt-2">
            <li
              onClick={HambarMenuClose}
              className="font-pops font-medium tracking-wider text-base px-3 py-2.5 sm:p-1 rounded-[8px] bg-[#5F35F51A] flex items-center select-none cursor-pointer mb-3 sm:mb-1.5"
            >
              <div className="text-3xl sm:text-2xl text-primary mr-3 p-1 bg-white rounded-[8px]">
                <BiGroup />
              </div>
              Group List
            </li>
            <li
              onClick={HambarMenuClose}
              className="font-pops font-medium tracking-wider text-base px-3 py-2.5 sm:p-1 rounded-[8px] bg-[#5F35F51A] flex items-center select-none cursor-pointer mb-3 sm:mb-1.5"
            >
              <div className="text-3xl sm:text-2xl text-primary mr-3 p-1 bg-white rounded-[8px]">
                <GiThreeFriends />
              </div>
              Friens
            </li>
            <li
              onClick={HambarMenuClose}
              className="font-pops font-medium tracking-wider text-base px-3 py-2.5 sm:p-1 rounded-[8px] bg-[#5F35F51A] flex items-center select-none cursor-pointer mb-3 sm:mb-1.5"
            >
              <div className="text-3xl sm:text-2xl text-primary mr-3 p-1 bg-white rounded-[8px]">
                <PiUserListBold />
              </div>
              User List
            </li>
            <li
              onClick={HambarMenuClose}
              className="font-pops font-medium tracking-wider text-base px-3 py-2.5 sm:p-1 rounded-[8px] bg-[#5F35F51A] flex items-center select-none cursor-pointer mb-3 sm:mb-1.5"
            >
              <div className="text-3xl sm:text-2xl text-primary mr-3 p-1 bg-white rounded-[8px]">
                <AiOutlineUsergroupAdd />
              </div>
              FriendRequest
            </li>
            <li
              onClick={HambarMenuClose}
              className="font-pops font-medium tracking-wider text-base px-3 py-2.5 sm:p-1 rounded-[8px] bg-[#5F35F51A] flex items-center select-none cursor-pointer mb-3 sm:mb-1.5"
            >
              <div className="text-3xl sm:text-2xl text-primary mr-3 p-1 bg-white rounded-[8px]">
                <BiGroup />
              </div>
              My Groups
            </li>
            <li
              onClick={HambarMenuClose}
              className="font-pops font-medium tracking-wider text-base px-3 py-2.5 sm:p-1 rounded-[8px] bg-[#5F35F51A] flex items-center select-none cursor-pointer"
            >
              <div className="text-3xl sm:text-2xl text-primary mr-3 p-1 bg-white rounded-[8px]">
                <MdOutlineBlock />
              </div>
              Block List
            </li>
          </ul>
        </div>
        <div
          onClick={HambarMenuClose}
          className={`w-full h-full bg-black/5 fixed top-0 left-0 z-[80] ${
            showMenu ? "scale-1" : "scale-0"
          }`}
        ></div>
        {upLoadProfilePicture && <UploadSettings cancleUpload={cancleUpload} />}
      </div>
    </>
  );
};

export default Sidebar;
