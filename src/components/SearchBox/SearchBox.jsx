import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import PropTypes from 'prop-types'; // Import PropTypes
const SearchBox = ({onSearch}) => {
   // Correct the PropTypes definition
  SearchBox.propTypes = {
    onSearch: PropTypes.func.isRequired,
  };
  const handleSearch =(e)=> {
    const query = e.target.value
    onSearch(query) 
    // console.log("🚀 > file: SearchBox.jsx:7 > handleSearch > query:", query)
  }
  return (
    <>
      <form className="relative">
        <div className="text-2xl cursor-pointer absolute top-1/2 left-[23px] translate-y-[-50%]">
          <LuSearch />
        </div>

        <input
          className="focus:outline-none font-pops text-base font-medium text-black py-[17px] pl-[78px] pr-12 w-full shadow-CardShadow rounded-20px"
          type="text"
          placeholder="Search"
          onChange={handleSearch}
        />

        <div className="text-2xl cursor-pointer text-primary absolute top-1/2 right-[22px] translate-y-[-50%]">
          <BsThreeDotsVertical />
        </div>
      </form>
    </>
  );
};

export default SearchBox;
