
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import propTypes from "prop-types"
import ModalImage from 'react-modal-image';
const ChatBox = ({item}) => {
  const data = useSelector((state) => state.userInfo.userValue);
    
    return (
      <>
        {data.uid === item.senderId ? (
          item.message ? ( // Sender message
            <div className="mt-4 flex flex-col items-end">
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
                <ModalImage small={item.image} large={item.image} alt="image" />
                <p className="font-pops text-xs font-medium text-[#00000040] mt-2">
                  {moment(item.date, "YYYYMMDD h:mm:ss a").fromNow()}
                </p>
              </div>
            </div>
          )
        ) : item.message ? ( // Receiver message
          <div className="mt-8">
            <img
              className="inline-block w-10 rounded-full"
              src={
                data.uid === item.senderId
                  ? item.receiverProfilePic
                  : item.senderProfilePic
              }
              alt="Image"
            />

            <h4 className=" inline-block max-w-[85%] py-[13px] px-4 rounded-e-10px rounded-t-10px bg-[#F1F1F1] font-pops text-base font-medium tracking-wide ml-3 relative before:content-[''] before:absolute before:left-2 before:bottom-0 before:-translate-x-4 before:rounded-[5px] before:border-solid before:border-t-22 before:border-r-22 before:border-b-20 before:border-l-28 before:border-t-transparent before:border-r-transparent before:border-b-[#F1F1F1] before:border-l-transparent">
              {item.message}
            </h4>
            <p className="font-pops text-xs font-medium text-[#00000040] mt-2">
              {moment(item.date, "YYYYMMDD h:mm:ss a").fromNow()}
            </p>
          </div>
        ) : (
          // Receiver image
          <div className="w-52 mt-2 rounded-sm overflow-hidden">
            <ModalImage small={item.image} large={item.image} alt="image" />
            <p className="font-pops text-xs font-medium text-[#00000040] mt-2">
              {moment(item.date, "YYYYMMDD h:mm:ss a").fromNow()}
            </p>
          </div>
        )}
      </>
    );
};
ChatBox.propTypes={
    item:propTypes.object.isRequired,
}
export default ChatBox;