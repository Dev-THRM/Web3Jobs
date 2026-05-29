import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
    },
    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        updateJob: (state, action) => {
            const updatedJob = action.payload;  // The updated job object from the backend
            if (state.singleJob && state.singleJob._id === updatedJob._id) {
                state.singleJob = updatedJob;  // Update single job if it's currently being edited
            }

            // Update the job in the allJobs or allAdminJobs list if necessary
            const updatedJobsList = state.allJobs.map((job) => job._id === updatedJob._id ? updatedJob : job);
            state.allJobs = updatedJobsList;

            const updatedAdminJobsList = state.allAdminJobs.map((job) => job._id === updatedJob._id ? updatedJob : job);
            state.allAdminJobs = updatedAdminJobsList;
        },

        // New deleteJob reducer to remove the job from both arrays
        deleteJob: (state, action) => {
            const jobId = action.payload;

            // Filter out the job with the given jobId from allJobs and allAdminJobs arrays
            state.allJobs = state.allJobs.filter(job => job._id !== jobId);
            state.allAdminJobs = state.allAdminJobs.filter(job => job._id !== jobId);
        }
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    updateJob,  // Export the updateJob action
    deleteJob,  // Export the deleteJob action
} = jobSlice.actions;

export default jobSlice.reducer;
