import React, { useState } from 'react';
import FileInput from '../components/FileInput';
import VideoPlayer from '../components/VideoPlayer';
import ThumbnailPreview from '../components/ThumbnailPreview';
import PageHeader from '../layouts/PageHeader';

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

        const formData = new FormData();
        if (videoFile) formData.append('video', videoFile);
        if (thumbnailFile) formData.append('thumbnail', thumbnailFile);
        formData.append('title', title);

        try {
        const response = await fetch('/videos/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            setSuccess(true);
        } else {
            // Handle error
            console.error('Error uploading video:', await response.text());
        }
        } catch (error) {
        console.error('Error:', error);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="pt-4 h-screen w-full">
            <PageHeader state='upload' className='w-full' onSearch={() => {}} showSearch={false} />
            <div className='flex p-4 flex-col items-center justify-center'>
                <h1 className="mb-4 text-xl">Upload Video</h1>
                <VideoPlayer src={videoFile ? URL.createObjectURL(videoFile) : null} />
                <FileInput accept="video/*" onChange={handleVideoChange} />
                <input
                    type="text"
                    placeholder="Enter video title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4 p-2 border rounded w-64"
                />
                <ThumbnailPreview src={thumbnailFile ? URL.createObjectURL(thumbnailFile) : null} />
                <FileInput accept="image/*" onChange={handleThumbnailChange} />
                
                {loading && <p>Uploading...</p>}
                {success && <p className="text-green-500">Upload successful!</p>}

                <button className="p-2 bg-blue-500 text-white rounded mt-4" onClick={handleSubmit} disabled={loading}>
                    Uploading
                </button>
            </div>
        </div>
    );
}

export default UploadVideoPage