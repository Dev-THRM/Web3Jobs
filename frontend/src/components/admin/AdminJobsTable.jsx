import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { deleteJob } from "../../redux/jobSlice"; // Adjust the import path accordingly
import { JOB_API_END_POINT } from "../../utils/constant"; // Adjust path if necessary
import { getTokenFromCookies } from "@/utils/getTokenFromCookies"; // Adjust path accordingly'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
   const { applicants } = useSelector((store) => store.application);
  const dispatch = useDispatch(); // To dispatch actions
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  // Retrieve token from cookies
  const token = getTokenFromCookies();

  // Filter jobs based on search text
  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      const searchText = searchJobByText || "";
      return (
        job?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  // Handle job deletion
  const handleDelete = async (jobId) => {
    // Optimistically remove the job from the filterJobs state to update UI immediately
    const updatedJobs = filterJobs.filter((job) => job._id !== jobId);
    setFilterJobs(updatedJobs); // Update filtered jobs

    try {
      // Dispatch the action to update the Redux state (this will also update the global store)
      dispatch(deleteJob(jobId));

      // Make an API call to delete the job from the backend (replace with your API call)
      await deleteJobFromAPI(jobId); // This should be your API call function
    } catch (error) {
      // If the API call fails, revert the job removal
      setFilterJobs(allAdminJobs); // Revert to the original state
      console.error("Error deleting job:", error);
    }
  };

  // Example API function to delete a job (use your actual API endpoint)
  const deleteJobFromAPI = async (jobId) => {
    try {
      const response = await fetch(`${JOB_API_END_POINT}/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token if authentication is needed
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting job");
    }
  };

  // Handle new applicants read
  const handleApplicantsRead = async (jobId) => {
    const updatedJobs = filterJobs.map((job) => {
      if (job._id === jobId) {
        // Mark applicants as read (or update any other logic here)
        job.applications = job.applications.map((applicant) => ({
          ...applicant,
          isNew: false, // Assuming `isNew` is the flag for new applicants
        }));
      }
      return job;
    });
    setFilterJobs(updatedJobs); // Update the filtered jobs in the UI

    // Optionally, you can make an API call here to update the job applicants as read in the backend
    // await markApplicantsAsReadInAPI(jobId);
  };

  // Optionally API function to mark applicants as read
  const markApplicantsAsReadInAPI = async (jobId) => {
    try {
      const response = await fetch(
        `${JOB_API_END_POINT}/mark-applicants-read/${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark applicants as read");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Error marking applicants as read");
    }
  };

  return (
    <div>
      <Table className="w-full overflow-x-auto border rounded-lg shadow-md text-white">
        <TableCaption className="text-sm text-black-600 ">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="hidden md:table-row">
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow className="block md:table-row border-b md:border-none mb-4 md:mb-0">
              <TableCell colSpan="4" className="text-center">
                No jobs found
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => {
              const totalApplicantsCount = Array.isArray(job.applications) ? job.applications.length : 0;
              const newApplicantsCount = Array.isArray(job.applications)
                ? job.applications.filter((applicant) => applicant.isNew).length
                : 0;

              return (
                <TableRow key={job._id}>
                  <TableCell>{job?.company?.name || "N/A"}</TableCell>
                  <TableCell>{job?.title || "N/A"}</TableCell>
                  <TableCell>
                    {job?.createdAt
                      ? dayjs(job.createdAt).format("YYYY-MM-DD")
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/edit`)
                          }
                          className="flex items-center gap-2 w-fit cursor-pointer"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() => {
                            handleApplicantsRead(job._id);
                            navigate(`/admin/jobs/${job._id}/applicants`);
                          }}
                          className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                        >
                          <Eye className="w-4" />
                          <span>
                            Applicants ({totalApplicantsCount}){" "}
                          </span>
                        </div>

                        <div
                          onClick={() => handleDelete(job._id)}
                          className="flex items-center w-fit gap-2 cursor-pointer mt-2 text-red-600"
                        >
                          <Trash className="w-4" />
                          <span>Delete</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
