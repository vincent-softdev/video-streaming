from app.domain.entities.video import Video
from app.domain.entities.channel import Channel
from app.domain.repositories.video_repository import VideoRepository
from app.infrastructure.persistence.json_repository import JsonRepository

class VideoService:
    def __init__(self):
        self.repo = JsonRepository("videos.json")

    def create_and_save_video(self, video_data):
        print(video_data)
        channel = Channel(video_data['channel_id'], video_data['channel_name'], video_data['channel_profileUrl'])
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
