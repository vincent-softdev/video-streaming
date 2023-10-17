import CardMedia from '@mui/material/CardMedia';
import React, { useEffect, useState } from 'react';

interface IWatchVideoProps {
    url: string
}

const WatchVideo: React.FC<IWatchVideoProps> = ({ url }) => {
    return (
        <div>
            <CardMedia
                component="video"
                image={`http://localhost:8000/videos/watch/${url}`}
                title='title'
                controls
                />  
        </div>
    );
}

export default WatchVideo;