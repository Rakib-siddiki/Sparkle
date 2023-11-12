
import { ColorRing } from "react-loader-spinner";
const LoadingSpinner = () => {
  return (
    <>
      <div className="flex justify-center items-center h-full">
        <ColorRing
          visible={true}
          height="50"
          width="50"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#FFCD4B"]}
        />
      </div>
    </>
  );
};

export default LoadingSpinner;