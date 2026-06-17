import { FaUserCircle } from "react-icons/fa"
import { HiMenuAlt3 } from "react-icons/hi"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setSidebarOpen }) => {

  const navigate = useNavigate();

  const handleLogout = async () => {

    try {
  
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true
        }
      );
  
      navigate("/");
  
    } catch (err) {
  
      console.log(err);
  
    }
  
  };
  return (

    <div className="flex items-center justify-between mb-10">

      <div className="flex items-center gap-4">

        {/* Hamburger */}

        <HiMenuAlt3
          className="text-3xl cursor-pointer lg:hidden"
          onClick={() => setSidebarOpen(true)}
        />

        <h1 className="text-3xl font-bold">
          Good Evening
        </h1>

      </div>

      <div className="flex items-center gap-3">

      <div className="bg-[#1f1f1f] px-4 py-2 rounded-full cursor-pointer hover:bg-[#2a2a2a]">

        <FaUserCircle className="inline text-2xl mr-2" />

        <span>Profile</span>

    </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 cursor-pointer"
          >
            Logout
         </button>

</div>

    </div>
  )
}

export default Navbar