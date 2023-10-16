import datetime
import uuid

class Video:
    def __init__(self, title, channel, views, postedAt, duration, thumbnailUrl, videoUrl, id=None):
        self.id = id or str(uuid.uuid4())
        self.title = title
        self.channel = channel
        self.views = views
        self.postedAt = postedAt
        self.duration = duration
        self.thumbnailUrl = thumbnailUrl
        self.videoUrl = videoUrl
    
    def to_dict(self):
        """
        Convert the Video instance to a dictionary.
        """
        return {
            "id": self.id,
            "title": self.title,
            "channel": self.channel,
            "views": self.views,
            "postedAt": self.postedAt.strftime('%Y-%m-%d %H:%M:%S') if isinstance(self.postedAt, datetime.datetime) else self.postedAt,  # Convert datetime to string if it's a datetime object
            "duration": self.duration,
            "thumbnailUrl": self.thumbnailUrl,
            "videoUrl": self.videoUrl
        }

    @classmethod
    def from_dict(cls, data):
        """
        Create a Video instance from a dictionary.
        """
        return cls(
            title=data["title"],
            channel=data["channel"],
            views=data["views"],
            postedAt=data["postedAt"],
            duration=data["duration"],
            thumbnailUrl=data["thumbnailUrl"],
            videoUrl=data["videoUrl"],
            id=data["id"]
        )