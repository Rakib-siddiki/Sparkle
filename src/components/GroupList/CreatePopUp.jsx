import { useState } from "react";
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const CreatePopUp = ({ handleShow }) => {
  const data = useSelector((state) => state.userInfo.userValue);

  const db = getDatabase();
  const [groupName, setGroupName] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const [nameError, setNameError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleNameChange = (e) => {
    setGroupName(e.target.value);
    setNameError("");
  };

  const handleTitleChange = (e) => {
    setGroupTitle(e.target.value);
    setTitleError("");
  };

  const sendGroupData = () => {
    if (!groupName) {
      setNameError("Enter your Group Name");
    }
    if (!groupTitle) {
      setTitleError("Enter your Group Title");
    } else if (groupName.trim() && groupTitle.trim()) {
      set(push(ref(db, "grouplist/")), {
        groupName: groupName,
        groupTitle: groupTitle,
        adminId: data.uid,
        admin: data.displayName,
      }).then(() => handleShow());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendGroupData();
    }
  };

  return (
    <>
      <section>
        <div className="absolute top-0 left-0 w-full h-screen bg-black/10 z-50 backdrop-blur-sm flex justify-center items-center ">
          <div className=" capitalize  bg-slate-100 rounded-md overflow-hidden">
            <div className="flex justify-between items-center bg-lime-100 p-3">
              <h2 className="w-full text-xl font-pops font-semibold text-blue-600">
                create Your Group
              </h2>
              <button
                onClick={handleShow}
                className=" active:scale-90 font-pops text-sm font-semibold text-white px-[22px] py-1 bg-blue-600 rounded-tl-full rounded-br-full border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300"
              >
                Back
              </button>
            </div>
            <div className="p-3 flex flex-col">
              <label htmlFor="groupName" className="font-pops font-semibold">
                Group Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Group Name"
                className={`p-3 rounded-sm w-96 my-3 outline-none text-reg-seconadry border ${
                  nameError ? ` border-red-500` : ` border-reg-seconadry`
                }`}
                value={groupName}
                onKeyDown={handleKeyPress}
                onChange={(e) => handleNameChange(e)}
              />
              {nameError && (
                <div className="relative">
                  <p className="py-1 px-2 w-60 sm:w-full  lg:w-96 relative font-nunito font-semibold text-sm md:text-base text-white bg-red-500 rounded capitalize">
                    {nameError}
                  </p>
                  <span className=" absolute -top-12 -left-14 xl:-top-[55px] xl:-left-16 triangle-up scale-[0.1] "></span>
                </div>
              )}
              <label htmlFor="Group Title" className="font-pops font-semibold">
                Group Title
              </label>
              <input
                type="text"
                placeholder="Enter Your Group Title"
                className={`p-3 rounded-sm w-96 my-3 outline-none text-reg-seconadry border ${
                  titleError ? ` border-red-500` : ` border-reg-seconadry`
                }`}
                onChange={(e) => handleTitleChange(e)}
                onKeyDown={handleKeyPress}
                value={groupTitle}
              />
              {titleError && (
                <div className="relative">
                  <p className="py-1 px-2 w-60 sm:w-full  lg:w-96 relative font-nunito font-semibold text-sm md:text-base text-white bg-red-500 rounded capitalize">
                    {titleError}
                  </p>
                  <span className=" absolute -top-12 -left-14 xl:-top-[55px] xl:-left-16 triangle-up scale-[0.1] "></span>
                </div>
              )}

              <button
                onClick={sendGroupData}
                className="active:scale-90 font-pops text-sm font-semibold text-white px-[22px] py-2 bg-blue-600 rounded-bl-full rounded-tr-full border-[1px] border-solid border-primary hover:bg-white hover:text-primary duration-300 mt-3"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreatePopUp;
