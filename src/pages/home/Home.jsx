import { useSelector } from "react-redux";
import userSlice from "../../slices/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  
    const data = useSelector((state) => state.userInfo.userValue); // getting value from store
    const navigate=useNavigate()
    useEffect(()=>{
      !data &&  navigate('/login')
    },[])
    

  return (
    <div>
      <h1 className="flex justify-center items-center h-screen text-3xl font-bold uppercase">
        Welcome To home page
      </h1>
    </div>
  );
};

export default Home;
