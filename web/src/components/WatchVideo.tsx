import CardMedia from '@mui/material/CardMedia';
import React, { useEffect, useState } from 'react';

interface IWatchVideoProps {
    id: string
}

const WatchVideo: React.FC<IWatchVideoProps> = ({ id }) => {
    console.log(id)
    // const [videoData, setVideoData] = useState<any | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchVideo = async () => {
    //         try {
    //             const response = await fetch(`/videos/${id}`);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch video.');
    //             }
    //             const data = await response.json();
    //             setVideoData(data);
    //         } catch (err) {
    //             setError(err as string);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchVideo();
    // }, [id]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div>
            <CardMedia
                component="video"
                image={id}
                title='title'
                controls
                />  
        </div>
    );
}

export default WatchVideo;