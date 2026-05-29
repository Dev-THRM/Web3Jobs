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
import { setLoading } from "@/redux/authSlice";
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
}`;

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

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !input.fullname ||
      !input.email ||
      !input.phoneNumber ||
      !input.password ||
      !input.role ||
      !input.file
    ) {
      toast.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
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
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 border border-gray-200 rounded-md p-4 md:p-1 lg:p-2 my-10"
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
          <h1 className="font-bold text-xl text-white mb-2">Sign Up</h1>
          <div className="my-2 text-white">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              required
              style={{
                border: "1px solid rgba(255, 255, 255, 0.5)",
                backgroundColor: "transparent",
                color: "#fff",
              }}
              className="w-full"
            />
          </div>
          <div className="my-2 text-white">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              required
              style={{
                border: "1px solid rgba(255, 255, 255, 0.5)",
                backgroundColor: "transparent",
                color: "#fff",
              }}
              className="w-full"
            />
          </div>
          <div className="my-2 text-white">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="123456890"
              required
              style={{
                border: "1px solid rgba(255, 255, 255, 0.5)",
                backgroundColor: "transparent",
                color: "#fff",
              }}
              className="w-full"
            />
          </div>
          <div className="my-2 text-white">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="****"
              required
              style={{
                border: "1px solid rgba(255, 255, 255, 0.5)",
                backgroundColor: "transparent",
                color: "#fff",
              }}
              className="w-full"
            />
          </div>
          <div className="my-2 text-white">
            <RadioGroup className="flex items-center gap-4 ios:gap-6">
              <div className="flex items-center ios:min-w-[130px]">
                <Input
                  type="radio"
                  id="r1" // Added ID for proper label association
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  required
                  className="cursor-pointer w-[20px] h-[20px] mr-2" // Increased size
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    backgroundColor:
                      input.role === "student" ? "#fff" : "transparent",
                    color: "#fff",
                  }}
                />
                <Label htmlFor="r1" className="whitespace-nowrap ios:ml-1">
                  Candidate
                </Label>
              </div>
              <div className="flex items-center ios:min-w-[130px]">
                <Input
                  type="radio"
                  id="r2" // Added ID for proper label association
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  required
                  className="cursor-pointer w-[20px] h-[20px] mr-2" // Increased size
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    backgroundColor:
                      input.role === "recruiter" ? "#fff" : "transparent",
                    color: "#fff",
                  }}
                />
                <Label htmlFor="r2" className="whitespace-nowrap ios:ml-1">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Add this CSS */}
          <style>
            {`
            @supports (-webkit-touch-callout: none) {
              input[type="radio"] {
                -webkit-appearance: none;
                appearance: none;
                border-radius: 50%;
                position: relative;
              }
              
              input[type="radio"]:checked::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #1d4236;
              }
            }
          `}
          </style>
          <div className="my-2 text-white">
            <Label>Profile Picture</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              required
              className="cursor-pointer w-full"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.5)",
                color: "#000",
              }}
            />
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
              Sign Up
            </Button>
          )}
          <span className="text-sm text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
