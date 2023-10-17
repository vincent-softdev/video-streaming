import React, { useState } from 'react';
import FileInput from '../components/FileInput';
import VideoPlayer from '../components/VideoPlayer';
import ThumbnailPreview from '../components/ThumbnailPreview';
import PageHeader from '../layouts/PageHeader';
import CircularProgress from '@mui/material/CircularProgress';

const UploadVideoPage = () => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
        const url = URL.createObjectURL(files[0]);
        setVideoFile(files[0]);
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnailFile(files[0]);
        };
        reader.readAsDataURL(files[0]);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        const formDataVideo = new FormData();
        const formDataDetail = new FormData();
        const newVideo = {
            "title": title,
            "channel": {
              "name": "Web Dev Simplified",
              "id": "WebDevSimplified",
              "profileUrl":
                "https://yt3.ggpht.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s48-c-k-c0x00ffffff-no-rj"
            },
            "views": 0,
            "postedAt": "2023-08-22",
            "duration": 0,
            "thumbnailUrl": "https://i.ytimg.com/vi/d6a8RymS1zI/maxresdefault.jpg",
            "videoUrl": videoFile?.name
          }

        if (videoFile) formDataVideo.append('file', videoFile);

        const response = await fetch('http://localhost:8000/upload/video', { // You might need to adjust the URL depending on your setup
            method: 'POST',
            body: formDataVideo
        });

        if(response.status != 200){
            setSuccess(false)
            setLoading(false);
            return
        }
        
        if (thumbnailFile) formDataDetail.append('video_data', JSON.stringify(newVideo));
        // formData.append('title', title);
        console.log(newVideo)

        try {
            const response = await fetch('http://localhost:8000/upload/', { // You might need to adjust the URL depending on your setup
                method: 'POST',
                body: formDataDetail
            });

            if (response.ok) {
                setSuccess(true);
                setTitle('');
            } else {
                // Handle error
                console.error('Error uploading video:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
        setVideoFile(null);
        setThumbnailFile(null);
    };

    return (
        <div className="pt-4 h-screen w-full">
            <PageHeader state='upload' className='w-full' onSearch={() => {}} showSearch={false} />
            {loading && (
                <div className='min-h-[300px] flex flex-col justify-center items-center'>
                    <p className='mb-5'>Uploading video to server....</p>
                    <CircularProgress color="success" />
                </div>
            )}
            {
                !loading && (
                    <div className='flex p-4 flex-col items-center justify-center'>
                        <div className='md:min-w-[300px] md:max-w-[600px]'>
                            <h1 className="mb-4 text-xl">Upload Video</h1>
                            <VideoPlayer className='w-full min-h-[240px]' src={videoFile ? URL.createObjectURL(videoFile) : null} />
                            <FileInput className='w-full' accept="video/*" onChange={handleVideoChange} />
                            <input
                                type="text"
                                placeholder="Enter video title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mb-4 p-2 border rounded w-full"
                            />
                            <ThumbnailPreview className='w-full min-h-[240px]' src={thumbnailFile ? URL.createObjectURL(thumbnailFile) : null} />
                            <FileInput className='w-full' accept="image/*" onChange={handleThumbnailChange} />
                            
                            {success && <p className="text-green-500">Upload successful!</p>}

                            <button className="p-2 bg-blue-500 text-white rounded mt-4" onClick={handleSubmit} disabled={loading}>
                                Uploading
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default UploadVideoPage