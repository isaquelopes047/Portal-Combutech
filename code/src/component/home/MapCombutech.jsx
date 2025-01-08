import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const DefaultContainer = {
    width: '100%',
    height: '500px',
    backgroundColor: '#fff',
    marginTop: '30px',
    borderRadius: '10px',
    paddingTop: '1px',
    position: 'relative',
};

const MapCombutech = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const iframe = document.getElementById('mapIframe');
        iframe.onload = () => {
            setLoading(false);
        };
    }, []);

    return (
        <div style={DefaultContainer}>
            {loading && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '10px',
                        zIndex: 1,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            <iframe
                id="mapIframe"
                src="https://www.google.com/maps/d/embed?mid=15D1XMgfqhMLVEtkvHfCe4zI9x8c2g5y4&ehbc=2E312F"
                width="100%"
                height="100%"
                style={{ border: 'none', borderRadius: '10px' }}
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default MapCombutech;