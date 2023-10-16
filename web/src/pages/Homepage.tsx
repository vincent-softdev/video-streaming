import { useCallback, useState } from "react"
import { categories, videos } from "../data/home"
import VideoGridItem from "../components/VideoGridItem"
import PageHeader from "../layouts/PageHeader"
import CategoryPills from "../components/CategoryPills"

const HomePage = () => {
    const [searchResults, setSearchResults] = useState<typeof videos>(videos);
    const [selectedCategory, setSelectedCategory] = useState(categories[0])

    const handleSearch = useCallback((query: string) => {
        const results = videos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
    }, []);

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
                <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {searchResults.map(video => (
                    <VideoGridItem key={video.id} {...video} />
                ))}
                </div>
            </div>
            </div>
        </div>
    )
}

export default HomePage