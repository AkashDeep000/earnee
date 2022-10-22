import {
  Link
} from "react-router-dom";

function Header() {

  return (
    <div className="z-50 px-3 md:px-[3.5%] py-2 flex items-center justify-between sticky top-0 backdrop-blur-md bg-white/70 bg-[length:100%_100%] shadow-sm">
      <div className="flex items-center gap-2">

          <Link to="/">
            <img className="h-10" src="/logo.png" />

          </Link>
    </div>

      <div className="rightSideContainer font-semibold text-sm">
              <Link to="/login">
        <button className="px-3 py-2.5 text-purple-500 rounded">
Login
        </button>
        </Link>
        <Link to="/signup">
        <button className="px-3 py-2.5 text-white shadow-[0_0_.4rem_rgba(0,25,49,0.071)] bg-gradient-to-l from-indigo-500 to-purple-500 rounded">
Sign Up
        </button>
        </Link>
    </div>
  </div>
);
}

export default Header;