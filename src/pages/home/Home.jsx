import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const auth = getAuth();
  const [verify, setVerify] = useState(false);
  const data = useSelector((state) => state.userInfo.userValue); // getting value from store
  const navigate = useNavigate();
  useEffect(() => {
    !data && navigate("/login");
  }, [data, navigate]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const emailVerified = user.emailVerified;
      // console.log(emailVerified);
      if (emailVerified) {
        setVerify(true);
      }
    });
  }, []);
  return (
    <div>
      {verify ? (
        <section className="h-screen px-5 py-5 grid grid-cols-9 gap-10">
          <div className="h-full col-span-1">
            <Sidebar></Sidebar>
          </div>
        </section>
      ) : (
        <h1 className="h-screen bg-primary font-semibold text-white text-5xl flex justify-center items-center ">
          Please Verify Your account Before Expolore😉
        </h1>
      )}
    </div>
  );
};

export default Home;
