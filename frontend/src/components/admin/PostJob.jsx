import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
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
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        const { name, value, type } = e.target;
        if (type === 'number') {
            setInput({ ...input, [name]: Math.max(0, Number(value)) }); // Ensure non-negative values
        } else {
            setInput({ ...input, [name]: value });
        }
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
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
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-black via-gray-800 to-green-500 min-h-screen animate-fade-in">
            <Navbar />
            <div className='flex items-center justify-center w-full py-10'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl bg-gray-900 border border-gray-700 shadow-lg rounded-lg text-white'>
                    <h2 className="text-3xl font-bold text-center text-green-300 mb-6">Post a New Job</h2>
                    <div className='grid grid-cols-2 gap-4'>
                    <div className="col-span-2">
        <Label>Title</Label>
        <Input
            type="text"
            name="title"
            value={input.title}
            onChange={changeEventHandler}
            required
            className="focus:ring-2 focus:ring-green-500 my-1 rounded-md border-gray-700 bg-gray-800 text-white w-full"
        />
    </div>
    <div className="col-span-2">
        <Label>Description</Label>
        <textarea
            name="description"
            value={input.description}
            onChange={changeEventHandler}
            required
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
                                required
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
                                required
                                className="focus:ring-2 focus:ring-green-500 my-1 rounded-md border-gray-700 bg-gray-800 text-white appearance-none"
                                min="0"
                                step="1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                required
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
                                required
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
                                required
                                className="focus:ring-2 focus:ring-green-500 my-1 rounded-md border-gray-700 bg-gray-800 text-white appearance-none"
                                min="0"
                                step="1"
                            />
                        </div>
                        <div>
                            <Label>No of Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                required
                                className="focus:ring-2 focus:ring-green-500 my-1 rounded-md border-gray-700 bg-gray-800 text-white appearance-none"
                                min="0"
                                step="1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className="col-span-2">
                                    <Label>Company</Label>
                                    <Select onValueChange={selectChangeHandler} required>
                                        <SelectTrigger className="w-full focus:ring-2 focus:ring-green-500 rounded-md border-gray-700 bg-gray-800 text-white">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                        );
                                                    })
                                                }

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>
                    {
                        loading ? <Button className="w-full my-4 bg-green-500 text-white"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-green-500 hover:bg-green-600 text-white">Post New Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a job</p>
                    }
                </form>
            </div>
        </div>
    );
};

export default PostJob;
