import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const EditJob = () => {
    const { id } = useParams(); // Get the job ID from the route params
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    // Fetch job details by ID
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true });

                // console.log("Job Details Response:", res.data); // Debugging log
                if (res.data.success) {
                    setInput(res.data.job);
                } else { 
                    toast.error("Failed to fetch job details");
                }
            } catch (error) {
                console.error("Error fetching job details:", error); // Debugging log
                toast.error("Error fetching job details");
            } finally {
                setIsFetching(false);
            }
        };
        fetchJobDetails();
    }, [id]);

    const changeEventHandler = (e) => {
        const { name, value, type } = e.target;
        if (type === 'number') {
            setInput({ ...input, [name]: Math.max(0, Number(value)) }); // Ensure non-negative values
        } else {
            setInput({ ...input, [name]: value });
        }
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name === value);
        setInput({ ...input, companyId: selectedCompany ? selectedCompany._id : "" });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const salaryPattern = /^(\d{1,3}(?:,\d{3})*(\s?(LPA|lpa))?)|(\d{1,3}(?:,\d{3})?(k|K)(-\d{1,3}(?:,\d{3})?(k|K))?)$/;
        if (!salaryPattern.test(input.salary)) {
            toast.error("Salary must be in the format '6 LPA', '6-7 LPA', '20k', '20,000', or '20k-30k'.");
            return;
        }
        try {
            setLoading(true);
            // Update the API call with the correct URL pattern
            const res = await axios.put(`${JOB_API_END_POINT}/get/${id}`, {
                title: input.title,
                description: input.description,
                requirements: input.requirements,
                salary: input.salary,
                location: input.location,
                jobType: input.jobType,
                experienceLevel: input.experienceLevel,
                position: input.position,
                companyId: input.companyId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
    
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating job");
        } finally {
            setLoading(false);
        }
    };
    

    if (isFetching) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-green-500" />
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-black via-gray-800 to-green-500 min-h-screen animate-fade-in">
            <Navbar />
            <div className='flex items-center justify-center w-full py-10'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl bg-gray-900 border border-gray-700 shadow-lg rounded-lg text-white'>
                    <h2 className="text-3xl font-bold text-center text-green-300 mb-6">Edit Job</h2>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="col-span-2">
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-green-500 my-1 rounded-md border-gray-700 bg-gray-800 text-white w-full"
                            />
                        </div>
                        <div className="col-span-2">
                            <Label>Description</Label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-green-500 my-1 rounded-md border-gray-700 bg-gray-800 text-white w-full h-28 p-2"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-green-500 my-1 rounded-md border-gray-700 bg-gray-800 text-white"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-green-500 my-1 rounded-md border-gray-700 bg-gray-800 text-white"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-green-500 my-1 rounded-md border-gray-700 bg-gray-800 text-white"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-green-500 my-1 rounded-md border-gray-700 bg-gray-800 text-white"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="number"
                                name="experienceLevel"
                                value={input.experienceLevel}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-green-500 my-1 rounded-md border-gray-700 bg-gray-800 text-white"
                            />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-green-500 my-1 rounded-md border-gray-700 bg-gray-800 text-white"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className="col-span-2">
                                    <Label>Company</Label>
                                    <Select onValueChange={selectChangeHandler} value={companies.find(company => company._id === input.companyId)?.name || ''}>
                                        <SelectTrigger className="w-full focus:ring-2 focus:ring-green-500 rounded-md border-gray-700 bg-gray-800 text-white">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => (
                                                        <SelectItem key={company._id} value={company.name}>{company.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>
                    {
                        loading
                            ? <Button className="w-full my-4 bg-green-500 text-white">Updating...</Button>
                            : <Button type="submit" className="w-full my-4 bg-green-500 text-white">Update Job</Button>
                    }
                </form>
            </div>
        </div>
    );
}

export default EditJob;
