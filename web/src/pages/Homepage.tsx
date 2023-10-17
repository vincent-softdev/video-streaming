import { useCallback, useEffect, useState } from "react";
import { categories } from "../data/home";
import VideoGridItem from "../components/VideoGridItem";
import PageHeader from "../layouts/PageHeader";
import CategoryPills from "../components/CategoryPills";
import WatchVideo from "../components/WatchVideo";
import {Video} from "../type/video"

const HomePage = () => {
    const [videoData, setVideoData] = useState<Video[]>([]);
    const [searchResults, setSearchResults] = useState<Video[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/videos/')
            .then(response => response.json())
            .then(data => {
                setVideoData(data);
                setSearchResults(data);
            })
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    const handleSearch = useCallback((query: string) => {
        const results = videoData.filter(video =>
            video.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
    }, [videoData]);

    const handleVideoClick = (videoUrl: string) => {
        setSelectedVideoUrl(videoUrl);
    };

    return (
        <div className="max-h-screen flex flex-col">
            <PageHeader className="mt-4" onSearch={handleSearch} showSearch={true} />
            
            <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
                <div className="overflow-x-hidden px-8 pb-4">
                    <div className="sticky top-0 bg-white z-10 pb-4">
                    <CategoryPills
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelect={setSelectedCategory}
                    />
                    </div>
                    {
                        selectedVideoUrl && (
                            <WatchVideo url={selectedVideoUrl} />
                        )
                    }
                    <div className={`grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ${selectedVideoUrl && 'mt-[100px]'}`}>
                        {searchResults.map(video => (
                            <div key={video.id} className="cursor-pointer" onClick={() => handleVideoClick(video.videoUrl)}>
                                <VideoGridItem video={video} />
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default HomePage;