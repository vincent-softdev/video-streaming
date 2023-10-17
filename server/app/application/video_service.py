from app.domain.entities.video import Video
from app.domain.entities.channel import Channel
from app.domain.repositories.video_repository import VideoRepository
from app.infrastructure.persistence.json_repository import JsonRepository

class VideoService:
    def __init__(self):
        self.repo = JsonRepository("videos.json")

    def create_and_save_video(self, video_data):
        print(video_data)
        
        channel_var = video_data['channel']
        print(channel_var)
        channel = Channel(channel_var['id'], channel_var['name'], channel_var['profileUrl'])
        video = Video(
            title=video_data['title'],
            channel=channel.to_dict(),
            views=video_data['views'],
            postedAt=video_data['postedAt'],
            duration=video_data['duration'],
            thumbnailUrl=video_data['thumbnailUrl'],
            videoUrl=video_data['videoUrl']
        )

        self.repo.save(video)
        return video

    def get_all_videos(self):
        return self.repo.get_all()

    def get_video_by_id(self, video_id: str) -> Video:
        return self.repo.get_by_id(video_id)