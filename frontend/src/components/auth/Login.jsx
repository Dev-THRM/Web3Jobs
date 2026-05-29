import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

// Floating binary animation styles
const containerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "black",
  overflow: "hidden",
  zIndex: -1,
};

const binaryColumnStyle = {
  position: "absolute",
  top: "-100%",
  color: "green",
  fontFamily: "monospace",
  fontSize: "14px",
  animation: "falling-binary 5s linear infinite",
};

const keyframes = `
@keyframes falling-binary {
  0% {
    top: -100%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}
`;

// Inject keyframes into the DOM
const styleElement = document.createElement("style");
styleElement.innerHTML = keyframes;
document.head.appendChild(styleElement);

const generateBinaryColumns = () => {
  const columns = [];
  for (let i = 0; i < 20; i++) {
    const binaryStream = Array(30)
      .fill(0)
      .map(() => (Math.random() > 0.5 ? "1" : "0"))
      .join("");
    const columnStyle = {
      ...binaryColumnStyle,
      left: `${i * 5}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 3 + 3}s`,
    };
    columns.push(
      <div key={i} style={columnStyle}>
        {binaryStream.split("").map((char, index) => (
          <div key={index}>{char}</div>
        ))}
      </div>
    );
  }
  return columns;
};

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      {/* Binary animation background */}
      <div style={containerStyle}>{generateBinaryColumns()}</div>
      <Navbar />
      <div
        className="flex items-center justify-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto h-[570px] relative login-container"
        style={{
          margin: "0 auto",
        }}
      >
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 border border-gray-200 rounded-md p-4 md:p-6 lg:p-8 my-10"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(7px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "90%",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-5 text-white text-center">
            Login
          </h1>
          <div className="my-2">
            <Label className="text-white">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.5)",
                backgroundColor: "transparent",
                color: "#fff",
              }}
              className="w-full"
            />
          </div>

          <div className="my-2">
            <Label className="text-white">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Your Password"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.5)",
                backgroundColor: "transparent",
                color: "#fff",
              }}
              className="w-full"
            />
          </div>
          {/* Add this style tag near your other style definitions */}
          <style>
            {`
            /* iOS Safari-specific fixes */
            @supports (-webkit-touch-callout: none) {
              .radio-group-ios-fix {
                gap: 16px !important; /* Increased gap for better spacing */
                margin: 0 -8px !important; /* Adjusted margin for alignment */
              }
              .radio-item-ios-fix {
                min-width: 120px !important; /* Increased min-width for better spacing */
                flex-shrink: 0 !important; /* Prevent shrinking */
              }
              .radio-item-ios-fix input[type="radio"] {
                width: 18px !important; /* Fixed size for radio buttons */
                height: 18px !important;
                margin-right: 8px !important; /* Added margin for spacing */
              }
            }
          `}
          </style>

          {/* Modified RadioGroup section */}
          <div className="flex items-center justify-between flex-col sm:flex-row">
            <RadioGroup className="flex items-center gap-4 my-5 sm:my-3 radio-group-ios-fix">
              <div className="flex items-center space-x-2 radio-item-ios-fix">
                <Input
                  type="radio"
                  id="r1"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className="text-white whitespace-nowrap">
                  Candidate
                </Label>
              </div>
              <div className="flex items-center space-x-2 radio-item-ios-fix">
                <Input
                  type="radio"
                  id="r2"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2" className="text-white whitespace-nowrap">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4"
              style={{ background: "#1d4236" }}
            >
              Login
            </Button>
          )}
          <span className="text-sm text-white block text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
