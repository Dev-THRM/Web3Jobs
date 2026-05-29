import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import web3Logo from "../../assets/thrm-logo.png";
import web3preview from "../../assets/preview.jpeg";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      {/* Navbar container */}
      <div className={`bg-black ${isMenuOpen ? "pb-20" : ""} transition-all`}>
        <div className="flex items-center justify-between mx-auto max-w-7xl h-22 px-4 sm:px-6 md:px-8">
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src={web3Logo}
                alt="THRM Web3 Jobs"
                className="h-[100px] w-[130px] rounded-full p-2"
              />
              <img
                src={web3preview}
                alt="THRM Web3 Jobs"
                className="hidden"
              />
            </Link>
          </div>

          {/* Desktop Navbar Menu */}
          <div className="flex items-center gap-12 hidden md:flex">
            <ul className="flex font-medium items-center gap-5 text-white">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                  </li>
                  <li>
                    <Link to="/admin/companies" onClick={() => setIsMenuOpen(false)}>Companies</Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs" onClick={() => setIsMenuOpen(false)}>Jobs</Link>
                  </li>
                  <li>
                    <Link to="/news" onClick={() => setIsMenuOpen(false)}>News</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                  </li>
                  <li>
                    <Link to="/jobs" onClick={() => setIsMenuOpen(false)}>Jobs</Link>
                  </li>
                  <li>
                    <Link to="/browse" onClick={() => setIsMenuOpen(false)}>Browse</Link>
                  </li>
                  <li>
                    <Link to="/news" onClick={() => setIsMenuOpen(false)}>News</Link>
                  </li>
                </>
              )}
            </ul>
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button
                    style={{
                      background:
                        "linear-gradient(90deg, #81c315 0%, #ffd300 100%)",
                      color: "white",
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    style={{
                      background:
                        "linear-gradient(90deg, #81c315 0%, #ffd300 100%)",
                      color: "white",
                    }}
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="">
                    <div className="flex gap-2 space-y-2">
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="@shadcn"
                        />
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user?.fullname}</h4>
                        <p className="text-sm text-muted-foreground">
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col my-2 text-gray-600">
                      {user &&
                        (user.role === "student") && (
                          <div className="flex w-fit items-center gap-2 cursor-pointer">
                            <User2 />
                            <Button variant="link">
                              <Link to="/profile">View Profile</Link>
                            </Button>
                          </div>
                        )}

                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <LogOut />
                        <Button onClick={logoutHandler} variant="link">
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu />
            </button>
          </div>
        </div>

        {/* Mobile Navbar Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden bg-black p-4 transition-all`}
        >
          <ul className="flex flex-col font-medium items-start gap-5 text-white">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                </li>
                <li>
                  <Link to="/admin/companies" onClick={() => setIsMenuOpen(false)}>Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs" onClick={() => setIsMenuOpen(false)}>Jobs</Link>
                </li>
                <li>
                  <Link to="/news" onClick={() => setIsMenuOpen(false)}>News</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                </li>
                <li>
                  <Link to="/jobs" onClick={() => setIsMenuOpen(false)}>Jobs</Link>
                </li>
                <li>
                  <Link to="/browse" onClick={() => setIsMenuOpen(false)}>Browse</Link>
                </li>
                <li>
                  <Link to="/news" onClick={() => setIsMenuOpen(false)}>News</Link>
                </li>
              </>
            )}

            {/* Adjust Login/Signup buttons on mobile */}
            {!user ? (
              <div className="flex flex-col gap-2 mt-4">
                <Link to="/login">
                  <Button
                    style={{
                      background: "transparent",
                      color: "white",
                      border: "1px solid white",
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    style={{
                      background: "transparent",
                      color: "white",
                      border: "1px solid white",
                    }}
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex w-fit items-center gap-2 cursor-pointer text-white">
                  <User2 />
                  <Button variant="link">
                    <Link to="/profile" className="text-white">View Profile</Link>
                  </Button>
                </div>
                <div className="flex w-fit items-center gap-2 cursor-pointer text-white">
                  <LogOut />
                  <Button onClick={logoutHandler} variant="link" className="text-white">
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;