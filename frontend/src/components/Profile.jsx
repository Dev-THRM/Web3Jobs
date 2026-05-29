import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, Trash2 } from "lucide-react"; // Import delete icon
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice"; // Assuming the action exists
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 




const Profile = () => {
  useGetAppliedJobs();
const navigate = useNavigate(); 

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { profile } = user || {};
  const isResume = !!profile?.resume;

  const isRecruiter = user?.role === "recruiter";

  useEffect(() => {
    if (user?.profile?.profilePhoto) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);
  console.log("Token:", user?.token);


  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      dispatch(setLoading(true));

      const res = await axios.delete(`${USER_API_END_POINT}/delete_user`, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
        withCredentials: true,
      });

      console.log("Delete response:", res); 

      if (res.status === 200) {  
        toast.success("Your account has been deleted successfully.");

        dispatch(setUser(null)); 
        localStorage.removeItem("token");

        setTimeout(() => navigate("/"), 100); 
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error(error.response?.data?.message || "Failed to delete account.");
    } finally {
      dispatch(setLoading(false));
    }
};

  
  
  

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        {/* Profile Header */}
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">
                {user?.fullname || "User"}
              </h1>
              <p>{profile?.bio || "No bio available"}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>

        {/* Contact Information */}
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email || "Email not provided"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber || "Phone number not provided"}</span>
          </div>
        </div>

        {/* Skills Section */}
        {!isRecruiter && (
          <div className="my-5">
            <h1 className="font-bold text-lg mb-3">Skills</h1>
            <div className="flex items-center gap-1">
              {Array.isArray(profile?.skills) && profile.skills.length > 0 ? (
                profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              ) : (
                <span>No skills added</span>
              )}
            </div>
          </div>
        )}

        {/* Resume Section */}
        {!isRecruiter && (
          <div className="grid w-full max-w-sm items-center gap-1.5 my-5">
            <Label className="text-md font-bold">Resume</Label>
            {isResume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={profile.resume}
                className="text-blue-500 hover:underline"
              >
                {profile.resumeOriginalName}
              </a>
            ) : (
              <span>No resume uploaded</span>
            )}
          </div>
        )}

{/* Achievements Section */}
{!isRecruiter && (
  <div className="my-5">
    <h1 className="font-bold text-lg mb-3">Achievements</h1>
    {Array.isArray(profile?.achievements) && profile.achievements.length > 0 ? (
      <ul className="list-disc list-inside space-y-1">
        {profile.achievements.map((item, index) => (
          <li key={item._id || index}>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </li>
        ))}
      </ul>
    ) : (
      <span>No achievements added</span>
    )}
  </div>
)}


        

        {/* Delete Account Button */}
        <div className="mt-5 flex justify-end">
          <Button onClick={handleDeleteAccount} variant="destructive">
            <Trash2 className="mr-2" /> Delete Account
          </Button>
        </div>
      </div>

      {/* Applied Jobs Section */}
      {!isRecruiter && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-5">
          <h1 className="font-bold text-lg mb-5">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      )}

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
