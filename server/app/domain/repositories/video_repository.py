# app/infrastructure/repositories/video_repository.py

import json
import uuid
from typing import List, Optional
from app.domain.entities.video import Video

class VideoRepository:
    FILE_PATH = './videos.json'

    def __init__(self):
        try:
            with open(self.FILE_PATH, 'r') as file:
                self.videos = json.load(file)
        except (FileNotFoundError, json.JSONDecodeError):
            self.videos = []

    def save(self, video: Video) -> Video:
        new_video = video.to_dict()
        new_video['id'] = str(uuid.uuid4())
        self.videos.append(new_video)
        
        with open(self.FILE_PATH, 'w') as file:
            json.dump(self.videos, file)
        
        return Video(**new_video)

    def find_all(self) -> List[Video]:
        return [Video(**video_data) for video_data in self.videos]

    def find_by_id(self, video_id: str) -> Optional[Video]:
        video_data = next((video for video in self.videos if video['id'] == video_id), None)
        if video_data:
            return Video(**video_data)
        return None
