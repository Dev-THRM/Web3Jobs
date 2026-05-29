import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { motion } from 'framer-motion';


const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job || {});
    const { user } = useSelector(store => store.auth || {});
    const [isApplied, setIsApplied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasError, setHasError] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { 
                withCredentials: true 
            });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { 
                    ...singleJob, 
                    applications: [...singleJob?.applications || [], { applicant: user?._id }] 
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { 
                    withCredentials: true 
                });

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(
                        res.data.job.applications?.some(
                            application => application.applicant === user?._id
                        ) || false
                    );
                    setError(null);
                } else {
                    setError('Job not found or has been deleted.');
                    dispatch(setSingleJob(null));
                }
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch job details.');
                dispatch(setSingleJob(null));
            } finally {
                setLoading(false);
            }
        };

        if (jobId) fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    if (hasError) {
        return (
            <div className="max-w-7xl mx-auto my-10 text-center p-6 bg-red-900/20 rounded-xl">
                <h2 className="text-2xl font-bold text-red-400 mb-4">
                    🚨 Something went wrong!
                </h2>
                <Button 
                    onClick={() => window.location.reload()}
                    className="bg-purple-600 hover:bg-purple-500 text-white"
                >
                    Reload Page
                </Button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto my-10">
                <motion.div
                    className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-[#0a0e2a] p-8 rounded-xl border border-white/10 shadow-2xl text-center"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Access Required
                        </h2>
                        <p className="mb-6 text-gray-300">Please sign in to view this job</p>
                        <Button 
                            onClick={() => navigate('/login')} 
                            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-6 py-3 rounded-full"
                        >
                            Sign In
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto my-10 p-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-12 bg-gray-800 rounded-xl w-3/4 mx-auto"></div>
                    <div className="flex gap-4 justify-center">
                        <div className="h-8 bg-gray-800 rounded-full w-32"></div>
                        <div className="h-8 bg-gray-800 rounded-full w-32"></div>
                        <div className="h-8 bg-gray-800 rounded-full w-32"></div>
                    </div>
                    <div className="h-64 bg-gray-800 rounded-xl mt-8"></div>
                </div>
            </div>
        );
    }

    if (error || !singleJob) {
        return (
            <div className="max-w-7xl mx-auto my-10 text-center p-6 bg-red-900/20 rounded-xl">
                <h2 className="text-2xl font-bold text-red-400 mb-4">
                    ⚠️ {error || 'Job not found'}
                </h2>
                <Button 
                    onClick={() => navigate(-1)}
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white"
                >
                    Back to Jobs
                </Button>
            </div>
        );
    }

    try {
        return (
            <motion.div
                className="max-w-7xl mx-auto my-10 p-6 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-[#0a0e2a] to-[#1a1f4d] border border-white/10 shadow-2xl relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
               {/* Animated Background */}
          {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
               <div className="starry-pattern animate-pulse-slow" />
               <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e2a]/60 to-[#1a1f4d]/60" />
            </div>
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                    <div className="space-y-4">
                        <h1 className="font-bold text-4xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            {singleJob?.title}
                        </h1>
                        <motion.div
                            className="flex flex-wrap gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Badge className="bg-purple-900/30 text-purple-300 border border-purple-500/50 px-4 py-2 rounded-full">
                                🚀 {singleJob?.position} Positions
                            </Badge>
                            <Badge className="bg-cyan-900/30 text-cyan-300 border border-cyan-500/50 px-4 py-2 rounded-full">
                                ⏳ {singleJob?.jobType}
                            </Badge>
                            <Badge className="bg-pink-900/30 text-pink-300 border border-pink-500/50 px-4 py-2 rounded-full">
                                💰 {singleJob?.salary}
                            </Badge>
                        </motion.div>
                    </div>
                    
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`text-lg font-bold px-8 py-4 rounded-full transition-all ${
                            isApplied
                                ? 'bg-gray-600/30 text-white border border-gray-500/50 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg hover:shadow-purple-500/30'
                        }`}
                    >
                        {isApplied ? '🚀 Application Submitted' : 'Apply Now ⚡'}
                    </Button>
                </div>

                {/* Job Details */}
                <div className="space-y-8">
                    {/* Key Details Card */}
                    <motion.div
                        className="bg-black/20 p-6 rounded-xl border border-white/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-purple-300 mb-6">
                            🌌 Position Overview
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                            {[
                                { icon: '📍', label: 'Location', value: singleJob?.location, color: 'cyan' },
                                { icon: '🎯', label: 'Experience', value: `${singleJob?.experienceLevel} years`, color: 'purple' },
                                { icon: '👥', label: 'Applicants', value: `${singleJob?.applications?.length || 0} space cadets`, color: 'pink' },
                                { icon: '📅', label: 'Posted', value: singleJob?.createdAt?.split("T")[0], color: 'green' },
                            ].map((item, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors border border-gray-700 animate-item"
                                >
                                    <span className={`text-${item.color}-400 text-2xl`}>{item.icon}</span>
                                    <div>
                                        <p className={`font-semibold text-${item.color}-300`}>{item.label}</p>
                                        <p>{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Description Card */}
                    <motion.div
                        className="bg-black/20 p-6 rounded-xl border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-purple-300 mb-6">
                            📜 Mission Briefing
                        </h2>
                        
                        <div className="space-y-6 text-gray-300">
                            <div className="p-4 bg-black/30 rounded-lg border border-white/5">
                                <h3 className="font-semibold text-purple-300 mb-2">🚀 About This Role</h3>
                                <p className="leading-relaxed whitespace-pre-line">{singleJob?.description}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        );
    } catch (err) {
        setHasError(true);
        return null;
    }
};

export default JobDescription;