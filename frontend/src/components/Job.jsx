import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <div
            onClick={() => navigate(`/description/${job?._id}`)}
            style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                background: 'linear-gradient(to bottom left, #1f3635 0%, #07c08f 100%)', // Gradient color
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                border: '1px solid #374151',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                display: 'flex', // Flexbox layout for the container
                flexDirection: 'column', // Stack children vertically
                height: '100%', // Ensure the card takes up available height
                minHeight: '350px', // Minimum height for the card to ensure consistency
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
            }}
        >
            {/* Timestamp */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
                    {daysAgoFunction(job?.createdAt) === 0
                        ? 'Today'
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
            </div>

            {/* Company Information */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Avatar>
                    <AvatarImage src={job?.company?.logo} />
                </Avatar>
                <div>
                    <h1 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#f0fdf4' }}>
                        {job?.company?.name}
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: '#d1d5db' }}>{job?.location}</p>
                </div>
            </div>

            {/* Job Title and Description */}
            <div style={{ marginBottom: '1rem', flexGrow: 1 }}>
                <h1
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        marginBottom: '0.5rem',
                    }}
                >
                    {job?.title}
                </h1>
                <p
                    style={{
                        fontSize: '0.875rem',
                        color: '#e5e7eb',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {job?.description}
                </p>
            </div>

            {/* Badges */}
            <div
                style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    marginTop: '1rem',
                }}
            >
                <Badge
                    style={{
                        color: '#fff',
                        fontWeight: '600',
                        background: '#00b0b9',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {job?.position} Positions
                </Badge>
                <Badge
                    style={{
                        color: 'hsl(0, 0%, 43.5%)',
                        fontWeight: '600',
                        background: '#66ff66',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {job?.jobType}
                </Badge>
                <Badge
                    style={{
                        color: '#fff',
                        fontWeight: '600',
                        background: '#c9cc09',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {job?.salary}
                </Badge>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    style={{
                        border: '1px solid #374151',
                        color: '#fff',
                        background: 'transparent',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#07c08f')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                    Details
                </Button>
            </div>
        </div>
    );
};

export default Job;
