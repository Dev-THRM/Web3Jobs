import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                background: 'linear-gradient(to bottom left, #1f3635 0%, #07c08f 100%)', // Gradient color
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                border: '1px solid #374151',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                display: 'flex', // Flexbox for layout
                flexDirection: 'column', // Stack children vertically
                height: '100%', // Ensure cards expand to fill the height of their parent container
                minHeight: '250px', // Set a minimum height for the card to maintain consistency
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
            {/* Company and Location */}
            <div style={{ marginBottom: '0.75rem' }}>
                <h1
                    style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#f0fdf4',
                        textTransform: 'uppercase',
                    }}
                >
                    {job?.company?.name}
                </h1>
                <p style={{ fontSize: '0.875rem', color: '#d1d5db' }}>{job?.location}</p>
            </div>

            {/* Job Title and Description */}
            <div style={{ marginBottom: '1rem', flexGrow: 1 }}>
                <h1
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        margin: '0.5rem 0',
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
                {/* Number of positions badge */}
                <Badge
                    style={{
                        color: '#fff', // Change color of text
                        fontWeight: '600',
                        background: '#00b0b9', // New background color
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    variant="ghost"
                >
                    {job?.position} Positions
                </Badge>

                {/* Job type badge */}
                <Badge
                    style={{
                        color: 'hsl(0, 0%, 43.5%)',
                        fontWeight: '600',
                        background: '#66ff66',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    variant="ghost"
                >
                    {job?.jobType}
                </Badge>

                {/* Salary badge */}
                <Badge
                    style={{
                        color: '#fff', // Change color of text
                        fontWeight: '600',
                        background: '#c9cc09', // New background color for salary
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                    variant="ghost"
                >
                    {job?.salary}
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
