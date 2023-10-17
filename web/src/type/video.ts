export interface Channel {
    id: string;
    name: string;
    profileUrl: string;
}

export interface Video {
    id: string;
    title: string;
    channel: Channel;
    views: number;
    postedAt: string; // Assuming date is stored as a string in format like "YYYY-MM-DD". If it's a Date object, replace with Date.
    duration: number;
    thumbnailUrl: string;
    videoUrl: string;
}