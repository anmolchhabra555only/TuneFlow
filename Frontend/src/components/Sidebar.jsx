import { FaHistory } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdAlbum } from "react-icons/md";
import { FaMusic } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdLibraryMusic } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (

    <>

      {/* Overlay */}

      

      {
        sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )
      }

      {/* Sidebar */}

      
      <div className={`
        fixed top-0 left-0 z-50
        w-[280px] bg-[#121212]
        min-h-screen p-5
        transform transition-transform duration-300

        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0 lg:static
      `}>

        {/* Mobile Close Button */}

        <div className="flex justify-end mb-5 lg:hidden">

          <RxCross2
            className="text-3xl cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />

        </div>

        <h1 className="text-2xl font-bold mb-10">
          TuneFlow
        </h1>

       

        <div className="flex flex-col gap-6 text-lg">

          <div className="flex items-center gap-3 cursor-pointer hover:text-green-500 transition-all duration-300">
            <FaHome />
            <span>Home</span>
          </div>

          <Link
            to="/search"
            className="flex items-center gap-3 hover:text-green-500 transition-all duration-300"
          >
            <IoSearch />
            <span>Search</span>
          </Link>

          <Link
            to="/liked-songs"
            className="flex items-center gap-3 hover:text-green-500 transition-all duration-300"
          >
            <FaHeart />
            <span>Liked Songs</span>
            </Link>

            <Link
              to="/recently-played"
              className="flex items-center gap-3 hover:text-green-500 transition-all duration-300"
            >
              <FaHistory />
              <span>Recently Played</span>
            </Link>

          <Link
            to="/upload"
            className=" flex items-center gap-3 hover:text-green-500 transition-all duration-300"
          >
            <FaUpload />
            <span>Upload Music</span>
          </Link>

          <Link
            to="/my-songs"
            className="flex items-center gap-3 hover:text-green-500 transition-all duration-300"
          >
            <FaMusic />
            <span>My Songs</span>
          </Link>

          <Link
            to="/create-album"
            className="flex items-center gap-3 hover:text-green-500 transition-all duration-300 cursor-pointer"
          >
            <span>💿</span>
            <span>Create Album</span>
          </Link>

          <Link
            to="/albums"
            className="flex items-center gap-3 hover:text-green-500 transition-all duration-300"
          >
           <MdAlbum />
           <span>Albums</span>
           </Link>

        </div>

      </div>

    </>
  )
}

export default Sidebar